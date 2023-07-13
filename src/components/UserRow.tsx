/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import { Menu, Transition } from '@headlessui/react';
import { User } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import { Fragment } from 'react';
import {
  FaBell,
  FaBellSlash,
  FaEllipsisV,
  FaTrash,
  FaUserLock
} from 'react-icons/fa';
import useDialogStore from 'stores/DialogStore';
import useSelectedUserStore from 'stores/SelectedUserStore';

type UserRowProps = { user: User };
export default function UserRow({ user }: UserRowProps) {
  const { confirmUserDeletionDialog, editUserDialog } = useDialogStore();
  const { setSelectedUser } = useSelectedUserStore();

  return (
    <div className="flex items-center gap-4 rounded border p-4">
      <div className="avatar">
        <div className="w-12 rounded-full">
          <Image
            src={user.image ?? '/pfp.png'}
            width={48}
            height={48}
            alt="img"
          />
        </div>
      </div>
      <div className="flex-1">
        <div>
          <div className="text-lg font-bold leading-5">{user.name}</div>
          <div className="text-sm text-base-content/50">{user.email}</div>
        </div>
      </div>
      <div className="text-xs font-bold opacity-70">{user.permission}</div>
      <div
        className="tooltip"
        data-tip={
          user.notifications
            ? 'Notifications Enabled'
            : 'Notifications Disabled'
        }
      >
        <button className="inline-flex h-8 w-6 cursor-default items-center justify-center">
          <label className="swap swap-flip cursor-default">
            <input
              type="checkbox"
              className="cursor-none"
              checked={user.notifications}
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
              className="absolute right-0 z-50 w-56 origin-top-right rounded-md bg-base-100 p-4 shadow-2xl ring-1 ring-black ring-opacity-5"
            >
              <Menu.Item>
                <button
                  className="group flex
                      w-full items-center rounded-md px-2 py-2 text-sm ui-active:bg-accent ui-active:text-accent-content"
                  onClick={() => {
                    setSelectedUser(user);
                    editUserDialog();
                  }}
                >
                  <FaUserLock className="mr-2 h-4 w-4" aria-hidden="true" />
                  Edit Permissions
                </button>
              </Menu.Item>
              <div className="divider my-1" />
              <Menu.Item>
                <button
                  className="group flex
                      w-full items-center rounded-md px-2 py-2 text-sm ui-active:bg-error ui-active:text-accent-content"
                  onClick={() => {
                    setSelectedUser(user);
                    confirmUserDeletionDialog();
                  }}
                >
                  <FaTrash
                    className={clsx('mr-2 h-4 w-4')}
                    aria-hidden="true"
                  />
                  Delete User
                </button>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
