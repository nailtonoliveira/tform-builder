export type FieldType = "text" | "money" | "date";

export interface FieldValidation {
  required?: boolean;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  allowPastDates?: boolean;
}

export interface FieldSchema {
  id: string;
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  validation?: FieldValidation;
  columns?: number;
}

export type ActionType = "rest" | "route";

export interface ActionSchema {
  id: string;
  type: ActionType;
  label: string;
  endpoint?: string;
  method?: "POST" | "PUT" | "PATCH";
  route?: string;
  on_success_route?: string;
}

export interface FormSchema {
  id: string;
  slug: string;
  title?: string;
  description?: string;
  fields: FieldSchema[];
  actions: ActionSchema[];
}
