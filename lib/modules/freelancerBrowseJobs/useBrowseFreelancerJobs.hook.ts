import { useQuery } from "@tanstack/react-query";
import { fetchBrowseJobs, type BrowseJobsParams } from "./freelancerBrowseJobs.service";

export function useBrowseFreelancerJobs(params: BrowseJobsParams | null) {
  return useQuery({
    queryKey: [
      "freelancer-browse-jobs",
      params?.categorySlug,
      params?.subCategorySlug,
      params?.page,
      params?.limit,
    ],
    queryFn: async () => {
      if (!params) throw new Error("Missing browse params");
      return fetchBrowseJobs(params);
    },
    enabled:
      !!params?.categorySlug &&
      !!params?.subCategorySlug &&
      params.categorySlug.length > 0 &&
      params.subCategorySlug.length > 0,
    staleTime: 60 * 1000,
  });
}
