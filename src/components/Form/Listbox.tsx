import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { FaCheck, FaChevronDown } from 'react-icons/fa';

type ListboxOptionType<T> = {
  values: T[];
  displayValue: (prop: T) => string;
  keyValue: (prop: T) => string;
};

function ListboxOptions<T>({
  values,
  keyValue,
  displayValue
}: ListboxOptionType<T>) {
  return (
    <>
      {values.map((value) => (
        <Listbox.Option key={keyValue(value)} value={value}>
          <div className="relative cursor-default select-none rounded-md py-2 pl-8 pr-4 text-sm hover:bg-primary">
            <span className={'block truncate ui-selected:font-bold'}>
              {displayValue(value)}
            </span>
            <span className="absolute inset-y-0 left-0 hidden items-center pl-1.5 ui-selected:flex">
              <FaCheck />
            </span>
          </div>
        </Listbox.Option>
      ))}
    </>
  );
}

type ListboxProps<T, K extends FieldValues> = Pick<
  UseControllerProps<K>,
  'control' | 'name'
> & {
  values: T[];
  displayValue: (prop: T) => string;
  keyValue: (prop: T) => string;
  placeholder: string;
  multiple?: boolean;
};
export default function MyListbox<T, K extends FieldValues>({
  control,
  name,
  values,
  displayValue,
  keyValue,
  placeholder,
  multiple = false
}: ListboxProps<T, K>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Listbox as="div" multiple={multiple} className="relative" {...field}>
          <Listbox.Button className="input-bordered input input-sm flex w-full items-center justify-between text-left">
            <span className="block truncate">
              {multiple
                ? field.value?.length > 0
                  ? field.value
                      .map((value: T) => displayValue(value))
                      .sort()
                      .join(', ')
                  : placeholder
                : field.value
                ? displayValue(field.value)
                : placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FaChevronDown
                className="h-3 w-3 text-base-content/50"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-40 mt-2 max-h-40 w-full overflow-auto rounded-md border border-primary bg-base-100 p-2 shadow-2xl">
              <ListboxOptions<T>
                keyValue={keyValue}
                displayValue={displayValue}
                values={values}
              />
            </Listbox.Options>
          </Transition>
        </Listbox>
      )}
    />
  );
}
