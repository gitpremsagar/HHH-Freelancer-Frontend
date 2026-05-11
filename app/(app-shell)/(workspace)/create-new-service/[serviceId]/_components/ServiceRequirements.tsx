"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Globe, Clock, MessageSquare } from "lucide-react";

interface ServiceRequirementsData {
  requirements: string;
  communicationLanguage: string[];
  timezone: string;
  [key: string]: unknown; // Allow additional properties
}

interface ServiceRequirementsProps {
  data: ServiceRequirementsData;
  onUpdate: (updates: Partial<ServiceRequirementsData>) => void;
}

export default function ServiceRequirements({ data, onUpdate }: ServiceRequirementsProps) {
  const [newLanguage, setNewLanguage] = useState("");

  const timezones = [
    { value: "UTC", label: "UTC (Coordinated Universal Time)" },
    { value: "America/New_York", label: "EST (Eastern Time)" },
    { value: "America/Chicago", label: "CST (Central Time)" },
    { value: "America/Denver", label: "MST (Mountain Time)" },
    { value: "America/Los_Angeles", label: "PST (Pacific Time)" },
    { value: "Europe/London", label: "GMT (Greenwich Mean Time)" },
    { value: "Europe/Paris", label: "CET (Central European Time)" },
    { value: "Asia/Tokyo", label: "JST (Japan Standard Time)" },
    { value: "Asia/Shanghai", label: "CST (China Standard Time)" },
    { value: "Asia/Kolkata", label: "IST (India Standard Time)" },
    { value: "Australia/Sydney", label: "AEST (Australian Eastern Time)" },
  ];

  const commonLanguages = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese",
    "Chinese", "Japanese", "Korean", "Arabic", "Hindi", "Russian"
  ];

  const handleAddLanguage = () => {
    if (newLanguage.trim() && !data.communicationLanguage.includes(newLanguage.trim())) {
      onUpdate({ communicationLanguage: [...data.communicationLanguage, newLanguage.trim()] });
      setNewLanguage("");
    }
  };

  const handleRemoveLanguage = (languageToRemove: string) => {
    onUpdate({ 
      communicationLanguage: data.communicationLanguage.filter(lang => lang !== languageToRemove) 
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddLanguage();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Service Requirements
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Set clear requirements and communication preferences for your clients.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Client Requirements */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquare className="h-5 w-5" />
              Client Requirements
            </CardTitle>
            <CardDescription>
              What information do you need from clients to get started?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="requirements" className="text-base font-medium">
                Service Requirements
              </Label>
              <Textarea
                id="requirements"
                value={data.requirements}
                onChange={(e) => onUpdate({ requirements: e.target.value })}
                placeholder="Please provide the following information:
• Project description and goals
• Brand guidelines or style preferences
• Target audience information
• Any specific requirements or constraints
• Reference materials or examples"
                className="mt-2 min-h-[150px]"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Be specific about what information clients need to provide
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Communication Languages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5" />
              Communication Languages
            </CardTitle>
            <CardDescription>
              What languages can you communicate in?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a language"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddLanguage}
                disabled={!newLanguage.trim()}
                size="sm"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Quick Add:
              </p>
              <div className="flex flex-wrap gap-2">
                {commonLanguages.map((language) => (
                  <Button
                    key={language}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (!data.communicationLanguage.includes(language)) {
                        onUpdate({ 
                          communicationLanguage: [...data.communicationLanguage, language] 
                        });
                      }
                    }}
                    disabled={data.communicationLanguage.includes(language)}
                    className="text-xs"
                  >
                    {language}
                  </Button>
                ))}
              </div>
            </div>

            {data.communicationLanguage.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Selected Languages:
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.communicationLanguage.map((language, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="gap-1 pr-1"
                    >
                      {language}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveLanguage(language)}
                        className="h-4 w-4 p-0 hover:bg-transparent"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Timezone */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5" />
              Your Timezone
            </CardTitle>
            <CardDescription>
              Help clients understand your availability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="timezone" className="text-base font-medium">
                Timezone
              </Label>
              <Select
                value={data.timezone}
                onValueChange={(value) => onUpdate({ timezone: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select your timezone" />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                This helps clients understand your working hours
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
