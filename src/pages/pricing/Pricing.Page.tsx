import React from "react";
import Pricing from "@cyopo/Pages/landing/pricing/view/Pricing";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";
import { ArrowLeft } from "lucide-react";

/**
 * Standalone pricing page.
 * Reuses the same Pricing section component from landing page.
 * Used when authenticated users want to upgrade.
 */
const PricingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-background'>
      {/* Simple header with back button */}
      <div className='sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-outline-variant/20 px-4 sm:px-6 py-3 flex items-center gap-3'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface transition-colors'>
          <ArrowLeft size={16} />
          Back
        </button>
        <div className='h-4 w-px bg-outline-variant/30' />
        <span className='font-headline font-bold text-primary text-base'>cyopo</span>
      </div>

      {/* Pricing section — same component as landing page */}
      <Pricing />
    </div>
  );
};

export default PricingPage;
