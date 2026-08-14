export type TemplateCategory = "Invoice" | "Letter" | "Report" | "Other";
export type DocumentStatus = "Draft" | "Final" | "Sent";

export interface TemplateField {
  label: string;
  type: "text" | "date";
}

export interface DocTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  uses: number;
  updatedAt: string;
  fields: TemplateField[];
}

export interface GeneratedDocument {
  id: string;
  title: string;
  templateId: string;
  status: DocumentStatus;
  date: string;
  values: Record<string, string>;
}