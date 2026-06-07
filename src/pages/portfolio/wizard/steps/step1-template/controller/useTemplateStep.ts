import { useState, useEffect, useCallback } from "react";
import { useWizardContext } from "../../../common/WizardContext";
import { TemplateAPIService } from "@cyopo/Services/api/template/TemplateAPIService";
import { BillingAPIService } from "@cyopo/Services/api/billing/BillingAPIService";
import { useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectUser } from "@cyopo/Redux/selectors/AppCommon.selector";
import { FALLBACK_TEMPLATES } from "../TemplateStep.constants";
import useUpgradePrompt from "@cyopo/Hooks/useUpgradePrompt";
import type { WizardTemplate, TemplateFilter } from "../TemplateStep.model.d";

const useTemplateStep = () => {
  const { formData, updateTemplate } = useWizardContext();
  const user = useAppSelector(selectUser);

  const [templates, setTemplates] = useState<WizardTemplate[]>(FALLBACK_TEMPLATES);
  const [activeFilter, setActiveFilter] = useState<TemplateFilter>("all");
  const [isLoading, setIsLoading] = useState(false);

  const { upgradePrompt, showUpgradePrompt, hideUpgradePrompt, handleUpgrade } = useUpgradePrompt();

  // ─── Load templates ──────────────────────────────────────────────
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoading(true);
        const data = await TemplateAPIService.getPublicTemplates();
        if (data.length > 0) {
          const mapped: WizardTemplate[] = data.map((t: any) => ({
            id: t.id,
            name: t.name,
            description: t.description ?? "",
            isPremium: t.premium ?? false,
            tags: t.tags ?? [],
            gradient: "linear-gradient(135deg, #f8f2fa 0%, #e9ddff 100%)",
            accent: t.primaryColor ?? "#4f378a",
            thumbnail: t.thumbnail ?? "",
          }));
          setTemplates(mapped);
        }
      } catch {
        // Silently fall back to local templates
      } finally {
        setIsLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const filteredTemplates = templates.filter((t) => {
    if (activeFilter === "free") return !t.isPremium;
    if (activeFilter === "premium") return t.isPremium;
    return true;
  });

  // ─── Template select — check gate for premium ─────────────────────
  const handleSelectTemplate = useCallback(
    async (template: WizardTemplate) => {
      if (template.isPremium) {
        try {
          const gates = await BillingAPIService.getFeatureGates();
          if (!gates.canUsePremiumTemplates) {
            showUpgradePrompt({
              title: "Premium template",
              description: `This template is available on Premium and Pro plans. Upgrade to use it.`,
              feature: "PREMIUM_TEMPLATE",
              currentPlan: user?.plan ?? "FREE",
            });
            return; // Don't select the template
          }
        } catch {
          // If gate check fails — let backend handle on submit
        }
      }

      updateTemplate({
        templateId: template.id,
        templateName: template.name,
      });
    },
    [updateTemplate, showUpgradePrompt, user],
  );

  const handleFilterChange = (filter: TemplateFilter) => {
    setActiveFilter(filter);
  };

  return {
    state: {
      templates: filteredTemplates,
      selectedId: formData.template.templateId,
      activeFilter,
      isLoading,
      upgradePrompt,
    },
    handlers: {
      handleSelectTemplate,
      handleFilterChange,
      hideUpgradePrompt,
      handleUpgrade,
    },
  };
};

export default useTemplateStep;
