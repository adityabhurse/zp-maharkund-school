import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  fallbackIcon?: string;
  accentColor?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'School image',
  className = '',
  fallbackText = 'Image Unavailable',
  fallbackIcon = 'school',
  accentColor = '#ffe16e',
  style,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`w-full h-full min-h-[140px] flex flex-col items-center justify-center p-4 text-center select-none ${className}`}
        style={{
          backgroundColor: accentColor,
          ...style,
        }}
      >
        <div className="w-10 h-10 rounded-full neo-border-sm bg-white text-black flex items-center justify-center mb-2 shadow-sm">
          <span className="material-symbols-outlined text-xl font-bold">{fallbackIcon}</span>
        </div>
        <p className="text-xs font-black text-black leading-tight max-w-[180px]">{alt || fallbackText}</p>
        <span className="text-[10px] font-bold text-black/60 uppercase tracking-wider mt-1">Z.P. Maharkund</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
          <span className="material-symbols-outlined text-slate-400 text-2xl animate-spin">sync</span>
        </div>
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        style={style}
        {...props}
      />
    </div>
  );
};
