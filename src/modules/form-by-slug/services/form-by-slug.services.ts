import { apiClient } from "~/lib/api-client";
import { FormSchema } from "~/types/form";

export function getFormSchemaBySlug(formSlug: string) {
  return apiClient.get<FormSchema>(`/api/forms/by-slug/${formSlug}`);
}
