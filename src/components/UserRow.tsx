/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import { Menu, Transition } from '@headlessui/react';
import { User } from '@prisma/client';
import clsx from 'clsx';
import { Fragment } from 'react';
import {
  FaEllipsisV,
  FaEnvelopeOpen,
  FaTrash,
  FaUserLock
} from 'react-icons/fa';
import useSelectedUsersStore from 'stores/SelectedUserStore';

type UserRowProps = { user: User };

export default function UserRow({ user }: UserRowProps) {
  const { selectedUsers, setSelectedUsers } = useSelectedUsersStore();

  return (
    <div className="flex items-center gap-2 rounded border p-3">
      <div>
        <input
          type="checkbox"
          className="checkbox checkbox-sm"
          checked={selectedUsers.includes(user.id)}
          onChange={(e) => {
            if (e.target.checked) setSelectedUsers([...selectedUsers, user.id]);
            else setSelectedUsers(selectedUsers.filter((i) => i !== user.id));
          }}
        />
      </div>
      <div className="flex-1">
        <div>
          <div className="text-xl font-bold leading-5">{user.name}</div>
          <div className="text-sm text-base-content/50">{user.email}</div>
        </div>
        <span className="text-xs font-bold opacity-70">{user.permission}</span>
      </div>
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="btn-ghost btn">
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
              className="absolute right-0 z-50 w-44 origin-top-right rounded-md bg-base-100 p-4 shadow-2xl ring-1 ring-black ring-opacity-5"
            >
              <Menu.Item>
                <button
                  className="group flex
                      w-full items-center rounded-md px-2 py-2 text-sm ui-active:bg-accent ui-active:text-accent-content"
                >
                  <FaUserLock
                    className={clsx('mr-2 h-4 w-4')}
                    aria-hidden="true"
                  />
                  Edit Permissions
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  className="group flex
                      w-full items-center rounded-md px-2 py-2 text-sm ui-active:bg-accent ui-active:text-accent-content"
                >
                  <FaEnvelopeOpen
                    className={clsx('mr-2 h-4 w-4')}
                    aria-hidden="true"
                  />
                  Notifications
                </button>
              </Menu.Item>
              <div className="divider my-1" />
              <Menu.Item>
                <button
                  className="group flex
                      w-full items-center rounded-md px-2 py-2 text-sm ui-active:bg-error ui-active:text-accent-content"
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
