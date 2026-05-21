import { useState } from "react";
import { useWizardContext } from "../../../common/WizardContext";
import type { Project } from "@cyopo/Models/portfolio/portfolio.model";
import PhotoAPIService, { ProjectPhoto } from "@cyopo/Services/api/photo/PhotoAPIService";
import Notify from "@cyopo/Services/notification/Notify";

const emptyProject = (): Project => ({
  title: "",
  description: "",
  thumbnail: "",
  demoUrl: "",
  githubUrl: "",
  technologies: [],
  featured: false,
  completedDate: "",
});

const useProjectsStep = () => {
  const { formData, portfolioId, updateProjects } = useWizardContext();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [techInput, setTechInput] = useState<Record<number, string>>({});
  const [projectPhotos, setProjectPhotos] = useState<Record<string, ProjectPhoto[]>>({});
  const [uploadingPhotos, setUploadingPhotos] = useState<Record<string, boolean>>({});
  const [deletingPhotoId, setDeletingPhotoId] = useState<string | null>(null);
  const [thumbnailPhotoId, setThumbnailPhotoId] = useState<string | null>(null);

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

  // Load photos when a project is expanded
  const handleToggleExpand = async (index: number) => {
    // Call the existing toggle logic directly — not via handlers
    const current = expandedIndex;
    const newIndex = current === index ? null : index;
    setExpandedIndex(newIndex);

    const project = formData.projects.projects[index];
    if (!project.id || !portfolioId) return;
    if (projectPhotos[project.id]) return; // already loaded

    try {
      const photos = await PhotoAPIService.getPhotos(portfolioId, project.id);
      setProjectPhotos((prev) => ({ ...prev, [project.id!]: photos }));
    } catch {
      // Silently fail
    }
  };

  const handleUploadPhotos = async (projectId: string, files: File[]) => {
    if (!portfolioId) {
      Notify.warn("Save the portfolio first before uploading photos");
      return;
    }
    if (files.length === 0) return;

    setUploadingPhotos((prev) => ({ ...prev, [projectId]: true }));
    try {
      const uploaded = await PhotoAPIService.uploadPhotos(portfolioId, projectId, files);
      setProjectPhotos((prev) => ({
        ...prev,
        [projectId]: [...(prev[projectId] ?? []), ...uploaded],
      }));
      Notify.success(`${uploaded.length} photo${uploaded.length > 1 ? "s" : ""} uploaded`);
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to upload photos");
    } finally {
      setUploadingPhotos((prev) => ({ ...prev, [projectId]: false }));
    }
  };

  const handleDeletePhoto = async (projectId: string, photoId: string) => {
    if (!portfolioId) return;
    try {
      setDeletingPhotoId(photoId);
      await PhotoAPIService.deletePhoto(portfolioId, projectId, photoId);
      setProjectPhotos((prev) => ({
        ...prev,
        [projectId]: prev[projectId]?.filter((p) => p.id !== photoId) ?? [],
      }));
      Notify.success("Photo deleted");
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to delete photo");
    } finally {
      setDeletingPhotoId(null);
    }
  };

  const handleSetThumbnail = async (projectId: string, photoId: string) => {
    if (!portfolioId) return;
    try {
      setThumbnailPhotoId(photoId);
      await PhotoAPIService.setThumbnail(portfolioId, projectId, photoId);
      setProjectPhotos((prev) => ({
        ...prev,
        [projectId]:
          prev[projectId]?.map((p) => ({
            ...p,
            isThumbnail: p.id === photoId,
          })) ?? [],
      }));
      Notify.success("Thumbnail updated");
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to set thumbnail");
    } finally {
      setThumbnailPhotoId(null);
    }
  };

  return {
    state: {
      projects,
      expandedIndex,
      techInput,
      projectPhotos,
      uploadingPhotos,
      deletingPhotoId,
      thumbnailPhotoId,
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
      handleUploadPhotos,
      handleDeletePhoto,
      handleSetThumbnail,
    },
  };
};

export default useProjectsStep;
