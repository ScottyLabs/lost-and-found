import {
  Building,
  Category,
  Color,
  ItemInteraction,
  Status,
  Value
} from '@prisma/client';
import { z } from 'zod';

export const ItemSchema = z.object({
  name: z.string().min(3),
  foundDate: z.coerce.date(),
  foundBuilding: z.nativeEnum(Building),
  foundDescription: z.string(),
  shortDescription: z.string(),
  categories: z.array(z.nativeEnum(Category)),
  color: z.nativeEnum(Color),
  value: z.nativeEnum(Value),
  identifiable: z.boolean(),
  retrieveBuilding: z.nativeEnum(Building),
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
  query: z.string().optional(),
  color: z.nativeEnum(Color).optional(),
  status: z.nativeEnum(Status).optional(),
  value: z.nativeEnum(Value).optional()
});

export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email()
});
export const UserCreateSchema = UserSchema;
export const UserUpdateSchema = z.object({ id: z.string(), data: UserSchema });
export const UserListSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(2),
  user: UserSchema.optional()
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
