import { useState } from "react";

export type AdminBillingTab = "stats" | "subscriptions" | "payments" | "invoices" | "orders" | "webhooks";

const TABS: { id: AdminBillingTab; label: string; icon: string }[] = [
  { id: "stats", label: "Overview", icon: "bar_chart" },
  { id: "subscriptions", label: "Subscriptions", icon: "subscriptions" },
  { id: "payments", label: "Payments", icon: "payments" },
  { id: "invoices", label: "Invoices", icon: "receipt_long" },
  { id: "orders", label: "Orders", icon: "shopping_cart" },
  { id: "webhooks", label: "Webhooks", icon: "webhook" },
];

const useAdminBillingPage = () => {
  const [activeTab, setActiveTab] = useState<AdminBillingTab>("stats");

  return {
    state: { activeTab, tabs: TABS },
    handlers: { setActiveTab },
  };
};

export default useAdminBillingPage;
