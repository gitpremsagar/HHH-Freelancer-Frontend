"use client";

import { useQuery } from "@tanstack/react-query";
import { serviceCategoryService } from "./serviceCategory.service";

export const useGetServiceCategories = () => {
  return useQuery({
    queryKey: ["service-categories"],
    queryFn: async () => {
      try {
        const response = await serviceCategoryService.getAll();
        return response.data.serviceCategories;
      } catch (error) {
        console.error("Error fetching service categories:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

