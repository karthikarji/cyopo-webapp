export interface WizardTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  isPremium: boolean;
  tags: string[];
  gradient: string;
  accent: string;
}

export type TemplateFilter = "all" | "free" | "premium";
