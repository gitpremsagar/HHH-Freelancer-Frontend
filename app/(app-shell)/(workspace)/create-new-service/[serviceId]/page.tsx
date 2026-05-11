"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Save, Eye } from "lucide-react";
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
import { CreateFreelancingServiceRequest } from "@/lib/modules/freelancingService/freelancingService.types";
import { useAppSelector } from "@/hooks/redux";
import { routes } from "@/lib/routes";

export default function CreateNewServicePage() {
  const user = useAppSelector((state) => state.auth.user);
  const [currentStep, setCurrentStep] = useState(1);
  const [serviceData, setServiceData] = useState({
    id: "",
    // Basic Info
    title: "",
    description: "",
    serviceCategoryId: "",
    serviceSubCategoryId: "",
    
    // Pricing
    basePrice: 0,
    currency: "USD",
    isCustomPricing: false,
    
    // Delivery
    deliveryTime: 1,
    revisionPolicy: 0,
    rushDeliveryAvailable: false,
    rushDeliveryFee: 0,
    deliveryGuarantee: "",
    
    // Media
    gallery: [] as string[],
    videoIntroduction: "",
    portfolioItems: [] as string[],
    
    // Requirements
    requirements: "",
    communicationLanguage: [] as string[],
    timezone: "",
    
    // SEO
    tags: [] as string[],
    keywords: [] as string[],
    metaDescription: "",
  });

  const steps = [
    { id: 1, title: "Basic Info", description: "Service details and category" },
    { id: 2, title: "Pricing", description: "Set your pricing structure" },
    { id: 3, title: "Delivery", description: "Delivery time and revisions" },
    { id: 4, title: "Media", description: "Images and portfolio" },
    { id: 5, title: "Requirements", description: "Client requirements" },
    { id: 6, title: "Preview", description: "Review and publish" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = async () => {
    // TODO: Implement save as draft functionality
    console.log("Saving as draft:", serviceData);
    if (serviceData.title === "") {
      toast.error("Service title connot be empty for saving as draft");
      return;
    }

    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }

    try {
      const response = await FreelancingServiceService.saveAsDraft({
        ...serviceData,
        freelancerId: user.id,
      } as CreateFreelancingServiceRequest);
      if (response.success) {
        toast.success("Service saved as draft");
      }
    } catch (error) {
      toast.error("Failed to save as draft");
    }
  };

  const handlePublish = async () => {
    // TODO: Implement publish functionality
    console.log("Publishing service:", serviceData);
    if (serviceData.title === "") {
      toast.error("Service title connot be empty for publishing");
      return;
    }

    try {
      const response = await FreelancingServiceService.publishService(serviceData.id as string);
      if (response.success) {
        toast.success("Service published");
      }
    } catch (error) {
      toast.error("Failed to publish");
    }
  }

  const handleDataUpdate = (updates: Partial<typeof serviceData>) => {
    setServiceData({ ...serviceData, ...updates });
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
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                      currentStep === step.id
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                        : currentStep > step.id
                        ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setCurrentStep(step.id)}
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
                ))}
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
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
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
