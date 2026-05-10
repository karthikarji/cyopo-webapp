import React from "react";
import { WizardProvider, useWizardContext } from "./common/WizardContext";
import WizardLayout from "./layout/WizardLayout";
import TemplateStep from "./steps/step1-template/view/TemplateStep";
import ProfileStep from "./steps/step2-profile/view/ProfileStep";
import SkillsStep from "./steps/step3-skills/view/SkillsStep";
import ExperienceStep from "./steps/step4-experience/view/ExperienceStep";
import ProjectsStep from "./steps/step5-projects/view/ProjectsStep";
import ReviewStep from "./steps/step6-review/view/ReviewStep";

const STEP_COMPONENTS: Record<number, React.FC> = {
  1: TemplateStep,
  2: ProfileStep,
  3: SkillsStep,
  4: ExperienceStep,
  5: ProjectsStep,
  6: ReviewStep,
};

const WizardContent: React.FC = () => {
  const { currentStep } = useWizardContext();
  const StepComponent = STEP_COMPONENTS[currentStep];

  return <WizardLayout>{StepComponent ? <StepComponent /> : null}</WizardLayout>;
};

const WizardPage: React.FC = () => {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  );
};

export default WizardPage;
