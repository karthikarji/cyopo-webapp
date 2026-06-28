export type TemplateStatus = "ACTIVE" | "INACTIVE";

export interface TemplateData {
  id: string;
  slug: string;
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
  slug: string;
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

// ─── Template models (existing) ──────────────────────────────────
export type TemplateStatus = "ACTIVE" | "INACTIVE";

// ─── User models ──────────────────────────────────────────────────
export type UserPlan = "FREE" | "PREMIUM";
export type UserStatus = "ACTIVE" | "SUSPENDED";
export type UserRole = "USER" | "ADMIN";

export interface AdminUserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  plan: UserPlan;
  status: UserStatus;
  portfolioCount: number;
  createdAt: string;
}

export interface AdminUserFilters {
  search?: string;
  plan?: UserPlan | "";
  status?: UserStatus | "";
  page?: number;
  limit?: number;
}

export interface AdminUserPageResponse {
  data: AdminUserData[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Coupon models ────────────────────────────────────────────────
export type DiscountType = "PERCENTAGE" | "FIXED" | "FULL";

export interface AdminCouponData {
  id: string;
  code: string;
  description: string;
  discountType: DiscountType;
  discountValue: number | null;
  maxUses: number | null;
  usedCount: number;
  perUserLimit: number;
  validFrom: string | null;
  validUntil: string | null;
  isActive: boolean;
  isPublic: boolean;
  targetUserIds: string[];
  createdAt: string;
}

export interface AdminCouponRedemptionData {
  id: string;
  userId: string;
  planBefore: string;
  planAfter: string;
  redeemedAt: string;
}

export interface CreateCouponData {
  code: string;
  description?: string;
  discountType: DiscountType;
  discountValue?: number;
  maxUses?: number;
  perUserLimit?: number;
  validFrom?: string;
  validUntil?: string;
  targetUserIds?: string[];
}

export interface UpdateCouponData {
  description?: string;
  maxUses?: number;
  perUserLimit?: number;
  validFrom?: string;
  validUntil?: string;
  isActive?: boolean;
  targetUserIds?: string[];
}

export interface AdminCouponPageResponse {
  data: AdminCouponData[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
