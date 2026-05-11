import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FreelancingServiceService } from "./freelancingService.service";
import { FreelancingServiceResponse } from "./freelancingService.types";

export const useDeleteFreelancingService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation<FreelancingServiceResponse, Error, string>({
    mutationFn: async (id: string) => {
      setIsLoading(true);
      try {
        const result = await FreelancingServiceService.deleteService(id);
        if (!result.success) {
          throw new Error(result.error || "Failed to delete service");
        }
        return result;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      // Invalidate and refetch freelancing services queries
      queryClient.invalidateQueries({ queryKey: ["freelancing-services"] });
      queryClient.invalidateQueries({ queryKey: ["freelancer-services"] });
    },
    onError: (error) => {
      console.error("Error deleting freelancing service:", error);
    }
  });

  const deleteService = async (id: string) => {
    return mutation.mutateAsync(id);
  };

  const deleteServiceAsync = (id: string) => {
    return mutation.mutate(id);
  };

  return {
    deleteService,
    deleteServiceAsync,
    isLoading: isLoading || mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    reset: mutation.reset
  };
};

