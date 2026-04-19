'use client';

import { ReactNode, forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text displayed above the input */
  label?: string;
  /** Error message (shows when present) */
  error?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Icon or content displayed at the start of the input */
  startIcon?: ReactNode;
  /** Icon or content displayed at the end of the input */
  endIcon?: ReactNode;
  /** Whether the input spans full width */
  fullWidth?: boolean;
  /** Variant styling */
  variant?: 'default' | 'filled';
}

/**
 * Input Component
 * 
 * A reusable text input with label, error state, helper text, and optional icons.
 * Accessible with proper ARIA attributes and keyboard navigation.
 * 
 * @example
 * // Basic input
 * <Input type="email" placeholder="Enter email" />
 * 
 * // With label and error
 * <Input
 *   label="Email"
 *   type="email"
 *   error="Invalid email address"
 * />
 * 
 * // With helper text
 * <Input
 *   label="Password"
 *   type="password"
 *   helperText="Min 8 characters"
 * />
 * 
 * // File input
 * <Input
 *   type="file"
 *   accept="image/*"
 *   label="Upload photo"
 * />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      startIcon,
      endIcon,
      fullWidth = false,
      variant = 'default',
      disabled,
      id,
      className = '',
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    // Base styles
    const baseStyles =
      'w-full px-3 py-2 border rounded-lg transition-all duration-300 font-sans text-base';

    // Variant styles
    const variantStyles = {
      default: `
        border-gray-300 bg-white
        focus-visible:outline-none focus-visible:border-cyan-500 focus-visible:ring-2 focus-visible:ring-cyan-100
        disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
        placeholder-gray-400
      `,
      filled: `
        border-0 bg-gray-100
        focus-visible:outline-none focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-cyan-500
        disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
      `,
    };

    // Error state overrides
    const errorStyles = error
      ? 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-100'
      : '';

    const inputClassName = `
      ${baseStyles}
      ${variantStyles[variant]}
      ${errorStyles}
      ${className}
      ${startIcon ? 'pl-10' : ''}
      ${endIcon ? 'pr-10' : ''}
    `.trim();

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label
            htmlFor={inputId}
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={inputClassName}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            {...props}
          />

          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              {endIcon}
            </div>
          )}
        </div>

        {error && (
          <div
            id={errorId}
            className="flex items-center gap-1 mt-2 text-sm text-red-600"
            role="alert"
          >
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        {helperText && !error && (
          <p id={helperId} className="mt-2 text-xs text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
