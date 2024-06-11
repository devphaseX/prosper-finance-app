'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { AccountForm } from '@/features/components/account-form';
import { useOpenAccount } from '@/hooks/use-open-account';
import { useGetAccount } from '../accounts/api/use-account-api';
import { Loader2 } from 'lucide-react';
import { useEditAccount } from '../accounts/api/use-edit-account';
import { useDeleteAccount } from '../accounts/api/use-delete-account';
import { useConfirm } from '@/hooks/use-confirm';

export const EditAccountSheet = () => {
  const { opened, onClose, onOpen, id } = useOpenAccount();
  const { data, isLoading } = useGetAccount(id ?? '');
  const editAccountMutation = useEditAccount(id ?? undefined);
  const deleteAccountMutation = useDeleteAccount(id ?? undefined);
  const isPending =
    editAccountMutation.isPending || deleteAccountMutation.isPending;

  const [ConfirmDialog, confirm] = useConfirm({
    title: 'Are you sure?',
    message: 'You are about to delete this account',
  });
  const defaultValues = data ?? { name: '' };

  return (
    <>
      <ConfirmDialog />
      <Sheet
        open={opened}
        onOpenChange={(open) => (open && id ? onOpen(id) : onClose())}
      >
        <SheetContent className="space-y-4" side={'right'}>
          <SheetHeader>
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit an existing account</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0">
              <div className="h-full w-full flex items-center justify-center">
                <Loader2 className="size-4 text-muted-foreground animate-spin" />
              </div>
            </div>
          ) : (
            <AccountForm
              id={id ?? undefined}
              onSubmit={function updateAccountOnSubmit(form) {
                editAccountMutation.mutate(form, {
                  onSuccess: () => {
                    onClose();
                  },
                });
              }}
              defaultValues={defaultValues}
              disabled={isPending}
              onDelete={async () => {
                const ok = await confirm();
                if (ok) {
                  deleteAccountMutation.mutate(undefined, {
                    onSuccess: () => {
                      onClose();
                    },
                  });
                }
              }}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
