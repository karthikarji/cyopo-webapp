import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicAPIService from "@cyopo/Services/api/public/PublicAPIService";
import MLT from "./templates/MLT/MLT";
import BCT from "./templates/BCT/BCT";
import type { Portfolio } from "@cyopo/Models/portfolio/portfolio.model";

const TEMPLATE_MAP: Record<string, React.FC<{ portfolio: Portfolio }>> = {
  MLT: MLT,
  BCT: BCT,
};

const FallbackTemplate = MLT;

const PublicPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const load = async () => {
      try {
        const data = await PublicAPIService.getBySlug(slug);
        setPortfolio(data);
        PublicAPIService.recordView(slug);
      } catch {
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [slug]);

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

  return <TemplateComponent portfolio={portfolio} />;
};

export default PublicPage;
