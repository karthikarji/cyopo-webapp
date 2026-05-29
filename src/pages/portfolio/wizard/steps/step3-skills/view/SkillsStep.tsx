import React from "react";
import { Plus, X } from "lucide-react";
import useSkillsStep from "../controller/useSkillsStep";
import TabSwitcher from "@cyopo/Components/tab-switcher/TabSwitcher";
import { SKILLS_STEP_TITLE, SKILLS_STEP_SUBTITLE, SKILL_CATEGORIES, SKILL_PROFICIENCIES, SKILL_TABS } from "../SkillsStep.constants";

const inputCls = [
  "w-full px-3 py-2 rounded-xl text-sm",
  "bg-surface-container border border-outline-variant/30",
  "text-on-surface placeholder:text-on-surface-variant/50",
  "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40",
  "transition-all duration-200",
].join(" ");

const PROFICIENCY_COLORS: Record<string, string> = {
  BEGINNER: "bg-surface-container text-on-surface-variant",
  INTERMEDIATE: "bg-secondary-container text-on-secondary-container",
  ADVANCED: "bg-primary-container text-on-primary-container",
  EXPERT: "bg-primary text-on-primary",
};

const SkillsStep: React.FC = () => {
  const { state, handlers } = useSkillsStep();

  return (
    <div>
      {/* Header */}
      <div className='text-center mb-6'>
        <h2 className='font-headline font-bold text-on-surface text-xl sm:text-2xl mb-2'>{SKILLS_STEP_TITLE}</h2>
        <p className='text-sm text-on-surface-variant'>{SKILLS_STEP_SUBTITLE}</p>
      </div>

      {/* Tab switcher */}
      <div className='mb-6'>
        <TabSwitcher
          tabs={SKILL_TABS.map((t) => ({ id: t.value, label: t.label }))}
          activeTab={state.activeTab}
          onChange={(id) => handlers.setActiveTab(id as any)}
          fullWidth
        />
      </div>

      {/* ─── Skills Tab ──────────────────────────────────────────── */}
      {state.activeTab === "skills" && (
        <div className='flex flex-col gap-5'>
          {/* Add skill form */}
          <div className='bg-surface border border-outline-variant/20 rounded-2xl p-5'>
            <p className='text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-3'>Add Skill</p>
            <div className='flex flex-col sm:flex-row gap-2 mb-3'>
              <input
                type='text'
                value={state.newSkill.name}
                onChange={(e) => handlers.handleNewSkillChange("name", e.target.value)}
                placeholder='Skill name (e.g. React)'
                className={[inputCls, "flex-1"].join(" ")}
                onKeyDown={(e) => e.key === "Enter" && handlers.handleAddSkill()}
              />
              <select
                value={state.newSkill.category}
                onChange={(e) => handlers.handleNewSkillChange("category", e.target.value)}
                className={[inputCls, "sm:w-44"].join(" ")}>
                {SKILL_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              <select
                value={state.newSkill.proficiency}
                onChange={(e) => handlers.handleNewSkillChange("proficiency", e.target.value)}
                className={[inputCls, "sm:w-36"].join(" ")}>
                {SKILL_PROFICIENCIES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom category input — shown when CUSTOM selected */}
            {state.isCustomCategory && (
              <div className='flex gap-2 mb-3'>
                <input
                  type='text'
                  value={state.newSkill.customCategory}
                  onChange={(e) => handlers.handleNewSkillChange("customCategory", e.target.value)}
                  placeholder='Enter custom category name (e.g. Blockchain)'
                  className={[inputCls, "flex-1"].join(" ")}
                  onKeyDown={(e) => e.key === "Enter" && handlers.handleAddSkill()}
                  autoFocus
                />
              </div>
            )}

            <button
              onClick={handlers.handleAddSkill}
              disabled={!state.newSkill.name.trim() || (state.isCustomCategory && !state.newSkill.customCategory.trim())}
              className='flex items-center gap-1.5 px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50'>
              <Plus size={15} />
              Add Skill
            </button>
          </div>

          {/* Custom categories manager */}
          <div className='bg-surface border border-outline-variant/20 rounded-2xl p-5'>
            <p className='text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-3'>
              Custom Categories
              <span className='ml-1 font-normal normal-case'>— create your own skill groups</span>
            </p>
            <div className='flex gap-2 mb-3'>
              <input
                type='text'
                value={state.newCustomCategory}
                onChange={(e) => handlers.setNewCustomCategory(e.target.value)}
                placeholder='e.g. Blockchain, Game Dev, Music Production'
                className={[inputCls, "flex-1"].join(" ")}
                onKeyDown={(e) => e.key === "Enter" && handlers.handleAddCustomCategory()}
              />
              <button
                onClick={handlers.handleAddCustomCategory}
                disabled={!state.newCustomCategory.trim()}
                className='flex items-center gap-1.5 px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex-shrink-0'>
                <Plus size={15} />
                Add
              </button>
            </div>
            {state.customCategories.length > 0 ? (
              <div className='flex flex-wrap gap-2'>
                {state.customCategories.map((cat) => (
                  <div
                    key={cat}
                    className='flex items-center gap-1.5 bg-secondary-container border border-outline-variant/20 rounded-full px-3 py-1.5'>
                    <span className='text-sm font-medium text-on-secondary-container'>{cat}</span>
                    <button
                      onClick={() => handlers.handleRemoveCustomCategory(cat)}
                      className='text-on-surface-variant hover:text-error transition-colors'>
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-xs text-on-surface-variant'>No custom categories yet. Add one above.</p>
            )}
          </div>

          {/* Skills list */}
          <div className='bg-surface border border-outline-variant/20 rounded-2xl p-5'>
            <p className='text-xs font-semibold text-on-surface-variant uppercase tracking-wide mb-3'>Your Skills ({state.skills.length})</p>
            {state.skills.length === 0 ? (
              <p className='text-center py-8 text-on-surface-variant text-sm'>No skills added yet. Add your first skill above.</p>
            ) : (
              <div className='flex flex-wrap gap-2'>
                {state.skills.map((skill, index) => (
                  <div key={index} className='flex items-center gap-2 bg-surface-container border border-outline-variant/20 rounded-full px-3 py-1.5'>
                    <span className='text-sm font-medium text-on-surface'>{skill.name}</span>
                    {/* Category badge */}
                    <span className='text-[10px] text-on-surface-variant'>{skill.customCategory ?? skill.category}</span>
                    <span
                      className={[
                        "text-[10px] px-2 py-0.5 rounded-full font-medium",
                        PROFICIENCY_COLORS[skill.proficiency] ?? "bg-surface-container text-on-surface-variant",
                      ].join(" ")}>
                      {skill.proficiency}
                    </span>
                    <button onClick={() => handlers.handleRemoveSkill(index)} className='text-on-surface-variant hover:text-error transition-colors'>
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Certifications Tab ───────────────────────────────────── */}
      {state.activeTab === "certifications" && (
        <div className='bg-surface border border-outline-variant/20 rounded-2xl p-5'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5'>
            <input
              type='text'
              value={state.newCert.name}
              onChange={(e) => handlers.handleNewCertChange("name", e.target.value)}
              placeholder='Certification name'
              className={inputCls}
            />
            <input
              type='text'
              value={state.newCert.provider}
              onChange={(e) => handlers.handleNewCertChange("provider", e.target.value)}
              placeholder='Provider (e.g. AWS)'
              className={inputCls}
            />
            <div className='flex gap-2'>
              <input
                type='date'
                value={state.newCert.issueDate}
                onChange={(e) => handlers.handleNewCertChange("issueDate", e.target.value)}
                className={[inputCls, "flex-1"].join(" ")}
              />
              <button
                onClick={handlers.handleAddCert}
                className='flex items-center gap-1.5 px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-opacity flex-shrink-0'>
                <Plus size={15} />
                Add
              </button>
            </div>
          </div>

          {state.certifications.length === 0 ? (
            <div className='text-center py-8 text-on-surface-variant text-sm'>No certifications added yet.</div>
          ) : (
            <div className='flex flex-col gap-2'>
              {state.certifications.map((cert, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between gap-3 bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3'>
                  <div>
                    <p className='text-sm font-medium text-on-surface'>{cert.name}</p>
                    <p className='text-xs text-on-surface-variant'>
                      {cert.provider}
                      {cert.issueDate ? ` · ${cert.issueDate}` : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => handlers.handleRemoveCert(index)}
                    className='text-on-surface-variant hover:text-error transition-colors flex-shrink-0'>
                    <X size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillsStep;
