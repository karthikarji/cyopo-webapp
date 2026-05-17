export type PortfolioStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type SkillCategory =
  | "FRONTEND"
  | "BACKEND"
  | "DEVOPS"
  | "DATABASE"
  | "MOBILE"
  | "AI_ML"
  | "CLOUD"
  | "PROJECT_MANAGEMENT"
  | "PRODUCT_MANAGEMENT"
  | "BUSINESS_ANALYSIS"
  | "STRATEGY"
  | "LEADERSHIP"
  | "COMMUNICATION"
  | "SALES"
  | "MARKETING"
  | "CUSTOMER_SUCCESS"
  | "HR"
  | "RECRUITING"
  | "UI_UX_DESIGN"
  | "GRAPHIC_DESIGN"
  | "CONTENT_CREATION"
  | "COPYWRITING"
  | "VIDEO_EDITING"
  | "PHOTOGRAPHY"
  | "FINANCE"
  | "ACCOUNTING"
  | "LEGAL"
  | "DATA_ANALYSIS"
  | "RESEARCH"
  | "MARKET_RESEARCH"
  | "OPERATIONS"
  | "SUPPLY_CHAIN"
  | "LOGISTICS"
  | "OTHER";

export type SkillProficiency = "beginner" | "intermediate" | "advanced" | "expert";

export interface SocialMedia {
  platform: string;
  url: string;
}

export interface PortfolioProfile {
  name: string;
  title: string;
  bio: string;
  location?: string;
  email: string;
  phone?: string;
  website?: string;
  profilePhoto?: string;
  socialMedia: SocialMedia[];
}

export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: SkillProficiency;
}

export interface Certification {
  name: string;
  provider: string;
  issueDate?: string;
  expiryDate?: string;
  credentialUrl?: string;
}

export interface Experience {
  id?: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
  achievements: string[];
  technologies: string[];
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured: boolean;
  completedDate?: string;
}

export interface PortfolioSettings {
  isPublic: boolean;
  allowComments: boolean;
  showContactInfo: boolean;
  showSkillLevels: boolean;
  customDomain?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Portfolio {
  id: string;
  userId: string;
  name: string;
  slug: string;
  status: PortfolioStatus;
  templateId: string;
  templateSlug: string;
  profile: PortfolioProfile;
  skills: Skill[];
  certifications: Certification[];
  experiences: Experience[];
  projects: Project[];
  settings: PortfolioSettings;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  resumeFileName?: string;
  resumeFileSize?: number;
  hasResume?: boolean;
}

export interface PortfolioFilters {
  status?: PortfolioStatus | "all";
  search?: string;
  page?: number;
  limit?: number;
}

export interface PortfolioPageResponse {
  portfolios: Portfolio[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreatePortfolioRequest {
  name: string;
  templateId: string;
  slug?: string;
  profile?: Partial<PortfolioProfile>;
  skills?: Skill[];
  certifications?: Certification[];
  experiences?: Experience[];
  projects?: Project[];
  settings?: Partial<PortfolioSettings>;
}

export interface UpdatePortfolioRequest {
  name?: string;
  slug?: string;
  profile?: Partial<PortfolioProfile>;
  skills?: Skill[];
  certifications?: Certification[];
  experiences?: Experience[];
  projects?: Project[];
  settings?: Partial<PortfolioSettings>;
}
