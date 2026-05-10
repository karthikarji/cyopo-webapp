import { useState, useEffect } from "react";
import { useWizardContext } from "../../../common/WizardContext";
import { PortfolioAPIService } from "@cyopo/Services/api/portfolio/PortfolioAPIService";

const slugify = (str: string): string =>
  str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");

const useReviewStep = () => {
  const { formData, updateReview } = useWizardContext();
  const review = formData.review;
  const profile = formData.profile;

  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);

  // Auto-generate portfolio name and slug from profile
  useEffect(() => {
    if (!review.portfolioName && profile.name) {
      const autoName = `${profile.name}'s Portfolio`;
      const autoSlug = slugify(profile.name);
      updateReview({ portfolioName: autoName, slug: autoSlug });
    }
  }, [profile.name]);

  // Validate slug when it changes
  useEffect(() => {
    if (!review.slug) return;
    const timeout = setTimeout(async () => {
      try {
        setIsCheckingSlug(true);
        const available = await PortfolioAPIService.validateSlug(review.slug);
        setSlugAvailable(available);
      } catch {
        setSlugAvailable(null);
      } finally {
        setIsCheckingSlug(false);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [review.slug]);

  const handleChange = (field: string, value: any) => {
    updateReview({ [field]: value });
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = slugify(e.target.value);
    updateReview({ slug });
  };

  // Completion checklist
  const completion = {
    template: !!formData.template.templateId,
    profile: !!(profile.name && profile.title && profile.email),
    skills: formData.skills.skills.length > 0,
    experience: formData.experience.experiences.length > 0,
    projects: formData.projects.projects.length > 0,
  };

  const completionCount = Object.values(completion).filter(Boolean).length;
  const completionPct = Math.round((completionCount / 5) * 100);

  return {
    state: {
      review,
      profile,
      formData,
      completion,
      completionCount,
      completionPct,
      slugAvailable,
      isCheckingSlug,
    },
    handlers: {
      handleChange,
      handleSlugChange,
    },
  };
};

export default useReviewStep;
