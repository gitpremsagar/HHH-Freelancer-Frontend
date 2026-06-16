"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Save, Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import {
  ServiceBasicInfo,
  ServicePricing,
  ServiceDelivery,
  ServiceMedia,
  ServiceRequirements,
  ServicePreview
} from "./_components";
import { toast } from "sonner";
import { FreelancingServiceService } from "@/lib/modules/freelancingService/freelancingService.service";
import {
  CreateFreelancingServiceRequest,
  FreelancingService,
  ServiceStatus,
  UpdateFreelancingServiceRequest,
} from "@/lib/modules/freelancingService/freelancingService.types";
import { useAppSelector } from "@/hooks/redux";
import { CREATE_NEW_SERVICE_SLUG, routes } from "@/lib/routes";
import {
  validateWizardStep,
  validateAllWizardSteps,
  type WizardStepNumber,
} from "./wizardStepValidation";
import { normalizeVideoIntroductionForPayload } from "@/lib/youtubeVideoIntroduction";

type ServiceFormData = {
  id: string;
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
  deliveryGuarantee: string;
  gallery: string[];
  videoIntroduction: string;
  portfolioItems: string[];
  requirements: string;
  communicationLanguage: string[];
  timezone: string;
  tags: string[];
  keywords: string[];
  metaDescription: string;
};

function createEmptyServiceForm(): ServiceFormData {
  return {
    id: "",
    title: "",
    description: "",
    serviceCategoryId: "",
    serviceSubCategoryId: "",
    basePrice: 0,
    currency: "USD",
    isCustomPricing: false,
    deliveryTime: 1,
    revisionPolicy: 0,
    rushDeliveryAvailable: false,
    rushDeliveryFee: 0,
    deliveryGuarantee: "",
    gallery: [],
    videoIntroduction: "",
    portfolioItems: [],
    requirements: "",
    communicationLanguage: [],
    timezone: "",
    tags: [],
    keywords: [],
    metaDescription: "",
  };
}

function mapFreelancingServiceToForm(service: FreelancingService): ServiceFormData {
  return {
    id: service.id,
    title: service.title,
    description: service.description,
    serviceCategoryId: service.serviceCategoryId,
    serviceSubCategoryId: service.serviceSubCategoryId,
    basePrice: service.basePrice ?? 0,
    currency: service.currency,
    isCustomPricing: service.isCustomPricing,
    deliveryTime: service.deliveryTime,
    revisionPolicy: service.revisionPolicy,
    rushDeliveryAvailable: service.rushDeliveryAvailable,
    rushDeliveryFee: service.rushDeliveryFee ?? 0,
    deliveryGuarantee: service.deliveryGuarantee ?? "",
    gallery: [...(service.gallery ?? [])],
    videoIntroduction: service.videoIntroduction ?? "",
    portfolioItems: [...(service.portfolioItems ?? [])],
    requirements: service.requirements ?? "",
    communicationLanguage: [...(service.communicationLanguage ?? [])],
    timezone: service.timezone ?? "",
    tags: [...(service.tags ?? [])],
    keywords: [...(service.keywords ?? [])],
    metaDescription: service.metaDescription ?? "",
  };
}

function formToCreatePayload(
  data: ServiceFormData,
  freelancerId: string
): CreateFreelancingServiceRequest {
  return {
    freelancerId,
    title: data.title.trim(),
    description: data.description.trim(),
    serviceCategoryId: data.serviceCategoryId,
    serviceSubCategoryId: data.serviceSubCategoryId,
    basePrice: data.basePrice,
    currency: data.currency,
    isCustomPricing: data.isCustomPricing,
    deliveryTime: data.deliveryTime,
    revisionPolicy: data.revisionPolicy,
    rushDeliveryAvailable: data.rushDeliveryAvailable,
    rushDeliveryFee: data.rushDeliveryFee,
    deliveryGuarantee: data.deliveryGuarantee || undefined,
    gallery: data.gallery,
    videoIntroduction: normalizeVideoIntroductionForPayload(data.videoIntroduction),
    portfolioItems: data.portfolioItems,
    requirements: data.requirements || undefined,
    communicationLanguage:
      data.communicationLanguage.length > 0 ? data.communicationLanguage : [],
    timezone: data.timezone || undefined,
    tags: data.tags,
    keywords: data.keywords,
    metaDescription: data.metaDescription || undefined,
  };
}

function formToUpdatePayload(data: ServiceFormData): UpdateFreelancingServiceRequest {
  return {
    id: data.id,
    status: ServiceStatus.DRAFT,
    title: data.title.trim(),
    description: data.description.trim(),
    serviceCategoryId: data.serviceCategoryId,
    serviceSubCategoryId: data.serviceSubCategoryId,
    basePrice: data.basePrice,
    currency: data.currency,
    isCustomPricing: data.isCustomPricing,
    deliveryTime: data.deliveryTime,
    revisionPolicy: data.revisionPolicy,
    rushDeliveryAvailable: data.rushDeliveryAvailable,
    rushDeliveryFee: data.rushDeliveryFee,
    deliveryGuarantee: data.deliveryGuarantee || undefined,
    gallery: data.gallery,
    videoIntroduction:
      data.videoIntroduction.trim() === ""
        ? null
        : normalizeVideoIntroductionForPayload(data.videoIntroduction),
    portfolioItems: data.portfolioItems,
    requirements: data.requirements || undefined,
    communicationLanguage:
      data.communicationLanguage.length > 0 ? data.communicationLanguage : [],
    timezone: data.timezone || undefined,
    tags: data.tags,
    keywords: data.keywords,
    metaDescription: data.metaDescription || undefined,
  };
}

function validateForCreate(data: ServiceFormData): string | null {
  if (!data.title.trim()) return "Add a service title before saving a draft.";
  if (data.description.trim().length < 10)
    return "Description must be at least 10 characters before saving a draft.";
  if (!data.serviceCategoryId)
    return "Select a category before saving a draft.";
  if (!data.serviceSubCategoryId)
    return "Select a subcategory before saving a draft.";
  if (data.deliveryTime < 1)
    return "Delivery time must be at least 1 day.";
  return null;
}

export default function CreateNewServicePage() {
  const params = useParams<{ serviceId: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAppSelector((state) => state.auth.user);
  const serviceIdParam = params?.serviceId ?? "";

  const [currentStep, setCurrentStep] = useState(1);
  const [serviceData, setServiceData] = useState<ServiceFormData>(() =>
    createEmptyServiceForm()
  );
  const [loadStatus, setLoadStatus] = useState<
    "loading" | "error" | "ready"
  >("loading");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [maxReachedStep, setMaxReachedStep] = useState(1);
  const [stepError, setStepError] = useState<string | null>(null);

  const isNewWizard = serviceIdParam === CREATE_NEW_SERVICE_SLUG;

  useEffect(() => {
    if (!serviceIdParam) {
      setLoadStatus("error");
      setLoadError("Missing service id in URL.");
      return;
    }

    if (isNewWizard) {
      setServiceData(createEmptyServiceForm());
      setLoadError(null);
      setLoadStatus("ready");
      setMaxReachedStep(1);
      setCurrentStep(1);
      setStepError(null);
      return;
    }

    let cancelled = false;
    setLoadStatus("loading");
    setLoadError(null);

    (async () => {
      const response = await FreelancingServiceService.getServiceById(serviceIdParam);
      if (cancelled) return;
      if (response.success && response.data) {
        setServiceData(mapFreelancingServiceToForm(response.data));
        setLoadStatus("ready");
        setMaxReachedStep(6);
        setStepError(null);
      } else {
        setLoadError(response.error || "Could not load this service.");
        setLoadStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [serviceIdParam, isNewWizard]);

  const steps = [
    { id: 1, title: "Basic Info", description: "Service details and category" },
    { id: 2, title: "Pricing", description: "Set your pricing structure" },
    { id: 3, title: "Delivery", description: "Delivery time and revisions" },
    { id: 4, title: "Media", description: "Images and portfolio" },
    { id: 5, title: "Requirements", description: "Client requirements" },
    { id: 6, title: "Preview", description: "Review and publish" },
  ];

  const handleNext = () => {
    if (currentStep >= steps.length) return;
    if (currentStep <= 5) {
      const result = validateWizardStep(
        currentStep as WizardStepNumber,
        serviceData
      );
      if (!result.ok) {
        setStepError(result.message);
        toast.error(result.message);
        return;
      }
    }
    setStepError(null);
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    setMaxReachedStep((prev) => Math.max(prev, nextStep));
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setStepError(null);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSidebarStepClick = (targetStep: number) => {
    if (targetStep === currentStep) return;
    if (targetStep < currentStep) {
      setStepError(null);
      setCurrentStep(targetStep);
      return;
    }
    if (targetStep > maxReachedStep) {
      toast.error(
        "Complete each step using Next to unlock later steps, or save and reopen your draft."
      );
      return;
    }
    setStepError(null);
    setCurrentStep(targetStep);
  };

  const invalidateFreelancerServices = useCallback(() => {
    if (user?.id) {
      void queryClient.invalidateQueries({
        queryKey: ["freelancer-services", user.id],
      });
    }
  }, [queryClient, user?.id]);

  const handleSaveDraft = async () => {
    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }

    const validationError = validateForCreate(serviceData);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsSavingDraft(true);
    try {
      if (!serviceData.id) {
        const response = await FreelancingServiceService.saveAsDraft(
          formToCreatePayload(serviceData, user.id)
        );
        if (response.success && response.data?.id) {
          const newId = response.data.id;
          setServiceData((prev) => ({ ...prev, id: newId }));
          toast.success("Service saved as draft");
          invalidateFreelancerServices();
          router.replace(routes.createNewService(newId));
        } else {
          toast.error(response.error || "Failed to save draft");
        }
      } else {
        const response = await FreelancingServiceService.updateService(
          formToUpdatePayload(serviceData)
        );
        if (response.success) {
          toast.success("Draft updated");
          invalidateFreelancerServices();
        } else {
          toast.error(response.error || "Failed to update draft");
        }
      }
    } catch {
      toast.error("Failed to save draft");
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handlePublish = async () => {
    if (!serviceData.id) {
      toast.error("Save as draft first before publishing.");
      return;
    }
    const all = validateAllWizardSteps(serviceData);
    if (!all.ok) {
      toast.error(all.message);
      return;
    }

    try {
      const response = await FreelancingServiceService.publishService(serviceData.id);
      if (response.success) {
        toast.success("Service published");
        invalidateFreelancerServices();
      } else {
        toast.error(response.error || "Failed to publish");
      }
    } catch {
      toast.error("Failed to publish");
    }
  };

  const handleDataUpdate = (updates: Partial<ServiceFormData>) => {
    setStepError(null);
    setServiceData((prev) => ({ ...prev, ...updates }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceBasicInfo
            data={serviceData}
            onUpdate={handleDataUpdate}
          />
        );
      case 2:
        return (
          <ServicePricing
            data={serviceData}
            onUpdate={handleDataUpdate}
          />
        );
      case 3:
        return (
          <ServiceDelivery
            data={serviceData}
            onUpdate={handleDataUpdate}
          />
        );
      case 4:
        return (
          <ServiceMedia
            data={serviceData}
            onUpdate={handleDataUpdate}
          />
        );
      case 5:
        return (
          <ServiceRequirements
            data={serviceData}
            onUpdate={handleDataUpdate}
          />
        );
      case 6:
        return (
          <ServicePreview
            data={serviceData}
            onPublish={handlePublish}
          />
        );
      default:
        return null;
    }
  };

  if (loadStatus === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Loading service…</p>
        </div>
      </div>
    );
  }

  if (loadStatus === "error") {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Could not open service</CardTitle>
            <CardDescription>{loadError ?? "Something went wrong."}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link href={user?.id ? routes.dashboard(user.id) : routes.logIn()}>
                Back to dashboard
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href={
                user?.id ? routes.dashboard(user.id) : routes.logIn()
              }
            >
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <Badge variant="outline" className="text-sm">
              Step {currentStep} of {steps.length}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create New Service
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {steps[currentStep - 1]?.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Steps Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service Setup</CardTitle>
                <CardDescription>
                  Complete all steps to publish your service
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {steps.map((step) => {
                  const lockedForward =
                    step.id > currentStep && step.id > maxReachedStep;
                  return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      lockedForward
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    } ${
                      currentStep === step.id
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                        : currentStep > step.id
                        ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                        : !lockedForward
                        ? "hover:bg-gray-50 dark:hover:bg-gray-800"
                        : ""
                    }`}
                    onClick={() => handleSidebarStepClick(step.id)}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep === step.id
                          ? "bg-blue-600 text-white"
                          : currentStep > step.id
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {currentStep > step.id ? "✓" : step.id}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{step.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {step.description}
                      </div>
                    </div>
                  </div>
                );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                {renderStepContent()}
              </CardContent>
            </Card>

            {stepError ? (
              <div
                role="alert"
                className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
              >
                {stepError}
              </div>
            ) : null}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleSaveDraft}
                  disabled={isSavingDraft}
                  className="gap-2"
                >
                  {isSavingDraft ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save Draft
                </Button>

                {currentStep < steps.length ? (
                  <Button onClick={handleNext} className="gap-2">
                    Next
                    <Plus className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handlePublish} className="gap-2 bg-green-600 hover:bg-green-700">
                    <Eye className="h-4 w-4" />
                    Publish Service
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
