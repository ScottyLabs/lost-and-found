/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { Popover, Transition } from '@headlessui/react';
import { Permission, Status } from '@prisma/client';
import MyListbox from 'components/Form/Listbox';
import ManageLayout from 'components/Layouts/ManageLayout';
import UserRow from 'components/UserRow';
import useZodForm from 'hooks/useZodForm';
import { UserSearchSchema } from 'lib/schemas';
import { NextPageWithLayout } from 'pages/_app';
import { Fragment } from 'react';
import {
  FaArchive,
  FaCheck,
  FaCircleNotch,
  FaSortAmountDown,
  FaTrash
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import useDialogStore from 'stores/DialogStore';
import useSelectedUsersStore from 'stores/SelectedUserStore';
import { trpc } from 'utils/trpc';
import { z } from 'zod';

const UserList: React.FC<{
  search: z.infer<typeof UserSearchSchema>;
}> = ({ search }) => {
  const users = trpc.user.search.useQuery(search);
  if (users.isLoading) return <FaCircleNotch className="animate-spin p-4" />;
  if (users.error) return <p>Error...</p>;
  if (users.data.length === 0)
    return <p className="m-4 font-bold">No Users Found</p>;

  return (
    <div className="mt-4 flex flex-col gap-2">
      {users.data.map((user) => (
        <UserRow key={user.id} user={user} />
      ))}
    </div>
  );
};

const Manage: NextPageWithLayout = () => {
  const context = trpc.useContext();
  const { selectedUsers, setSelectedUsers } = useSelectedUsersStore();
  const methods = useZodForm({
    schema: UserSearchSchema,
    defaultValues: {
      query: '',
      permissions: null,
      notifications: null
    }
  });
  const users = trpc.user.search.useQuery(methods.getValues());
  const itemMassUpdateMutation = trpc.item.massUpdate.useMutation({
    onSuccess: (res) => {
      context.item.search.invalidate();
      toast.success(`Updated ${res.count} Items`);
    }
  });
  const { confirmDeletionDialog, massArchiveDialog } = useDialogStore();

  return (
    <>
      <div>
        <form
          className="w-full"
          onSubmit={methods.handleSubmit(console.log, console.error)}
        >
          <div className="flex gap-2">
            <input
              placeholder="Search..."
              className="input-bordered input w-full"
              {...methods.register('query')}
            />
            <Popover as="div" className="relative inline-block text-left">
              <Popover.Button className="btn-accent btn">
                <FaSortAmountDown />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Popover.Panel
                  unmount={false}
                  className="absolute right-0 z-50 mt-2 w-96 origin-top-right rounded-md bg-base-100 shadow-2xl ring-1 ring-black ring-opacity-5"
                >
                  <div className="flex w-full items-center justify-between p-4">
                    <div className="font-bold">Permission</div>
                    <div className="w-48">
                      <MyListbox
                        control={methods.control}
                        name="permissions"
                        placeholder="Select Permissions"
                        displayValue={(permission) => permission}
                        keyValue={(permission) => permission}
                        values={Object.values(Permission)}
                        multiple
                      />
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between p-4">
                    <div className="font-bold">Notifications</div>
                    <div className="w-48">
                      <MyListbox
                        control={methods.control}
                        name="notifications"
                        placeholder="Notification Status"
                        displayValue={(status) =>
                          status ? 'Enabled' : 'Disabled'
                        }
                        keyValue={(status) => (status ? 'y' : 'n')}
                        values={[true, false]}
                      />
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-end gap-2 p-4">
                    <button
                      className="btn-ghost btn-sm btn"
                      type="button"
                      onClick={() => methods.reset()}
                    >
                      Reset
                    </button>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
        </form>
        <div className="mt-2 flex gap-2">
          <div className="ml-3 flex flex-1 items-center">
            <input
              type="checkbox"
              className="checkbox"
              checked={
                selectedUsers.length > 0 &&
                selectedUsers.length === users.data?.length
              }
              onChange={(e) => {
                if (!e.target.checked) setSelectedUsers([]);
                else setSelectedUsers(users.data?.map((item) => item.id) ?? []);
              }}
            />
          </div>
          <div className="tooltip" data-tip="Approve Items">
            <button
              type="button"
              className="btn-ghost btn-sm btn"
              disabled={selectedUsers.length === 0}
              onClick={async () =>
                itemMassUpdateMutation.mutate({
                  ids: selectedUsers,
                  data: {
                    status: Status.APPROVED
                  }
                })
              }
            >
              <FaCheck />
            </button>
          </div>
          <div className="tooltip" data-tip="Archive Items">
            <button
              type="button"
              className="btn-ghost btn-sm btn"
              disabled={selectedUsers.length === 0}
              onClick={async () =>
                itemMassUpdateMutation.mutate({
                  ids: selectedUsers,
                  data: {
                    status: Status.ARCHIVED
                  }
                })
              }
            >
              <FaArchive />
            </button>
          </div>
          <div className="tooltip" data-tip="Delete Users">
            <button
              type="button"
              className="btn-ghost btn-sm btn"
              disabled={selectedUsers.length === 0}
              onClick={confirmDeletionDialog}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
      <UserList
        search={{
          query: methods.watch('query'),
          permissions: methods.watch('permissions'),
          notifications: methods.watch('notifications')
        }}
      />
    </>
  );
};

Manage.getLayout = (page) => <ManageLayout>{page}</ManageLayout>;

export default Manage;
