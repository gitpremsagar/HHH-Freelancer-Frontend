/**
 * Per-step validation for the create/edit service wizard.
 * Aligns with createFreelancingServiceSchema and ServicePreview completion rules.
 */

export type WizardStepNumber = 1 | 2 | 3 | 4 | 5;

/** Subset of form fields used by step validators (structurally compatible with page ServiceFormData). */
export type WizardFormData = {
  title: string;
  description: string;
  serviceCategoryId: string;
  serviceSubCategoryId: string;
  basePrice: number;
  currency: string;
  isCustomPricing: boolean;
  deliveryTime: number;
  revisionPolicy: number;
  rushDeliveryAvailable: boolean;
  rushDeliveryFee: number;
  gallery: string[];
  videoIntroduction: string;
  requirements: string;
  communicationLanguage: string[];
  timezone: string;
};

export type WizardStepResult =
  | { ok: true }
  | { ok: false; message: string };

function isValidHttpUrl(value: string): boolean {
  try {
    const u = new URL(value.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateWizardStep(
  step: WizardStepNumber,
  data: WizardFormData
): WizardStepResult {
  switch (step) {
    case 1: {
      const title = data.title.trim();
      if (!title) {
        return { ok: false, message: "Please enter a service title." };
      }
      if (title.length > 100) {
        return { ok: false, message: "Title must be 100 characters or less." };
      }
      const description = data.description.trim();
      if (description.length < 10) {
        return {
          ok: false,
          message: "Description must be at least 10 characters.",
        };
      }
      if (description.length > 2000) {
        return {
          ok: false,
          message: "Description must be 2000 characters or less.",
        };
      }
      if (!data.serviceCategoryId) {
        return { ok: false, message: "Please select a service category." };
      }
      if (!data.serviceSubCategoryId) {
        return { ok: false, message: "Please select a service subcategory." };
      }
      return { ok: true };
    }
    case 2: {
      if (!data.currency?.trim()) {
        return { ok: false, message: "Please select a currency." };
      }
      if (!data.isCustomPricing && data.basePrice <= 0) {
        return {
          ok: false,
          message: "Please enter a base price greater than zero, or enable custom pricing.",
        };
      }
      return { ok: true };
    }
    case 3: {
      if (data.deliveryTime < 1) {
        return {
          ok: false,
          message: "Delivery time must be at least 1 day.",
        };
      }
      if (data.revisionPolicy < 0) {
        return {
          ok: false,
          message: "Number of revisions cannot be negative.",
        };
      }
      if (data.rushDeliveryAvailable && data.rushDeliveryFee <= 0) {
        return {
          ok: false,
          message: "Please enter a rush delivery fee greater than zero.",
        };
      }
      return { ok: true };
    }
    case 4: {
      if (data.gallery.length < 1) {
        return {
          ok: false,
          message: "Please add at least one image to the service gallery.",
        };
      }
      const video = data.videoIntroduction.trim();
      if (video && !isValidHttpUrl(video)) {
        return {
          ok: false,
          message: "Video URL must be a valid http(s) link.",
        };
      }
      return { ok: true };
    }
    case 5: {
      if (data.communicationLanguage.length < 1) {
        return {
          ok: false,
          message: "Please add at least one communication language.",
        };
      }
      if (!data.requirements.trim()) {
        return {
          ok: false,
          message: "Please describe what you need from clients (service requirements).",
        };
      }
      if (!data.timezone?.trim()) {
        return {
          ok: false,
          message: "Please select your timezone.",
        };
      }
      return { ok: true };
    }
    default:
      return { ok: true };
  }
}

export function validateAllWizardSteps(data: WizardFormData): WizardStepResult {
  const steps: WizardStepNumber[] = [1, 2, 3, 4, 5];
  for (const s of steps) {
    const r = validateWizardStep(s, data);
    if (!r.ok) return r;
  }
  return { ok: true };
}
