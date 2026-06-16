"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Upload, Image, Video, Plus, Trash2 } from "lucide-react";
import { RequiredMark } from "./RequiredMark";
import {
  canonicalYoutubeEmbedUrl,
  parseYoutubeVideoIdFromInput,
  YOUTUBE_EMBED_ALLOW,
} from "@/lib/youtubeVideoIntroduction";

interface ServiceMediaData {
  gallery: string[];
  videoIntroduction: string;
  portfolioItems: string[];
  [key: string]: unknown; // Allow additional properties
}

interface ServiceMediaProps {
  data: ServiceMediaData;
  onUpdate: (updates: Partial<ServiceMediaData>) => void;
}

export default function ServiceMedia({ data, onUpdate }: ServiceMediaProps) {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (files: FileList) => {
    setUploading(true);
    try {
      // TODO: Implement actual file upload logic
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      onUpdate({ gallery: [...data.gallery, ...newImages] });
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newGallery = data.gallery.filter((_, i) => i !== index);
    onUpdate({ gallery: newGallery });
  };

  const handleAddPortfolioItem = () => {
    const newItem = prompt("Enter portfolio item ID or URL:");
    if (newItem) {
      onUpdate({ portfolioItems: [...data.portfolioItems, newItem] });
    }
  };

  const handleRemovePortfolioItem = (index: number) => {
    const newItems = data.portfolioItems.filter((_, i) => i !== index);
    onUpdate({ portfolioItems: newItems });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Media & Portfolio
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Showcase your work with images, videos, and portfolio items.
        </p>
      </div>

      {/* Service Gallery */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg flex-wrap">
            <Image className="h-5 w-5" />
            <span>
              Service Gallery
              <RequiredMark />
            </span>
          </CardTitle>
          <CardDescription>
            Upload images that showcase your service quality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Upload Service Images
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Drag and drop images here, or click to browse
              </p>
              <Button
                variant="outline"
                onClick={() => document.getElementById('image-upload')?.click()}
                disabled={uploading}
                className="gap-2"
              >
                {uploading ? "Uploading..." : "Choose Images"}
              </Button>
            </div>
            <Input
              id="image-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
              className="hidden"
            />
          </div>

          {data.gallery.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.gallery.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Video Introduction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Video className="h-5 w-5" />
            Video Introduction
          </CardTitle>
          <CardDescription>
            Paste your YouTube embed code (iframe) or a YouTube watch / embed / youtu.be link. Optional.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="video-intro" className="text-base font-medium">
              YouTube intro{" "}
              <span className="text-muted-foreground font-normal text-sm">(optional)</span>
            </Label>
            <Textarea
              id="video-intro"
              value={data.videoIntroduction}
              onChange={(e) => onUpdate({ videoIntroduction: e.target.value })}
              placeholder='e.g. <iframe src="https://www.youtube.com/embed/..."></iframe> or https://www.youtube.com/watch?v=...'
              className="mt-2 min-h-[100px] font-mono text-sm"
              rows={4}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Only YouTube links or embeds are accepted. The preview below updates when the input is valid.
            </p>
          </div>

          {(() => {
            const t = data.videoIntroduction.trim();
            const videoId = t ? parseYoutubeVideoIdFromInput(t) : null;
            const iframeSrc = videoId ? canonicalYoutubeEmbedUrl(videoId) : null;

            return iframeSrc ? (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Preview</p>
                <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                  <iframe
                    title="Video introduction preview"
                    src={iframeSrc}
                    className="absolute inset-0 h-full w-full border-0"
                    allow={YOUTUBE_EMBED_ALLOW}
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>
            ) : t ? (
              <p className="text-sm text-amber-700 dark:text-amber-400">
                Could not detect a valid YouTube video. Check the link or embed code.
              </p>
            ) : null;
          })()}
        </CardContent>
      </Card>

      {/* Portfolio Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Plus className="h-5 w-5" />
            Portfolio Items
          </CardTitle>
          <CardDescription>
            Link to your existing portfolio items
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={handleAddPortfolioItem}
              variant="outline"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Portfolio Item
            </Button>
          </div>

          {data.portfolioItems.length > 0 && (
            <div className="space-y-2">
              {data.portfolioItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">Portfolio Item</Badge>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemovePortfolioItem(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
