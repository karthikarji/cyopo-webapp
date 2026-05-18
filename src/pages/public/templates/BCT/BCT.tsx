import React from "react";
import type { Portfolio } from "@cyopo/Models/portfolio/portfolio.model";
import BCTNav from "./components/BCTNav";
import BCTHero from "./components/BCTHero";
import BCTQuote from "./components/BCTQuote";
import BCTProjects from "./components/BCTProjects";
import BCTSkills from "./components/BCTSkills";
import BCTExperience from "./components/BCTExperience";
import BCTEducation from "./components/BCTEducation";
import BCTContact from "./components/BCTContact";
import BCTFooter from "./components/BCTFooter";

interface Props {
  portfolio: Portfolio;
}

const BCT: React.FC<Props> = ({ portfolio }) => {
  const { profile, settings } = portfolio;

  return (
    <div className='min-h-screen bg-[#0a0a0a] text-white font-sans'>
      <BCTNav portfolio={portfolio} />
      <BCTHero portfolio={portfolio} />

      {profile?.bio && <BCTQuote bio={profile.bio} />}

      {portfolio.projects?.length > 0 && <BCTProjects projects={portfolio.projects} />}

      {portfolio.skills?.length > 0 && <BCTSkills skills={portfolio.skills} showLevels={settings?.showSkillLevels ?? true} />}

      {portfolio.experiences?.length > 0 && <BCTExperience experiences={portfolio.experiences} />}

      {portfolio.educations?.length > 0 && <BCTEducation educations={portfolio.educations} />}

      {settings?.showContactInfo && <BCTContact portfolio={portfolio} />}

      <BCTFooter portfolio={portfolio} />
    </div>
  );
};

export default BCT;
