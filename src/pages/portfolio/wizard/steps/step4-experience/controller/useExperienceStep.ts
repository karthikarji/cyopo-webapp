import { useState } from "react";
import { useWizardContext } from "../../../common/WizardContext";
import type { Experience } from "@cyopo/Models/portfolio/portfolio.model";

const emptyExperience = (): Experience => ({
  title: "",
  company: "",
  location: "",
  startDate: "",
  endDate: undefined,
  isCurrent: false,
  description: "",
  achievements: [],
  technologies: [],
  type: "FULL_TIME",
});

const useExperienceStep = () => {
  const { formData, updateExperience, updateEducation } = useWizardContext();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const experiences = formData.experience.experiences ?? [];
  const education = formData.education;

  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");

  const handleAddExperience = () => {
    const updated = [...experiences, emptyExperience()];
    updateExperience({ experiences: updated });
    setExpandedIndex(updated.length - 1);
  };

  // Education handlers
  const handleAddEducation = () => {
    updateEducation({
      educations: [
        ...education.educations,
        {
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          isCurrent: false,
          grade: "",
          description: "",
        },
      ],
    });
  };

  const handleUpdateEducation = (index: number, field: string, value: any) => {
    const updated = [...education.educations];
    updated[index] = { ...updated[index], [field]: value };
    updateEducation({ educations: updated });
  };

  const handleRemoveEducation = (index: number) => {
    updateEducation({
      educations: education.educations.filter((_, i) => i !== index),
    });
  };

  const handleRemoveExperience = (index: number) => {
    updateExperience({
      experiences: experiences.filter((_, i) => i !== index),
    });
    setExpandedIndex(null);
  };
  const handleAddInternship = () => {
    const updated = [...experiences, { ...emptyExperience(), type: "INTERNSHIP" as const }];
    updateExperience({ experiences: updated });
    setExpandedIndex(updated.length - 1);
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
      educations: education.educations,
      activeTab,
      isEmpty: experiences.length === 0,
    },
    handlers: {
      handleAddExperience,
      handleRemoveExperience,
      handleUpdateExperience,
      handleAddAchievement,
      handleUpdateAchievement,
      handleRemoveAchievement,
      handleAddInternship,
      handleToggleExpand,
      handleAddEducation,
      handleUpdateEducation,
      handleRemoveEducation,
      setActiveTab,
    },
  };
};

export default useExperienceStep;
