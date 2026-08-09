import React from 'react';
import './Button.css';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href,
  onClick,
  className = '',
  ...props 
}) {
  const baseClass = `btn btn-${variant} btn-${size} ${className}`;

  if (href) {
    return (
      <a href={href} className={baseClass} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClass} {...props}>
      {children}
    </button>
  );
}
