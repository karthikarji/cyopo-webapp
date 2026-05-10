import React from "react";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import { useWizardContext } from "../common/WizardContext";
import { TOTAL_STEPS } from "../common/wizard.constants";

const WizardFooter: React.FC = () => {
  const { currentStep, isLoading, formData, goNext, goPrev, handleSaveDraft, handlePublish } = useWizardContext();

  const isFirst = currentStep === 1;
  const isLast = currentStep === TOTAL_STEPS;

  return (
    <div className='flex items-center justify-between px-6 py-4 border-t border-outline-variant/20 bg-surface flex-shrink-0'>
      {/* Left — previous */}
      <Button variant='secondary' size='md' leftIcon={<ArrowLeft size={16} />} onClick={goPrev} disabled={isFirst}>
        Previous
      </Button>

      {/* Right — actions */}
      <div className='flex items-center gap-3'>
        {isLast ? (
          <>
            <Button variant='ghost' size='md' onClick={handleSaveDraft} loading={isLoading}>
              Save as draft
            </Button>
            <Button variant='primary' size='md' rightIcon={<Send size={15} />} onClick={handlePublish} loading={isLoading}>
              Create & publish
            </Button>
          </>
        ) : (
          <Button
            variant='primary'
            size='md'
            rightIcon={<ArrowRight size={16} />}
            onClick={goNext}
            disabled={currentStep === 1 && !formData.template.templateId}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default WizardFooter;
