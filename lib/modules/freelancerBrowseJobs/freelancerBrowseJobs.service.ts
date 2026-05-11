import { API } from "@/lib/constants";
import type { BrowseJobsListResponse } from "./freelancerBrowseJobs.types";

export type BrowseJobsParams = {
  categorySlug: string;
  subCategorySlug: string;
  page?: number;
  limit?: number;
};

export async function fetchBrowseJobs(
  params: BrowseJobsParams
): Promise<BrowseJobsListResponse> {
  const search = new URLSearchParams({
    categorySlug: params.categorySlug,
    subCategorySlug: params.subCategorySlug,
    page: String(params.page ?? 1),
    limit: String(params.limit ?? 20),
  });

  const res = await fetch(`${API.FREELANCER_BROWSE_JOBS.LIST}?${search}`, {
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
  });

  const json = (await res.json()) as BrowseJobsListResponse;

  if (!res.ok) {
    throw new Error(
      typeof (json as { message?: string }).message === "string"
        ? (json as { message: string }).message
        : `Failed to load jobs (${res.status})`
    );
  }

  if (!json.success || !json.data) {
    throw new Error(json.message || "Failed to load jobs");
  }

  return json;
}
