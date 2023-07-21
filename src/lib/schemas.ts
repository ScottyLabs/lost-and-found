import {
  Category,
  Color,
  ItemInteraction,
  Location,
  Permission,
  Status,
  Value
} from '@prisma/client';
import { z } from 'zod';

export const ItemSchema = z.object({
  name: z.string().min(3),
  foundDate: z.coerce.date(),
  foundLocation: z.nativeEnum(Location),
  foundDescription: z.string(),
  shortDescription: z.string(),
  categories: z.array(z.nativeEnum(Category)),
  color: z.nativeEnum(Color),
  value: z.nativeEnum(Value),
  identifiable: z.boolean(),
  retrieveLocation: z.nativeEnum(Location),
  longDescription: z.string().nullish(),
  status: z.nativeEnum(Status).default(Status.PENDING)
});
export const ItemCreateSchema = ItemSchema;
export const ItemUpdateSchema = z.object({
  id: z.string(),
  data: ItemSchema.partial()
});
export const ItemsUpdateSchema = z.object({
  ids: z.array(z.string()),
  data: ItemSchema.partial()
});
export const ItemSearchSchema = z.object({
  query: z.string(),
  color: z.nativeEnum(Color).nullable(),
  status: z.nativeEnum(Status).nullable(),
  value: z.nativeEnum(Value).nullable()
});

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  permission: z.nativeEnum(Permission),
  notifications: z.boolean()
});
export const UserCreateSchema = UserSchema;
export const UserUpdateSchema = z.object({
  id: z.string(),
  data: UserSchema.partial()
});
export const UserListSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(2),
  user: UserSchema.optional()
});
export const UserSearchSchema = z.object({
  query: z.string(),
  permissions: z.array(z.nativeEnum(Permission)),
  notifications: z.boolean().nullable()
});

export const AuditLogSchema = z.object({
  interaction: z.nativeEnum(ItemInteraction),
  itemId: z.string()
});
export const AuditLogCreateSchema = AuditLogSchema;
export const AuditLogUpdateSchema = z.object({
  id: z.string(),
  data: AuditLogSchema
});
