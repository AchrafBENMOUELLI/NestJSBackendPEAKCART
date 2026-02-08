import { z } from 'zod';

export const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  stock: z.number().int().nonnegative().optional(),
  imageUrl: z.string().url().optional(),
  category: z.string().optional(),
});

export type UpdateProductDto = z.infer<typeof updateProductSchema>;
