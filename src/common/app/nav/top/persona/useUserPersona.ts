import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectUser } from "@cyopo/Redux/selectors/AppCommon.selector";
import { clearUser, setAuthenticated } from "@cyopo/Redux/actions/AppCommon.actions";
import { AuthAPIService } from "@cyopo/Services/api/auth/AuthAPIService";
import Notify from "@cyopo/Services/notification/Notify";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";

const useUserPersona = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);
  const handleMenuClose = () => setIsMenuOpen(false);

  const handleSignOut = async () => {
    try {
      await AuthAPIService.logout();
      dispatch(clearUser());
      dispatch(setAuthenticated(false));
      Notify.success("Signed out successfully");
      navigate(ROUTES.LOGIN);
    } catch {
      Notify.error("Failed to sign out");
    }
  };

  const handleMenuItemClick = (route?: string, action?: string) => {
    setIsMenuOpen(false);
    if (action === "signout") {
      handleSignOut();
      return;
    }
    if (route) navigate(route);
  };

  return {
    state: {
      user,
      initials,
      isMenuOpen,
    },
    handlers: {
      handleMenuToggle,
      handleMenuClose,
      handleMenuItemClick,
    },
  };
};

export default useUserPersona;
