/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { Category, Color, Location } from '@prisma/client';
import useZodForm from 'hooks/useZodForm';
import useItemFilterStore from 'stores/ItemFilterStore';
import { Categories, Colors, Locations } from 'types';
import { z } from 'zod';
import MyListbox from './Form/Listbox';

export default function FilterWidget() {
  const methods = useZodForm({
    schema: z.object({
      dateStart: z.coerce.date().nullable(),
      dateEnd: z.coerce.date().nullable(),
      categories: z.array(z.nativeEnum(Category)),
      locations: z.array(z.nativeEnum(Location)),
      colors: z.array(z.nativeEnum(Color))
    }),
    defaultValues: {
      dateStart: null,
      dateEnd: null,
      categories: [],
      locations: [],
      colors: []
    }
  });

  const { setFilter, resetFilter } = useItemFilterStore();

  return (
    <div className="w-80 self-start rounded-lg bg-primary p-5 text-accent">
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold">Filters</span>
        <button
          type="button"
          className="btn-ghost btn-sm btn"
          onClick={() => {
            methods.reset();
            resetFilter();
          }}
        >
          Clear
        </button>
      </div>
      <form
        className="form-control gap-4"
        onSubmit={methods.handleSubmit(async (data) => setFilter({ ...data }))}
      >
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Date Found</span>
          </label>

          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="date"
              className="input-bordered input input-sm w-full font-bold sm:w-1/2"
              {...methods.register('dateStart')}
            />

            <input
              type="date"
              className="input-bordered input input-sm w-full font-bold sm:w-1/2"
              {...methods.register('dateEnd')}
            />
          </div>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Item Category</span>
          </label>
          <MyListbox
            control={methods.control}
            name="categories"
            displayValue={(prop) => Categories[prop]}
            keyValue={(prop) => prop}
            placeholder="Select a Category"
            values={Object.keys(Categories) as (keyof typeof Categories)[]}
            multiple
          />
          <span className="text-xs text-error">
            {methods.formState.errors.categories?.message}
          </span>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Location Lost</span>
          </label>
          <MyListbox
            control={methods.control}
            name="locations"
            values={Object.keys(Location) as (keyof typeof Location)[]}
            displayValue={(prop) => Locations[prop]}
            keyValue={(prop) => prop}
            placeholder="Select a Location"
            multiple
          />
          <span className="text-xs text-error">
            {methods.formState.errors.locations?.message}
          </span>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Color</span>
          </label>
          <MyListbox
            control={methods.control}
            name="colors"
            displayValue={(prop) => Colors[prop]}
            keyValue={(prop) => prop}
            placeholder="Select a Color"
            values={Object.keys(Color) as (keyof typeof Color)[]}
            multiple
          />
          <span className="text-xs text-error">
            {methods.formState.errors.colors?.message}
          </span>
        </div>
        <div>
          <button type="submit" className="btn-accent btn-sm btn rounded-full">
            <span className="uppercase">Apply Filters</span>
          </button>
        </div>
      </form>
    </div>
  );
}
