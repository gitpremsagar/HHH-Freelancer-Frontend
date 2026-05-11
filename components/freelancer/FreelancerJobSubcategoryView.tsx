"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { AlertCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBrowseFreelancerJobs } from "@/lib/modules/freelancerBrowseJobs/useBrowseFreelancerJobs.hook";
import type { BrowseJobRow } from "@/lib/modules/freelancerBrowseJobs/freelancerBrowseJobs.types";

function formatBudget(job: BrowseJobRow): string {
  const cur = job.currency || "USD";
  if (job.budgetType === "RANGE" && job.budgetMin != null && job.budgetMax != null) {
    return `${cur} ${job.budgetMin.toLocaleString()} – ${job.budgetMax.toLocaleString()}`;
  }
  if (job.budget != null) {
    return `${cur} ${job.budget.toLocaleString()}`;
  }
  if (job.budgetType === "NEGOTIABLE") {
    return "Negotiable";
  }
  return "Budget on request";
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

export function FreelancerJobSubcategoryView({
  categorySlug,
  subCategorySlug,
}: {
  categorySlug: string;
  subCategorySlug: string;
}) {
  const [page, setPage] = useState(1);
  const params = useMemo(
    () => ({ categorySlug, subCategorySlug, page, limit: 12 }),
    [categorySlug, subCategorySlug, page]
  );

  const { data, isLoading, isError, error, refetch, isFetching } =
    useBrowseFreelancerJobs(params);

  useEffect(() => {
    setPage(1);
  }, [categorySlug, subCategorySlug]);

  const pagination = data?.data.pagination;
  const jobs = data?.data.jobs ?? [];

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Jobs in this category</h1>
        <p className="text-muted-foreground">
          Open roles matching the subcategory you selected. Use the sidebar to switch
          categories.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm">Loading jobs…</p>
        </div>
      ) : isError ? (
        <Card className="border-destructive/50">
          <CardHeader>
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <CardTitle className="text-lg">Could not load jobs</CardTitle>
            </div>
            <CardDescription>
              {error instanceof Error ? error.message : "Something went wrong."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Try again
            </Button>
          </CardContent>
        </Card>
      ) : jobs.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">No open jobs yet</CardTitle>
            <CardDescription>
              There are no published openings for this subcategory right now. Try another
              subcategory from the left menu.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <>
          <ul className="flex flex-col gap-4">
            {jobs.map((job) => (
              <li key={job.id}>
                <Card className="overflow-hidden transition-shadow hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <CardTitle className="text-xl font-semibold leading-tight">
                        {job.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2">
                        {job.isUrgent ? (
                          <Badge variant="destructive">Urgent</Badge>
                        ) : null}
                        <Badge variant="secondary">{job.complexity}</Badge>
                      </div>
                    </div>
                    <CardDescription className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
                      <span>{formatBudget(job)}</span>
                      <span aria-hidden>·</span>
                      <span>Deadline {format(new Date(job.deadline), "MMM d, yyyy")}</span>
                      {job.client?.name ? (
                        <>
                          <span aria-hidden>·</span>
                          <span>Client {job.client.name}</span>
                        </>
                      ) : null}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {truncate(job.description, 220)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {job.experienceLevel.replace(/_/g, " ")} ·{" "}
                      {job.serviceSubCategory.replace(/_/g, " ")}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>

          {pagination && pagination.totalPages > 1 ? (
            <div className="flex items-center justify-between gap-4 border-t pt-4">
              <p className="text-sm text-muted-foreground">
                Page {pagination.currentPage} of {pagination.totalPages} (
                {pagination.totalItems} jobs)
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagination.hasPrevPage || isFetching}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagination.hasNextPage || isFetching}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
