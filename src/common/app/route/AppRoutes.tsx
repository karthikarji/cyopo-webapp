import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectIsAuthenticated } from "@cyopo/Redux/selectors/AppCommon.selector";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";
import AppLayout from "../layout/AppLayout";

// ─── Lazy loaded pages ───────────────────────────────────────────
const LandingPage = React.lazy(() => import("@cyopo/Pages/landing/Landing.Page"));
const LoginPage = React.lazy(() => import("@cyopo/Pages/auth/Login.Page"));
const RegisterPage = React.lazy(() => import("@cyopo/Pages/auth/Register.Page"));
const ForgotPasswordPage = React.lazy(() => import("@cyopo/Pages/auth/ForgotPassword.Page"));
const ResetPasswordPage = React.lazy(() => import("@cyopo/Pages/auth/ResetPassword.Page"));
const DashboardPage = React.lazy(() => import("@cyopo/Pages/dashboard/Dashboard.Page"));
const PortfolioPage = React.lazy(() => import("@cyopo/Pages/portfolio/Portfolio.Page"));
const WizardPage = React.lazy(() => import("@cyopo/Pages/portfolio/wizard/Wizard.Page"));
const EditorPage = React.lazy(() => import("@cyopo/Pages/portfolio/editor/Editor.Page"));
const TemplatesPage = React.lazy(() => import("@cyopo/Pages/templates/TemplateGallery.Page"));
const AnalyticsPage = React.lazy(() => import("@cyopo/Pages/analytics/Analytics.Page"));
const MessagesPage = React.lazy(() => import("@cyopo/Pages/messages/Messages.Page"));
const SettingsPage = React.lazy(() => import("@cyopo/Pages/settings/Settings.Page"));
const AdminPage = React.lazy(() => import("@cyopo/Pages/admin/Admin.Page"));
const PublicPage = React.lazy(() => import("@cyopo/Pages/public/Public.Page"));

// ─── Route guards ────────────────────────────────────────────────

const PrivateRoute: React.FC<{ children: React.ReactNode; noLayout?: boolean }> = ({ children, noLayout }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;
  return noLayout ? <>{children}</> : <AppLayout>{children}</AppLayout>;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return isAuthenticated ? <AppLayout>{children}</AppLayout> : <Navigate to={ROUTES.LOGIN} replace />;
};

const PublicOnlyRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : <>{children}</>;
};

// ─── Routes ──────────────────────────────────────────────────────

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
        <Route
          path={ROUTES.ADMIN_TEMPLATES}
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
        <Route path={ROUTES.PUBLIC_PORTFOLIO} element={<PublicPage />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
