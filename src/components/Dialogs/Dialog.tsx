import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

type DialogProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  panelClassName?: string;
};

export function Dialog({
  children,
  isOpen,
  onClose,
  panelClassName
}: DialogProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex h-screen items-center justify-center text-center md:min-h-full md:p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel
                className={`h-full w-full transform overflow-hidden bg-base-100 p-6 text-left align-middle shadow-xl transition-all md:h-auto md:max-w-md md:rounded-2xl ${panelClassName ?? ''}`}
              >
                {children}
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
}
