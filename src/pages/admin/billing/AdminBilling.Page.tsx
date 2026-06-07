import React from "react";
import useAdminBillingPage from "./common/hooks/useAdminBillingPage";
import AdminBillingStats from "./stats/view/AdminBillingStats";
import AdminSubscriptionList from "./subscriptions/view/AdminSubscriptionList";
import AdminPaymentList from "./payments/view/AdminPaymentList";
import AdminInvoiceList from "./invoices/view/AdminInvoiceList";
import AdminOrderList from "./orders/view/AdminOrderList";
import AdminWebhookList from "./webhooks/view/AdminWebhookList";

const AdminBillingPage: React.FC = () => {
  const { state, handlers } = useAdminBillingPage();

  return (
    <div className='flex flex-col gap-6'>
      {/* Header */}
      <div>
        <h1 className='font-headline font-bold text-on-surface text-2xl sm:text-3xl'>Billing</h1>
        <p className='text-sm text-on-surface-variant mt-1'>Revenue, subscriptions, payments and webhook events</p>
      </div>

      {/* Tabs */}
      <div className='flex gap-1 overflow-x-auto pb-1 border-b border-outline-variant/20'>
        {state.tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handlers.setActiveTab(tab.id)}
            className={[
              "flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-sm font-medium",
              "whitespace-nowrap transition-colors duration-150 flex-shrink-0",
              state.activeTab === tab.id ? "text-primary border-b-2 border-primary -mb-px" : "text-on-surface-variant hover:text-on-surface",
            ].join(" ")}>
            <span
              className='material-symbols-outlined text-[17px]'
              style={{
                fontVariationSettings: state.activeTab === tab.id ? "'FILL' 1" : "'FILL' 0",
              }}>
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {state.activeTab === "stats" && <AdminBillingStats />}
      {state.activeTab === "subscriptions" && <AdminSubscriptionList />}
      {state.activeTab === "payments" && <AdminPaymentList />}
      {state.activeTab === "invoices" && <AdminInvoiceList />}
      {state.activeTab === "orders" && <AdminOrderList />}
      {state.activeTab === "webhooks" && <AdminWebhookList />}
    </div>
  );
};

export default AdminBillingPage;
