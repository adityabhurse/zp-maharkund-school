export type Language = 'en' | 'mr';

export type PageTab = 'home' | 'about' | 'academics' | 'facilities' | 'welfare' | 'gallery' | 'downloads' | 'calendar' | 'achievements' | 'admin';

export interface GalleryItem {
  id: string;
  title: string;
  titleMr?: string;
  category: 'classrooms' | 'library' | 'playground' | 'meals' | 'events';
  imageUrl: string;
  description: string;
  descriptionMr?: string;
  date?: string;
  accentColor?: string;
  hasBadge?: boolean;
}

export interface NoticeItem {
  id: string;
  title: string;
  titleMr?: string;
  type: 'urgent' | 'info' | 'event';
  linkPath?: string;
  createdAt: string;
}

export interface ContactInquiry {
  id: string;
  parentName: string;
  phone: string;
  childAge: string;
  subject: string;
  message: string;
  status: 'RECEIVED' | 'IN_REVIEW' | 'ADMITTED' | 'CLOSED';
  createdAt: string;
}

export interface CircularItem {
  id: string;
  title: string;
  titleMr?: string;
  category: 'Admissions' | 'Academic' | 'Holidays' | 'Welfare' | 'Government';
  fileSize: string;
  publishDate: string;
  downloadUrl?: string;
  description: string;
  descriptionMr?: string;
  isNew?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  titleMr: string;
  date: string;
  category: 'exam' | 'holiday' | 'national' | 'event' | 'meeting';
  description: string;
  descriptionMr: string;
  time?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  titleMr: string;
  studentName: string;
  studentNameMr: string;
  grade: string;
  year: string;
  category: 'Scholarship' | 'Sports' | 'Navodaya' | 'Science & Arts';
  award: string;
  awardMr: string;
  icon: string;
  accentColor: string;
  description: string;
  descriptionMr: string;
}

export interface MealMenuItem {
  day: string;
  dayMr: string;
  mainDish: string;
  mainDishMr: string;
  sideDish: string;
  sideDishMr: string;
  nutritionHighlights: string;
  nutritionHighlightsMr: string;
  specialTag?: string;
  specialTagMr?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  nameMr: string;
  role: string;
  roleMr: string;
  qualification: string;
  experience: string;
  experienceMr: string;
  badgeColor: string;
  photoUrl?: string;
}
