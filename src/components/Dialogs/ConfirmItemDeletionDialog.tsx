import { toast } from 'react-toastify';
import useDialogStore from 'stores/DialogStore';
import useSelectedItemsStore from 'stores/SelectedItemStore';
import { trpc } from 'utils/trpc';
import { Dialog } from './Dialog';

export default function ConfirmItemDeletionDialog() {
  const { dialog, clearDialog } = useDialogStore();
  const context = trpc.useContext();
  const itemDeleteMutation = trpc.item.delete.useMutation({
    onSuccess: (res) => {
      context.item.search.invalidate();
      setSelectedItems([]);
      toast.success(`Deleted ${res.count} Items`);
    }
  });
  const { selectedItems, setSelectedItems } = useSelectedItemsStore();

  return (
    <Dialog isOpen={dialog === 'confirmDeletion'} onClose={clearDialog}>
      <div className="flex h-full flex-col gap-4">
        <span className="text-2xl font-bold">Item Deletion</span>
        <p>
          This will delete {selectedItems.length} items permanently. This action
          cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button className="btn-ghost btn" onClick={clearDialog}>
            Cancel
          </button>
          <button
            className="btn-error btn"
            onClick={() => {
              clearDialog();
              itemDeleteMutation.mutate(selectedItems);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </Dialog>
  );
}
