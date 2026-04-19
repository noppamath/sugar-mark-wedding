'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { Loader } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Show loading spinner and disable button */
  isLoading?: boolean;
  /** Tooltip text */
  title?: string;
  /** Content of the button */
  children: ReactNode;
  /** Optional href to render as a Link instead of button */
  href?: string;
}

/**
 * Button Component
 * 
 * A reusable, accessible button with multiple variants, sizes, and states.
 * Supports loading state, full width, icon-only usage, and optional Link rendering.
 * 
 * @example
 * // Primary button
 * <Button variant="primary">Click me</Button>
 * 
 * // Loading state
 * <Button isLoading>Submit</Button>
 * 
 * // Secondary with size
 * <Button variant="secondary" size="lg">Explore</Button>
 * 
 * // As a link
 * <Button href="/gallery">View Gallery</Button>
 * 
 * // Icon button with ARIA label
 * <Button variant="ghost" size="sm" aria-label="Close">×</Button>
 */
export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  className = '',
  href,
  ...props
}: ButtonProps) {
  // Base styles
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2';

  // Variant styles
  const variantStyles = {
    primary:
      'bg-cyan-500 text-white hover:bg-cyan-600 active:bg-cyan-700 focus-visible:outline-cyan-500',
    secondary:
      'bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-700 focus-visible:outline-rose-500',
    ghost:
      'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus-visible:outline-gray-500',
    outline:
      'border-2 border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100 focus-visible:outline-gray-500',
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm gap-2',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

  // Render as Link if href provided
  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      className={combinedClassName}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <Loader className="w-4 h-4 animate-spin" aria-hidden="true" />
      )}
      {children}
    </button>
  );
}

export default Button;
