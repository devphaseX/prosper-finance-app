'use client';

import { EditAccountSheet } from '@/features/components/edit-account-sheet';
import { NewAccountSheet } from '@/features/components/new-account-sheet';
import { useEffect, useState } from 'react';

export const SheetProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
    </>
  );
};
