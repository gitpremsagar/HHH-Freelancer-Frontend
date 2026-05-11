"use client";

import { useState } from "react";
import { deleteServiceSubCategory } from "./subCategory.service";

export const useDeleteServiceSubCategory = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteSubCategory = async (id: string) => {
    setIsDeleting(true);
    setError(null);
    setIsDeleted(false);

    try {
      await deleteServiceSubCategory(id);
      setIsDeleted(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete subcategory";
      setError(errorMessage);
      throw err;
    } finally {
      setIsDeleting(false);
    }
  };

  const reset = () => {
    setIsDeleting(false);
    setIsDeleted(false);
    setError(null);
  };

  return {
    deleteSubCategory,
    isDeleting,
    isDeleted,
    error,
    reset,
  };
};
