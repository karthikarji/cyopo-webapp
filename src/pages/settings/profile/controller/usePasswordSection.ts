import { useState, useCallback } from "react";
import UserAPIService from "@cyopo/Services/api/user/UserAPIService";
import type { ChangePasswordData } from "@cyopo/Services/api/user/UserAPIService";
import Notify from "@cyopo/Services/notification/Notify";

const emptyForm = (): ChangePasswordData => ({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const usePasswordSection = () => {
  const [form, setForm] = useState<ChangePasswordData>(emptyForm());
  const [isSaving, setIsSaving] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleFieldChange = useCallback((field: keyof ChangePasswordData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleToggleShow = useCallback((field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  }, []);

  const handleSubmit = useCallback(async () => {
    const { currentPassword, newPassword, confirmPassword } = form;
    if (!currentPassword || !newPassword || !confirmPassword) {
      Notify.warn("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      Notify.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      Notify.error("Password must be at least 8 characters");
      return;
    }
    try {
      setIsSaving(true);
      await UserAPIService.changePassword(form);
      setForm(emptyForm());
      Notify.success("Password changed successfully");
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to change password");
    } finally {
      setIsSaving(false);
    }
  }, [form]);

  return {
    state: {
      form,
      isSaving,
      showPasswords,
    },
    handlers: {
      handleFieldChange,
      handleToggleShow,
      handleSubmit,
    },
  };
};

export default usePasswordSection;
