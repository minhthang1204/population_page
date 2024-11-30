'use client'

import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../../utils/queryClient';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id={'root'}>
      <QueryClientProvider client={queryClient}>
          <AppWrappers>{children}</AppWrappers>
        </QueryClientProvider>
      </body>
    </html>
  );
}
