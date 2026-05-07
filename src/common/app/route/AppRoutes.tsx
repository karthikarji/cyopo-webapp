import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectIsAuthenticated } from "@cyopo/Redux/selectors/AppCommon.selector";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";

// ─── Lazy loaded pages ───────────────────────────────────────────
const LandingPage = React.lazy(() => import("@cyopo/Pages/landing/Landing.Page"));
const LoginPage = React.lazy(() => import("@cyopo/Pages/auth/Login.Page"));
const RegisterPage = React.lazy(() => import("@cyopo/Pages/auth/Register.Page"));
const DashboardPage = React.lazy(() => import("@cyopo/Pages/dashboard/Dashboard.Page"));
const PortfolioPage = React.lazy(() => import("@cyopo/Pages/portfolio/Portfolio.Page"));
const TemplatesPage = React.lazy(() => import("@cyopo/Pages/templates/TemplateGallery.Page"));
const AnalyticsPage = React.lazy(() => import("@cyopo/Pages/analytics/Analytics.Page"));
const SettingsPage = React.lazy(() => import("@cyopo/Pages/settings/Settings.Page"));
const AdminPage = React.lazy(() => import("@cyopo/Pages/admin/Admin.Page"));
const PublicPortfolioPage = React.lazy(() => import("@cyopo/Pages/public/PublicPortfolio.Page"));

// ─── Route guards ────────────────────────────────────────────────

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to={ROUTES.LOGIN} replace />;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to={ROUTES.LOGIN} replace />;
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
            <div className='w-10 h-10 rounded-full border-3 border-primary-fixed border-t-primary animate-spin' />
            <span className='font-headline font-bold text-primary text-lg'>cyopo</span>
          </div>
        </div>
      }>
      <Routes>
        {/* Public routes */}
        <Route path={ROUTES.LANDING} element={<LandingPage />} />

        {/* Public only — redirect to dashboard if already logged in */}
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

        {/* Authenticated routes */}
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

        {/* Admin routes */}
        <Route
          path={ROUTES.ADMIN_TEMPLATES}
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />

        {/* Public portfolio view — must be last */}
        <Route path={ROUTES.PUBLIC_PORTFOLIO} element={<PublicPortfolioPage />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
