import { useState, useCallback, useEffect } from "react";
import AdminCouponAPIService from "@cyopo/Services/api/admin/AdminCouponAPIService";
import type { AdminCouponData, AdminCouponRedemptionData } from "@cyopo/Models/admin/admin.models";
import Notify from "@cyopo/Services/notification/Notify";

const useAdminCouponsPage = () => {
  const [coupons, setCoupons] = useState<AdminCouponData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // ─── Modal state ──────────────────────────────────────────────────
  const [selectedCoupon, setSelectedCoupon] = useState<AdminCouponData | null>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [redemptionsModalOpen, setRedemptionsModalOpen] = useState(false);
  const [redemptions, setRedemptions] = useState<AdminCouponRedemptionData[]>([]);
  const [isLoadingRedemptions, setIsLoadingRedemptions] = useState(false);

  // ─── Action loading ───────────────────────────────────────────────
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [expiredModalOpen, setExpiredModalOpen] = useState(false);
  const [expiredCoupon, setExpiredCoupon] = useState<AdminCouponData | null>(null);

  // ─── Fetch ────────────────────────────────────────────────────────
  const fetchCoupons = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await AdminCouponAPIService.getAll(search, page, limit);
      setCoupons(result.data ?? []);
      setTotalCount(result.total ?? 0);
      setTotalPages(result.totalPages ?? 0);
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to load coupons");
    } finally {
      setIsLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  // ─── Toggle active ────────────────────────────────────────────────
  const handleToggleActive = useCallback(async (coupon: AdminCouponData) => {
    const isExpired = coupon.validUntil ? new Date(coupon.validUntil) < new Date() : false;

    // If trying to activate an expired coupon → show modal
    if (!coupon.isActive && isExpired) {
      setExpiredCoupon(coupon);
      setExpiredModalOpen(true);
      return;
    }

    try {
      setTogglingId(coupon.id);
      const updated = await AdminCouponAPIService.toggleActive(coupon.id);
      setCoupons((prev) => prev.map((c) => (c.id === coupon.id ? updated : c)));
      Notify.success(updated.isActive ? "Coupon activated" : "Coupon deactivated");
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to toggle coupon");
    } finally {
      setTogglingId(null);
    }
  }, []);

  // Handle "Update expiry" click from expired modal
  const handleUpdateExpiry = useCallback((coupon: AdminCouponData) => {
    setExpiredModalOpen(false);
    setExpiredCoupon(null);
    setSelectedCoupon(coupon);
    setFormModalOpen(true); // open edit modal
  }, []);

  // ─── Delete ───────────────────────────────────────────────────────
  const handleOpenDelete = useCallback((coupon: AdminCouponData) => {
    setSelectedCoupon(coupon);
    setDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedCoupon) return;
    try {
      setIsDeleting(true);
      await AdminCouponAPIService.delete(selectedCoupon.id);
      setCoupons((prev) => prev.filter((c) => c.id !== selectedCoupon.id));
      setTotalCount((prev) => prev - 1);
      setDeleteModalOpen(false);
      setSelectedCoupon(null);
      Notify.success("Coupon deleted");
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to delete coupon");
    } finally {
      setIsDeleting(false);
    }
  }, [selectedCoupon]);

  // ─── Form modal ───────────────────────────────────────────────────
  const handleOpenCreate = useCallback(() => {
    setSelectedCoupon(null);
    setFormModalOpen(true);
  }, []);

  const handleOpenEdit = useCallback((coupon: AdminCouponData) => {
    setSelectedCoupon(coupon);
    setFormModalOpen(true);
  }, []);

  const handleFormSuccess = useCallback((saved: AdminCouponData) => {
    setCoupons((prev) => {
      const exists = prev.some((c) => c.id === saved.id);
      return exists ? prev.map((c) => (c.id === saved.id ? saved : c)) : [saved, ...prev];
    });
    setFormModalOpen(false);
    setSelectedCoupon(null);
  }, []);

  // ─── Redemptions modal ────────────────────────────────────────────
  const handleOpenRedemptions = useCallback(async (coupon: AdminCouponData) => {
    setSelectedCoupon(coupon);
    setRedemptionsModalOpen(true);
    try {
      setIsLoadingRedemptions(true);
      const data = await AdminCouponAPIService.getRedemptions(coupon.id);
      setRedemptions(data);
    } catch {
      Notify.error("Failed to load redemptions");
    } finally {
      setIsLoadingRedemptions(false);
    }
  }, []);

  return {
    state: {
      coupons,
      isLoading,
      totalCount,
      totalPages,
      page,
      search,
      selectedCoupon,
      formModalOpen,
      deleteModalOpen,
      redemptionsModalOpen,
      redemptions,
      isLoadingRedemptions,
      togglingId,
      isDeleting,
      expiredModalOpen,
      expiredCoupon,
    },
    handlers: {
      handleSearchChange,
      setPage,
      handleToggleActive,
      handleOpenDelete,
      handleConfirmDelete,
      handleOpenCreate,
      handleOpenEdit,
      handleFormSuccess,
      handleOpenRedemptions,
      setFormModalOpen,
      setDeleteModalOpen,
      setRedemptionsModalOpen,
      handleUpdateExpiry,
      setExpiredModalOpen,
    },
  };
};

export default useAdminCouponsPage;
