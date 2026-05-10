export type PortfolioStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type SkillCategory = "frontend" | "backend" | "devops" | "database" | "tools" | "other";

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
  profile: PortfolioProfile;
  skills: Skill[];
  certifications: Certification[];
  experiences: Experience[];
  projects: Project[];
  settings: PortfolioSettings;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
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
  slug: string;
}

export interface UpdatePortfolioRequest {
  name?: string;
  profile?: Partial<PortfolioProfile>;
  skills?: Skill[];
  certifications?: Certification[];
  experiences?: Experience[];
  projects?: Project[];
  settings?: Partial<PortfolioSettings>;
}
