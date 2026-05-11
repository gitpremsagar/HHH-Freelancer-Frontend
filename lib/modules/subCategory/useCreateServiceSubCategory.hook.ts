"use client";

import { useState } from "react";
import { createServiceSubCategory } from "./subCategory.service";
import { CreateServiceSubCategoryRequest } from "./subCategory.type";

export const useCreateServiceSubCategory = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSubCategory = async (data: CreateServiceSubCategoryRequest) => {
    setIsCreating(true);
    setError(null);
    setIsCreated(false);

    try {
      const response = await createServiceSubCategory(data);
      setIsCreated(true);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create subcategory";
      setError(errorMessage);
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  const reset = () => {
    setIsCreating(false);
    setIsCreated(false);
    setError(null);
  };

  return {
    createSubCategory,
    isCreating,
    isCreated,
    error,
    reset,
  };
};
