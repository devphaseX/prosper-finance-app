import { insertAccountSchema } from '@/lib/db/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { TypeOf } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

const formSchema = insertAccountSchema.pick({ name: true });
type FormValues = TypeOf<typeof formSchema>;

type AccountFormProps = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (value: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const AccountForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: AccountFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? { name: '' },
    disabled,
  });

  const handleSubmit = (value: FormValues) => {
    onSubmit(value);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g Cash, Bank, Credit Card" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled}>
          {id ? 'Save' : 'Create account'}
        </Button>

        {id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full gap-x-2"
            variant="outline"
          >
            <Trash className="size-4" />
            Delete Account
          </Button>
        )}
      </form>
    </Form>
  );
};
