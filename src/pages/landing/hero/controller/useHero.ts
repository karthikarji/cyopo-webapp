import { useNavigate } from "react-router-dom";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";

const useHero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => navigate(ROUTES.REGISTER);
  const handleBrowseTemplates = () => {
    const el = document.querySelector("#templates");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return {
    handlers: {
      handleGetStarted,
      handleBrowseTemplates,
    },
  };
};

export default useHero;
