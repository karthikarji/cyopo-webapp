import React from "react";
import TemplateRow from "./TemplateRow";
import TemplateCard from "./TemplateCard";
import type { TemplateData } from "@cyopo/Models/admin/admin.models";

interface Props {
  templates: TemplateData[];
  isLoading: boolean;
  togglingId: string | null;
  duplicatingId: string | null;
  onEdit: (t: TemplateData) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onToggle: (t: TemplateData) => void;
}

const TemplateList: React.FC<Props> = ({ templates, isLoading, togglingId, duplicatingId, onEdit, onDuplicate, onDelete, onToggle }) => {
  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-24'>
        <div className='w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  if (!templates || templates.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-24 gap-3 text-center'>
        <span className='material-symbols-outlined text-4xl text-on-surface-variant/30'>style</span>
        <p className='font-medium text-on-surface'>No templates found</p>
        <p className='text-sm text-on-surface-variant'>Create your first template to get started.</p>
      </div>
    );
  }

  const rowProps = { togglingId, duplicatingId, onEdit, onDuplicate, onDelete, onToggle };

  return (
    <>
      {/* Desktop — table */}
      <div className='hidden md:block bg-surface border border-outline-variant/20 rounded-2xl overflow-hidden'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-outline-variant/20 bg-surface-container/50'>
              {["Template", "Colors", "Plan", "Status", "Tags", "Actions"].map((h) => (
                <th key={h} className='px-4 py-3 text-left text-xs font-semibold text-on-surface-variant uppercase tracking-wide'>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {templates.map((template) => (
              <TemplateRow key={template.id} template={template} {...rowProps} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile — cards */}
      <div className='flex flex-col gap-3 md:hidden'>
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} {...rowProps} />
        ))}
      </div>
    </>
  );
};

export default TemplateList;
