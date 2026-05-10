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
      <WizardTopBar />
      <WizardProgress />
      <div className='flex-1 overflow-y-auto'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 py-6'>{children}</div>
      </div>
      <WizardFooter />
    </div>
  );
};

export default WizardLayout;
