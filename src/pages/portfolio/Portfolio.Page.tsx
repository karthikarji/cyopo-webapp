import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "@cyopo/Components/button/Button";
import PortfolioFilter from "./filter/view/PortfolioFilter";
import PortfolioList from "./list/view/PortfolioList";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";
import { useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectPortfolioTotal } from "./common/redux/selectors/Portfolio.selector";

const PortfolioPage: React.FC = () => {
  const navigate = useNavigate();
  const total = useAppSelector(selectPortfolioTotal);

  return (
    <div>
      {/* Page header */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='font-headline font-bold text-on-surface text-2xl sm:text-3xl'>My portfolios</h1>
          <p className='text-on-surface-variant text-sm mt-0.5'>{total > 0 ? `${total} portfolio${total > 1 ? "s" : ""}` : "No portfolios yet"}</p>
        </div>
        <Button variant='primary' leftIcon={<Plus size={16} />} onClick={() => navigate(ROUTES.PORTFOLIO_NEW)} className='hidden sm:flex'>
          New portfolio
        </Button>
      </div>

      {/* Filter bar */}
      <PortfolioFilter />

      {/* Portfolio grid */}
      <PortfolioList />

      {/* Mobile FAB */}
      <button
        onClick={() => navigate(ROUTES.PORTFOLIO_NEW)}
        className={[
          "fixed bottom-20 right-4 z-30 sm:hidden",
          "w-14 h-14 rounded-full bg-primary text-on-primary",
          "flex items-center justify-center shadow-lg",
          "hover:opacity-90 active:scale-95 transition-all",
        ].join(" ")}>
        <Plus size={24} />
      </button>
    </div>
  );
};

export default PortfolioPage;
