"use client";

import { useQuery } from "@tanstack/react-query";
import { getServiceSubCategories } from "./subCategory.service";
import { ServiceSubCategory } from "./subCategory.type";

export const useGetServiceSubCategories = (categoryId?: string) => {
  return useQuery({
    queryKey: ["service-subcategories", categoryId],
    queryFn: async () => {
      try {
        const response = await getServiceSubCategories();
        // Filter by categoryId if provided
        if (categoryId) {
          return response.data?.serviceSubCategories?.filter((subCategory: ServiceSubCategory) => subCategory.serviceCategoryId === categoryId) || [];
        }
        return response.data?.serviceSubCategories || [];
      } catch (error) {
        console.error("Error fetching service subcategories:", error);
        throw error;
      }
    },
    enabled: !!categoryId, // Only run query if categoryId is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

