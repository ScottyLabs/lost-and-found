import { Disclosure } from '@headlessui/react';
import React from 'react';
import { FaChevronUp } from 'react-icons/fa';

type MyDisclosureProps = React.PropsWithChildren<{
  title: React.ReactNode;
}>;
export default function MyDisclosure({ title, children }: MyDisclosureProps) {
  return (
    <div className="w-full rounded-2xl hover:bg-base-100/20">
      <div className="mx-auto w-full max-w-md rounded-2xl p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left text-sm font-bold">
                <span>{title}</span>
                <FaChevronUp
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-4 w-4 text-accent transition`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                {children}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
