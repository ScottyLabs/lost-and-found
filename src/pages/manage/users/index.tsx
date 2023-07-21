/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { Popover, Transition } from '@headlessui/react';
import { Permission } from '@prisma/client';
import MyListbox from 'components/Form/Listbox';
import ManageLayout from 'components/Layouts/ManageLayout';
import UserRow from 'components/UserRow';
import useZodForm from 'hooks/useZodForm';
import { UserSearchSchema } from 'lib/schemas';
import { NextPageWithLayout } from 'pages/_app';
import { Fragment } from 'react';
import { FaCircleNotch, FaSortAmountDown } from 'react-icons/fa';
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
  const methods = useZodForm({
    schema: UserSearchSchema,
    defaultValues: {
      query: '',
      permissions: [],
      notifications: null
    }
  });

  return (
    <>
      <div>
        <form className="w-full">
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
                  className="absolute right-0 z-50 mt-2 w-72 origin-top-right rounded-md bg-base-100 shadow-2xl ring-1 ring-black ring-opacity-5"
                >
                  <div className="flex w-full items-center justify-between p-4">
                    <div className="font-bold">Permissions</div>
                    <div className="w-36">
                      <MyListbox
                        control={methods.control}
                        name="permissions"
                        placeholder="Select"
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
                      <input
                        type="checkbox"
                        className="checkbox float-right"
                        {...methods.register('notifications')}
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
