import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@cyopo/Hooks/useRedux";
import { setUser } from "@cyopo/Redux/actions/AppCommon.actions";
import UserAPIService from "@cyopo/Services/api/user/UserAPIService";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";

const REDIRECT_DELAY_MS = 5000;

const useBillingSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // ─── Refresh user in Redux so plan badge updates ───────────────────
  useEffect(() => {
    const refresh = async () => {
      try {
        const updated = await UserAPIService.getMe();
        dispatch(setUser(updated as any));
      } catch {
        // Non-critical — user will see updated plan on next page load
      }
    };
    refresh();
  }, [dispatch]);

  // ─── Auto redirect after delay ────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(ROUTES.DASHBOARD);
    }, REDIRECT_DELAY_MS);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleGoToDashboard = useCallback(() => {
    navigate(ROUTES.DASHBOARD);
  }, [navigate]);

  return {
    handlers: { handleGoToDashboard },
  };
};

export default useBillingSuccess;
