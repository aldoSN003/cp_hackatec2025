import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  fallback,
}) => {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const getFallbackInitials = () => {
    if (fallback) {
      return fallback.substring(0, 2).toUpperCase();
    }
    return alt.substring(0, 2).toUpperCase();
  };

  return (
    <div 
      className={`${sizeStyles[size]} rounded-full overflow-hidden flex items-center justify-center bg-blue-100`}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-blue-600 font-medium">
          {getFallbackInitials()}
        </span>
      )}
    </div>
  );
};

export default Avatar;