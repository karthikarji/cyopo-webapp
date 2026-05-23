import REST from "@cyopo/Services/rest/REST";
import { API } from "@cyopo/Constants/api/Api.constants";
import type { Portfolio } from "@cyopo/Models/portfolio/portfolio.model";
import { ApiResponse } from "@cyopo/Models/common/common.model";

class PublicAPIService {
  async getBySlug(slug: string): Promise<Portfolio> {
    try {
      const response = await REST.get<ApiResponse<Portfolio>>(API.PUBLIC.BY_SLUG(slug));
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.error ?? "Portfolio not found");
    }
  }

  async recordView(slug: string): Promise<void> {
    try {
      // Generate or retrieve session token for anonymous deduplication
      let sessionToken = localStorage.getItem("cyopo_session");
      if (!sessionToken) {
        sessionToken = crypto.randomUUID();
        localStorage.setItem("cyopo_session", sessionToken);
      }
      await REST.post(
        API.PUBLIC.VIEW(slug),
        {},
        {
          headers: { "X-Session-Token": sessionToken },
        },
      );
    } catch {
      // Silently fail — view tracking is non-critical
    }
  }
}

export default new PublicAPIService();
