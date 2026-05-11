import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FreelancingServiceService } from "./freelancingService.service";
import { UpdateFreelancingServiceRequest, FreelancingServiceResponse } from "./freelancingService.types";

export const useUpdateFreelancingService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation<FreelancingServiceResponse, Error, UpdateFreelancingServiceRequest>({
    mutationFn: async (data: UpdateFreelancingServiceRequest) => {
      setIsLoading(true);
      try {
        const result = await FreelancingServiceService.updateService(data);
        if (!result.success) {
          throw new Error(result.error || "Failed to update service");
        }
        return result;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch freelancing services queries
      queryClient.invalidateQueries({ queryKey: ["freelancing-services"] });
      queryClient.invalidateQueries({ queryKey: ["freelancer-services"] });
      queryClient.invalidateQueries({ queryKey: ["freelancing-service", variables.id] });
    },
    onError: (error) => {
      console.error("Error updating freelancing service:", error);
    }
  });

  const updateService = async (data: UpdateFreelancingServiceRequest) => {
    return mutation.mutateAsync(data);
  };

  const updateServiceAsync = (data: UpdateFreelancingServiceRequest) => {
    return mutation.mutate(data);
  };

  return {
    updateService,
    updateServiceAsync,
    isLoading: isLoading || mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    reset: mutation.reset
  };
};

