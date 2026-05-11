"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Clock, Zap, Shield } from "lucide-react";

interface ServiceDeliveryData {
  deliveryTime: number;
  revisionPolicy: number;
  rushDeliveryAvailable: boolean;
  rushDeliveryFee: number;
  deliveryGuarantee: string;
  [key: string]: unknown; // Allow additional properties
}

interface ServiceDeliveryProps {
  data: ServiceDeliveryData;
  onUpdate: (updates: Partial<ServiceDeliveryData>) => void;
}

export default function ServiceDelivery({ data, onUpdate }: ServiceDeliveryProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Delivery & Revisions
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Set clear expectations for delivery time and revision policies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Delivery Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5" />
              Delivery Time
            </CardTitle>
            <CardDescription>
              How long will it take to complete the service?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="delivery-time" className="text-base font-medium">
                  Delivery Time (days) *
                </Label>
                <Input
                  id="delivery-time"
                  type="number"
                  value={data.deliveryTime}
                  onChange={(e) => onUpdate({ deliveryTime: parseInt(e.target.value) || 1 })}
                  placeholder="e.g., 3"
                  className="mt-2"
                  min="1"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Standard delivery time for your service
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revision Policy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5" />
              Revision Policy
            </CardTitle>
            <CardDescription>
              How many revisions are included?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="revisions" className="text-base font-medium">
                  Number of Revisions
                </Label>
                <Input
                  id="revisions"
                  type="number"
                  value={data.revisionPolicy}
                  onChange={(e) => onUpdate({ revisionPolicy: parseInt(e.target.value) || 0 })}
                  placeholder="e.g., 2"
                  className="mt-2"
                  min="0"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Set to 0 for no revisions included
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rush Delivery */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="h-5 w-5" />
            Rush Delivery Options
          </CardTitle>
          <CardDescription>
            Offer faster delivery for an additional fee
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="rush-delivery" className="text-base font-medium">
                Enable Rush Delivery
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Allow clients to request faster delivery
              </p>
            </div>
            <Switch
              id="rush-delivery"
              checked={data.rushDeliveryAvailable}
              onCheckedChange={(checked) => onUpdate({ rushDeliveryAvailable: checked })}
            />
          </div>

          {data.rushDeliveryAvailable && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rush-fee" className="text-base font-medium">
                  Rush Delivery Fee
                </Label>
                <Input
                  id="rush-fee"
                  type="number"
                  value={data.rushDeliveryFee}
                  onChange={(e) => onUpdate({ rushDeliveryFee: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                  className="mt-2"
                  min="0"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Additional fee for rush delivery
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delivery Guarantee */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5" />
            Delivery Guarantee
          </CardTitle>
          <CardDescription>
            Build trust with your delivery guarantee
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="delivery-guarantee" className="text-base font-medium">
              Delivery Guarantee
            </Label>
            <Textarea
              id="delivery-guarantee"
              value={data.deliveryGuarantee}
              onChange={(e) => onUpdate({ deliveryGuarantee: e.target.value })}
              placeholder="e.g., I guarantee delivery within the specified timeframe or your money back..."
              className="mt-2 min-h-[100px]"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Optional: Describe your delivery guarantee to build client confidence
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
