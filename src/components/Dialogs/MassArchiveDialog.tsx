import useZodForm from 'hooks/useZodForm';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useDialogStore from 'stores/DialogStore';
import { trpc } from 'utils/trpc';
import { z } from 'zod';
import { Dialog } from './Dialog';

export default function MassArchiveDialog() {
  const { dialog, clearDialog } = useDialogStore();
  const context = trpc.useContext();
  const methods = useZodForm({
    schema: z.object({
      age: z.coerce.number().int().min(0).max(1000)
    }),
    defaultValues: {
      age: 90
    }
  });
  const itemsToArchive = trpc.item.unarchivedOlderThan.useQuery({
    age: methods.watch('age')
  });
  const itemMassUpdateMutation = trpc.item.massUpdate.useMutation({
    onSuccess: (res) => {
      context.item.unarchivedOlderThan.invalidate();
      context.item.search.invalidate();
      toast.success(`Archived ${res.count} Items`);
    }
  });

  return (
    <Dialog isOpen={dialog === 'massArchive'} onClose={clearDialog}>
      <div className="flex h-full flex-col gap-4">
        <span className="text-2xl font-bold">Mass Archive</span>
        <form
          onSubmit={methods.handleSubmit(() => {
            clearDialog();
            itemMassUpdateMutation.mutate({
              ids: itemsToArchive.data?.map((item) => item.id) ?? [],
              data: { status: 'ARCHIVED' }
            });
            methods.reset();
          })}
        >
          <label className="label">
            <span>Archive items older than</span>
            <input
              {...methods.register('age')}
              type="number"
              className="input-bordered input input-sm"
              step={1}
            />
            <span>days</span>
          </label>
          <span className="text-sm text-error">
            {methods.formState.errors.age?.message}
          </span>
          <div className="flex items-center gap-2">
            This will archive{' '}
            {itemsToArchive.isFetching ? (
              <span>
                <FaSpinner className="h-4 w-4 animate-spin" />
              </span>
            ) : (
              <span className="font-bold">{itemsToArchive.data?.length}</span>
            )}{' '}
            items.
          </div>
          <div className="flex justify-end gap-2">
            <button
              className="btn-ghost btn"
              type="button"
              onClick={clearDialog}
            >
              Cancel
            </button>
            <button
              disabled={!itemsToArchive.data?.length}
              className="btn-warning btn"
            >
              Archive
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
