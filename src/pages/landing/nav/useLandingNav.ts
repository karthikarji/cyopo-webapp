import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectIsAuthenticated } from "@cyopo/Redux/selectors/AppCommon.selector";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";

const useLandingNav = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleNavLink = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  const handleLogoClick = () => navigate(ROUTES.LANDING);
  const handleLoginClick = () => {
    setIsMobileOpen(false);
    navigate(ROUTES.LOGIN);
  };
  const handleRegisterClick = () => {
    setIsMobileOpen(false);
    navigate(ROUTES.REGISTER);
  };
  const handleDashboardClick = () => {
    setIsMobileOpen(false);
    navigate(ROUTES.DASHBOARD);
  };
  const handleMobileToggle = () => setIsMobileOpen((prev) => !prev);
  const handleMobileClose = () => setIsMobileOpen(false);

  return {
    state: {
      isScrolled,
      isMobileOpen,
      isAuthenticated,
    },
    handlers: {
      handleNavLink,
      handleLogoClick,
      handleLoginClick,
      handleRegisterClick,
      handleDashboardClick,
      handleMobileToggle,
      handleMobileClose,
    },
  };
};

export default useLandingNav;
