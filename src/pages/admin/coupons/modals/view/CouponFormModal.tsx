import React from "react";
import { X } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import useCouponForm from "../../controller/useCouponForm";
import type { AdminCouponData, DiscountType } from "@cyopo/Models/admin/admin.models";

interface Props {
  coupon: AdminCouponData | null;
  onSuccess: (saved: AdminCouponData) => void;
  onClose: () => void;
}

const inputCls = [
  "w-full px-4 py-2.5 rounded-xl text-sm",
  "bg-surface border border-outline-variant/30",
  "text-on-surface placeholder:text-on-surface-variant/50",
  "focus:outline-none focus:ring-2 focus:ring-primary/20",
  "focus:border-primary/40 transition-all duration-200",
].join(" ");

const CouponFormModal: React.FC<Props> = ({ coupon, onSuccess, onClose }) => {
  const { state, handlers } = useCouponForm(coupon, onSuccess);

  return (
    <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-end' onClick={onClose}>
      <div className='bg-surface h-full w-full max-w-md flex flex-col shadow-2xl' onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className='flex items-center justify-between px-6 py-4 border-b border-outline-variant/20 flex-shrink-0'>
          <h2 className='font-semibold text-on-surface'>{state.isEdit ? "Edit Coupon" : "New Coupon"}</h2>
          <button
            onClick={onClose}
            className='w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors'>
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className='flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5'>
          {/* General error */}
          {state.errors.general && (
            <div className='px-4 py-3 bg-error-container/40 border border-error/20 rounded-xl text-xs text-error'>{state.errors.general}</div>
          )}

          {/* Code — read only in edit mode */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-on-surface-variant'>
              Code <span className='text-error'>*</span>
              {state.isEdit && <span className='ml-1 text-on-surface-variant/50 font-normal'>(cannot be changed)</span>}
            </label>
            <input
              type='text'
              value={state.values.code}
              onChange={(e) => handlers.handleChange("code", e.target.value.toUpperCase())}
              placeholder='LAUNCH50'
              readOnly={state.isEdit}
              className={[
                inputCls,
                state.isEdit ? "opacity-60 cursor-not-allowed font-mono" : "font-mono",
                state.errors.code ? "border-error/60" : "",
              ].join(" ")}
            />
            {state.errors.code && <p className='text-xs text-error'>{state.errors.code}</p>}
          </div>

          {/* Description */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-on-surface-variant'>Description</label>
            <input
              type='text'
              value={state.values.description}
              onChange={(e) => handlers.handleChange("description", e.target.value)}
              placeholder='Summer launch discount'
              className={inputCls}
            />
          </div>

          {/* Discount type — read only in edit */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-on-surface-variant'>
              Discount Type <span className='text-error'>*</span>
            </label>
            <select
              value={state.values.discountType}
              onChange={(e) => handlers.handleChange("discountType", e.target.value as DiscountType)}
              disabled={state.isEdit}
              className={[inputCls, state.isEdit ? "opacity-60 cursor-not-allowed" : ""].join(" ")}>
              <option value='PERCENTAGE'>Percentage (e.g. 20% off)</option>
              <option value='FIXED'>Fixed amount (e.g. $20 off)</option>
              <option value='FULL'>Full discount (100% free)</option>
            </select>
          </div>

          {/* Discount value — hidden for FULL */}
          {state.values.discountType !== "FULL" && (
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-on-surface-variant'>
                Discount Value <span className='text-error'>*</span>
                <span className='ml-1 text-on-surface-variant/50 font-normal'>{state.values.discountType === "PERCENTAGE" ? "(1–100%)" : "($)"}</span>
              </label>
              <input
                type='number'
                value={state.values.discountValue}
                onChange={(e) => handlers.handleChange("discountValue", e.target.value)}
                placeholder={state.values.discountType === "PERCENTAGE" ? "20" : "10"}
                disabled={state.isEdit}
                className={[inputCls, state.isEdit ? "opacity-60 cursor-not-allowed" : "", state.errors.discountValue ? "border-error/60" : ""].join(
                  " ",
                )}
              />
              {state.errors.discountValue && <p className='text-xs text-error'>{state.errors.discountValue}</p>}
            </div>
          )}

          {/* Audience */}
          <div className='flex flex-col gap-3'>
            <label className='text-xs font-medium text-on-surface-variant'>Audience</label>

            {/* Toggle — All / Specific */}
            <div className='flex gap-2'>
              {[
                { label: "All Users", value: true },
                { label: "Specific Users", value: false },
              ].map((opt) => (
                <button
                  key={String(opt.value)}
                  type='button'
                  onClick={() => handlers.handleChange("isPublic", opt.value)}
                  className={[
                    "flex-1 py-2 rounded-xl text-sm font-medium transition-all border",
                    state.values.isPublic === opt.value
                      ? "bg-primary text-on-primary border-primary"
                      : "bg-surface border-outline-variant/30 text-on-surface-variant hover:bg-surface-container",
                  ].join(" ")}>
                  {opt.label}
                </button>
              ))}
            </div>

            {/* User search — only when Specific Users selected */}
            {!state.values.isPublic && (
              <div className='flex flex-col gap-2'>
                {/* Search input */}
                <div className='relative'>
                  <input
                    type='text'
                    value={state.values.userSearchQuery}
                    onChange={(e) => handlers.handleUserSearch(e.target.value)}
                    placeholder='Search by email...'
                    className={[inputCls, "pr-8"].join(" ")}
                  />
                  {state.isSearchingUsers && (
                    <span className='absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin' />
                  )}
                </div>

                {/* Search results dropdown */}
                {state.userSearchResults.length > 0 && (
                  <div className='bg-surface border border-outline-variant/20 rounded-xl overflow-hidden shadow-lg'>
                    {state.userSearchResults.map((user) => (
                      <button
                        key={user.id}
                        type='button'
                        onClick={() => handlers.handleAddUser(user)}
                        className='w-full flex items-center gap-3 px-4 py-2.5 hover:bg-surface-container transition-colors text-left'>
                        <div className='w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary'>
                          {user.name[0]?.toUpperCase()}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='text-sm font-medium text-on-surface truncate'>{user.name}</p>
                          <p className='text-xs text-on-surface-variant truncate'>{user.email}</p>
                        </div>
                        <span className='material-symbols-outlined text-primary text-[16px]'>add</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Added users list */}
                {state.values.targetUserIds.length > 0 && (
                  <div className='flex flex-col gap-1.5'>
                    <p className='text-xs text-on-surface-variant'>
                      {state.values.targetUserIds.length} user{state.values.targetUserIds.length !== 1 ? "s" : ""} added
                    </p>
                    <div className='flex flex-col gap-1 max-h-40 overflow-y-auto'>
                      {state.values.targetUsers.length > 0
                        ? state.values.targetUsers.map((user) => (
                            <div key={user.id} className='flex items-center gap-3 px-3 py-2 bg-surface-container rounded-xl'>
                              <div className='w-6 h-6 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary'>
                                {user.name[0]?.toUpperCase()}
                              </div>
                              <div className='flex-1 min-w-0'>
                                <p className='text-xs font-medium text-on-surface truncate'>{user.name}</p>
                                <p className='text-xs text-on-surface-variant truncate'>{user.email}</p>
                              </div>
                              <button
                                type='button'
                                onClick={() => handlers.handleRemoveUser(user.id)}
                                className='text-on-surface-variant hover:text-error transition-colors'>
                                <span className='material-symbols-outlined text-[16px]'>close</span>
                              </button>
                            </div>
                          ))
                        : // Edit mode — only have IDs, show them
                          state.values.targetUserIds.map((id) => (
                            <div key={id} className='flex items-center gap-3 px-3 py-2 bg-surface-container rounded-xl'>
                              <span className='material-symbols-outlined text-on-surface-variant text-[16px]'>person</span>
                              <p className='flex-1 text-xs font-mono text-on-surface-variant truncate'>{id}</p>
                              <button
                                type='button'
                                onClick={() => handlers.handleRemoveUser(id)}
                                className='text-on-surface-variant hover:text-error transition-colors'>
                                <span className='material-symbols-outlined text-[16px]'>close</span>
                              </button>
                            </div>
                          ))}
                    </div>
                  </div>
                )}

                {/* Validation */}
                {!state.values.isPublic && state.values.targetUserIds.length === 0 && (
                  <p className='text-xs text-on-surface-variant'>Add at least one user or switch to All Users.</p>
                )}
              </div>
            )}
          </div>

          {/* Max uses + per user limit */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-on-surface-variant'>
                Max Uses
                <span className='ml-1 text-on-surface-variant/50 font-normal'>(blank = unlimited)</span>
              </label>
              <input
                type='number'
                value={state.values.maxUses}
                onChange={(e) => handlers.handleChange("maxUses", e.target.value)}
                placeholder='100'
                min='1'
                className={inputCls}
              />
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-on-surface-variant'>Per User Limit</label>
              <input
                type='number'
                value={state.values.perUserLimit}
                onChange={(e) => handlers.handleChange("perUserLimit", e.target.value)}
                placeholder='1'
                min='1'
                className={inputCls}
              />
            </div>
          </div>

          {/* Valid from + until */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-on-surface-variant'>Valid From</label>
              <input
                type='datetime-local'
                value={state.values.validFrom}
                onChange={(e) => handlers.handleChange("validFrom", e.target.value)}
                className={inputCls}
              />
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-on-surface-variant'>Valid Until</label>
              <input
                type='datetime-local'
                value={state.values.validUntil}
                onChange={(e) => handlers.handleChange("validUntil", e.target.value)}
                className={[inputCls, state.errors.validUntil ? "border-error/60" : ""].join(" ")}
              />
              {state.errors.validUntil && <p className='text-xs text-error'>{state.errors.validUntil}</p>}
            </div>

            {state.isEdit && coupon?.validUntil && new Date(coupon.validUntil) < new Date() && (
              <div className='flex items-start gap-2 px-4 py-3 bg-error-container/40 border border-error/20 rounded-xl'>
                <span className='material-symbols-outlined text-error text-[16px] flex-shrink-0 mt-0.5'>schedule</span>
                <p className='text-xs text-error'>This coupon has expired. Update the expiry date to reactivate it.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className='flex items-center gap-3 px-6 py-4 border-t border-outline-variant/20 flex-shrink-0'>
          <Button variant='primary' size='md' loading={state.isSaving} disabled={!state.canSubmit} onClick={handlers.handleSubmit} className='flex-1'>
            {state.isEdit ? "Save Changes" : "Create Coupon"}
          </Button>
          <Button variant='secondary' size='md' onClick={onClose} className='flex-1'>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CouponFormModal;
