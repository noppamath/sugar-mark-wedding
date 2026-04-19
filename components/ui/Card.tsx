'use client';

import { ReactNode } from 'react';

export interface CardProps {
  /** Card content */
  children: ReactNode;
  /** Header section (optional) */
  header?: ReactNode;
  /** Footer section (optional) */
  footer?: ReactNode;
  /** Whether to show hover shadow effect */
  hoverable?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Card Component
 * 
 * A reusable container component with optional header and footer sections.
 * Supports hover effects and flexible content composition.
 * 
 * @example
 * // Basic card
 * <Card>
 *   <p>Card content</p>
 * </Card>
 * 
 * // Card with header and footer
 * <Card
 *   header={<h2>Title</h2>}
 *   footer={<Button>Action</Button>}
 * >
 *   <p>Card body content</p>
 * </Card>
 * 
 * // Hoverable card
 * <Card hoverable>
 *   <img src="..." alt="..." />
 *   <p>Photo details</p>
 * </Card>
 */
export function Card({
  children,
  header,
  footer,
  hoverable = false,
  className = '',
}: CardProps) {
  return (
    <div
      className={`
        rounded-lg bg-white border border-gray-200
        overflow-hidden shadow-md
        ${hoverable ? 'hover:shadow-lg transition-shadow duration-300' : ''}
        ${className}
      `.trim()}
    >
      {header && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          {header}
        </div>
      )}

      <div className="px-6 py-4">
        {children}
      </div>

      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
}

export default Card;
