import * as React from 'react';
import Image from 'next/image';
import { Item } from '@prisma/client';

type Props = {
  item: Item;
};

export default function ItemCard({ item }: Props) {
  return (
    <div className="rounded-lg border shadow-md transition-all hover:shadow-lg">
      {item.imageURL && (
        <>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor={item.name} className="hover:cursor-pointer">
            <div className="relative flex h-32 w-full items-center justify-center">
              <Image
                src={item.imageURL}
                alt={item.name}
                layout="fill"
                objectFit="scale-down"
              />
            </div>
          </label>
          <input type="checkbox" id={item.name} className="modal-toggle" />
          <div className="modal z-50">
            <div className="modal-box">
              <h3 className="text-lg font-bold">{item.name}</h3>
              <div className="relative flex h-32 w-full items-center justify-center">
                <Image
                  src={item.imageURL}
                  alt={item.name}
                  layout="fill"
                  objectFit="scale-down"
                />
              </div>
              <div className="modal-action">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor={item.name} className="btn-primary btn">
                  Close
                </label>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="flex flex-col gap-1 p-6 text-center">
        <h1 className="text-lg font-semibold">{item.name}</h1>
        <p className="text-sm font-thin">
          Found on {item.foundDate.toLocaleString()}
        </p>
        <p className="text-sm">{item.shortDescription}</p>
      </div>
      <hr />
      <div className="p-6 text-sm">
        <b>Found: </b>
        {item.foundBuilding} <br />
        <b>Retrieve From: </b>
        {item.retrieveBuilding}
      </div>
    </div>
  );
}
