import React from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  className = '',
  disabled = false,
}) => {
  return (
    <button
      type="button"
      className={`flex items-center justify-center gap-2 p-2 rounded-md bg-gray-100 hover:bg-gray-200
        disabled:opacity-50 disabled:cursor-not-allowed
        dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white
        ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};

export { IconButton, IconButtonProps };
