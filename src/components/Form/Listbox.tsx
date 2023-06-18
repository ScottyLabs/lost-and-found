import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment } from 'react';
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa';

type ListboxOptionType<T> = {
  values: T[];
  selected?: T[];
  displayValue: (prop: T) => string;
  keyValue: (prop: T) => string;
};

function ListboxOptions<T>({
  values,
  selected,
  keyValue,
  displayValue
}: ListboxOptionType<T>) {
  return (
    <>
      {values.map((value) => (
        <Listbox.Option key={keyValue(value)} value={value}>
          <div className="relative cursor-default select-none rounded-md py-2 pl-8 pr-4 hover:bg-primary">
            <span
              className={clsx(
                selected?.includes(value) ? 'font-bold' : 'font-normal',
                'block truncate'
              )}
            >
              {displayValue(value)}
            </span>
            {selected?.includes(value) && (
              <span className="absolute inset-y-0 left-0 flex items-center pl-1.5">
                <FaCheck />
              </span>
            )}
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
          <Listbox.Button className="input-bordered input input-sm w-full text-left">
            {multiple
              ? field.value?.length > 0
                ? field.value
                    .map((value: any) => displayValue(value))
                    .join(', ')
                : placeholder
              : field.value
              ? displayValue(field.value)
              : placeholder}
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-40 max-h-40 w-full overflow-auto rounded-md border border-primary bg-white p-2 shadow-2xl">
              <ListboxOptions<T>
                keyValue={keyValue}
                displayValue={displayValue}
                values={values}
                selected={field.value}
              />
            </Listbox.Options>
          </Transition>
        </Listbox>
      )}
    />
  );
}
