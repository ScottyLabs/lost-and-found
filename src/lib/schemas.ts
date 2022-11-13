import { z } from 'zod';

export const UserCreateSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	notifications: z.boolean()
});

export const UserUpdateSchema = z.object({
	id: z.string(),
	name: z.string().optional(),
	email: z.string().email().optional(),
	emailVerified: z.string().nullish(),
	image: z.string().nullish(),
	notifications: z.boolean().optional()
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
