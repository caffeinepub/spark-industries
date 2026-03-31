import { useMutation, useQuery } from "@tanstack/react-query";
import type { ContactRequest } from "../backend";
import { ServiceType } from "../backend";
import { useActor } from "./useActor";

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceType: ServiceType;
  message: string;
}

export function useSubmitQuote() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: QuoteFormData) => {
      if (!actor)
        throw new Error("Service temporarily unavailable. Please try again.");
      await actor.submitRequest(
        data.name,
        data.email,
        data.phone,
        data.company,
        data.serviceType,
        data.message,
      );
    },
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
  return { isAdmin: isAdmin ?? false, isLoading: isFetching || isLoading };
}

export function useAllRequests(serviceFilter?: ServiceType, enabled = true) {
  const { actor, isFetching } = useActor();
  return useQuery<ContactRequest[]>({
    queryKey: ["allRequests", serviceFilter],
    queryFn: async () => {
      if (!actor) return [];
      if (serviceFilter !== undefined) {
        return actor.getRequestsByServiceType(serviceFilter);
      }
      return actor.getAllRequests();
    },
    enabled: !!actor && !isFetching && enabled,
  });
}

export { ServiceType };
