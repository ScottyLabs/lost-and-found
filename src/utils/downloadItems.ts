import { Item } from '@prisma/client';
import { unparse } from 'papaparse';

export default function downloadItems(items: Item[]) {
  const csv = unparse(items, { header: true });
  const file = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(file);
  const element = document.createElement('a');
  element.download = 'lostAndFoundData.csv';
  element.href = url;
  element.click();
}
