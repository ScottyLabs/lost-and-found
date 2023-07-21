import { Permission } from '@prisma/client';
import MyListbox from 'components/Form/Listbox';
import useZodForm from 'hooks/useZodForm';
import { UserSchema } from 'lib/schemas';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useDialogStore from 'stores/DialogStore';
import useSelectedUserStore from 'stores/SelectedUserStore';
import { trpc } from 'utils/trpc';
import { Dialog } from './Dialog';

export default function EditUserDialog() {
  const { dialog, clearDialog } = useDialogStore();
  const context = trpc.useContext();
  const userUpdateMutation = trpc.user.update.useMutation({
    onSuccess: (res) => {
      context.user.search.invalidate();
      setSelectedUser(null);
      toast.success(`Updated ${res.name}`);
    }
  });
  const { selectedUser, setSelectedUser } = useSelectedUserStore();
  const methods = useZodForm({
    schema: UserSchema.partial().omit({ email: true, name: true })
  });

  useEffect(() => {
    if (!selectedUser) return;
    methods.reset({
      permission: selectedUser.permission,
      notifications: selectedUser.notifications
    });
  }, [selectedUser]);

  if (!selectedUser) return null;

  return (
    <Dialog isOpen={dialog === 'editUser'} onClose={clearDialog}>
      <div className="flex h-full flex-col gap-4">
        <span className="text-2xl font-bold">Edit User</span>
        <form
          onSubmit={methods.handleSubmit((data) => {
            userUpdateMutation.mutate({
              id: selectedUser.id,
              data
            });
          }, console.error)}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label>Permission</label>
              <MyListbox
                control={methods.control}
                name="permission"
                displayValue={(prop) => prop}
                keyValue={(prop) => prop}
                placeholder="Select a permission"
                values={Object.values(Permission)}
              />
            </div>
            <div className="flex justify-between gap-2">
              <label>Notifications</label>
              <input
                type="checkbox"
                className="toggle-primary toggle"
                {...methods.register('notifications')}
              />
            </div>

            <div className="mt-8 flex justify-end gap-2">
              <button
                className="btn-ghost btn"
                type="button"
                onClick={clearDialog}
              >
                Cancel
              </button>
              <button className="btn-primary btn">Update</button>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
