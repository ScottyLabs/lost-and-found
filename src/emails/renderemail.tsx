import { Item } from '@prisma/client';
import { render } from '@react-email/render';
import { ApprovalEmail } from './approval';
import { ArchiveEmail } from './archive';
import { Email, Props } from './subscription';
import { EndEmail, EndProps } from './subscription-end';

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

export function renderSubEndEmail({ previewText = '', category }: EndProps) {
  return render(<EndEmail previewText={previewText} category={category} />);
}

export function renderApprovalEmail(item: Item) {
  return render(<ApprovalEmail item={item} />);
}
