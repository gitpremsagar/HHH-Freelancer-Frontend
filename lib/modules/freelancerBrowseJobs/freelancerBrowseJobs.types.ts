export type BrowseJobClient = {
  id: string;
  name: string;
  country: string | null;
  city: string | null;
};

export type BrowseJobRow = {
  id: string;
  title: string;
  slug: string;
  description: string;
  deadline: string;
  serviceCategory: string;
  serviceSubCategory: string;
  budget: number | null;
  budgetMin: number | null;
  budgetMax: number | null;
  budgetType: string;
  currency: string;
  complexity: string;
  experienceLevel: string;
  clientLocation: string | null;
  isUrgent: boolean;
  client: BrowseJobClient;
};

export type BrowseJobsPagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type BrowseJobsListResponse = {
  success: boolean;
  message: string;
  data: {
    jobs: BrowseJobRow[];
    pagination: BrowseJobsPagination;
  };
};
