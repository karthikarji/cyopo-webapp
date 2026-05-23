import React from "react";
import useSettingsPage from "./common/hooks/useSettingsPage";
import AccountSection from "./account/view/AccountSection";
import PasswordSection from "./profile/view/PasswordSection";
import NotificationsSection from "./notifications/view/NotificationsSection";
import DangerSection from "./danger/view/DangerSection";
import DeleteAccountModal from "./danger/view/DeleteAccountModal";

const SettingsPage: React.FC = () => {
  const { state, handlers } = useSettingsPage();

  if (state.isLoading) {
    return (
      <div className='flex items-center justify-center py-24'>
        <div className='w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  if (!state.user) return null;

  return (
    <div className='flex flex-col gap-6 max-w-2xl'>
      {/* Header */}
      <div>
        <h1 className='font-headline font-bold text-on-surface text-2xl sm:text-3xl'>Settings</h1>
        <p className='text-sm text-on-surface-variant mt-1'>Manage your account and preferences</p>
      </div>

      {/* Account — name, email, plan */}
      <AccountSection user={state.user} setUser={handlers.setUser} />

      {/* Password & Security */}
      <PasswordSection />

      {/* Notifications */}
      <NotificationsSection preferences={state.notifications} isSaving={state.isSavingNotifs} onToggle={handlers.handleToggleNotification} />

      {/* Danger zone */}
      <DangerSection onDelete={() => handlers.setShowDeleteModal(true)} />

      {/* Delete account modal */}
      {state.showDeleteModal && (
        <DeleteAccountModal
          confirmText={state.deleteConfirmText}
          isDeleting={state.isDeleting}
          canDelete={state.canDelete}
          onConfirmChange={handlers.setDeleteConfirmText}
          onConfirm={handlers.handleDeleteAccount}
          onClose={() => {
            handlers.setShowDeleteModal(false);
            handlers.setDeleteConfirmText("");
          }}
        />
      )}
    </div>
  );
};

export default SettingsPage;
