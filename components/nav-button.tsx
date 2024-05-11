'use client';

import React from 'react';
import { Route } from './navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = Route & {
  routeActive?: boolean;
};

export const NavButton = ({ label, href, routeActive }: Props) => {
  return (
    <Button
      asChild
      size="sm"
      variant="outline"
      className={cn(
        `w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white 
        border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 
        transition bg-transparent`,
        routeActive && 'bg-white/10 text-white'
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
