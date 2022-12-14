import { Building, Category, Status, Value } from '@prisma/client';
import { z } from 'zod';

export const ItemCreateSchema = z.object({
  name: z.string(),
  imageURL: z.string().nullish(),
  shortDescription: z.string(),
  longDescription: z.string().nullish(),
  foundBuilding: z.nativeEnum(Building),
  foundDescription: z.string().nullish(),
  foundDate: z.date(),
  retrieveBuilding: z.nativeEnum(Building),
  value: z.nativeEnum(Value),
  categories: z.array(z.nativeEnum(Category)),
  status: z.nativeEnum(Status).default('AVAILABLE')
});

export const ItemUpdateSchema = z.object({
  id: z.string(),
  data: ItemCreateSchema
});

export const UserCreateSchema = z.object({
  name: z.string(),
  email: z.string().email()
});

export const UserUpdateSchema = z.object({
  id: z.string(),
  data: UserCreateSchema
});

export const UserSchema = UserUpdateSchema.merge(UserCreateSchema);

export const UserListSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(2),
  user: z
    .object({
      email: z.string(),
      name: z.string()
    })
    .optional()
});
