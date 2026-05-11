"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, DollarSign } from "lucide-react";

interface ServicePricingData {
  basePrice: number;
  currency: string;
  isCustomPricing: boolean;
  [key: string]: unknown; // Allow additional properties
}

interface ServicePricingProps {
  data: ServicePricingData;
  onUpdate: (updates: Partial<ServicePricingData>) => void;
}

interface PricingPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  deliveryDays: number;
  revisions: number;
  features: string[];
}

export default function ServicePricing({ data, onUpdate }: ServicePricingProps) {
  const [packages, setPackages] = useState<PricingPackage[]>([
    {
      id: "1",
      name: "Basic",
      description: "Perfect for simple projects",
      price: data.basePrice || 50,
      deliveryDays: 3,
      revisions: 1,
      features: ["High-quality delivery", "Source files included"]
    }
  ]);

  const [newFeature, setNewFeature] = useState("");
  const [editingPackage, setEditingPackage] = useState<string | null>(null);

  const currencies = [
    { value: "USD", label: "USD - US Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "CAD", label: "CAD - Canadian Dollar" },
    { value: "AUD", label: "AUD - Australian Dollar" },
  ];

  const handleAddPackage = () => {
    const newPackage: PricingPackage = {
      id: Date.now().toString(),
      name: `Package ${packages.length + 1}`,
      description: "Custom package description",
      price: 0,
      deliveryDays: 1,
      revisions: 0,
      features: []
    };
    setPackages([...packages, newPackage]);
    setEditingPackage(newPackage.id);
  };

  const handleUpdatePackage = (id: string, updates: Partial<PricingPackage>) => {
    setPackages(packages.map(pkg => 
      pkg.id === id ? { ...pkg, ...updates } : pkg
    ));
  };

  const handleDeletePackage = (id: string) => {
    if (packages.length > 1) {
      setPackages(packages.filter(pkg => pkg.id !== id));
    }
  };

  const handleAddFeature = (packageId: string) => {
    if (newFeature.trim()) {
      const packageToUpdate = packages.find(pkg => pkg.id === packageId);
      if (packageToUpdate) {
        handleUpdatePackage(packageId, {
          features: [...packageToUpdate.features, newFeature.trim()]
        });
        setNewFeature("");
      }
    }
  };

  const handleRemoveFeature = (packageId: string, featureIndex: number) => {
    const packageToUpdate = packages.find(pkg => pkg.id === packageId);
    if (packageToUpdate) {
      const updatedFeatures = packageToUpdate.features.filter((_, index) => index !== featureIndex);
      handleUpdatePackage(packageId, { features: updatedFeatures });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Pricing & Packages
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Set your pricing structure and create service packages.
        </p>
      </div>

      {/* Pricing Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Pricing Options
          </CardTitle>
          <CardDescription>
            Choose how you want to price your service
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="custom-pricing" className="text-base font-medium">
                Custom Pricing
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Allow clients to request custom quotes
              </p>
            </div>
            <Switch
              id="custom-pricing"
              checked={data.isCustomPricing}
              onCheckedChange={(checked) => onUpdate({ isCustomPricing: checked })}
            />
          </div>

          {!data.isCustomPricing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="base-price" className="text-base font-medium">
                  Base Price *
                </Label>
                <div className="flex gap-2 mt-2">
                  <Select
                    value={data.currency}
                    onValueChange={(value) => onUpdate({ currency: value })}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="base-price"
                    type="number"
                    value={data.basePrice}
                    onChange={(e) => onUpdate({ basePrice: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Service Packages */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Service Packages</CardTitle>
              <CardDescription>
                Create different tiers of your service
              </CardDescription>
            </div>
            <Button onClick={handleAddPackage} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Package
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {packages.map((pkg, index) => (
            <Card key={pkg.id} className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">Package {index + 1}</Badge>
                    {packages.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePackage(pkg.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Package Name</Label>
                    <Input
                      value={pkg.name}
                      onChange={(e) => handleUpdatePackage(pkg.id, { name: e.target.value })}
                      placeholder="e.g., Basic, Standard, Premium"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Price ({data.currency})</Label>
                    <Input
                      type="number"
                      value={pkg.price}
                      onChange={(e) => handleUpdatePackage(pkg.id, { price: parseFloat(e.target.value) || 0 })}
                      placeholder="0.00"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <Input
                    value={pkg.description}
                    onChange={(e) => handleUpdatePackage(pkg.id, { description: e.target.value })}
                    placeholder="Describe what's included in this package"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Delivery Time (days)</Label>
                    <Input
                      type="number"
                      value={pkg.deliveryDays}
                      onChange={(e) => handleUpdatePackage(pkg.id, { deliveryDays: parseInt(e.target.value) || 1 })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Revisions</Label>
                    <Input
                      type="number"
                      value={pkg.revisions}
                      onChange={(e) => handleUpdatePackage(pkg.id, { revisions: parseInt(e.target.value) || 0 })}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Features</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add a feature"
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddFeature(pkg.id);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => handleAddFeature(pkg.id)}
                      disabled={!newFeature.trim()}
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {pkg.features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {pkg.features.map((feature, featureIndex) => (
                        <Badge
                          key={featureIndex}
                          variant="secondary"
                          className="gap-1 pr-1"
                        >
                          {feature}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFeature(pkg.id, featureIndex)}
                            className="h-4 w-4 p-0 hover:bg-transparent"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
