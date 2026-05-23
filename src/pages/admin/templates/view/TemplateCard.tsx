import React from "react";
import { Copy, Edit2, Trash2 } from "lucide-react";
import { TemplateData } from "@cyopo/Models/admin/admin.models";

interface Props {
  template: TemplateData;
  togglingId: string | null;
  duplicatingId: string | null;
  onEdit: (t: TemplateData) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onToggle: (t: TemplateData) => void;
}

const TemplateCard: React.FC<Props> = ({ template, togglingId, duplicatingId, onEdit, onDuplicate, onDelete, onToggle }) => {
  const isToggling = togglingId === template.id;
  const isDuplicating = duplicatingId === template.id;

  return (
    <div className='bg-surface border border-outline-variant/20 rounded-2xl p-4'>
      {/* Top row — thumbnail + title + status toggle */}
      <div className='flex items-start gap-3 mb-3'>
        <div className='w-14 h-10 rounded-xl overflow-hidden bg-surface-container flex-shrink-0'>
          {template.thumbnail ? (
            <img src={template.thumbnail} alt={template.title} className='w-full h-full object-cover' />
          ) : (
            <div className='w-full h-full' style={{ background: template.primaryColor }} />
          )}
        </div>

        <div className='flex-1 min-w-0'>
          <p className='font-semibold text-sm text-on-surface capitalize truncate'>{template.title}</p>
          <p className='text-xs text-on-surface-variant truncate mt-0.5'>{template.description}</p>
        </div>

        {/* Status toggle */}
        <button
          onClick={() => onToggle(template)}
          disabled={isToggling}
          className={[
            "relative w-10 h-5 rounded-full transition-colors duration-200 flex-shrink-0",
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
      </div>

      {/* Middle row — colors + plan badge */}
      <div className='flex items-center gap-3 mb-3'>
        {/* Colors */}
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

        {/* Plan badge */}
        {template.premium ? (
          <span className='px-2 py-0.5 bg-primary text-on-primary text-[10px] font-bold rounded-full'>PREMIUM</span>
        ) : (
          <span className='px-2 py-0.5 bg-surface-container text-on-surface-variant text-[10px] font-medium rounded-full'>FREE</span>
        )}

        {/* Status label */}
        <span className={["text-[10px] font-medium", template.status === "ACTIVE" ? "text-primary" : "text-on-surface-variant"].join(" ")}>
          {template.status}
        </span>
      </div>

      {/* Tags */}
      {template.tags.length > 0 && (
        <div className='flex flex-wrap gap-1.5 mb-3'>
          {template.tags.slice(0, 4).map((tag) => (
            <span key={tag} className='px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] rounded-md'>
              {tag}
            </span>
          ))}
          {template.tags.length > 4 && <span className='text-[10px] text-on-surface-variant'>+{template.tags.length - 4}</span>}
        </div>
      )}

      {/* Actions */}
      <div className='flex items-center gap-2 pt-2 border-t border-outline-variant/10'>
        <button
          onClick={() => onEdit(template)}
          className='flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors'>
          <Edit2 size={13} />
          Edit
        </button>

        <button
          onClick={() => onDuplicate(template.id)}
          disabled={isDuplicating}
          className='flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors disabled:opacity-50'>
          {isDuplicating ? <span className='w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin' /> : <Copy size={13} />}
          Duplicate
        </button>

        <button
          onClick={() => onDelete(template.id)}
          className='flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-on-surface-variant hover:bg-error-container hover:text-error transition-colors'>
          <Trash2 size={13} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;
