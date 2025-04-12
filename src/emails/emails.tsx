import { renderToString } from 'react-dom/server';
import { Email, Props } from './subscription';

export function getSubscriptionString({
  previewText = '',
  category,
  items,
  username
}: Props) {
  return renderToString(
    <Email
      previewText={previewText}
      category={category}
      items={items}
      username={username}
    />
  );
}
