import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectIsAuthenticated, selectUser } from "@cyopo/Redux/selectors/AppCommon.selector";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";
import AppLayout from "../layout/AppLayout";

// ─── Lazy loaded pages ────────────────────────────────────────────

// Public
const LandingPage = React.lazy(() => import("@cyopo/Pages/landing/Landing.Page"));
const LoginPage = React.lazy(() => import("@cyopo/Pages/auth/Login.Page"));
const RegisterPage = React.lazy(() => import("@cyopo/Pages/auth/Register.Page"));
const ForgotPasswordPage = React.lazy(() => import("@cyopo/Pages/auth/ForgotPassword.Page"));
const ResetPasswordPage = React.lazy(() => import("@cyopo/Pages/auth/ResetPassword.Page"));
const PublicPage = React.lazy(() => import("@cyopo/Pages/public/Public.Page"));

// Authenticated
const DashboardPage = React.lazy(() => import("@cyopo/Pages/dashboard/Dashboard.Page"));
const PortfolioPage = React.lazy(() => import("@cyopo/Pages/portfolio/Portfolio.Page"));
const WizardPage = React.lazy(() => import("@cyopo/Pages/portfolio/wizard/Wizard.Page"));
const EditorPage = React.lazy(() => import("@cyopo/Pages/portfolio/editor/Editor.Page"));
const TemplatesPage = React.lazy(() => import("@cyopo/Pages/templates/TemplateGallery.Page"));
const AnalyticsPage = React.lazy(() => import("@cyopo/Pages/analytics/Analytics.Page"));
const MessagesPage = React.lazy(() => import("@cyopo/Pages/messages/Messages.Page"));
const SettingsPage = React.lazy(() => import("@cyopo/Pages/settings/Settings.Page"));

// Billing
const CheckoutPage = React.lazy(() => import("@cyopo/Pages/checkout/Checkout.Page"));
const BillingSuccessPage = React.lazy(() => import("@cyopo/Pages/billing-success/BillingSuccess.Page"));
const PricingPage = React.lazy(() => import("@cyopo/Pages/pricing/Pricing.Page"));

// Admin
const AdminPage = React.lazy(() => import("@cyopo/Pages/admin/Admin.Page"));
const AdminUsersPage = React.lazy(() => import("@cyopo/Pages/admin/users/AdminUsers.Page"));
const AdminCouponsPage = React.lazy(() => import("@cyopo/Pages/admin/coupons/AdminCoupons.Page"));
const AdminBillingPage = React.lazy(() => import("@cyopo/Pages/admin/billing/AdminBilling.Page"));

// ─── Route guards ─────────────────────────────────────────────────

const PrivateRoute: React.FC<{
  children: React.ReactNode;
  noLayout?: boolean;
}> = ({ children, noLayout }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;
  return noLayout ? <>{children}</> : <AppLayout>{children}</AppLayout>;
};

const AdminRoute: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;
  if (user?.role !== "ADMIN") return <Navigate to={ROUTES.DASHBOARD} replace />;
  return <AppLayout>{children}</AppLayout>;
};

const PublicOnlyRoute: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <>{children}</>;
};

// ─── App Routes ───────────────────────────────────────────────────

const AppRoutes: React.FC = () => {
  return (
    <React.Suspense
      fallback={
        <div className='min-h-screen flex items-center justify-center bg-background'>
          <div className='flex flex-col items-center gap-4'>
            <div className='w-10 h-10 rounded-full border-[3px] border-primary-fixed border-t-primary animate-spin' />
            <span className='font-headline font-bold text-primary text-lg'>cyopo</span>
          </div>
        </div>
      }>
      <Routes>
        {/* ── Public ────────────────────────────────────────────── */}
        <Route path={ROUTES.LANDING} element={<LandingPage />} />

        <Route
          path={ROUTES.LOGIN}
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path={ROUTES.REGISTER}
          element={
            <PublicOnlyRoute>
              <RegisterPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path={ROUTES.FORGOT_PASSWORD}
          element={
            <PublicOnlyRoute>
              <ForgotPasswordPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path={ROUTES.RESET_PASSWORD}
          element={
            <PublicOnlyRoute>
              <ResetPasswordPage />
            </PublicOnlyRoute>
          }
        />
        <Route path={ROUTES.PRICING} element={<PricingPage />} />

        {/* ── Authenticated ──────────────────────────────────────── */}
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.PORTFOLIOS}
          element={
            <PrivateRoute>
              <PortfolioPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.PORTFOLIO_NEW}
          element={
            <PrivateRoute noLayout>
              <WizardPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.PORTFOLIO_EDIT}
          element={
            <PrivateRoute>
              <EditorPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.TEMPLATES}
          element={
            <PrivateRoute>
              <TemplatesPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.ANALYTICS}
          element={
            <PrivateRoute>
              <AnalyticsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.SETTINGS}
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.MESSAGES}
          element={
            <PrivateRoute>
              <MessagesPage />
            </PrivateRoute>
          }
        />

        {/* ── Billing ───────────────────────────────────────────── */}
        <Route
          path={ROUTES.CHECKOUT}
          element={
            // noLayout — checkout has its own full-page design
            <PrivateRoute noLayout>
              <CheckoutPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.BILLING_SUCCESS}
          element={
            // noLayout — success page has its own full-page design + confetti
            <PrivateRoute noLayout>
              <BillingSuccessPage />
            </PrivateRoute>
          }
        />

        {/* ── Admin ─────────────────────────────────────────────── */}
        <Route
          path={ROUTES.ADMIN_TEMPLATES}
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
        <Route
          path={ROUTES.ADMIN_USERS}
          element={
            <AdminRoute>
              <AdminUsersPage />
            </AdminRoute>
          }
        />
        <Route
          path={ROUTES.ADMIN_COUPONS}
          element={
            <AdminRoute>
              <AdminCouponsPage />
            </AdminRoute>
          }
        />
        <Route
          path={ROUTES.ADMIN_BILLING}
          element={
            <AdminRoute>
              <AdminBillingPage />
            </AdminRoute>
          }
        />

        {/* ── Public portfolio view ─────────────────────────────── */}
        <Route path={ROUTES.PUBLIC_PORTFOLIO} element={<PublicPage />} />

        {/* ── Fallback ──────────────────────────────────────────── */}
        <Route path='*' element={<Navigate to={ROUTES.LANDING} replace />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
