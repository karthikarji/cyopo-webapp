import { useState, useCallback, useEffect } from "react";
import AdminCouponAPIService from "@cyopo/Services/api/admin/AdminCouponAPIService";
import type { AdminCouponData, AdminUserData, CreateCouponData, DiscountType } from "@cyopo/Models/admin/admin.models";
import Notify from "@cyopo/Services/notification/Notify";
import AdminUserAPIService from "@cyopo/Services/api/admin/AdminUserAPIService";

interface FormValues {
  code: string;
  description: string;
  discountType: DiscountType;
  discountValue: string;
  maxUses: string;
  perUserLimit: string;
  validFrom: string;
  validUntil: string;
  targetEmails: string;
  isPublic: boolean;
  targetUserIds: string[];
  targetUsers: AdminUserData[];
  userSearchQuery: string;
}

interface FormErrors {
  code?: string;
  discountType?: string;
  discountValue?: string;
  validUntil?: string;
  general?: string;
}

const emptyForm = (): FormValues => ({
  code: "",
  description: "",
  discountType: "PERCENTAGE",
  discountValue: "",
  maxUses: "",
  perUserLimit: "1",
  validFrom: "",
  validUntil: "",
  targetEmails: "",
  isPublic: true,
  targetUserIds: [],
  targetUsers: [],
  userSearchQuery: "",
});

const couponToForm = (c: AdminCouponData): FormValues => ({
  code: c.code,
  description: c.description ?? "",
  discountType: c.discountType,
  discountValue: c.discountValue != null ? String(c.discountValue) : "",
  maxUses: c.maxUses != null ? String(c.maxUses) : "",
  perUserLimit: String(c.perUserLimit),
  validFrom: c.validFrom ? c.validFrom.slice(0, 16) : "",
  validUntil: c.validUntil ? c.validUntil.slice(0, 16) : "",
  targetEmails: "",
  isPublic: c.isPublic,
  targetUserIds: c.targetUserIds,
  targetUsers: [],
  userSearchQuery: "",
});

const useCouponForm = (coupon: AdminCouponData | null, onSuccess: (saved: AdminCouponData) => void) => {
  const isEdit = coupon !== null;

  const [values, setValues] = useState<FormValues>(coupon ? couponToForm(coupon) : emptyForm());
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);
  const [userSearchResults, setUserSearchResults] = useState<AdminUserData[]>([]);
  const [isSearchingUsers, setIsSearchingUsers] = useState(false);

  useEffect(() => {
    setValues(coupon ? couponToForm(coupon) : emptyForm());
    setErrors({});
  }, [coupon]);

  const handleChange = useCallback(
    (field: keyof FormValues, value: any) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors],
  );

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!isEdit && !values.code.trim()) newErrors.code = "Code is required";
    if (!isEdit && !/^[A-Z0-9_-]+$/.test(values.code)) newErrors.code = "Uppercase letters, numbers, hyphens only";
    if (values.discountType !== "FULL" && !values.discountValue) newErrors.discountValue = "Discount value is required";
    if (values.discountType === "PERCENTAGE") {
      const val = parseFloat(values.discountValue);
      if (isNaN(val) || val <= 0 || val > 100) newErrors.discountValue = "Must be between 1 and 100";
    }
    if (values.validUntil && values.validFrom && values.validUntil < values.validFrom) newErrors.validUntil = "End date must be after start date";
    if (!values.isPublic && values.targetUserIds.length === 0) {
      newErrors.general = "Add at least one user or switch to All Users";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUserSearch = useCallback(
    async (query: string) => {
      handleChange("userSearchQuery", query);
      if (query.length < 2) {
        setUserSearchResults([]);
        return;
      }
      try {
        setIsSearchingUsers(true);
        const results = await AdminUserAPIService.searchByEmail(query);
        // Filter out already added users
        setUserSearchResults(results.filter((u) => !values.targetUserIds.includes(u.id)));
      } catch {
        setUserSearchResults([]);
      } finally {
        setIsSearchingUsers(false);
      }
    },
    [values.targetUserIds],
  );

  const handleAddUser = useCallback(
    (user: AdminUserData) => {
      if (values.targetUserIds.includes(user.id)) return;
      setValues((prev) => ({
        ...prev,
        targetUserIds: [...prev.targetUserIds, user.id],
        targetUsers: [...prev.targetUsers, user],
        userSearchQuery: "",
      }));
      setUserSearchResults([]);
    },
    [values.targetUserIds],
  );

  const handleRemoveUser = useCallback((userId: string) => {
    setValues((prev) => ({
      ...prev,
      targetUserIds: prev.targetUserIds.filter((id) => id !== userId),
      targetUsers: prev.targetUsers.filter((u) => u.id !== userId),
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!validate()) return;
    try {
      setIsSaving(true);
      let saved: AdminCouponData;

      if (isEdit) {
        saved = await AdminCouponAPIService.update(coupon!.id, {
          description: values.description || undefined,
          maxUses: values.maxUses ? parseInt(values.maxUses) : undefined,
          perUserLimit: parseInt(values.perUserLimit),
          validFrom: toInstant(values.validFrom) || undefined,
          validUntil: toInstant(values.validUntil) || undefined,
          targetUserIds: values.isPublic ? [] : values.targetUserIds,
        });
        Notify.success("Coupon updated");
      } else {
        const payload: CreateCouponData = {
          code: values.code.toUpperCase(),
          description: values.description || undefined,
          discountType: values.discountType,
          discountValue: values.discountType !== "FULL" ? parseFloat(values.discountValue) : undefined,
          maxUses: values.maxUses ? parseInt(values.maxUses) : undefined,
          perUserLimit: parseInt(values.perUserLimit) || 1,
          validFrom: toInstant(values.validFrom) || undefined,
          validUntil: toInstant(values.validUntil) || undefined,
          targetUserIds: values.isPublic ? [] : values.targetUserIds,
        };
        saved = await AdminCouponAPIService.create(payload);
        Notify.success("Coupon created");
      }
      onSuccess(saved);
    } catch (err: any) {
      setErrors({ general: err?.message ?? "Failed to save coupon" });
    } finally {
      setIsSaving(false);
    }
  }, [values, isEdit, coupon, onSuccess]);

  // canSubmit — create: required fields / edit: always enabled
  const canSubmit = isEdit
    ? true
    : values.code.trim().length > 0 &&
      (values.discountType === "FULL" || values.discountValue.trim().length > 0) &&
      (values.isPublic || values.targetUserIds.length > 0);

  const toInstant = (val: string) => (val ? `${val}:00Z` : undefined);

  return {
    state: { values, errors, isSaving, isEdit, canSubmit, userSearchResults, isSearchingUsers },
    handlers: { handleChange, handleSubmit, handleUserSearch, handleAddUser, handleRemoveUser },
  };
};

export default useCouponForm;
