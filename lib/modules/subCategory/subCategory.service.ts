import { API } from "@/lib/constants";
import { 
  CreateServiceSubCategoryRequest, 
  CreateServiceSubCategoryResponse,
  UpdateServiceSubCategoryRequest,
  UpdateServiceSubCategoryResponse,
  DeleteServiceSubCategoryResponse,
  ServiceSubCategoryResponse 
} from "./subCategory.type";

export const createServiceSubCategory = async (
  data: CreateServiceSubCategoryRequest
): Promise<CreateServiceSubCategoryResponse> => {
  const response = await fetch(API.SUBCATEGORIES.CREATE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create subcategory");
  }

  return response.json();
};

export const getServiceSubCategories = async (): Promise<ServiceSubCategoryResponse> => {
  const response = await fetch(API.SUBCATEGORIES.GET_ALL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch subcategories");
  }

  return response.json();
};

export const updateServiceSubCategory = async (
  id: string,
  data: UpdateServiceSubCategoryRequest
): Promise<UpdateServiceSubCategoryResponse> => {
  const response = await fetch(API.SUBCATEGORIES.UPDATE.replace(':id', id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update subcategory");
  }

  return response.json();
};

export const deleteServiceSubCategory = async (
  id: string
): Promise<DeleteServiceSubCategoryResponse> => {
  const response = await fetch(API.SUBCATEGORIES.DELETE.replace(':id', id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete subcategory");
  }

  return response.json();
};
