import { z } from "zod";

// Validation schemas for ServiceCategory
const createServiceCategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
  isNew: z.boolean(),
  orderNumber: z.number().int().min(1, "Order number must be a positive integer"),
});

const updateServiceCategorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters").optional(),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters").optional(),
  isNew: z.boolean().optional(),
  orderNumber: z.number().int().min(1, "Order number must be a positive integer").optional(),
});

const serviceCategoryIdSchema = z.object({
  id: z.string().min(1, "Service category ID is required"),
});

const getServiceCategoriesQuerySchema = z.object({
  page: z.string().optional().transform((val) => val ? parseInt(val, 10) : 1),
  limit: z.string().optional().transform((val) => val ? parseInt(val, 10) : 100),
  search: z.string().optional(),
});

export {
  createServiceCategorySchema,
  updateServiceCategorySchema,
  serviceCategoryIdSchema,
  getServiceCategoriesQuerySchema,
};
