'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useNewAccount } from '../../hooks/use-new-account';
import { AccountForm } from '@/features/components/account-form';
import { useCreateAccount } from '../accounts/api/use-create-account';

export const NewAccountSheet = () => {
  const { opened, onClose, onOpen } = useNewAccount();
  const { mutate: createAccount, isPending } = useCreateAccount();

  return (
    <Sheet open={opened} onOpenChange={(open) => (open ? onOpen() : onClose())}>
      <SheetContent className="space-y-4" side={'right'}>
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your transactions.
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={(form) => {
            createAccount(form, {
              onSuccess: () => {
                onClose();
              },
            });
          }}
          disabled={isPending}
        />
      </SheetContent>
    </Sheet>
  );
};
