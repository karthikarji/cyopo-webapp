import { useState } from "react";
import { useWizardContext } from "../../../common/WizardContext";
import { useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectUser } from "@cyopo/Redux/selectors/AppCommon.selector";
import Notify from "@cyopo/Services/notification/Notify";
import Spinner from "@cyopo/Services/spinner/Spinner";
import REST from "@cyopo/Services/rest/REST";
import { API } from "@cyopo/Constants/api/Api.constants";

const useProfileStep = () => {
  const {
    formData,
    updateProfile,
    resumeFileName,
    resumeIsDirty,
    resumeRemoved,
    setResumeFile,
    setResumeFileName,
    setResumeIsDirty,
    setResumeRemoved,
  } = useWizardContext();
  const user = useAppSelector(selectUser);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const profile = formData.profile;
  const showResume = !!(resumeFileName && !resumeRemoved);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateProfile({ [field]: e.target.value });
  };

  const handleSocialChange = (index: number, field: "platform" | "url", value: string) => {
    const updated = [...profile.socialMedia];
    updated[index] = { ...updated[index], [field]: value };
    updateProfile({ socialMedia: updated });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      Notify.error("File size exceeds 2MB limit");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      updateProfile({ profilePhoto: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleAddSocial = () => {
    updateProfile({
      socialMedia: [...profile.socialMedia, { platform: "LinkedIn", url: "" }],
    });
  };

  const handleRemoveSocial = (index: number) => {
    const updated = profile.socialMedia.filter((_, i) => i !== index);
    updateProfile({ socialMedia: updated });
  };

  // Resume handlers
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      Notify.error("File size exceeds 5MB limit");
      return;
    }
    setResumeFile(file);
    setResumeFileName(file.name);
    setResumeIsDirty(true);
    setResumeRemoved(false);
  };

  const handleResumeRemove = () => {
    setResumeFile(null);
    setResumeFileName(null);
    setResumeIsDirty(false);
    setResumeRemoved(true);
  };

  const handleAiFill = async () => {
    try {
      setIsAiLoading(true);
      const response = await Spinner.on(
        REST.post<any>(API.AI.PROFILE, {
          userId: user?.id,
        }),
      );
      if (response.data) {
        updateProfile({
          name: response.data.name ?? profile.name,
          title: response.data.title ?? profile.title,
          bio: response.data.bio ?? profile.bio,
          location: response.data.location ?? profile.location,
          socialMedia: response.data.socialMedia ?? profile.socialMedia,
        });
        Notify.success("Profile filled with AI");
      }
    } catch {
      Notify.error("AI generation failed. Please fill manually.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const bioLength = profile.bio?.length ?? 0;

  return {
    state: {
      profile,
      isAiLoading,
      bioLength,
      showResume,
      resumeFileName,
      resumeIsDirty,
    },
    handlers: {
      handleChange,
      handleSocialChange,
      handleAddSocial,
      handleRemoveSocial,
      handleResumeChange,
      handleResumeRemove,
      handlePhotoChange,
      handleAiFill,
    },
  };
};

export default useProfileStep;
