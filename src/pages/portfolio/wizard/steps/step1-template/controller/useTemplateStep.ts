import { useState, useEffect } from "react";
import { useWizardContext } from "../../../common/WizardContext";
import { TemplateAPIService } from "@cyopo/Services/api/template/TemplateAPIService";
import { FALLBACK_TEMPLATES } from "../TemplateStep.constants";
import type { WizardTemplate, TemplateFilter } from "../TemplateStep.model.d";

const useTemplateStep = () => {
  const { formData, updateTemplate } = useWizardContext();
  const [templates, setTemplates] = useState<WizardTemplate[]>(FALLBACK_TEMPLATES);
  const [activeFilter, setActiveFilter] = useState<TemplateFilter>("all");
  const [isLoading, setIsLoading] = useState(false);

  // Try to load templates from API
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoading(true);
        const data = await TemplateAPIService.getPublicTemplates();
        if (data.length > 0) {
          // Map API templates to WizardTemplate shape
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

  const handleSelectTemplate = (template: WizardTemplate) => {
    updateTemplate({
      templateId: template.id,
      templateName: template.name,
    });
  };

  const handleFilterChange = (filter: TemplateFilter) => {
    setActiveFilter(filter);
  };

  return {
    state: {
      templates: filteredTemplates,
      selectedId: formData.template.templateId,
      activeFilter,
      isLoading,
    },
    handlers: {
      handleSelectTemplate,
      handleFilterChange,
    },
  };
};

export default useTemplateStep;
