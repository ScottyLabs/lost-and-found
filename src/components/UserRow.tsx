/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import { Building, ItemInteraction, User } from '@prisma/client';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { trpc } from 'utils/trpc';

type UserRowProps = {
  user: User;
  selected: User[];
  setSelected: Dispatch<SetStateAction<User[]>>;
};

export default function UserRow({ user, selected, setSelected }: UserRowProps) {
  const userPermissionsQuery = trpc.userPermissions.list.useQuery({
    actorId: user.id
  });

  const context = trpc.useContext();
  const userPermissionsEditMutation = trpc.userPermissions.create.useMutation({
    onError: (e) => toast(e.data?.zodError?.message),
    onSuccess: async (e) => {
      await context.userPermissions.invalidate();
      toast(`Permission ${e.id} Added`);
    }
  });
  const userPermissionsDeleteMutation = trpc.userPermissions.delete.useMutation(
    {
      onError: (e) => toast(e.data?.zodError?.message),
      onSuccess: async (e) => {
        await context.userPermissions.invalidate();
        toast(`Permission ${e.id} Removed`);
      }
    }
  );

  if (userPermissionsQuery.isLoading) return <p>Loading...</p>;
  if (userPermissionsQuery.isError) return <p>Error...</p>;

  return (
    <tr>
      <th>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>
          <input
            type="checkbox"
            className="checkbox"
            checked={selected.some((i) => i.id === user.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelected(selected.concat(user));
              } else {
                setSelected(selected.filter((i) => i.id !== user.id));
              }
            }}
          />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask  mask-squircle h-12 w-12">
              <Image src={user.image ?? ''} alt="" height={48} width={48} />
            </div>
          </div>
          <div>
            <div className="font-bold">{user.name}</div>
            <div className="text-sm opacity-50">{user.email}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="flex flex-wrap items-center gap-2">
          {userPermissionsQuery.data.map((permission) => (
            <button
              type="button"
              className="badge-primary badge"
              onClick={() =>
                userPermissionsDeleteMutation.mutate({ id: permission.id })
              }
            >
              {permission.building}:{permission.interaction}
            </button>
          ))}
          <div className="dropdown-end dropdown-bottom dropdown-hover dropdown">
            <label tabIndex={0} className="btn-xs btn-circle btn m-1">
              <FaPlus />
            </label>
            <div
              tabIndex={0}
              className="dropdown-content menu rounded-box w-52 bg-base-200 p-2 shadow"
            >
              {Object.values(ItemInteraction)
                .filter((c) =>
                  userPermissionsQuery.data.every((ct) => ct.interaction !== c)
                )
                .map((interaction) =>
                  Object.values(Building).map((building) => (
                    <li>
                      <button
                        type="button"
                        className="p-1 text-sm font-bold"
                        onClick={() =>
                          userPermissionsEditMutation.mutate({
                            actorId: user.id,
                            interaction,
                            building
                          })
                        }
                      >
                        {building}:{interaction}
                      </button>
                    </li>
                  ))
                )}
            </div>
          </div>
          <div />
        </div>
      </td>
    </tr>
  );
}
