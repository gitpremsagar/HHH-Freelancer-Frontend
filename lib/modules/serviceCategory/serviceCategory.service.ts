import { API } from "@/lib/constants";
import customAxios from "@/lib/custom-axios-requests";

export const serviceCategoryService = {
  getAll: async () => {
    try {
      const response = await customAxios.get(API.CATEGORIES.GET_ALL);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
