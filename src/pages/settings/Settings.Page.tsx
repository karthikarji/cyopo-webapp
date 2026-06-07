import React from "react";
import { useSearchParams } from "react-router-dom";
import useSettingsPage from "./common/hooks/useSettingsPage";
import AccountSection from "./account/view/AccountSection";
import PasswordSection from "./profile/view/PasswordSection";
import NotificationsSection from "./notifications/view/NotificationsSection";
import DangerSection from "./danger/view/DangerSection";
import DeleteAccountModal from "./danger/view/DeleteAccountModal";
import BillingSection from "./billing/view/BillingSection";

const TABS = [
  { id: "account", label: "Account", icon: "account_circle" },
  { id: "billing", label: "Billing", icon: "workspace_premium" },
  { id: "notifications", label: "Notifications", icon: "notifications" },
  { id: "security", label: "Security", icon: "lock" },
  { id: "danger", label: "Danger zone", icon: "warning" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const SettingsPage: React.FC = () => {
  const { state, handlers } = useSettingsPage();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active tab from URL param — defaults to "account"
  const activeTab = (searchParams.get("tab") ?? "account") as TabId;

  const handleTabChange = (tab: TabId) => {
    setSearchParams({ tab });
  };

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

      {/* Tab navigation */}
      <div className='flex gap-1 overflow-x-auto pb-1 border-b border-outline-variant/20'>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={[
              "flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-sm font-medium",
              "whitespace-nowrap transition-colors duration-150 flex-shrink-0",
              activeTab === tab.id ? "text-primary border-b-2 border-primary -mb-px" : "text-on-surface-variant hover:text-on-surface",
            ].join(" ")}>
            <span
              className='material-symbols-outlined text-[17px]'
              style={{
                fontVariationSettings: activeTab === tab.id ? "'FILL' 1" : "'FILL' 0",
              }}>
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "account" && <AccountSection user={state.user} setUser={handlers.setUser} />}
      {activeTab === "billing" && <BillingSection />}
      {activeTab === "notifications" && (
        <NotificationsSection preferences={state.notifications} isSaving={state.isSavingNotifs} onToggle={handlers.handleToggleNotification} />
      )}
      {activeTab === "security" && <PasswordSection />}
      {activeTab === "danger" && <DangerSection onDelete={() => handlers.setShowDeleteModal(true)} />}

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
