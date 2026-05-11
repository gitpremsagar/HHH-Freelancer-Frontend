export interface ServiceSubCategory {
  id: string;
  name: string;
  description: string;
  isNew: boolean;
  serviceCategoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceSubCategoryRequest {
  name: string;
  description: string;
  serviceCategoryId: string;
}

export interface CreateServiceSubCategoryResponse {
  success: boolean;
  message: string;
  data: {
    serviceSubCategory: ServiceSubCategory;
  };
}

export interface UpdateServiceSubCategoryRequest {
  name: string;
  description: string;
}

export interface UpdateServiceSubCategoryResponse {
  success: boolean;
  message: string;
  data: {
    serviceSubCategory: ServiceSubCategory;
  };
}

export interface DeleteServiceSubCategoryResponse {
  success: boolean;
  message: string;
}

export interface ServiceSubCategoryResponse {
  success: boolean;
  message: string;
  data: {
    serviceSubCategories: ServiceSubCategory[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}
