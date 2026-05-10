import { useState } from "react";
import { useWizardContext } from "../../../common/WizardContext";
import type { Experience } from "@cyopo/Models/portfolio/portfolio.model";

const emptyExperience = (): Experience => ({
  title: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
  achievements: [],
  technologies: [],
});

const useExperienceStep = () => {
  const { formData, updateExperience } = useWizardContext();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const experiences = formData.experience.experiences ?? [];

  const handleAddExperience = () => {
    const updated = [...experiences, emptyExperience()];
    updateExperience({ experiences: updated });
    setExpandedIndex(updated.length - 1);
  };

  const handleRemoveExperience = (index: number) => {
    updateExperience({
      experiences: experiences.filter((_, i) => i !== index),
    });
    setExpandedIndex(null);
  };

  const handleUpdateExperience = (index: number, field: string, value: any) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    updateExperience({ experiences: updated });
  };

  const handleAddAchievement = (expIndex: number) => {
    const updated = [...experiences];
    updated[expIndex] = {
      ...updated[expIndex],
      achievements: [...(updated[expIndex].achievements ?? []), ""],
    };
    updateExperience({ experiences: updated });
  };

  const handleUpdateAchievement = (expIndex: number, achIndex: number, value: string) => {
    const updated = [...experiences];
    const achievements = [...(updated[expIndex].achievements ?? [])];
    achievements[achIndex] = value;
    updated[expIndex] = { ...updated[expIndex], achievements };
    updateExperience({ experiences: updated });
  };

  const handleRemoveAchievement = (expIndex: number, achIndex: number) => {
    const updated = [...experiences];
    updated[expIndex] = {
      ...updated[expIndex],
      achievements: updated[expIndex].achievements.filter((_, i) => i !== achIndex),
    };
    updateExperience({ experiences: updated });
  };

  const handleToggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return {
    state: {
      experiences,
      expandedIndex,
      isEmpty: experiences.length === 0,
    },
    handlers: {
      handleAddExperience,
      handleRemoveExperience,
      handleUpdateExperience,
      handleAddAchievement,
      handleUpdateAchievement,
      handleRemoveAchievement,
      handleToggleExpand,
    },
  };
};

export default useExperienceStep;
