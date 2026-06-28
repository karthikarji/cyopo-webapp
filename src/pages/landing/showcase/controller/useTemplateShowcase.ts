import { useEffect, useState } from "react";
import REST from "@cyopo/Services/rest/REST";
import { API } from "@cyopo/Constants/api/Api.constants";
import type { ApiResponse, PageResponse } from "@cyopo/Models/common/common.model";
import type { PublicTemplateItem, TemplateShowcaseItem } from "../TemplateShowcase.model.d";

/**
 * Maps a public template API response to the showcase display shape.
 * Uses primaryColor as accent, derives gradient from primary + secondary.
 */
function mapToShowcaseItem(t: PublicTemplateItem): TemplateShowcaseItem {
  return {
    id: t.id,
    name: t.title,
    category: t.description,
    isPremium: t.premium,
    thumbnail: t.thumbnail,
    gradient: `linear-gradient(135deg, ${t.primaryColor}18 0%, ${t.secondaryColor}30 100%)`,
    accentColor: t.primaryColor,
  };
}

const useTemplateShowcase = () => {
  const [templates, setTemplates] = useState<TemplateShowcaseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await REST.get<ApiResponse<PageResponse<PublicTemplateItem>>>(API.PUBLIC.TEMPLATES, {
          params: { limit: 4, page: 1 },
        });
        const items = response.data?.data ?? [];
        setTemplates(items.map(mapToShowcaseItem));
      } catch {
        // Silently fail — show nothing rather than crash landing page
        setTemplates([]);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return { templates, isLoading };
};

export default useTemplateShowcase;
