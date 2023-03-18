/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { User } from '@prisma/client';
import MainLayout from 'components/layout/MainLayout';
import UserRow from 'components/UserRow';
import { unparse } from 'papaparse';
import { Fragment, useEffect, useState } from 'react';
import { FaDownload, FaPlusCircle, FaTrash } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';
import { trpc } from 'utils/trpc';

export default function AccountsPage() {
  const { ref, inView } = useInView();
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [query, setQuery] = useState('');

  const usersQuery = trpc.user.infiniteItems.useInfiniteQuery(
    { limit: 2 },
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => lastPage.nextCursor
    }
  );
  const itemDeleteMutation = trpc.item.delete.useMutation();

  useEffect(() => {
    if (inView) usersQuery.fetchNextPage();
  }, [inView, usersQuery]);

  if (usersQuery.isLoading) return <p>Loading...</p>;
  if (usersQuery.error) return <p>Error...</p>;

  return (
    <MainLayout>
      <form className="form-control my-5">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search..."
            className="input-bordered input w-full max-w-xs"
            onChange={(e) => setQuery(e.target.value)}
          />
          <label htmlFor="create-item" className="btn-primary btn-square btn">
            <FaPlusCircle />
          </label>
          <button
            type="button"
            className="btn-error btn"
            disabled={selectedUsers.length === 0}
            onClick={async () => {
              const res = await itemDeleteMutation.mutateAsync(
                selectedUsers.map((selItem) => selItem.id)
              );
              setSelectedUsers([]);
              usersQuery.refetch();
              toast(`Deleted ${res.count} Items`);
            }}
          >
            <FaTrash />
          </button>
          <button
            type="button"
            onClick={() => {
              const csv = unparse(usersQuery.data.pages, { header: true });
              const file = new Blob([csv], { type: 'text/csv' });
              const url = URL.createObjectURL(file);
              const element = document.createElement('a');
              element.download = 'lostAndFoundData.csv';
              element.href = url;
              element.click();
            }}
            className="btn-secondary btn-square btn"
          >
            <FaDownload />
          </button>
        </div>
      </form>

      <div className="w-full">
        <table className="table-zebra table-compact m-auto table  w-full max-w-3xl table-fixed">
          <thead>
            <tr>
              <th className="w-10">
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={
                      selectedUsers.length > 0 &&
                      usersQuery.data.pages.reduce(
                        (accum, page) =>
                          accum.concat(
                            page.users.filter((user) =>
                              user.name?.includes(query)
                            )
                          ),
                        [] as User[]
                      ).length === selectedUsers.length
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(
                          usersQuery.data.pages.reduce(
                            (accum, page) =>
                              accum.concat(
                                page.users.filter((user) =>
                                  user.name?.includes(query)
                                )
                              ),
                            [] as User[]
                          )
                        );
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                  />
                </label>
              </th>
              <th className="w-56">Information</th>
              <th>Permissions</th>
            </tr>
          </thead>
          <tbody>
            {usersQuery.data.pages.map((page) => (
              <Fragment key={page.nextCursor}>
                {page.users
                  .filter((user) => user.name?.includes(query))
                  .map((user) => (
                    <UserRow
                      selected={selectedUsers}
                      key={user.id}
                      user={user}
                      setSelected={setSelectedUsers}
                    />
                  ))}
              </Fragment>
            ))}
          </tbody>
        </table>
        <p ref={ref}>{usersQuery.isFetchingNextPage && 'Loading more...'}</p>
      </div>
    </MainLayout>
  );
}
