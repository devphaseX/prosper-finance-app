'use client';

import { Button } from '@/components/ui/button';
import { useNewAccount } from '@/features/hooks/use-new-account';

export default function Home() {
  const { onOpen, opened } = useNewAccount();
  console.log({ opened });
  return (
    <div>
      <Button onClick={onOpen}>Create new account</Button>
    </div>
  );
}
