import { useState, useCallback, useEffect } from "react";
import AdminUserAPIService from "@cyopo/Services/api/admin/AdminUserAPIService";
import type { AdminUserData, AdminUserFilters, UserPlan, UserStatus } from "@cyopo/Models/admin/admin.models";
import Notify from "@cyopo/Services/notification/Notify";

const useAdminUsersPage = () => {
  // ─── List state ───────────────────────────────────────────────────
  const [users, setUsers] = useState<AdminUserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // ─── Filter state ─────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState<UserPlan | "">("");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "">("");
  const [page, setPage] = useState(1);
  const limit = 10;

  // ─── Modal state ──────────────────────────────────────────────────
  const [selectedUser, setSelectedUser] = useState<AdminUserData | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // ─── Action loading ───────────────────────────────────────────────
  const [changingPlanId, setChangingPlanId] = useState<string | null>(null);
  const [changingStatusId, setChangingStatusId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isSavingUser, setIsSavingUser] = useState(false);

  // ─── Fetch ────────────────────────────────────────────────────────
  const fetchUsers = useCallback(async (filters: AdminUserFilters) => {
    try {
      setIsLoading(true);
      const result = await AdminUserAPIService.getAll(filters);
      setUsers(result.data ?? []);
      setTotalCount(result.total ?? 0);
      setTotalPages(result.totalPages ?? 0);
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to load users");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers({
      search: search || undefined,
      plan: planFilter || undefined,
      status: statusFilter || undefined,
      page,
      limit,
    });
  }, [search, planFilter, statusFilter, page, fetchUsers]);

  // ─── Filter handlers ──────────────────────────────────────────────
  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handlePlanFilter = useCallback((val: UserPlan | "") => {
    setPlanFilter(val);
    setPage(1);
  }, []);

  const handleStatusFilter = useCallback((val: UserStatus | "") => {
    setStatusFilter(val);
    setPage(1);
  }, []);

  // ─── Toggle plan ──────────────────────────────────────────────────
  const handleTogglePlan = useCallback(async (user: AdminUserData) => {
    const newPlan = user.plan === "FREE" ? "PREMIUM" : "FREE";
    try {
      setChangingPlanId(user.id);
      const updated = await AdminUserAPIService.changePlan(user.id, newPlan);
      setUsers((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
      Notify.success(`Plan changed to ${newPlan}`);
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to change plan");
    } finally {
      setChangingPlanId(null);
    }
  }, []);

  // ─── Toggle status ────────────────────────────────────────────────
  const handleToggleStatus = useCallback(async (user: AdminUserData) => {
    const newStatus = user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    try {
      setChangingStatusId(user.id);
      const updated = await AdminUserAPIService.changeStatus(user.id, newStatus);
      setUsers((prev) => prev.map((u) => (u.id === user.id ? updated : u)));
      Notify.success(newStatus === "SUSPENDED" ? "User suspended" : "User reactivated");
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to change status");
    } finally {
      setChangingStatusId(null);
    }
  }, []);

  // ─── Delete ───────────────────────────────────────────────────────
  const handleOpenDelete = useCallback((user: AdminUserData) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedUser) return;
    try {
      setIsDeleting(true);
      await AdminUserAPIService.deleteUser(selectedUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
      setTotalCount((prev) => prev - 1);
      setDeleteModalOpen(false);
      setSelectedUser(null);
      Notify.success("User deleted");
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to delete user");
    } finally {
      setIsDeleting(false);
    }
  }, [selectedUser]);

  // ─── Detail modal ─────────────────────────────────────────────────
  const handleOpenDetail = useCallback((user: AdminUserData) => {
    setSelectedUser(user);
    setDetailModalOpen(true);
  }, []);

  const handleOpenEdit = useCallback((user: AdminUserData) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  }, []);

  const handleSaveUser = useCallback(
    async (data: { name: string; plan: string; status: string }) => {
      if (!selectedUser) return;
      try {
        setIsSavingUser(true);
        const updated = await AdminUserAPIService.updateUser(selectedUser.id, data);
        setUsers((prev) => prev.map((u) => (u.id === selectedUser.id ? updated : u)));
        setEditModalOpen(false);
        setSelectedUser(null);
        Notify.success("User updated");
      } catch (err: any) {
        Notify.error(err?.message ?? "Failed to update user");
      } finally {
        setIsSavingUser(false);
      }
    },
    [selectedUser],
  );

  return {
    state: {
      users,
      isLoading,
      totalCount,
      totalPages,
      page,
      search,
      planFilter,
      statusFilter,
      selectedUser,
      detailModalOpen,
      planModalOpen,
      deleteModalOpen,
      changingPlanId,
      changingStatusId,
      isDeleting,
      editModalOpen,
      isSavingUser,
    },
    handlers: {
      handleSearchChange,
      handlePlanFilter,
      handleStatusFilter,
      setPage,
      handleTogglePlan,
      handleToggleStatus,
      handleOpenDelete,
      handleConfirmDelete,
      handleOpenDetail,
      setDetailModalOpen,
      setDeleteModalOpen,
      handleOpenEdit,
      handleSaveUser,
      setEditModalOpen,
    },
  };
};

export default useAdminUsersPage;
