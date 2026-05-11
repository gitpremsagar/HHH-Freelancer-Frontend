/** API row: `id` is the Prisma enum value (e.g. PROGRAMMING_AND_TECH). */
export interface ServiceCategoryRow {
    id: string;
    name: string;
    description: string;
    isNew: boolean;
    orderNumber: number;
    slug: string;
    icon?: string | null;
    createdAt: string;
    updatedAt: string;
    _count?: {
        ServiceSubCategory: number;
        FreelancingService: number;
        Job: number;
    };
    ServiceSubCategory: ServiceSubCategoryRow[];
}

export interface ServiceSubCategoryRow {
    id: string;
    name: string;
    description: string;
    isNew: boolean;
    serviceCategoryId: string;
    slug: string;
    icon?: string | null;
    createdAt: string;
    updatedAt: string;
}

/** @deprecated Use ServiceCategoryRow — kept for gradual migration */
export type ServiceCategory = ServiceCategoryRow;
/** @deprecated Use ServiceSubCategoryRow */
export type ServiceSubCategory = ServiceSubCategoryRow;

export type ServiceCategoryResponse = {
    success: boolean;
    message: string;
    data: {
        serviceCategories: ServiceCategoryRow[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalItems: number;
            itemsPerPage: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    };
};