import React from "react";
import MLTNav from "./components/MLTNav";
import MLTHero from "./components/MLTHero";
import MLTAbout from "./components/MLTAbout";
import MLTSkills from "./components/MLTSkills";
import MLTExperience from "./components/MLTExperience";
import MLTProjects from "./components/MLTProjects";
import MLTContact from "./components/MLTContact";
import MLTFooter from "./components/MLTFooter";
import MLTEducation from "./components/MLTEducation";
import MLTCookieBanner from "./components/MLTCookieBanner";
import { PublicTemplateProps } from "../../Public.Page";

const MLT: React.FC<PublicTemplateProps> = ({ portfolio, cookieConsent }) => {
  const { profile, settings } = portfolio;

  return (
    <div className='min-h-screen bg-white text-gray-900 font-sans'>
      <MLTNav portfolio={portfolio} />
      <MLTHero portfolio={portfolio} />

      <main>
        {profile?.bio && <MLTAbout bio={profile.bio} />}
        {portfolio.skills?.length > 0 && <MLTSkills skills={portfolio.skills} showLevels={settings?.showSkillLevels ?? true} />}
        {portfolio.experiences?.length > 0 && <MLTExperience experiences={portfolio.experiences} />}
        {portfolio.educations?.length > 0 && <MLTEducation educations={portfolio.educations} />}
        {portfolio.projects?.length > 0 && <MLTProjects projects={portfolio.projects} />}
        {settings?.showContactInfo && <MLTContact portfolio={portfolio} />}
      </main>

      <MLTFooter portfolio={portfolio} />
      <MLTCookieBanner hasResponded={cookieConsent.hasResponded} onAccept={cookieConsent.accept} onDecline={cookieConsent.decline} />
    </div>
  );
};

export default MLT;
