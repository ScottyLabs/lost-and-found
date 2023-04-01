/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { Building, Category, Color } from '@prisma/client';
import useZodForm from 'hooks/useZodForm';
import useItemFilterStore from 'stores/ItemFilterStore';
import { Categories } from 'types';
import { z } from 'zod';

export default function SortWidget() {
  const methods = useZodForm({
    schema: z.object({
      date: z.coerce.date().nullable(),
      category: z.nativeEnum(Category).nullable(),
      location: z.nativeEnum(Building).nullable(),
      color: z.nativeEnum(Color).nullable()
    }),
    defaultValues: {
      date: null,
      category: null,
      location: null,
      color: null
    }
  });

  const { setFilter } = useItemFilterStore();

  return (
    <div className="w-80 self-start rounded-lg bg-primary p-5 text-accent">
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold">Filters</span>
        <button
          type="button"
          className="btn-ghost btn-sm btn"
          onClick={() => methods.reset()}
        >
          Clear
        </button>
      </div>
      <form
        className="form-control gap-4"
        onSubmit={methods.handleSubmit(async (data) => setFilter(data))}
      >
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Date Lost</span>
          </label>
          <input
            type="date"
            placeholder="Type here"
            className="input-bordered input input-sm w-full max-w-xs font-bold"
            {...methods.register('date')}
          />
          <span className="text-xs text-error">
            {methods.formState.errors.date?.message}
          </span>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Item Category</span>
          </label>
          <select
            className="select-bordered select select-sm w-full max-w-xs"
            {...methods.register('category')}
          >
            {Object.entries(Categories).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
          <span className="text-xs text-error">
            {methods.formState.errors.category?.message}
          </span>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Location Lost</span>
          </label>
          <select
            className="select-bordered select select-sm w-full max-w-xs"
            {...methods.register('location')}
          >
            {Object.values(Building).map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <span className="text-xs text-error">
            {methods.formState.errors.location?.message}
          </span>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Color</span>
          </label>
          <select
            className="select-bordered select select-sm w-full max-w-xs"
            {...methods.register('color')}
          >
            {Object.values(Color).map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
          <span className="text-xs text-error">
            {methods.formState.errors.color?.message}
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
