export type TemplateStatus = "ACTIVE" | "INACTIVE";

export interface TemplateData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  font: string;
  primaryColor: string;
  secondaryColor: string;
  premium: boolean;
  status: TemplateStatus;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTemplateData {
  title: string;
  description: string;
  font: string;
  primaryColor: string;
  secondaryColor: string;
  premium: boolean;
  status: TemplateStatus;
  tags: string[];
}

export type UpdateTemplateData = Partial<CreateTemplateData>;

export interface TemplateFilters {
  search?: string;
  status?: TemplateStatus;
  premium?: boolean;
  page?: number;
  limit?: number;
}
