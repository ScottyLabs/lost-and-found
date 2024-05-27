/* eslint-disable import/prefer-default-export */

import { Item, ItemInteraction } from '@prisma/client';
import { trpc } from 'utils/trpc';

type ItemHistoryProps = {
  item: Item;
};

export function ItemHistory({ item }: ItemHistoryProps) {
  const auditLogQuery = trpc.audit.list.useQuery({ itemId: item.id });

  if (auditLogQuery.isLoading) return <p>Loading...</p>;
  if (auditLogQuery.isError) return <p>Error...</p>;

  return (
    <div className="min-w-[128px] rounded">
      <button type="button" tabIndex={0} className="collapse-arrow collapse">
        <div className="collapse-title min-h-6 p-2 text-sm font-medium">
          Modified By
        </div>
        <div className="collapse-content whitespace-normal  text-xs">
          <p>
            {auditLogQuery.data.map((audit) => audit.actor.clerkId).join('\n')}
          </p>
        </div>
      </button>
      <button type="button" tabIndex={0} className="collapse-arrow collapse">
        <div className="collapse-title min-h-6 p-2 text-sm font-medium">
          Approver
        </div>
        <div className="collapse-content whitespace-normal text-xs">
          {auditLogQuery.data.find(
            (audit) => audit.interaction === ItemInteraction.APPROVE
          )?.actorId ?? 'None'}
        </div>
      </button>
      <button type="button" tabIndex={0} className="collapse-arrow collapse">
        <div className="collapse-title min-h-6 p-2 text-sm font-medium">
          Returner
        </div>
        <div className="collapse-content text-xs">
          <p>Placeholder</p>
        </div>
      </button>
    </div>
  );
}
