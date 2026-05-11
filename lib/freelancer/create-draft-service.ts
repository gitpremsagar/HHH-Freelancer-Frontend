import { FreelancingServiceService } from "@/lib/modules/freelancingService/freelancingService.service";
import { CreateFreelancingServiceRequest } from "@/lib/modules/freelancingService/freelancingService.types";
import { serviceCategoryService } from "@/lib/modules/serviceCategory/serviceCategory.service";
import { getServiceSubCategories } from "@/lib/modules/subCategory/subCategory.service";

export type CreateDraftResult =
  | { ok: true; serviceId: string }
  | { ok: false; error: string };

/**
 * Creates a placeholder draft and returns the new service id for navigation.
 */
export async function createFreelancingServiceDraft(params: {
  freelancerId: string;
}): Promise<CreateDraftResult> {
  try {
    const categoriesResponse = await serviceCategoryService.getAll();
    const categories = categoriesResponse.data?.serviceCategories || [];

    if (categories.length === 0) {
      return {
        ok: false,
        error: "No service categories available. Please contact support.",
      };
    }

    const firstCategory = categories[0];
    const subCategoriesResponse = await getServiceSubCategories();
    const subCategories =
      subCategoriesResponse.data?.serviceSubCategories || [];

    const firstSubCategory =
      subCategories.find((sub) => sub.serviceCategoryId === firstCategory.id) ||
      subCategories[0];

    if (!firstSubCategory) {
      return {
        ok: false,
        error: "No service subcategories available. Please contact support.",
      };
    }

    const draftData: CreateFreelancingServiceRequest = {
      freelancerId: params.freelancerId,
      title: "draft",
      description: "Draft service - please update with your service details",
      serviceCategoryId:
        firstCategory.id as CreateFreelancingServiceRequest["serviceCategoryId"],
      serviceSubCategoryId:
        firstSubCategory.id as CreateFreelancingServiceRequest["serviceSubCategoryId"],
      deliveryTime: 1,
      currency: "USD",
      isCustomPricing: false,
      revisionPolicy: 0,
      rushDeliveryAvailable: false,
      gallery: [],
      portfolioItems: [],
      communicationLanguage: ["English"],
      tags: ["draft"],
      keywords: ["draft"],
    };

    const response = await FreelancingServiceService.saveAsDraft(draftData);

    if (response.success && response.data?.id) {
      return { ok: true, serviceId: response.data.id };
    }
    return {
      ok: false,
      error: response.error || "Failed to create draft service",
    };
  } catch {
    return { ok: false, error: "Failed to create draft service" };
  }
}
