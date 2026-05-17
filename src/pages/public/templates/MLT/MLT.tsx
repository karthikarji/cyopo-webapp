import React from "react";
import type { Portfolio } from "@cyopo/Models/portfolio/portfolio.model";
import MLTNav from "./components/MLTNav";
import MLTHero from "./components/MLTHero";
import MLTAbout from "./components/MLTAbout";
import MLTSkills from "./components/MLTSkills";
import MLTExperience from "./components/MLTExperience";
import MLTProjects from "./components/MLTProjects";
import MLTContact from "./components/MLTContact";
import MLTFooter from "./components/MLTFooter";

interface Props {
  portfolio: Portfolio;
}

const MLT: React.FC<Props> = ({ portfolio }) => {
  const { profile, settings } = portfolio;

  return (
    <div className='min-h-screen bg-white text-gray-900 font-sans'>
      <MLTNav portfolio={portfolio} />
      <MLTHero portfolio={portfolio} />

      <main>
        {profile?.bio && <MLTAbout bio={profile.bio} />}

        {portfolio.skills?.length > 0 && <MLTSkills skills={portfolio.skills} showLevels={settings?.showSkillLevels ?? true} />}

        {portfolio.experiences?.length > 0 && <MLTExperience experiences={portfolio.experiences} />}

        {portfolio.projects?.length > 0 && <MLTProjects projects={portfolio.projects} />}

        {settings?.showContactInfo && <MLTContact portfolio={portfolio} />}
      </main>

      <MLTFooter portfolio={portfolio} />
    </div>
  );
};

export default MLT;
