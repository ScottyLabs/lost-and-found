/* eslint-disable import/prefer-default-export */

import { Value } from '@prisma/client';
import { ReactNode } from 'react';

export const ValueIcons: Record<Value, ReactNode> = {
  LOW: (
    <div className="rating tooltip rating-sm gap-1" data-tip="Low Value">
      <input
        disabled
        checked
        type="radio"
        name="rating-3"
        className="mask mask-star bg-red-400"
      />
    </div>
  ),
  MEDIUM: (
    <div className="rating tooltip rating-sm gap-1" data-tip="Medium Value">
      <input
        disabled
        checked
        type="radio"
        name="rating-3"
        className="mask mask-star bg-orange-400"
      />
      <input
        disabled
        checked
        type="radio"
        name="rating-3"
        className="mask mask-star bg-orange-400"
      />
    </div>
  ),
  HIGH: (
    <div className="rating tooltip rating-sm gap-1" data-tip="High Value">
      <input
        disabled
        checked
        type="radio"
        name="rating-3"
        className="mask mask-star bg-yellow-400"
      />
      <input
        disabled
        checked
        type="radio"
        name="rating-3"
        className="mask mask-star bg-yellow-400"
      />
      <input
        disabled
        checked
        type="radio"
        name="rating-3"
        className="mask mask-star bg-yellow-400"
      />
    </div>
  )
};
