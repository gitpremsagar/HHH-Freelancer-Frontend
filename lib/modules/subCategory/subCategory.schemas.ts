import { z } from "zod";

export const createServiceSubCategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
  serviceCategoryId: z.string().min(1, "Service category ID is required"),
});

export type CreateServiceSubCategorySchema = z.infer<typeof createServiceSubCategorySchema>;
