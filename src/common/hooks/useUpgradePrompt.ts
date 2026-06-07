import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";

export interface UpgradePromptConfig {
  title: string;
  description: string;
  feature: string;
  currentPlan: string;
}

/**
 * Shared hook for showing upgrade prompt modals.
 * Used by any feature that can be blocked by a plan gate.
 */
const useUpgradePrompt = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState<UpgradePromptConfig | null>(null);

  const showUpgradePrompt = useCallback((cfg: UpgradePromptConfig) => {
    setConfig(cfg);
  }, []);

  const hideUpgradePrompt = useCallback(() => {
    setConfig(null);
  }, []);

  const handleUpgrade = useCallback(() => {
    setConfig(null);
    navigate(ROUTES.PRICING);
  }, [navigate]);

  return {
    upgradePrompt: config,
    showUpgradePrompt,
    hideUpgradePrompt,
    handleUpgrade,
  };
};

export default useUpgradePrompt;
