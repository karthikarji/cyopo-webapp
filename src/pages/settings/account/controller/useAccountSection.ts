import { useState, useCallback } from "react";
import UserAPIService from "@cyopo/Services/api/user/UserAPIService";
import type { UserProfile } from "@cyopo/Services/api/user/UserAPIService";
import Notify from "@cyopo/Services/notification/Notify";

const useAccountSection = (user: UserProfile, setUser: (u: UserProfile) => void) => {
  const [name, setName] = useState(user.name);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = useCallback(async () => {
    if (!name.trim() || name.trim() === user.name) return;
    try {
      setIsSaving(true);
      const updated = await UserAPIService.updateMe({
        name: name.trim(),
      });
      setUser(updated);
      Notify.success("Name updated");
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to update name");
    } finally {
      setIsSaving(false);
    }
  }, [name, user.name, setUser]);

  return {
    state: { name, isSaving },
    handlers: { setName, handleSave },
  };
};

export default useAccountSection;
