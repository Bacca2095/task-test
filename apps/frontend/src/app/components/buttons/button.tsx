import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  variant = 'primary',
}) => {
  const baseClasses =
    'font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none focus:ring-4';
  const primaryClasses =
    'text-white bg-gray-800 hover:bg-gray-900 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700';
  const secondaryClasses =
    'text-gray-800 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700';

  const variantClasses =
    variant === 'primary' ? primaryClasses : secondaryClasses;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
    >
      {label}
    </button>
  );
};

export { Button, ButtonProps };
