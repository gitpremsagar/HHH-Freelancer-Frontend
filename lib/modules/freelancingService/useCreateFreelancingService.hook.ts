import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FreelancingServiceService } from "./freelancingService.service";
import { CreateFreelancingServiceRequest, FreelancingServiceResponse } from "./freelancingService.types";

export const useCreateFreelancingService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation<FreelancingServiceResponse, Error, CreateFreelancingServiceRequest>({
    mutationFn: async (data: CreateFreelancingServiceRequest) => {
      setIsLoading(true);
      try {
        const result = await FreelancingServiceService.createService(data);
        if (!result.success) {
          throw new Error(result.error || "Failed to create service");
        }
        return result;
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: (data) => {
      // Invalidate and refetch freelancing services queries
      queryClient.invalidateQueries({ queryKey: ["freelancing-services"] });
      queryClient.invalidateQueries({ queryKey: ["freelancer-services"] });
    },
    onError: (error) => {
      console.error("Error creating freelancing service:", error);
    }
  });

  const createService = async (data: CreateFreelancingServiceRequest) => {
    return mutation.mutateAsync(data);
  };

  const createServiceAsync = (data: CreateFreelancingServiceRequest) => {
    return mutation.mutate(data);
  };

  return {
    createService,
    createServiceAsync,
    isLoading: isLoading || mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    reset: mutation.reset
  };
};

