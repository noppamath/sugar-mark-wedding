'use client';

import { ReactNode } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import { ToastProvider } from '@/components/Toast';

interface RootClientWrapperProps {
  children: ReactNode;
  skipLink: ReactNode;
}

/**
 * RootClientWrapper
 * 
 * Wraps the entire application with error handling and toast notifications.
 * This is necessary because error boundaries and context providers must be client components.
 */
export function RootClientWrapper({ children, skipLink }: RootClientWrapperProps) {
  return (
    <ErrorBoundary>
      <ToastProvider>
        {skipLink}
        {children}
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default RootClientWrapper;
