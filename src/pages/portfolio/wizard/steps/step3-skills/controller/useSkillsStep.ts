import { useState } from "react";
import { useWizardContext } from "../../../common/WizardContext";
import type { Skill, Certification, SkillCategory } from "@cyopo/Models/portfolio/portfolio.model";

const useSkillsStep = () => {
  const { formData, updateSkills } = useWizardContext();
  const [activeTab, setActiveTab] = useState<"skills" | "certifications">("skills");

  // ─── Skill form state ─────────────────────────────────────────────
  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "FRONTEND" as string,
    customCategory: "",
    proficiency: "INTERMEDIATE",
    isCustom: false,
  });
  const [newCert, setNewCert] = useState({
    name: "",
    provider: "",
    issueDate: "",
  });

  // ─── Custom category form state ───────────────────────────────────
  const [newCustomCategory, setNewCustomCategory] = useState("");

  const skills = formData.skills.skills ?? [];
  const certifications = formData.skills.certifications ?? [];
  const customCategories = formData.skills.customCategories ?? [];

  // ─── Skill handlers ───────────────────────────────────────────────
  const handleAddSkill = () => {
    if (!newSkill.name.trim()) return;

    // Use isCustom flag — not category value (category is set to "OTHER" internally)
    if (newSkill.isCustom && !newSkill.customCategory.trim()) return;

    const skill: Skill = {
      name: newSkill.name.trim(),
      category: newSkill.isCustom ? null : (newSkill.category as SkillCategory),
      customCategory: newSkill.isCustom ? newSkill.customCategory.trim() : undefined,
      proficiency: newSkill.proficiency as any,
    };

    updateSkills({ skills: [...skills, skill] });
    setNewSkill({
      name: "",
      category: "FRONTEND",
      customCategory: "",
      proficiency: "INTERMEDIATE",
      isCustom: false,
    });
  };

  const handleRemoveSkill = (index: number) => {
    updateSkills({ skills: skills.filter((_, i) => i !== index) });
  };

  const handleNewSkillChange = (field: string, value: string) => {
    if (field === "category") {
      setNewSkill((prev) => ({
        ...prev,
        // Keep category as "OTHER" internally when CUSTOM is picked
        // isCustom flag drives the UI — not the category value
        category: value === "CUSTOM" ? "OTHER" : (value as SkillCategory),
        isCustom: value === "CUSTOM",
        customCategory: "",
      }));
      return;
    }
    setNewSkill((prev) => ({ ...prev, [field]: value }));
  };

  // ─── Custom category handlers ─────────────────────────────────────
  const handleAddCustomCategory = () => {
    const trimmed = newCustomCategory.trim();
    if (!trimmed) return;
    if (customCategories.includes(trimmed)) return;
    updateSkills({ customCategories: [...customCategories, trimmed] });
    setNewCustomCategory("");
  };

  const handleRemoveCustomCategory = (cat: string) => {
    updateSkills({
      customCategories: customCategories.filter((c) => c !== cat),
    });
  };

  // ─── Cert handlers ────────────────────────────────────────────────
  const handleAddCert = () => {
    if (!newCert.name.trim() || !newCert.provider.trim()) return;
    const cert: Certification = {
      name: newCert.name.trim(),
      provider: newCert.provider.trim(),
      issueDate: newCert.issueDate || undefined,
    };
    updateSkills({ certifications: [...certifications, cert] });
    setNewCert({ name: "", provider: "", issueDate: "" });
  };

  const handleRemoveCert = (index: number) => {
    updateSkills({ certifications: certifications.filter((_, i) => i !== index) });
  };

  const handleNewCertChange = (field: string, value: string) => setNewCert((prev) => ({ ...prev, [field]: value }));

  return {
    state: {
      activeTab,
      skills,
      certifications,
      customCategories,
      newSkill,
      newCert,
      newCustomCategory,
      isCustomCategory: newSkill.isCustom, // ← fixed: use isCustom flag
    },
    handlers: {
      setActiveTab,
      handleAddSkill,
      handleRemoveSkill,
      handleNewSkillChange,
      handleAddCustomCategory,
      handleRemoveCustomCategory,
      setNewCustomCategory,
      handleAddCert,
      handleRemoveCert,
      handleNewCertChange,
    },
  };
};

export default useSkillsStep;
