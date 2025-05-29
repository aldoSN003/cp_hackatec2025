import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-full font-medium transition-all duration-200 flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-green-500 hover:bg-green-600 text-white',
    outline: 'border border-blue-500 text-blue-500 hover:bg-blue-50',
    text: 'text-blue-500 hover:bg-blue-50',
  };
  
  const sizeStyles = {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2.5 px-5',
    lg: 'text-lg py-3 px-6',
  };
  
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;