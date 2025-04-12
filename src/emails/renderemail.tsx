import { Item } from '@prisma/client';
import { render } from '@react-email/render';
import { ArchiveEmail } from '../emails/archive';

export function renderArchiveEmail(items: Item[]) {
  return render(<ArchiveEmail items={items} />);
}
