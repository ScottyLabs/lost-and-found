import { toast } from 'react-toastify';
import useDialogStore from 'stores/DialogStore';
import useSelectedUserStore from 'stores/SelectedUserStore';
import { trpc } from 'utils/trpc';
import { Dialog } from './Dialog';

export default function ConfirmUserDeletionDialog() {
  const { dialog, clearDialog } = useDialogStore();
  const context = trpc.useContext();
  const userDeleteMutation = trpc.account.delete.useMutation({
    onSuccess: (res) => {
      context.user.search.invalidate();
      setSelectedUser(null);
      toast.success(`Removed ${res.user.name}'s Account`);
    }
  });
  const { selectedUser, setSelectedUser } = useSelectedUserStore();

  if (!selectedUser) return null;

  return (
    <Dialog isOpen={dialog === 'confirmUserDeletion'} onClose={clearDialog}>
      <div className="flex h-full flex-col gap-4">
        <span className="text-2xl font-bold">User Deletion</span>
        <p>
          This will remove{' '}
          <span className="font-bold">{selectedUser.name}</span> permanently, as
          well as any audits and subscriptions related to their account. This
          action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button className="btn-ghost btn" onClick={clearDialog}>
            Cancel
          </button>
          <button
            className="btn-error btn"
            onClick={() => {
              clearDialog();
              userDeleteMutation.mutate(selectedUser.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </Dialog>
  );
}
