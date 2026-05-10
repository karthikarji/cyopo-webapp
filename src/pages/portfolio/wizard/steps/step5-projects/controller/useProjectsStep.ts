import { useState } from "react";
import { useWizardContext } from "../../../common/WizardContext";
import type { Project } from "@cyopo/Models/portfolio/portfolio.model";

const emptyProject = (): Project => ({
  title: "",
  description: "",
  thumbnailUrl: "",
  demoUrl: "",
  githubUrl: "",
  technologies: [],
  featured: false,
  completedDate: "",
});

const useProjectsStep = () => {
  const { formData, updateProjects } = useWizardContext();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [techInput, setTechInput] = useState<Record<number, string>>({});

  const projects = formData.projects.projects ?? [];

  const handleAddProject = () => {
    const updated = [...projects, emptyProject()];
    updateProjects({ projects: updated });
    setExpandedIndex(updated.length - 1);
  };

  const handleRemoveProject = (index: number) => {
    updateProjects({ projects: projects.filter((_, i) => i !== index) });
    setExpandedIndex(null);
  };

  const handleUpdateProject = (index: number, field: string, value: any) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    updateProjects({ projects: updated });
  };

  const handleAddTech = (index: number) => {
    const val = (techInput[index] ?? "").trim();
    if (!val) return;
    const updated = [...projects];
    updated[index] = {
      ...updated[index],
      technologies: [...(updated[index].technologies ?? []), val],
    };
    updateProjects({ projects: updated });
    setTechInput((prev) => ({ ...prev, [index]: "" }));
  };

  const handleRemoveTech = (projIndex: number, techIndex: number) => {
    const updated = [...projects];
    updated[projIndex] = {
      ...updated[projIndex],
      technologies: updated[projIndex].technologies.filter((_, i) => i !== techIndex),
    };
    updateProjects({ projects: updated });
  };

  const handleTechInputChange = (index: number, value: string) => {
    setTechInput((prev) => ({ ...prev, [index]: value }));
  };

  const handleTechKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTech(index);
    }
  };

  const handleToggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return {
    state: {
      projects,
      expandedIndex,
      techInput,
      isEmpty: projects.length === 0,
    },
    handlers: {
      handleAddProject,
      handleRemoveProject,
      handleUpdateProject,
      handleAddTech,
      handleRemoveTech,
      handleTechInputChange,
      handleTechKeyDown,
      handleToggleExpand,
    },
  };
};

export default useProjectsStep;
