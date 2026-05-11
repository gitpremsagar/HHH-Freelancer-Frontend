import { useQuery } from "@tanstack/react-query";
import { FreelancingServiceService } from "./freelancingService.service";
import { FreelancingServiceQueryInput } from "./freelancingService.schemas";

export const useGetFreelancingServices = (params: Partial<FreelancingServiceQueryInput> = {}) => {
  return useQuery({
    queryKey: ["freelancing-services", params],
    queryFn: async () => {
      const result = await FreelancingServiceService.getServices(params as Parameters<typeof FreelancingServiceService.getServices>[0]);
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch services");
      }
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useGetFreelancingServiceById = (id: string) => {
  return useQuery({
    queryKey: ["freelancing-service", id],
    queryFn: async () => {
      const result = await FreelancingServiceService.getServiceById(id);
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch service");
      }
      return result;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

import { ServiceStatus } from "./freelancingService.types";

export const useGetFreelancerServices = (freelancerId: string, params: {
  page?: number;
  limit?: number;
  status?: ServiceStatus;
  isActive?: boolean;
} = {}) => {
  return useQuery({
    queryKey: ["freelancer-services", freelancerId, params],
    queryFn: async () => {
      const result = await FreelancingServiceService.getServicesByFreelancer(freelancerId, params);
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch freelancer services");
      }
      return result;
    },
    enabled: !!freelancerId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

