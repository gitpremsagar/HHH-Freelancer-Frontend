import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FreelancingServiceService } from "./freelancingService.service";
import { FreelancingServiceResponse } from "./freelancingService.types";

export const usePublishFreelancingService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation<FreelancingServiceResponse, Error, string>({
    mutationFn: async (id: string) => {
      setIsLoading(true);
      try {
        const result = await FreelancingServiceService.publishService(id);
        if (!result.success) {
          throw new Error(result.error || "Failed to publish service");
        }
        return result;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: (data, id) => {
      // Invalidate and refetch freelancing services queries
      queryClient.invalidateQueries({ queryKey: ["freelancing-services"] });
      queryClient.invalidateQueries({ queryKey: ["freelancer-services"] });
      queryClient.invalidateQueries({ queryKey: ["freelancing-service", id] });
    },
    onError: (error) => {
      console.error("Error publishing freelancing service:", error);
    }
  });

  const publishService = async (id: string) => {
    return mutation.mutateAsync(id);
  };

  const publishServiceAsync = (id: string) => {
    return mutation.mutate(id);
  };

  return {
    publishService,
    publishServiceAsync,
    isLoading: isLoading || mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    reset: mutation.reset
  };
};

