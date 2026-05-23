import React from "react";
import { Copy, Edit2, Trash2 } from "lucide-react";
import type { TemplateData } from "@cyopo/Models/admin/admin.models";

interface Props {
  template: TemplateData;
  togglingId: string | null;
  duplicatingId: string | null;
  onEdit: (t: TemplateData) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onToggle: (t: TemplateData) => void;
}

const TemplateRow: React.FC<Props> = ({ template, togglingId, duplicatingId, onEdit, onDuplicate, onDelete, onToggle }) => {
  const isToggling = togglingId === template.id;
  const isDuplicating = duplicatingId === template.id;

  return (
    <tr className='border-b border-outline-variant/10 hover:bg-surface-container/30 transition-colors'>
      {/* Thumbnail + title */}
      <td className='px-4 py-3'>
        <div className='flex items-center gap-3'>
          <div className='w-12 h-8 rounded-lg overflow-hidden bg-surface-container flex-shrink-0'>
            {template.thumbnail ? (
              <img src={template.thumbnail} alt={template.title} className='w-full h-full object-cover' />
            ) : (
              <div className='w-full h-full' style={{ background: template.primaryColor }} />
            )}
          </div>
          <div>
            <p className='font-medium text-sm text-on-surface capitalize'>{template.title}</p>
            <p className='text-xs text-on-surface-variant truncate max-w-[200px]'>{template.description}</p>
          </div>
        </div>
      </td>

      {/* Colors */}
      <td className='px-4 py-3'>
        <div className='flex items-center gap-1.5'>
          <div
            className='w-5 h-5 rounded-full border border-outline-variant/20'
            style={{ background: template.primaryColor }}
            title={template.primaryColor}
          />
          <div
            className='w-5 h-5 rounded-full border border-outline-variant/20'
            style={{ background: template.secondaryColor }}
            title={template.secondaryColor}
          />
        </div>
      </td>

      {/* Premium */}
      <td className='px-4 py-3'>
        {template.premium ? (
          <span className='px-2 py-0.5 bg-primary text-on-primary text-[10px] font-bold rounded-full'>PREMIUM</span>
        ) : (
          <span className='px-2 py-0.5 bg-surface-container text-on-surface-variant text-[10px] font-medium rounded-full'>FREE</span>
        )}
      </td>

      {/* Status toggle */}
      <td className='px-4 py-3'>
        <button
          onClick={() => onToggle(template)}
          disabled={isToggling}
          className={[
            "relative w-10 h-5 rounded-full transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/30",
            isToggling ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
            template.status === "ACTIVE" ? "bg-primary" : "bg-outline-variant",
          ].join(" ")}>
          <span
            className={[
              "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow",
              "transition-transform duration-200",
              template.status === "ACTIVE" ? "translate-x-5" : "translate-x-0",
            ].join(" ")}
          />
        </button>
      </td>

      {/* Tags */}
      <td className='px-4 py-3'>
        <div className='flex flex-wrap gap-1 max-w-[180px]'>
          {template.tags.slice(0, 3).map((tag) => (
            <span key={tag} className='px-1.5 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] rounded-md'>
              {tag}
            </span>
          ))}
          {template.tags.length > 3 && <span className='text-[10px] text-on-surface-variant'>+{template.tags.length - 3}</span>}
        </div>
      </td>

      {/* Actions */}
      <td className='px-4 py-3'>
        <div className='flex items-center gap-1'>
          {/* Edit */}
          <button
            onClick={() => onEdit(template)}
            className='w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors'
            title='Edit'>
            <Edit2 size={14} />
          </button>

          {/* Duplicate */}
          <button
            onClick={() => onDuplicate(template.id)}
            disabled={isDuplicating}
            className='w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors disabled:opacity-50'
            title='Duplicate'>
            {isDuplicating ? (
              <span className='w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin' />
            ) : (
              <Copy size={14} />
            )}
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(template.id)}
            className='w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-error-container hover:text-error transition-colors'
            title='Delete'>
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TemplateRow;
