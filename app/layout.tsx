import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import localFont from 'next/font/local';
import './globals.css';
import { QueryProvider } from '@/providers/query-provider';
import { SheetProvider } from '@/providers/sheet-provider';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

const inter = localFont({
  src: '../public/fonts/inter-variable-font.ttf',
  variable: '--inter',
});

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.variable, inter.className)}>
          <QueryProvider>
            <SheetProvider />
            <Toaster />
            {children}
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
