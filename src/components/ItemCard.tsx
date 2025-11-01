import { Item } from '@prisma/client';
import { Locations } from 'types';

type Props = {
  item: Item;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export default function ItemCard({ item, onClick }: Props) {
  return (
    <div
      className="w-full rounded-lg border border-accent p-3 text-black text-opacity-60 shadow-md transition-all hover:shadow-lg"
      onClick={onClick}
    >
      <div className="flex md:flex-col">
        <h2 className="flex-1 text-lg font-bold">{item.name}</h2>
        <span className="text-xs">
          Found on: {item.foundDate.toDateString()}
        </span>
      </div>
      <div className="flex text-sm md:flex-col">
        <div className="flex-1 font-light">
          <p>{item.shortDescription ?? 'No Description'}</p>
        </div>
        <div className="divider divider-horizontal md:divider-vertical" />
        <div>
          <div>
            <span className="font-bold">Found: </span>
            <span>{Locations[item.foundLocation]}</span>
          </div>
          <div>
            <span className="font-bold">Retrieve From: </span>
            <span>{item.retrieveLocation}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
