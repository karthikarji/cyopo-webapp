import { useState } from "react";
import { useWizardContext } from "../../../common/WizardContext";
import type { Skill, Certification } from "@cyopo/Models/portfolio/portfolio.model";

const useSkillsStep = () => {
  const { formData, updateSkills } = useWizardContext();
  const [activeTab, setActiveTab] = useState<"skills" | "certifications">("skills");
  const [newSkill, setNewSkill] = useState({ name: "", category: "FRONTEND", proficiency: "INTERMEDIATE" });
  const [newCert, setNewCert] = useState({ name: "", provider: "", issueDate: "" });

  const skills = formData.skills.skills ?? [];
  const certifications = formData.skills.certifications ?? [];

  const handleAddSkill = () => {
    if (!newSkill.name.trim()) return;
    const skill: Skill = {
      name: newSkill.name.trim(),
      category: newSkill.category as any,
      proficiency: newSkill.proficiency as any,
    };
    updateSkills({ skills: [...skills, skill] });
    setNewSkill({ name: "", category: "FRONTEND", proficiency: "INTERMEDIATE" });
  };

  const handleRemoveSkill = (index: number) => {
    updateSkills({ skills: skills.filter((_, i) => i !== index) });
  };

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

  const handleNewSkillChange = (field: string, value: string) => setNewSkill((prev) => ({ ...prev, [field]: value }));

  const handleNewCertChange = (field: string, value: string) => setNewCert((prev) => ({ ...prev, [field]: value }));

  return {
    state: {
      activeTab,
      skills,
      certifications,
      newSkill,
      newCert,
    },
    handlers: {
      setActiveTab,
      handleAddSkill,
      handleRemoveSkill,
      handleAddCert,
      handleRemoveCert,
      handleNewSkillChange,
      handleNewCertChange,
    },
  };
};

export default useSkillsStep;
