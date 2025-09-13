import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useSubmitForm = () => {
  return useMutation({
    mutationFn: async ({
      endpoint,
      method,
      payload,
    }: {
      endpoint: string;
      method?: "POST" | "PUT" | "PATCH";
      payload: Record<string, unknown>;
    }) => {
      const { data } = await axios({
        url: endpoint,
        method: method || "POST",
        data: payload,
      });
      return data;
    },
  });
};
