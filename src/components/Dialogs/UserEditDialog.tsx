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

function EditUserForm() {
  const context = trpc.useContext();
  const { selectedUser, setSelectedUser } = useSelectedUserStore();
  const userUpdateMutation = trpc.user.update.useMutation({
    onSuccess: () => {
      context.user.search.invalidate();
      setSelectedUser(null);
      toast.success(`Updated account`);
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });
  const methods = useZodForm({
    schema: UserSchema.partial()
  });
  useEffect(() => {
    if (!selectedUser) return;
    methods.reset({
      permission: selectedUser.user.permission,
      notifications: selectedUser.user.notifications
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only reset when selectedUser changes
  }, [selectedUser]);
  const { clearDialog } = useDialogStore();

  if (!selectedUser) return null;

  return (
    <form
      onSubmit={methods.handleSubmit((data) => {
        userUpdateMutation.mutate({
          externalId: selectedUser.user.externalId,
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
          <button className="btn-ghost btn" type="button" onClick={clearDialog}>
            Cancel
          </button>
          <button className="btn-primary btn">Update</button>
        </div>
      </div>
    </form>
  );
}

export default function EditUserDialog() {
  const { dialog, clearDialog } = useDialogStore();
  const { selectedUser } = useSelectedUserStore();

  return (
    <Dialog
      isOpen={dialog === 'editUser' && !!selectedUser}
      onClose={clearDialog}
    >
      <div className="flex h-full flex-col gap-4">
        <span className="text-2xl font-bold">Edit User</span>
        <EditUserForm />
      </div>
    </Dialog>
  );
}
