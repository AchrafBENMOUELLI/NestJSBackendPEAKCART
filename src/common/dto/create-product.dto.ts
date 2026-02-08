import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be greater than 0"),
  stock: z.number().int().nonnegative("Stock cannot be negative").optional(),
  imageUrl: z.string().url().optional(),
  category: z.string().optional(),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
