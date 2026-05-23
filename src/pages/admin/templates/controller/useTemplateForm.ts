import { useState, useCallback, useEffect } from "react";
import AdminTemplateAPIService from "@cyopo/Services/api/admin/AdminTemplateAPIService";
import Notify from "@cyopo/Services/notification/Notify";
import { TemplateStatus, TemplateData, CreateTemplateData } from "@cyopo/Models/admin/admin.models";

interface FormValues {
  title: string;
  description: string;
  font: string;
  primaryColor: string;
  secondaryColor: string;
  premium: boolean;
  status: TemplateStatus;
  tags: string[];
  tagInput: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  thumbnail?: string;
  font?: string;
  primaryColor?: string;
  secondaryColor?: string;
  tags?: string;
}

const emptyForm = (): FormValues => ({
  title: "",
  description: "",
  font: "Inter",
  primaryColor: "#6750a4",
  secondaryColor: "#625b71",
  premium: false,
  status: "ACTIVE",
  tags: [],
  tagInput: "",
});

const templateToForm = (t: TemplateData): FormValues => ({
  title: t.title,
  description: t.description,
  font: t.font,
  primaryColor: t.primaryColor,
  secondaryColor: t.secondaryColor,
  premium: t.premium,
  status: t.status,
  tags: t.tags,
  tagInput: "",
});

const useTemplateForm = (template: TemplateData | null, onSuccess: (saved: TemplateData) => void) => {
  const isEdit = template !== null;

  const [values, setValues] = useState<FormValues>(template ? templateToForm(template) : emptyForm());
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  // ─── Thumbnail file state ─────────────────────────────────────────
  // Create mode: store File locally, upload after template created
  // Edit mode: upload immediately on pick
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(template?.thumbnail ?? "");
  const [isUploadingThumb, setIsUploadingThumb] = useState(false);

  useEffect(() => {
    setValues(template ? templateToForm(template) : emptyForm());
    setErrors({});
    setThumbnailFile(null);
    setThumbnailPreview(template?.thumbnail ?? "");
  }, [template]);

  const handleChange = useCallback(
    (field: keyof FormValues, value: any) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors],
  );

  // ─── Thumbnail handlers ───────────────────────────────────────────
  const handleThumbnailChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (file.size > 3 * 1024 * 1024) {
        Notify.error("File size exceeds 3MB limit");
        return;
      }

      if (!isEdit) {
        // Create mode — store locally, show preview
        setThumbnailFile(file);
        setThumbnailPreview(URL.createObjectURL(file));
        setErrors((prev) => ({ ...prev, thumbnail: undefined }));
        return;
      }

      // Edit mode — upload immediately
      try {
        setIsUploadingThumb(true);
        const updated = await AdminTemplateAPIService.uploadThumbnail(template!.id, file);
        setThumbnailPreview(updated.thumbnail);
        setThumbnailFile(null);
        Notify.success("Thumbnail updated");
      } catch (err: any) {
        Notify.error(err?.message ?? "Failed to upload thumbnail");
      } finally {
        setIsUploadingThumb(false);
      }
    },
    [isEdit, template],
  );

  // ─── Tag management ───────────────────────────────────────────────
  const handleAddTag = useCallback(() => {
    const tag = values.tagInput.trim().toLowerCase();
    if (!tag) return;
    if (values.tags.includes(tag)) {
      Notify.warn("Tag already added");
      return;
    }
    if (values.tags.length >= 10) {
      Notify.warn("Maximum 10 tags allowed");
      return;
    }
    setValues((prev) => ({ ...prev, tags: [...prev.tags, tag], tagInput: "" }));
  }, [values.tagInput, values.tags]);

  const handleRemoveTag = useCallback((tag: string) => {
    setValues((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  }, []);

  const handleTagKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddTag();
      }
    },
    [handleAddTag],
  );

  // ─── Validation ───────────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!values.title.trim()) newErrors.title = "Title is required";
    if (!values.description.trim()) newErrors.description = "Description is required";
    if (!isEdit && !thumbnailFile) newErrors.thumbnail = "Thumbnail image is required";
    if (!values.font.trim()) newErrors.font = "Font is required";
    if (!/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(values.primaryColor)) newErrors.primaryColor = "Must be a valid hex color";
    if (!/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(values.secondaryColor)) newErrors.secondaryColor = "Must be a valid hex color";
    if (values.tags.length === 0) newErrors.tags = "At least one tag is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── Form validity — required fields filled ───────────────────────
  const isFormValid =
    values.title.trim().length > 0 &&
    values.description.trim().length > 0 &&
    values.font.trim().length > 0 &&
    /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(values.primaryColor) &&
    /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(values.secondaryColor) &&
    values.tags.length > 0 &&
    // thumbnail: in create mode file required, in edit mode already exists
    (isEdit ? true : thumbnailFile !== null);

  // ─── Has changes — edit mode only ────────────────────────────────
  // Compare current values against original template
  const hasChanges = !isEdit
    ? true
    : (() => {
        if (!template) return false;
        return (
          values.title !== template.title ||
          values.description !== template.description ||
          values.font !== template.font ||
          values.primaryColor !== template.primaryColor ||
          values.secondaryColor !== template.secondaryColor ||
          values.premium !== template.premium ||
          values.status !== template.status ||
          JSON.stringify(values.tags) !== JSON.stringify(template.tags) ||
          thumbnailFile !== null // new thumbnail picked
        );
      })();

  // ─── Button should be enabled ─────────────────────────────────────
  const canSubmit = isFormValid && hasChanges;

  // ─── Submit ───────────────────────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    if (!validate()) return;

    const payload: CreateTemplateData = {
      title: values.title.trim(),
      description: values.description.trim(),
      font: values.font.trim(),
      primaryColor: values.primaryColor,
      secondaryColor: values.secondaryColor,
      premium: values.premium,
      status: values.status,
      tags: values.tags,
    };

    try {
      setIsSaving(true);

      if (isEdit) {
        // Edit — just update fields (thumbnail updated separately on pick)
        const saved = await AdminTemplateAPIService.update(template!.id, payload);
        Notify.success("Template updated");
        onSuccess(saved);
      } else {
        // Create — send as multipart with thumbnail file
        const saved = await AdminTemplateAPIService.create(payload, thumbnailFile!);
        Notify.success("Template created");
        onSuccess(saved);
      }
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to save template");
    } finally {
      setIsSaving(false);
    }
  }, [values, isEdit, template, thumbnailFile, onSuccess]);

  return {
    state: {
      values,
      errors,
      isSaving,
      isEdit,
      thumbnailFile,
      thumbnailPreview,
      isUploadingThumb,
      canSubmit,
    },
    handlers: {
      handleChange,
      handleThumbnailChange,
      handleAddTag,
      handleRemoveTag,
      handleTagKeyDown,
      handleSubmit,
    },
  };
};

export default useTemplateForm;
