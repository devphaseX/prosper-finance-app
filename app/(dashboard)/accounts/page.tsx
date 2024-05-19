'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNewAccount } from '@/features/hooks/use-new-account';
import { useGetAccounts } from '@/features/accounts/api/use-account-api';
import { useBulkAccountDelete } from '@/features/accounts/api/use-bulk-delete-api';
import { Loader2, Plus } from 'lucide-react';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';
import { Skeleton } from '@/components/ui/skeleton';

const AccountsPage = () => {
  const openNewAccountForm = useNewAccount(({ onOpen }) => onOpen);
  const accountQuery = useGetAccounts();
  const deleteAccounts = useBulkAccountDelete();
  const accounts = accountQuery.data ?? [];

  const isDisabled = accountQuery.isLoading || deleteAccounts.isPending;

  if (accountQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[500px] w-full">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
          <Button className="gap-x-2" size="sm" onClick={openNewAccountForm}>
            <Plus className="size-4" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={accounts}
            filterKey="name"
            onDelete={(rows, onComplete) => {
              const ids = rows.map(
                (row) => (row.original as { id: string }).id
              );

              deleteAccounts.mutate(
                { ids },
                {
                  onSuccess: () => {
                    onComplete?.();
                  },
                }
              );
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
