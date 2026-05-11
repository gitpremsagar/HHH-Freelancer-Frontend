export interface FreelancingService {
  id: string;
  freelancerId: string;
  title: string;
  description: string;
  slug: string;
  serviceCategoryId: string;
  serviceSubCategoryId: string;
  basePrice?: number;
  currency: string;
  isCustomPricing: boolean;
  deliveryTime: number;
  revisionPolicy: number;
  rushDeliveryAvailable: boolean;
  rushDeliveryFee?: number;
  deliveryGuarantee?: string;
  gallery: string[];
  videoIntroduction?: string;
  portfolioItems: string[];
  requirements?: string;
  communicationLanguage: string[];
  timezone?: string;
  tags: string[];
  keywords: string[];
  metaDescription?: string;
  status: ServiceStatus;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum ServiceStatus {
  DRAFT = "DRAFT",
  PENDING_APPROVAL = "PENDING_APPROVAL",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  SUSPENDED = "SUSPENDED",
  ARCHIVED = "ARCHIVED"
}

export interface CreateFreelancingServiceRequest {
  freelancerId: string;
  title: string;
  description: string;
  serviceCategoryId: string;
  serviceSubCategoryId: string;
  basePrice?: number;
  currency?: string;
  isCustomPricing?: boolean;
  deliveryTime: number;
  revisionPolicy?: number;
  rushDeliveryAvailable?: boolean;
  rushDeliveryFee?: number;
  deliveryGuarantee?: string;
  gallery?: string[];
  videoIntroduction?: string;
  portfolioItems?: string[];
  requirements?: string;
  communicationLanguage?: string[];
  timezone?: string;
  tags?: string[];
  keywords?: string[];
  metaDescription?: string;
}

export interface UpdateFreelancingServiceRequest extends Partial<CreateFreelancingServiceRequest> {
  id: string;
}

export interface FreelancingServiceResponse {
  success: boolean;
  data?: FreelancingService;
  message?: string;
  error?: string;
}

export interface CreateFreelancingServiceResponseData {
  freelancingService: FreelancingService;
  message?: string;
  error?: string;
}

export interface FreelancingServiceListResponse {
  success: boolean;
  data?: FreelancingService[];
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

