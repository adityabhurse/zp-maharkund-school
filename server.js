import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_PIN = process.env.ADMIN_PIN || '1991';

// Generate a random secret for session tokens (rotates each server restart)
const SESSION_SECRET = crypto.randomBytes(32).toString('hex');

app.use(express.json({ limit: '10mb' })); // Increased for base64 images

// ==================== SECURITY: HTTP SECURITY HEADERS ====================
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// Serve static photos from 'foto' and 'public/foto' directories (not managed by admin portal)
const fotoPublicDir = path.join(__dirname, 'public', 'foto');
const fotoRootDir = path.join(__dirname, 'foto');
if (!fs.existsSync(fotoPublicDir)) fs.mkdirSync(fotoPublicDir, { recursive: true });
if (!fs.existsSync(fotoRootDir)) fs.mkdirSync(fotoRootDir, { recursive: true });
app.use('/foto', express.static(fotoPublicDir));
app.use('/foto', express.static(fotoRootDir));

// Sanitization Helper to escape HTML special characters and prevent XSS
function sanitizeInput(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Database File Path
const DB_FILE = path.join(__dirname, 'data', 'db.json');

// ==================== DATABASE HELPERS ====================

function readDb() {
  try {
    const dataDir = path.dirname(DB_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      return {
        inquiries: [],
        notices: [],
        gallery: [],
        circulars: [],
        calendarEvents: [],
        achievements: []
      };
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      inquiries: parsed.inquiries || [],
      notices: parsed.notices || [],
      gallery: parsed.gallery || [],
      circulars: parsed.circulars || [],
      calendarEvents: parsed.calendarEvents || [],
      achievements: parsed.achievements || []
    };
  } catch (err) {
    console.error('Error reading database:', err);
    return {
      inquiries: [],
      notices: [],
      gallery: [],
      circulars: [],
      calendarEvents: [],
      achievements: []
    };
  }
}

function writeDb(data) {
  try {
    const dataDir = path.dirname(DB_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Error writing database:', err);
  }
}

// ==================== SECURITY: SESSION TOKEN MANAGEMENT ====================

// Active session tokens (in-memory — survives as long as server runs)
const activeSessions = new Map(); // token -> { createdAt, ip, expiresAt }
const SESSION_EXPIRY_MS = 4 * 60 * 60 * 1000; // 4 hour sessions
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minute lockout after failed attempts

// Track failed login attempts per IP
const failedAttempts = new Map(); // ip -> { count, lockedUntil }

function generateToken() {
  return crypto.randomBytes(48).toString('base64url');
}

function isValidSession(token) {
  const session = activeSessions.get(token);
  if (!session) return false;
  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return false;
  }
  return true;
}

// Cleanup expired sessions every 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const [token, session] of activeSessions.entries()) {
    if (now > session.expiresAt) {
      activeSessions.delete(token);
    }
  }
  // Cleanup expired lockouts
  for (const [ip, record] of failedAttempts.entries()) {
    if (record.lockedUntil && now > record.lockedUntil) {
      failedAttempts.delete(ip);
    }
  }
}, 30 * 60 * 1000);

// ==================== MIDDLEWARE ====================

// Auth middleware for admin-only routes
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required. Please log in to the admin portal.'
    });
  }

  const token = authHeader.slice(7);
  if (!isValidSession(token)) {
    return res.status(401).json({
      success: false,
      error: 'Session expired or invalid. Please log in again.'
    });
  }

  // Refresh session expiry on activity
  const session = activeSessions.get(token);
  session.expiresAt = Date.now() + SESSION_EXPIRY_MS;

  req.adminSession = session;
  next();
}

// Simple In-Memory Rate Limiter for Anti-Spam (max 10 requests per 10 mins per IP)
const ipRequestMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;

setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipRequestMap.entries()) {
    if (now - record.startTime > RATE_LIMIT_WINDOW_MS) {
      ipRequestMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// ==================== AUTH ROUTES ====================

// Admin Login — with brute-force protection
app.post('/api/admin/login', (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const { pin } = req.body;

  if (!pin) {
    return res.status(400).json({ success: false, error: 'PIN is required.' });
  }

  // Check IP lockout
  const attempts = failedAttempts.get(clientIp);
  if (attempts && attempts.lockedUntil && Date.now() < attempts.lockedUntil) {
    const remainingMins = Math.ceil((attempts.lockedUntil - Date.now()) / 60000);
    return res.status(429).json({
      success: false,
      error: `Account locked due to too many failed attempts. Try again in ${remainingMins} minute(s).`
    });
  }

  // Validate PIN (constant-time comparison to prevent timing attacks)
  const pinBuffer = Buffer.from(String(pin));
  const correctPinBuffer = Buffer.from(ADMIN_PIN);
  const isValid =
    pinBuffer.length === correctPinBuffer.length &&
    crypto.timingSafeEqual(pinBuffer, correctPinBuffer);

  if (!isValid) {
    // Track failed attempt
    const record = failedAttempts.get(clientIp) || { count: 0, lockedUntil: null };
    record.count++;
    if (record.count >= MAX_LOGIN_ATTEMPTS) {
      record.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
      failedAttempts.set(clientIp, record);
      return res.status(429).json({
        success: false,
        error: `Too many failed login attempts. Account locked for 15 minutes.`
      });
    }
    failedAttempts.set(clientIp, record);
    return res.status(401).json({
      success: false,
      error: `Invalid PIN. ${MAX_LOGIN_ATTEMPTS - record.count} attempt(s) remaining before lockout.`,
      remainingAttempts: MAX_LOGIN_ATTEMPTS - record.count
    });
  }

  // Clear failed attempts on success
  failedAttempts.delete(clientIp);

  // Generate secure session token
  const token = generateToken();
  activeSessions.set(token, {
    createdAt: Date.now(),
    expiresAt: Date.now() + SESSION_EXPIRY_MS,
    ip: clientIp
  });

  console.log(`[AUTH] Admin login from IP ${clientIp}. Session created.`);

  return res.json({
    success: true,
    token,
    expiresIn: SESSION_EXPIRY_MS / 1000,
    message: 'Authentication successful. Welcome Headmaster / Staff.'
  });
});

// Admin Logout
app.post('/api/admin/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    activeSessions.delete(token);
  }
  res.json({ success: true, message: 'Logged out successfully.' });
});

// Verify Session (for frontend to check if token is still valid)
app.get('/api/admin/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.json({ valid: false });
  }
  const token = authHeader.slice(7);
  const valid = isValidSession(token);
  return res.json({ valid, expiresIn: valid ? Math.ceil((activeSessions.get(token).expiresAt - Date.now()) / 1000) : 0 });
});

// ==================== PUBLIC API ROUTES ====================

// 1. Inquiries — POST is public (with rate limit), GET needs admin
app.post('/api/contact', (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const now = Date.now();

  let rateRecord = ipRequestMap.get(clientIp);
  if (!rateRecord || now - rateRecord.startTime > RATE_LIMIT_WINDOW_MS) {
    rateRecord = { count: 1, startTime: now };
    ipRequestMap.set(clientIp, rateRecord);
  } else {
    rateRecord.count++;
    if (rateRecord.count > MAX_REQUESTS_PER_WINDOW) {
      return res.status(429).json({
        error: 'Too many inquiries submitted from your IP. Please try again in a few minutes.'
      });
    }
  }

  // Honeypot Check
  if (req.body.honeypot || req.body.website) {
    console.warn(`[SPAM BLOCKED] Honeypot filled by IP ${clientIp}`);
    return res.status(400).json({ error: 'Spam submission detected.' });
  }

  const { parentName, phone, childAge, subject, message } = req.body;

  const cleanName = sanitizeInput((parentName || '').trim());
  const cleanPhone = (phone || '').replace(/[\s\-\(\)\+]/g, '');
  const cleanMessage = sanitizeInput((message || '').trim().substring(0, 1000));
  const cleanSubject = sanitizeInput((subject || 'General Admission Inquiry').trim().substring(0, 100));
  const cleanChildAge = sanitizeInput((childAge || 'Grade 1').trim().substring(0, 50));

  if (!cleanName || cleanName.length < 2 || cleanName.length > 60) {
    return res.status(400).json({ error: 'Please enter a valid parent/guardian name (2 to 60 characters).' });
  }

  const phoneRegex = /^[6-9]\d{9}$/;
  if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
    return res.status(400).json({ error: 'Please enter a valid 10-digit mobile number (e.g. 9876543210).' });
  }

  const db = readDb();
  const inquiryId = `INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  const newInquiry = {
    id: inquiryId,
    parentName: cleanName,
    phone: cleanPhone,
    childAge: cleanChildAge,
    subject: cleanSubject,
    message: cleanMessage,
    status: 'RECEIVED',
    createdAt: new Date().toISOString()
  };

  db.inquiries.unshift(newInquiry);
  writeDb(db);

  console.log(`[NEW INQUIRY] ${inquiryId} from ${cleanName} (+91 ${cleanPhone})`);

  return res.status(201).json({
    success: true,
    inquiryId,
    data: newInquiry,
    message: 'Inquiry successfully recorded in school database.'
  });
});

// GET single inquiry by Ref ID — public (for parents tracking their status)
app.get('/api/contact/track/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, error: 'Inquiry Reference ID is required.' });
  }
  const db = readDb();
  const inquiry = db.inquiries.find((item) => item.id.toUpperCase() === id.trim().toUpperCase());
  if (!inquiry) {
    return res.status(404).json({ success: false, error: 'Inquiry record not found.' });
  }
  return res.json({ success: true, data: inquiry });
});

// GET all inquiries — admin only (protects PII)
app.get('/api/contact', requireAdmin, (req, res) => {
  const db = readDb();
  res.json({ success: true, count: db.inquiries.length, data: db.inquiries });
});

// PATCH/DELETE inquiries — admin only
app.patch('/api/contact/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const db = readDb();
  const index = db.inquiries.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Inquiry not found.' });
  }
  db.inquiries[index].status = status || db.inquiries[index].status;
  writeDb(db);
  res.json({ success: true, data: db.inquiries[index] });
});

app.delete('/api/contact/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const initialLength = db.inquiries.length;
  db.inquiries = db.inquiries.filter((item) => item.id !== id);
  if (db.inquiries.length === initialLength) {
    return res.status(404).json({ error: 'Inquiry not found.' });
  }
  writeDb(db);
  res.json({ success: true, message: 'Inquiry deleted.' });
});

// ==================== PUBLIC READ / ADMIN WRITE ROUTES ====================

// 2. Notices — GET public, POST/DELETE admin
app.get('/api/notices', (req, res) => {
  const db = readDb();
  res.json({ success: true, data: db.notices });
});

app.post('/api/notices', requireAdmin, (req, res) => {
  const { title, titleMr, type, linkPath } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Notice title is required.' });
  }

  const db = readDb();
  const newNotice = {
    id: `n${Date.now()}`,
    title: sanitizeInput(title),
    titleMr: sanitizeInput(titleMr || title),
    type: type || 'info',
    linkPath: linkPath || '/about',
    createdAt: new Date().toISOString()
  };

  db.notices.unshift(newNotice);
  writeDb(db);
  res.status(201).json({ success: true, data: db.notices });
});

app.delete('/api/notices/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.notices = db.notices.filter((n) => n.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Notice deleted.', data: db.notices });
});

// 3. Photo Gallery — GET public, POST/DELETE admin
app.get('/api/gallery', (req, res) => {
  const db = readDb();
  res.json({ success: true, data: db.gallery });
});

app.post('/api/gallery', requireAdmin, (req, res) => {
  const { title, titleMr, category, imageUrl, driveUrl, description, descriptionMr, date, accentColor } = req.body;
  if (!title || (!imageUrl && !driveUrl)) {
    return res.status(400).json({ error: 'Title and Image URL (or Google Drive link) are required.' });
  }

  const db = readDb();
  const newGalleryItem = {
    id: `g${Date.now()}`,
    title: sanitizeInput(title),
    titleMr: sanitizeInput(titleMr || title),
    category: category || 'events',
    accentColor: accentColor || '#00c2a8',
    imageUrl: imageUrl || '',
    driveUrl: driveUrl || '',
    description: sanitizeInput(description || ''),
    descriptionMr: sanitizeInput(descriptionMr || description || ''),
    date: sanitizeInput(date || 'Feb 2026'),
    createdAt: new Date().toISOString()
  };

  db.gallery.unshift(newGalleryItem);
  writeDb(db);
  res.status(201).json({ success: true, data: newGalleryItem });
});

app.delete('/api/gallery/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.gallery = db.gallery.filter((g) => g.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Photo deleted.', data: db.gallery });
});

// 4. Circulars & Documents — GET public, POST/DELETE admin
app.get('/api/circulars', (req, res) => {
  const db = readDb();
  res.json({ success: true, data: db.circulars });
});

app.post('/api/circulars', requireAdmin, (req, res) => {
  const { title, titleMr, category, fileSize, description, descriptionMr, downloadUrl, driveUrl } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required.' });
  }

  const db = readDb();
  const newCircular = {
    id: `circ-${Date.now()}`,
    title: sanitizeInput(title),
    titleMr: sanitizeInput(titleMr || title),
    category: category || 'General',
    fileSize: fileSize || '150 KB',
    publishDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    downloadUrl: downloadUrl || '',
    driveUrl: driveUrl || '',
    description: sanitizeInput(description || ''),
    descriptionMr: sanitizeInput(descriptionMr || description || ''),
    isNew: true
  };

  db.circulars.unshift(newCircular);
  writeDb(db);
  res.status(201).json({ success: true, data: newCircular });
});

app.delete('/api/circulars/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.circulars = db.circulars.filter((c) => c.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Circular deleted.', data: db.circulars });
});

// 5. Calendar Events — GET public, POST/DELETE admin
app.get('/api/events', (req, res) => {
  const db = readDb();
  res.json({ success: true, data: db.calendarEvents });
});

app.post('/api/events', requireAdmin, (req, res) => {
  const { title, titleMr, category, date, dateMr, time, timeMr, location, locationMr, description, descriptionMr, isUpcoming } = req.body;
  if (!title || !date) {
    return res.status(400).json({ error: 'Title and Date are required.' });
  }

  const db = readDb();
  const newEvent = {
    id: `ev-${Date.now()}`,
    title: sanitizeInput(title),
    titleMr: sanitizeInput(titleMr || title),
    category: category || 'event',
    date: sanitizeInput(date),
    dateMr: sanitizeInput(dateMr || date),
    time: sanitizeInput(time || ''),
    timeMr: sanitizeInput(timeMr || time || ''),
    location: sanitizeInput(location || ''),
    locationMr: sanitizeInput(locationMr || location || ''),
    description: sanitizeInput(description || ''),
    descriptionMr: sanitizeInput(descriptionMr || description || ''),
    isUpcoming: isUpcoming !== undefined ? Boolean(isUpcoming) : true,
    createdAt: new Date().toISOString()
  };

  db.calendarEvents.unshift(newEvent);
  writeDb(db);
  res.status(201).json({ success: true, data: newEvent });
});

app.delete('/api/events/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.calendarEvents = db.calendarEvents.filter((e) => e.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Event deleted.', data: db.calendarEvents });
});

// 6. Achievements — GET public, POST/DELETE admin
app.get('/api/achievements', (req, res) => {
  const db = readDb();
  res.json({ success: true, data: db.achievements });
});

app.post('/api/achievements', requireAdmin, (req, res) => {
  const { title, titleMr, category, studentName, studentNameMr, grade, gradeMr, year, description, descriptionMr, badgeText, badgeTextMr } = req.body;
  if (!title || !studentName) {
    return res.status(400).json({ error: 'Title and Student Name are required.' });
  }

  const db = readDb();
  const newAchievement = {
    id: `ach-${Date.now()}`,
    title: sanitizeInput(title),
    titleMr: sanitizeInput(titleMr || title),
    category: category || 'academic',
    studentName: sanitizeInput(studentName),
    studentNameMr: sanitizeInput(studentNameMr || studentName),
    grade: sanitizeInput(grade || 'Grade 5'),
    gradeMr: sanitizeInput(gradeMr || grade || 'इयत्ता ५ वी'),
    year: sanitizeInput(year || '2025-26'),
    description: sanitizeInput(description || ''),
    descriptionMr: sanitizeInput(descriptionMr || description || ''),
    badgeText: sanitizeInput(badgeText || 'Winner'),
    badgeTextMr: sanitizeInput(badgeTextMr || badgeText || 'विजेता'),
    createdAt: new Date().toISOString()
  };

  db.achievements.unshift(newAchievement);
  writeDb(db);
  res.status(201).json({ success: true, data: newAchievement });
});

app.delete('/api/achievements/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.achievements = db.achievements.filter((a) => a.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Achievement deleted.', data: db.achievements });
});

// Serve static frontend assets from dist folder in production
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));

  // SPA fallback for all non-API routes
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Start Express Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Z.P. Maharkund Express API Server running at http://localhost:${PORT}`);
  console.log(`Admin PIN: ${ADMIN_PIN} | Session TTL: ${SESSION_EXPIRY_MS / 1000}s | Lockout after ${MAX_LOGIN_ATTEMPTS} failures`);
});
