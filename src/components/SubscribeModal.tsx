/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-unescaped-entities */

import Image from 'next/image';
import { Categories } from 'types';

export const SubscribeModal = () => (
  <>
    <input type="checkbox" id="subscribe-modal" className="modal-toggle" />
    <div className="modal">
      <div className="modal-box">
        <div className="flex flex-col items-center gap-4">
          <label
            htmlFor="subscribe-modal"
            className="btn-ghost btn-sm btn-circle btn absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="relative h-36 w-36">
            <Image src="/mail.svg" fill alt="" />
          </div>
          <h1 className="text-2xl font-bold">
            Get alerts when new items are added!
          </h1>
          <p className="text-sm">
            We'll send an email at the end of the day with items that have been
            added in your selected category.
          </p>
          <p className="text-sm">
            You&apos;ll get notifications for seven days following which you can
            resubscribe for updates. You can unsubscribe at any time.
          </p>
          <form className="flex w-full flex-col gap-2 font-bold">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Item Category</span>
              </label>
              <select className="select-bordered select w-full bg-primary">
                {Categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                className="input-bordered input w-full bg-primary"
              />
            </div>
            <div className="form-control">
              <label htmlFor="subscribe-modal" className="btn-ghost btn-xs btn">
                Unsubscribe now
              </label>
            </div>
          </form>
          <div className="modal-action w-full">
            <label
              htmlFor="subscribe-modal"
              className="btn-accent btn-sm btn float-right rounded-full px-4 py-2"
            >
              Subscribe
            </label>
          </div>
        </div>
      </div>
    </div>
  </>
);
