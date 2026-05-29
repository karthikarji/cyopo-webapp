import React from "react";
import WizardTopBar from "./WizardTopBar";
import WizardProgress from "./WizardProgress";
import WizardFooter from "./WizardFooter";

interface Props {
  children: React.ReactNode;
}

const WizardLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className='min-h-screen bg-background flex flex-col'>
      {/* Sticky header — top bar + progress */}
      <div className='sticky top-0 z-30 bg-background'>
        <WizardTopBar />
        <WizardProgress />
      </div>

      {/* Scrollable content */}
      <div className='flex-1'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 py-6'>{children}</div>
      </div>

      {/* Sticky footer */}
      <WizardFooter />
    </div>
  );
};

export default WizardLayout;
