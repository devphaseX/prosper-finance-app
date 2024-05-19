'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNewAccount } from '@/features/hooks/use-new-account';
import { Plus } from 'lucide-react';
import { columns, Payment } from './columns';
import { DataTable } from '@/components/data-table';

const data: Array<Payment> = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '728efg2f',
    amount: 100,
    status: 'success',
    email: 'a@example.com',
  },
];

const AccountsPage = () => {
  const openNewAccountForm = useNewAccount(({ onOpen }) => onOpen);
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
            data={data}
            filterKey="email"
            onDelete={() => {}}
            disabled={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;
