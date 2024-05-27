/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment } from 'react';
import { FaBell, FaBellSlash, FaEllipsisV, FaUserLock } from 'react-icons/fa';
import { RouterOutputs } from 'server/trpc/router/_app';
import useDialogStore from 'stores/DialogStore';
import useSelectedUserStore from 'stores/SelectedUserStore';

export default function UserRow({
  data
}: {
  data: RouterOutputs['user']['search'][number];
}) {
  const { editUserDialog } = useDialogStore();
  const { setSelectedUser } = useSelectedUserStore();

  return (
    <div className="flex items-center gap-2 rounded border p-4 sm:gap-4">
      <div className="avatar">
        <div className="w-8 rounded-full sm:w-12">
          <Image
            src={data.user.imageUrl ?? '/pfp.png'}
            width={48}
            height={48}
            alt="img"
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="w-24">
          <div className="overflow-hidden text-ellipsis font-bold leading-5 sm:overflow-visible sm:text-lg">
            {data.user.firstName} {data.user.lastName}
          </div>
          <div className="overflow-hidden text-ellipsis text-sm text-base-content/50 sm:overflow-visible">
            {data.user.emailAddresses[0]?.emailAddress ?? 'No Email'}
          </div>
        </div>
      </div>
      <div className="text-xs font-bold opacity-70">
        {data.account.permission}
      </div>
      <div
        className="tooltip"
        data-tip={
          data.account.notifications
            ? 'Notifications Enabled'
            : 'Notifications Disabled'
        }
      >
        <button className="inline-flex h-8 w-6 cursor-default items-center justify-center">
          <label className="swap swap-flip cursor-default">
            <input
              type="checkbox"
              className="cursor-none"
              checked={data.account.notifications}
              readOnly
            />
            <div className="swap-on">
              <FaBell />
            </div>
            <div className="swap-off">
              <FaBellSlash />
            </div>
          </label>
        </button>
      </div>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="btn-ghost btn-sm btn">
            <FaEllipsisV />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              unmount={false}
              className="absolute right-0 z-50 w-40 origin-top-right rounded-md bg-base-100 p-4 shadow-2xl ring-1 ring-black ring-opacity-5"
            >
              <Menu.Item>
                <button
                  className="flex w-full items-center rounded-md px-2 py-2 text-sm ui-active:bg-accent ui-active:text-accent-content"
                  onClick={() => {
                    setSelectedUser(data);
                    editUserDialog();
                  }}
                >
                  <FaUserLock className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Edit Settings</span>
                </button>
              </Menu.Item>
              <div className="divider my-1" />
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
