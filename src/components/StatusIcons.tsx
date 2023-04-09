/* eslint-disable import/prefer-default-export */

import { Status } from '@prisma/client';
import { ReactNode } from 'react';
import { FaArchive, FaCheck, FaNewspaper } from 'react-icons/fa';

export const StatusIcons: Record<Status, ReactNode> = {
  APPROVED: (
    <div className="tooltip" data-tip="Approved">
      <FaCheck size={20} />
    </div>
  ),
  ARCHIVED: (
    <div className="tooltip" data-tip="Archived">
      <FaArchive size={20} />
    </div>
  ),
  PENDING: (
    <div className="tooltip" data-tip="Published">
      <FaNewspaper size={20} />
    </div>
  )
};
