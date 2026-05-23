import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicAPIService from "@cyopo/Services/api/public/PublicAPIService";
import MLT from "./templates/MLT/MLT";
import BCT from "./templates/BCT/BCT";
import type { Portfolio } from "@cyopo/Models/portfolio/portfolio.model";
import useCookieConsent from "@cyopo/Hooks/useCookieConsent";

export interface CookieConsentProps {
  hasResponded: boolean;
  accept: () => void;
  decline: () => void;
}

export interface PublicTemplateProps {
  portfolio: Portfolio;
  cookieConsent: CookieConsentProps;
}

const TEMPLATE_MAP: Record<string, React.FC<PublicTemplateProps>> = {
  MLT: MLT,
  BCT: BCT,
};

const FallbackTemplate = MLT;

const PublicPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [hasRecordedView, setHasRecordedView] = useState(false);

  const { isAccepted, accept, decline, hasResponded } = useCookieConsent();

  useEffect(() => {
    if (!slug) return;
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await PublicAPIService.getBySlug(slug);
        setPortfolio(data);
      } catch {
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [slug]);

  useEffect(() => {
    if (!portfolio || !slug || !isAccepted || hasRecordedView) return;
    PublicAPIService.recordView(slug);
    setHasRecordedView(true);
  }, [portfolio, slug, isAccepted, hasRecordedView]);

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <div className='w-10 h-10 border-[3px] border-violet-500 border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  if (notFound || !portfolio) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4 bg-white'>
        <span className='material-symbols-outlined text-6xl text-gray-300'>search_off</span>
        <h1 className='text-2xl font-bold text-gray-900'>Portfolio not found</h1>
        <p className='text-gray-500 text-sm max-w-sm'>This portfolio does not exist or has been unpublished.</p>
      </div>
    );
  }

  const TemplateComponent = TEMPLATE_MAP[portfolio.templateSlug] ?? FallbackTemplate;

  // Inject template colors as CSS variables
  // --tp = template primary color
  // --ts = template secondary color
  const templateVars = {
    "--tp": portfolio.templatePrimaryColor ?? "#111827",
    "--ts": portfolio.templateSecondaryColor ?? "#8b5cf6",
  } as React.CSSProperties;

  return (
    <div style={templateVars}>
      <TemplateComponent portfolio={portfolio} cookieConsent={{ hasResponded, accept, decline }} />
    </div>
  );
};

export default PublicPage;
