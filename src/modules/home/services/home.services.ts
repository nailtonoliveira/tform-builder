import { apiClient } from "~/lib/api-client";
import { FormSchema } from "~/types/form";

export function getListOfFormSchema() {
  return apiClient.get<FormSchema[]>("/api/forms");
}
