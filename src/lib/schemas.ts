import {
  Category,
  Color,
  ItemInteraction,
  Location,
  Permission,
  RetrieveLocation,
  Status,
  Value
} from '@prisma/client';
import { z } from 'zod';

export const ItemSchema = z.object({
  name: z.string().min(3),
  foundDate: z.coerce.date(),
  foundLocation: z.nativeEnum(Location),
  foundDescription: z.string(),
  shortDescription: z.string().min(3),
  categories: z.array(z.nativeEnum(Category)),
  color: z.nativeEnum(Color),
  otherColorDescription: z.string().nullish(),
  value: z.nativeEnum(Value, {
    required_error: 'Required',
    invalid_type_error: 'Required'
  }),
  identifiable: z.boolean(),
  identification: z.string().nullish(),
  ownerNotified: z.string().nullish(),
  itemLocation: z.string().min(3),
  retrieveLocation: z.nativeEnum(RetrieveLocation),
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
  value: z.nativeEnum(Value).nullable(),
  category: z.nativeEnum(Category).nullable()
});

export const UserSchema = z.object({
  externalId: z.string(),
  permission: z.nativeEnum(Permission),
  notifications: z.boolean()
});
export const UserCreateSchema = UserSchema;
export const UserUpdateSchema = z.object({
  externalId: z.string(),
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
