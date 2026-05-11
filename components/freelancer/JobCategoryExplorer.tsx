"use client";

import {
  ChevronDown,
  Search,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { API } from "@/lib/constants";
import { ServiceCategoryResponse } from "@/lib/modules/serviceCategory/serviceCategory.type";
import {
  DEFAULT_CATEGORY_SIDEBAR_ICON,
  DEFAULT_SUBCATEGORY_SIDEBAR_ICON,
  getTaxonomyLucideIcon,
} from "@/lib/service-taxonomy-icons";
import { routes } from "@/lib/routes";

interface JobCategoryExplorerProps {
  className?: string;
}

export function JobCategoryExplorer({ className }: JobCategoryExplorerProps) {
  const pathname = usePathname();
  const [categories, setCategories] = useState<ServiceCategoryResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API.CATEGORIES.GET_ALL}`, {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.status}`);
      }

      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load categories"
      );
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const filteredCategories =
    categories?.data.serviceCategories.filter((category) => {
      if (!searchQuery) return true;
      const categoryMatch = category.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const subCategoryMatch = category.ServiceSubCategory.some((sub) =>
        sub.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return categoryMatch || subCategoryMatch;
    }) || [];

  const isMenuItemActive = (categorySlug: string, subCategorySlug: string) => {
    const expectedPath = routes.jobCategory(categorySlug, subCategorySlug);
    return pathname === expectedPath;
  };

  useEffect(() => {
    if (!categories) return;
    const activeCategory = categories.data.serviceCategories.find((cat) =>
      cat.ServiceSubCategory.some((sub) =>
        isMenuItemActive(cat.slug, sub.slug)
      )
    );
    setExpandedCategories(
      activeCategory ? new Set([activeCategory.id]) : new Set()
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, categories]);

  if (loading) {
    return (
      <div className={`space-y-4 p-2 ${className ?? ""}`}>
        <Skeleton className="h-9 w-full" />
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-4 text-center space-y-3 ${className ?? ""}`}
      >
        <AlertCircle className="h-8 w-8 text-destructive" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-destructive">
            Failed to load categories
          </p>
          <p className="text-xs text-muted-foreground">{error}</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchCategories}>
          <RefreshCw className="h-3 w-3 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <div className="relative px-2 pt-2">
        <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-9 pl-9 pr-8"
          aria-label="Search job categories"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            type="button"
            className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 p-0 text-muted-foreground hover:text-foreground"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
          >
            ×
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-0.5 px-2 pb-4">
        {filteredCategories.length === 0 && searchQuery ? (
          <div className="flex flex-col items-center justify-center p-6 text-center text-sm text-muted-foreground">
            No categories match “{searchQuery}”.
          </div>
        ) : (
          filteredCategories.map((category) => {
            const isExpanded = expandedCategories.has(category.id);
            const filteredSubCategories = category.ServiceSubCategory.filter(
              (sub) =>
                !searchQuery ||
                sub.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            const CategoryIcon = getTaxonomyLucideIcon(
              category.icon,
              DEFAULT_CATEGORY_SIDEBAR_ICON
            );
            const isCategoryActive = category.ServiceSubCategory.some((sub) =>
              isMenuItemActive(category.slug, sub.slug)
            );

            return (
              <Collapsible
                key={category.id}
                open={isExpanded}
                onOpenChange={() => toggleCategory(category.id)}
                className="group/collapsible"
              >
                <CollapsibleTrigger
                  className={`relative flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isCategoryActive
                      ? "bg-green-500/10 text-green-700 dark:text-green-300 font-semibold"
                      : "text-foreground hover:bg-muted"
                  }`}
                  aria-expanded={isExpanded}
                  aria-label={`${isExpanded ? "Collapse" : "Expand"} ${category.name}`}
                >
                  {isCategoryActive && (
                    <span
                      aria-hidden
                      className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-green-600"
                    />
                  )}
                  <div className="flex min-w-0 items-center gap-2.5">
                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                        isCategoryActive
                          ? "bg-green-600 text-white shadow-sm"
                          : "bg-muted text-muted-foreground"
                      }`}
                      aria-hidden
                    >
                      <CategoryIcon className="h-3.5 w-3.5" />
                    </div>
                    <span className="truncate">{category.name}</span>
                    <Badge
                      variant="secondary"
                      className={`h-5 min-w-5 rounded-full px-1.5 text-[10px] font-medium leading-none ${
                        isCategoryActive
                          ? "border-0 bg-green-600/15 text-green-700 dark:text-green-300"
                          : ""
                      }`}
                    >
                      {filteredSubCategories.length}
                    </Badge>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-4 mt-1 space-y-0.5 border-l border-border pl-3">
                    {filteredSubCategories.map((subCategory) => {
                      const isActive = isMenuItemActive(
                        category.slug,
                        subCategory.slug
                      );
                      const SubIcon = getTaxonomyLucideIcon(
                        subCategory.icon,
                        DEFAULT_SUBCATEGORY_SIDEBAR_ICON
                      );
                      return (
                        <Link
                          key={subCategory.id}
                          href={routes.jobCategory(category.slug, subCategory.slug)}
                          className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors ${
                            isActive
                              ? "bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-sm"
                              : "hover:bg-green-500/10 hover:text-green-800 dark:hover:text-green-200"
                          }`}
                          aria-label={`View ${subCategory.name} jobs`}
                        >
                          <div
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
                              isActive
                                ? "bg-white/20 text-white"
                                : "bg-green-500/10 text-green-600 dark:text-green-400"
                            }`}
                          >
                            <SubIcon className="h-3 w-3" />
                          </div>
                          <span
                            className={`flex-1 truncate ${isActive ? "text-white" : ""}`}
                          >
                            {subCategory.name}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })
        )}
      </div>
    </div>
  );
}
