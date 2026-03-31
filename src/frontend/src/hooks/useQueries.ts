import { useMutation } from "@tanstack/react-query";
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

export { ServiceType };
