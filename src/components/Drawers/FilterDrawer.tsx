import { Dialog, Transition } from '@headlessui/react';
import { Category, Color, Location } from '@prisma/client';
import MyDisclosure from 'components/Elements/Disclosure';
import MyListbox from 'components/Form/Listbox';
import useZodForm from 'hooks/useZodForm';
import { Fragment } from 'react';
import useDrawerStore from 'stores/DrawerStore';
import useItemFilterStore from 'stores/ItemFilterStore';
import { Categories, Locations } from 'types';

import { z } from 'zod';

export default function FilterDrawer() {
  const { drawer, clearDrawer } = useDrawerStore();
  const methods = useZodForm({
    schema: z.object({
      date: z.coerce.date().nullable(),
      categories: z.array(z.nativeEnum(Category)),
      locations: z.array(z.nativeEnum(Location)),
      colors: z.array(z.nativeEnum(Color))
    }),
    defaultValues: {
      date: null,
      categories: [],
      locations: [],
      colors: []
    }
  });
  const { setFilter, resetFilter } = useItemFilterStore();

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
            unmount={false}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="z-50 h-screen w-full max-w-sm overflow-y-auto bg-primary font-bold shadow-xl">
              <div className="inline-flex w-full items-center justify-between bg-accent p-4 text-accent-content">
                <h1 className="text-xl uppercase">Filter</h1>
                <button
                  type="button"
                  className="btn-ghost btn font-thin"
                  onClick={() => {
                    resetFilter();
                    methods.reset();
                  }}
                >
                  Clear
                </button>
              </div>
              <form
                className="m-4"
                onSubmit={methods.handleSubmit(async (data) => setFilter(data))}
              >
                <MyDisclosure title="Date Lost">
                  <input
                    type="date"
                    className="input input-sm w-full"
                    {...methods.register('date')}
                  />
                </MyDisclosure>
                <MyDisclosure title="Item Category">
                  <MyListbox
                    control={methods.control}
                    name="categories"
                    values={Object.keys(Categories)}
                    displayValue={(prop) => Categories[prop]}
                    keyValue={(prop) => prop}
                    placeholder="Select a Category"
                    multiple
                  />
                </MyDisclosure>
                <MyDisclosure title="Item Location">
                  <MyListbox
                    control={methods.control}
                    name="locations"
                    values={Object.keys(Location)}
                    displayValue={(prop) => Locations[prop]}
                    keyValue={(prop) => prop}
                    placeholder="Select a Location"
                    multiple
                  />
                </MyDisclosure>
                <MyDisclosure title="Item Color">
                  <MyListbox
                    control={methods.control}
                    name="colors"
                    displayValue={(prop) => prop}
                    keyValue={(prop) => prop}
                    placeholder="Select a Color"
                    values={Object.keys(Color)}
                    multiple
                  />
                </MyDisclosure>
                <div className="p-4">
                  <button
                    onClick={clearDrawer}
                    className="btn-accent btn-sm btn w-full"
                  >
                    View Items
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
