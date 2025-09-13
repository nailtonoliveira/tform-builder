import { apiClient } from "~/lib/api-client";
import { FormSchema } from "~/types/form";

export function getFormSchemaByID(formID: string) {
  return apiClient.get<FormSchema>(`/api/forms/by-id/${formID}`);
}
