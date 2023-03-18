/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import { User } from '@prisma/client';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

type UserRowProps = {
  user: User;
  selected: User[];
  setSelected: Dispatch<SetStateAction<User[]>>;
};

export default function UserRow({ user, selected, setSelected }: UserRowProps) {
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
          {user.permission}
        </div>
      </td>
    </tr>
  );
}
