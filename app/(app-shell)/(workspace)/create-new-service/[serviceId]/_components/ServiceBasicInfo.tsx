"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { useGetServiceCategories } from "@/lib/modules/serviceCategory/useGetServiceCategories.hook";
import { useGetServiceSubCategories } from "@/lib/modules/subCategory/useGetServiceSubCategories.hook";
import { ServiceCategory } from "@/lib/modules/serviceCategory/serviceCategory.type";

interface ServiceBasicInfoData {
  title: string;
  description: string;
  serviceCategoryId: string;
  serviceSubCategoryId: string;
  tags: string[];
  [key: string]: unknown; // Allow additional properties
}

interface ServiceBasicInfoProps {
  data: ServiceBasicInfoData;
  onUpdate: (updates: Partial<ServiceBasicInfoData>) => void;
}

export default function ServiceBasicInfo({ data, onUpdate }: ServiceBasicInfoProps) {
  const [tagInput, setTagInput] = useState("");
  const { data: categories, isLoading: categoriesLoading } = useGetServiceCategories();
  const { data: subCategories, isLoading: subCategoriesLoading } = useGetServiceSubCategories(data.serviceCategoryId);

  const handleAddTag = () => {
    if (tagInput.trim() && !data.tags.includes(tagInput.trim())) {
      onUpdate({ tags: [...data.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onUpdate({ tags: data.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Basic Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tell us about your service and help clients find it easily.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Service Title */}
        <div className="md:col-span-2">
          <Label htmlFor="title" className="text-base font-medium">
            Service Title *
          </Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="e.g., Professional Logo Design for Your Brand"
            className="mt-2"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Be specific and descriptive. This will be the first thing clients see.
          </p>
        </div>

        {/* Service Description */}
        <div className="md:col-span-2">
          <Label htmlFor="description" className="text-base font-medium">
            Service Description *
          </Label>
          <Textarea
            id="description"
            value={data.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            placeholder="Describe what you'll deliver, your process, and what makes you unique..."
            className="mt-2 min-h-[120px]"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {data.description.length}/2000 characters
          </p>
        </div>

        {/* Category Selection */}
        <div>
          <Label htmlFor="category" className="text-base font-medium">
            Service Category *
          </Label>
          <Select
            value={data.serviceCategoryId}
            onValueChange={(value) => onUpdate({ serviceCategoryId: value, serviceSubCategoryId: "" })}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categoriesLoading ? (
                <SelectItem value="loading" disabled>Loading categories...</SelectItem>
              ) : (
                categories?.map((category: ServiceCategory) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Subcategory Selection */}
        <div>
          <Label htmlFor="subcategory" className="text-base font-medium">
            Service Subcategory *
          </Label>
          <Select
            value={data.serviceSubCategoryId}
            onValueChange={(value) => onUpdate({ serviceSubCategoryId: value })}
            disabled={!data.serviceCategoryId}
          >
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select a subcategory" />
            </SelectTrigger>
            <SelectContent>
              {subCategoriesLoading ? (
                <SelectItem value="loading" disabled>Loading subcategories...</SelectItem>
              ) : subCategories && subCategories.length > 0 ? (
                subCategories.map((subCategory) => (
                  <SelectItem key={subCategory.id} value={subCategory.id}>
                    {subCategory.name}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="none" disabled>No subcategories available</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Tags */}
        <div className="md:col-span-2">
          <Label htmlFor="tags" className="text-base font-medium">
            Tags
          </Label>
          <div className="mt-2 space-y-3">
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag (e.g., logo design, branding)"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddTag}
                disabled={!tagInput.trim()}
                size="sm"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
            
            {data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="gap-1 pr-1"
                  >
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveTag(tag)}
                      className="h-4 w-4 p-0 hover:bg-transparent"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Add relevant tags to help clients find your service. Press Enter to add.
          </p>
        </div>
      </div>
    </div>
  );
}
