import React from "react";
import { Plus } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import { EMPTY_TITLE, EMPTY_SUBTITLE, EMPTY_CTA, EMPTY_FILTERED_TITLE, EMPTY_FILTERED_SUB } from "../PortfolioList.constants";

interface Props {
  isFiltered: boolean;
  onCreateNew: () => void;
}

const PortfolioEmptyState: React.FC<Props> = ({ isFiltered, onCreateNew }) => {
  return (
    <div className='col-span-full flex flex-col items-center justify-center py-20 text-center'>
      <div className='w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center mb-5'>
        <span className='material-symbols-outlined text-on-surface-variant text-3xl'>{isFiltered ? "search_off" : "folder_open"}</span>
      </div>
      <h3 className='font-headline font-bold text-on-surface text-lg mb-2'>{isFiltered ? EMPTY_FILTERED_TITLE : EMPTY_TITLE}</h3>
      <p className='text-sm text-on-surface-variant max-w-xs leading-relaxed mb-6'>{isFiltered ? EMPTY_FILTERED_SUB : EMPTY_SUBTITLE}</p>
      {!isFiltered && (
        <Button variant='primary' leftIcon={<Plus size={16} />} onClick={onCreateNew}>
          {EMPTY_CTA}
        </Button>
      )}
    </div>
  );
};

export default PortfolioEmptyState;
