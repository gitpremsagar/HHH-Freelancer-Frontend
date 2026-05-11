"use client";

import { useState } from "react";
import { updateServiceSubCategory } from "./subCategory.service";
import { UpdateServiceSubCategoryRequest } from "./subCategory.type";

export const useUpdateServiceSubCategory = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateSubCategory = async (id: string, data: UpdateServiceSubCategoryRequest) => {
    setIsUpdating(true);
    setError(null);
    setIsUpdated(false);

    try {
      const response = await updateServiceSubCategory(id, data);
      setIsUpdated(true);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update subcategory";
      setError(errorMessage);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  };

  const reset = () => {
    setIsUpdating(false);
    setIsUpdated(false);
    setError(null);
  };

  return {
    updateSubCategory,
    isUpdating,
    isUpdated,
    error,
    reset,
  };
};
