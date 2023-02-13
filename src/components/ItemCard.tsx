import { Item } from '@prisma/client';

type Props = {
  item: Item;
};

export default function ItemCard({ item }: Props) {
  return (
    <div className="w-full rounded-lg border border-accent p-3 shadow-md transition-all hover:shadow-lg text-black text-opacity-60">
      <div className="flex">
        <h2 className="flex-1 text-lg font-bold">{item.name}</h2>
        <span className="text-xs">
          Found on: {item.foundDate.toDateString()}
        </span>
      </div>
      <div className="flex text-sm">
        <div className="font-light flex-1">
          <p>{item.shortDescription ?? 'No Description'}</p>
        </div>
        <div className="divider divider-horizontal" />
        <div>
          <div>
            <span className="font-bold">Color: </span>
            <span>shrug</span>
          </div>
          <div>
            <span className="font-bold">Found: </span>
            <span>{item.foundBuilding}</span>
          </div>
          <div>
            <span className="font-bold">Retrieve From: </span>
            <span>{item.retrieveBuilding}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
