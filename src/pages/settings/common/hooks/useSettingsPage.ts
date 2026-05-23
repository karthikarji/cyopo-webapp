import { useState, useCallback, useEffect } from "react";
import { useAppDispatch } from "@cyopo/Hooks/useRedux";
import { useNavigate } from "react-router-dom";
import UserAPIService from "@cyopo/Services/api/user/UserAPIService";
import type { UserProfile, NotificationPreferences } from "@cyopo/Services/api/user/UserAPIService";
import { setUser as setReduxUser, setAuthenticated } from "@cyopo/Redux/actions/AppCommon.actions";
import { AuthAPIService } from "@cyopo/Services/api/auth/AuthAPIService";
import Notify from "@cyopo/Services/notification/Notify";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";

const useSettingsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ─── Notifications ────────────────────────────────────────────────
  const [notifications, setNotifications] = useState<NotificationPreferences>({
    emailOnMessage: true,
    weeklyDigest: true,
  });
  const [isSavingNotifs, setIsSavingNotifs] = useState(false);

  // ─── Danger zone ──────────────────────────────────────────────────
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // ─── Load user ────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await UserAPIService.getMe();
        setUser(data);
        setNotifications(data.notificationPreferences);
      } catch (err: any) {
        Notify.error(err?.message ?? "Failed to load settings");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  // ─── Notification handlers ────────────────────────────────────────
  const handleToggleNotification = useCallback(
    async (field: keyof NotificationPreferences) => {
      const previous = notifications;
      const updated = { ...notifications, [field]: !notifications[field] };
      setNotifications(updated);
      try {
        setIsSavingNotifs(true);
        const result = await UserAPIService.updateMe({
          notificationPreferences: updated,
        });
        setUser(result);
      } catch (err: any) {
        setNotifications(previous); // revert on failure
        Notify.error(err?.message ?? "Failed to update notifications");
      } finally {
        setIsSavingNotifs(false);
      }
    },
    [notifications],
  );

  // ─── Delete account ───────────────────────────────────────────────
  const handleDeleteAccount = useCallback(async () => {
    if (deleteConfirmText !== "delete my account") return;
    try {
      setIsDeleting(true);
      await UserAPIService.deleteAccount();
      // Clear auth state — same pattern as login/logout
      await AuthAPIService.logout();
      dispatch(setReduxUser(null));
      dispatch(setAuthenticated(false));
      navigate(ROUTES.LANDING);
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to delete account");
      setIsDeleting(false);
    }
  }, [deleteConfirmText, dispatch, navigate]);

  return {
    state: {
      user,
      isLoading,
      notifications,
      isSavingNotifs,
      showDeleteModal,
      deleteConfirmText,
      isDeleting,
      canDelete: deleteConfirmText === "delete my account",
    },
    handlers: {
      setUser,
      handleToggleNotification,
      setShowDeleteModal,
      setDeleteConfirmText,
      handleDeleteAccount,
    },
  };
};

export default useSettingsPage;
