import { z } from 'zod';

// Zod schema
export const createUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

// Type inferred from Zod
export type CreateUserDto = z.infer<typeof createUserSchema>;
