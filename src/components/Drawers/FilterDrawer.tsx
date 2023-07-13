import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import useDrawerStore from 'stores/DrawerStore';
import { Categories, Colors, Locations } from 'types';

export default function FilterDrawer() {
  const { drawer, clearDrawer } = useDrawerStore();

  return (
    <Transition appear show={drawer === 'filter'} as={Fragment}>
      <Dialog
        unmount={false}
        className="fixed inset-0 z-30 overflow-y-auto"
        onClose={clearDrawer}
      >
        <div className="flex h-screen w-3/4">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-30"
            entered="opacity-30"
            leave="transition-opacity ease-out duration-300"
            leaveFrom="opacity-30"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 z-40 bg-black" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="z-50 h-screen w-full max-w-sm bg-primary font-bold shadow-xl">
              <div className="inline-flex w-full items-center justify-between bg-accent p-4 text-accent-content">
                <h1 className="text-xl uppercase">Filter</h1>
                <button type="button" className="btn-ghost btn font-thin">
                  Clear
                </button>
              </div>
              <ul className="menu w-full flex-1 flex-nowrap overflow-auto p-4 text-accent">
                <li>
                  <div>
                    <div className="collapse-arrow collapse w-full">
                      <input type="checkbox" className="peer" />
                      <div className="collapse-title">Date Lost</div>
                      <div className="collapse-content">
                        <input
                          type="datetime-local"
                          className="input-ghost input w-full"
                        />
                      </div>
                    </div>
                  </div>
                </li>
                <li />
                <li>
                  <div>
                    <div className="collapse-arrow collapse w-full">
                      <input type="checkbox" className="peer" />
                      <div className="collapse-title">Item Category</div>
                      <div className="collapse-content">
                        <div>
                          {Object.values(Categories).map((category) => (
                            <div
                              key={category}
                              className="flex items-center gap-2 p-1"
                            >
                              <input type="checkbox" className="checkbox" />
                              <label className="label">
                                <span className="label-text">{category}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li />
                <li>
                  <div>
                    <div className="collapse-arrow collapse w-full">
                      <input type="checkbox" className="peer" />
                      <div className="collapse-title">Location Found</div>
                      <div className="collapse-content">
                        <div className="flex flex-col gap-3">
                          <input
                            type="text"
                            placeholder="Search location found..."
                            className="input-primary input w-full rounded-full"
                          />
                          <div>
                            {Locations.map((location) => (
                              <div
                                key={location}
                                className="flex items-center gap-2 p-1"
                              >
                                <input type="checkbox" className="checkbox" />
                                <label className="label">
                                  <span className="label-text">{location}</span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li />
                <li>
                  <div>
                    <div className="collapse-arrow collapse w-full">
                      <input type="checkbox" className="peer" />
                      <div className="collapse-title">Color</div>
                      <div className="collapse-content">
                        {Colors.map((color) => (
                          <div
                            key={color}
                            className="flex items-center gap-2 p-1"
                          >
                            <input type="checkbox" className="checkbox" />
                            <label className="label">
                              <span className="label-text">{color}</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="p-4">
                <button
                  type="button"
                  onClick={clearDrawer}
                  className="btn-accent btn-sm btn w-full"
                >
                  View Items
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
