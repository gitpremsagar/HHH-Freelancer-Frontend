"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Eye, 
  Clock, 
  DollarSign, 
  Shield, 
  Globe, 
  MessageSquare,
  Star,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface ServicePreviewData {
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
  [key: string]: unknown; // Allow additional properties
}

interface ServicePreviewProps {
  data: ServicePreviewData;
  onPublish: () => void;
}

export default function ServicePreview({ data, onPublish }: ServicePreviewProps) {
  const isComplete = () => {
    return !!(
      data.title &&
      data.description &&
      data.serviceCategoryId &&
      data.serviceSubCategoryId &&
      (data.basePrice > 0 || data.isCustomPricing)
    );
  };

  const getCompletionPercentage = () => {
    const fields = [
      data.title,
      data.description,
      data.serviceCategoryId,
      data.serviceSubCategoryId,
      data.basePrice > 0 || data.isCustomPricing,
      data.deliveryTime > 0,
      data.requirements,
      data.communicationLanguage.length > 0,
      data.timezone
    ];
    
    const completedFields = fields.filter(Boolean).length;
    return Math.round((completedFields / fields.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Service Preview
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Review your service before publishing. Make sure everything looks perfect!
        </p>
      </div>

      {/* Completion Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isComplete() ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            )}
            Service Completion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Completion Status</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {getCompletionPercentage()}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getCompletionPercentage()}%` }}
              />
            </div>
            {!isComplete() && (
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                Please complete all required fields before publishing.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Service Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            How Your Service Will Appear
          </CardTitle>
          <CardDescription>
            This is how clients will see your service
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Service Header */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {data.title || "Your Service Title"}
              </h3>
              {data.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>New Service</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{data.deliveryTime} day delivery</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>
                  {data.isCustomPricing 
                    ? "Custom Pricing" 
                    : `${data.currency} ${data.basePrice}`
                  }
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Service Description */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              About This Service
            </h4>
            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
              {data.description || "Your service description will appear here..."}
            </p>
          </div>

          <Separator />

          {/* Service Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  What&apos;s Included
                </h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    High-quality delivery
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {data.revisionPolicy} revision{data.revisionPolicy !== 1 ? 's' : ''}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Source files included
                  </li>
                  {data.rushDeliveryAvailable && (
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Rush delivery available
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Communication
                </h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>
                      Languages: {data.communicationLanguage.length > 0 
                        ? data.communicationLanguage.join(", ") 
                        : "Not specified"
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>
                      Timezone: {data.timezone || "Not specified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          {data.requirements && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  What I Need From You
                </h4>
                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap text-sm">
                  {data.requirements}
                </p>
              </div>
            </>
          )}

          {/* Delivery Guarantee */}
          {data.deliveryGuarantee && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Delivery Guarantee
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {data.deliveryGuarantee}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Publish Button */}
      <div className="flex justify-center">
        <Button
          onClick={onPublish}
          disabled={!isComplete()}
          size="lg"
          className="gap-2 bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="h-5 w-5" />
          Publish Service
        </Button>
      </div>
    </div>
  );
}
