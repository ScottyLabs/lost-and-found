import { Item } from '@prisma/client';
import { render } from '@react-email/render';
import { ArchiveEmail } from './archive';
import { Email, Props } from './subscription';

export function renderArchiveEmail(items: Item[]) {
  return render(<ArchiveEmail items={items} />);
}

export function renderSubscriptionEmail({
  previewText = '',
  category,
  items
}: Props) {
  return render(
    <Email previewText={previewText} category={category} items={items} />
  );
}
