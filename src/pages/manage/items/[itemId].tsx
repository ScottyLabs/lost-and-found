import { Category, Color, Item, ItemInteraction, Value } from '@prisma/client';
import MyListbox from 'components/Form/Listbox';
import ManageLayout from 'components/Layouts/ManageLayout';
import useZodForm from 'hooks/useZodForm';
import { ItemSchema } from 'lib/schemas';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import { toast } from 'react-toastify';
import { trpc } from 'utils/trpc';

type EditItemFormProps = {
  item: Item;
};
function EditItemForm({ item }: EditItemFormProps) {
  const router = useRouter();
  const methods = useZodForm({
    schema: ItemSchema,
    defaultValues: {
      ...item,
      foundDate: item.foundDate
        .toISOString()
        .substring(0, 16) as unknown as Date
    }
  });
  const auditCreateMutation = trpc.audit.create.useMutation();
  const context = trpc.useContext();
  const itemMutation = trpc.item.update.useMutation({
    onError: (e) => toast.error(e.data?.zodError),
    onSuccess: async (change) => {
      await auditCreateMutation.mutateAsync({
        interaction: ItemInteraction.EDIT,
        itemId: change.id
      });
      await context.item.invalidate();
      await context.audit.invalidate();
      router.push('/manage/items');
      toast.success('Item Updated');
    }
  });

  return (
    <form
      onSubmit={methods.handleSubmit(async (data) => {
        await itemMutation.mutateAsync({ id: item.id, data });
        methods.reset();
      })}
      className="form-control mx-auto w-full max-w-2xl gap-2"
    >
      <div>
        <label className="label">
          <span className="label-text">Item Name</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input-bordered input input-sm w-full"
          {...methods.register('name')}
        />
        <label className="text-xs text-error">
          {methods.formState.errors.name?.message}
        </label>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Date Found</span>
        </label>
        <input
          type="datetime-local"
          placeholder="Type here"
          className="input-bordered input input-sm w-full"
          {...methods.register('foundDate', { valueAsDate: true })}
        />
        <label className="text-xs text-error">
          {methods.formState.errors.foundDate?.message}
        </label>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Location Found</span>
        </label>
        <MyListbox
          values={Object.values(Location)}
          displayValue={(prop) => prop}
          keyValue={(prop) => prop}
          name="foundLocation"
          control={methods.control}
          placeholder="Select a location"
        />
        <label className="text-xs text-error">
          {methods.formState.errors.foundLocation?.message}
        </label>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Found Description</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input-bordered input input-sm w-full"
          {...methods.register('foundDescription')}
        />
        <label className="text-xs text-error">
          {methods.formState.errors.foundDescription?.message}
        </label>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Short Description</span>
        </label>
        <input
          type="text"
          placeholder="Type here"
          className="input-bordered input input-sm w-full"
          {...methods.register('shortDescription')}
        />
        <label className="text-xs text-error">
          {methods.formState.errors.shortDescription?.message}
        </label>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Categories</span>
        </label>
        <MyListbox
          values={Object.values(Category)}
          displayValue={(prop) => prop}
          keyValue={(prop) => prop}
          name="categories"
          control={methods.control}
          placeholder="Select categories"
          multiple
        />
        <label className="text-xs text-error">
          {methods.formState.errors.categories?.message}
        </label>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Color</span>
        </label>
        <MyListbox
          values={Object.values(Color)}
          displayValue={(prop) => prop}
          keyValue={(prop) => prop}
          name="color"
          control={methods.control}
          placeholder="Select color"
        />
        <label className="text-xs text-error">
          {methods.formState.errors.color?.message}
        </label>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Value</span>
        </label>
        {Object.values(Value).map((value) => (
          <label key={value} className="label cursor-pointer">
            <input
              type="radio"
              className="radio radio-sm"
              {...methods.register('value')}
              value={value}
            />
            <span className="label-text-alt">{value}</span>
          </label>
        ))}
        <label className="text-xs text-error">
          {methods.formState.errors.value?.message}
        </label>
      </div>
      <div>
        <label className="label cursor-pointer">
          <span className="label-text">Identifiable?</span>
          <input
            type="checkbox"
            className="checkbox"
            {...methods.register('identifiable')}
          />
        </label>
        <label className="text-xs text-error">
          {methods.formState.errors.identifiable?.message}
        </label>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Retrieve From</span>
        </label>
        <MyListbox
          values={Object.values(Location)}
          displayValue={(prop) => prop}
          keyValue={(prop) => prop}
          name="retrieveLocation"
          control={methods.control}
          placeholder="Select building"
        />
        <label className="text-xs text-error">
          {methods.formState.errors.retrieveLocation?.message}
        </label>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Notes</span>
        </label>
        <textarea
          className="textarea-bordered textarea h-24 w-full"
          placeholder="Type here"
          {...methods.register('longDescription')}
        />
        <label className="text-xs text-error">
          {methods.formState.errors.longDescription?.message}
        </label>
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.push('/manage/items')}
          className="btn-ghost btn"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!methods.formState.isDirty}
          className="btn-primary btn"
        >
          Update
        </button>
      </div>
    </form>
  );
}

const EditItem: NextPageWithLayout = () => {
  const router = useRouter();
  const { itemId } = router.query;

  const item = trpc.item.byId.useQuery(
    { id: itemId as string },
    {
      enabled: typeof itemId === 'string',
      refetchOnWindowFocus: false
    }
  );

  if (typeof itemId !== 'string') return <p>Invalid Item ID</p>;
  if (item.isLoading) return <p>Loading...</p>;
  if (item.isError) return <p>Error</p>;

  return (
    <div className="mx-auto max-w-lg">
      <h3 className="text-2xl font-bold">Edit Item</h3>
      <div className="divider" />
      <EditItemForm item={item.data} />
    </div>
  );
};

EditItem.getLayout = (page) => <ManageLayout>{page}</ManageLayout>;

export default EditItem;
