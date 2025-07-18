/* eslint-disable import/prefer-default-export */

import { Value } from '@prisma/client';
import { ReactNode } from 'react';

export const ValueIcons: Record<Value, ReactNode> = {
  GENERAL: (
    <div
      className="rating tooltip rating-sm gap-1"
      data-tip="General Value"
    ></div>
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
    </div>
  )
};
