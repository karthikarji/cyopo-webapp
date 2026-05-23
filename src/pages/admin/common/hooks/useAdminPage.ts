import { useState, useCallback, useEffect } from "react";
import AdminTemplateAPIService from "@cyopo/Services/api/admin/AdminTemplateAPIService";
import type { TemplateData, TemplateFilters, TemplateStatus } from "@cyopo/Models/admin/admin.models";
import Notify from "@cyopo/Services/notification/Notify";

const useAdminPage = () => {
  // ─── List state ───────────────────────────────────────────────────
  const [templates, setTemplates] = useState<TemplateData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // ─── Filter state ─────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TemplateStatus | "">("");
  const [premiumFilter, setPremiumFilter] = useState<boolean | "">("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  // ─── Modal state ──────────────────────────────────────────────────
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<TemplateData | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ─── Action loading ───────────────────────────────────────────────
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ─── Fetch templates ──────────────────────────────────────────────
  const fetchTemplates = useCallback(async (filters: TemplateFilters) => {
    try {
      setIsLoading(true);
      const result = await AdminTemplateAPIService.getAll(filters);
      setTemplates(result.data ?? []);
      setTotalCount(result.total ?? 0);
      setTotalPages(result.totalPages ?? 0);
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to load templates");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTemplates({
      search: search || undefined,
      status: statusFilter || undefined,
      premium: premiumFilter === "" ? undefined : premiumFilter,
      page,
      limit,
    });
  }, [search, statusFilter, premiumFilter, page, fetchTemplates]);

  // ─── Search & filter ──────────────────────────────────────────────
  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handleStatusFilter = useCallback((val: TemplateStatus | "") => {
    setStatusFilter(val);
    setPage(1);
  }, []);

  const handlePremiumFilter = useCallback((val: boolean | "") => {
    setPremiumFilter(val);
    setPage(1);
  }, []);

  // ─── Toggle status ────────────────────────────────────────────────
  const handleToggleStatus = useCallback(async (template: TemplateData) => {
    try {
      setTogglingId(template.id);
      const newStatus: TemplateStatus = template.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      const updated = await AdminTemplateAPIService.update(template.id, { status: newStatus });
      setTemplates((prev) => prev.map((t) => (t.id === template.id ? updated : t)));
      Notify.success(`Template ${newStatus === "ACTIVE" ? "activated" : "deactivated"}`);
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to update status");
    } finally {
      setTogglingId(null);
    }
  }, []);

  // ─── Duplicate ────────────────────────────────────────────────────
  const handleDuplicate = useCallback(async (id: string) => {
    try {
      setDuplicatingId(id);
      const duplicated = await AdminTemplateAPIService.duplicate(id);
      setTemplates((prev) => [duplicated, ...prev]);
      Notify.success("Template duplicated");
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to duplicate template");
    } finally {
      setDuplicatingId(null);
    }
  }, []);

  // ─── Delete ───────────────────────────────────────────────────────
  const handleOpenDelete = useCallback((id: string) => {
    setDeletingId(id);
    setDeleteModalOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingId) return;
    try {
      setIsDeleting(true);
      await AdminTemplateAPIService.delete(deletingId);
      setTemplates((prev) => prev.filter((t) => t.id !== deletingId));
      setDeleteModalOpen(false);
      setDeletingId(null);
      Notify.success("Template deleted");
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to delete template");
    } finally {
      setIsDeleting(false);
    }
  }, [deletingId]);

  // ─── Form modal ───────────────────────────────────────────────────
  const handleOpenCreate = useCallback(() => {
    setEditingTemplate(null);
    setFormModalOpen(true);
  }, []);

  const handleOpenEdit = useCallback((template: TemplateData) => {
    setEditingTemplate(template);
    setFormModalOpen(true);
  }, []);

  const handleFormSuccess = useCallback((saved: TemplateData) => {
    setTemplates((prev) => {
      const exists = prev.some((t) => t.id === saved.id);
      return exists ? prev.map((t) => (t.id === saved.id ? saved : t)) : [saved, ...prev];
    });
    setFormModalOpen(false);
    setEditingTemplate(null);
  }, []);

  return {
    state: {
      templates,
      isLoading,
      totalCount,
      totalPages,
      page,
      search,
      statusFilter,
      premiumFilter,
      formModalOpen,
      editingTemplate,
      deleteModalOpen,
      deletingId,
      isDeleting,
      togglingId,
      duplicatingId,
    },
    handlers: {
      handleSearchChange,
      handleStatusFilter,
      handlePremiumFilter,
      setPage,
      handleToggleStatus,
      handleDuplicate,
      handleOpenDelete,
      handleConfirmDelete,
      handleOpenCreate,
      handleOpenEdit,
      handleFormSuccess,
      setFormModalOpen,
      setDeleteModalOpen,
    },
  };
};

export default useAdminPage;
