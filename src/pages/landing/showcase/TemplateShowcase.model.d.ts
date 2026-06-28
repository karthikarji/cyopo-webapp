export interface TemplateShowcaseItem {
  id: string;
  name: string;
  category: string;
  thumbnail: string | null;
  isPremium: boolean;
  gradient: string;
  accentColor: string;
}

export interface PublicTemplateItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  font: string;
  primaryColor: string;
  secondaryColor: string;
  premium: boolean;
  status: string;
  tags: string[];
}
