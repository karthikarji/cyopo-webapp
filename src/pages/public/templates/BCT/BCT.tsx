import React from "react";
import BCTNav from "./components/BCTNav";
import BCTHero from "./components/BCTHero";
import BCTQuote from "./components/BCTQuote";
import BCTProjects from "./components/BCTProjects";
import BCTSkills from "./components/BCTSkills";
import BCTExperience from "./components/BCTExperience";
import BCTEducation from "./components/BCTEducation";
import BCTContact from "./components/BCTContact";
import BCTFooter from "./components/BCTFooter";
import BCTCookieBanner from "./components/BCTCookieBanner";
import { PublicTemplateProps } from "../../Public.Page";

const BCT: React.FC<PublicTemplateProps> = ({ portfolio, cookieConsent }) => {
  const { profile, settings } = portfolio;

  return (
    <div className='min-h-screen bg-[#0a0a0a] text-white font-sans'>
      <BCTNav portfolio={portfolio} />
      <BCTHero portfolio={portfolio} />

      {profile?.bio && <BCTQuote bio={profile.bio} />}

      {portfolio.projects?.length > 0 && <BCTProjects projects={portfolio.projects} />}

      {portfolio.skills?.length > 0 && (
        <BCTSkills
          skills={portfolio.skills}
          customSkillCategories={portfolio.customSkillCategories ?? []}
          showLevels={settings?.showSkillLevels ?? true}
        />
      )}

      {portfolio.experiences?.length > 0 && <BCTExperience experiences={portfolio.experiences} />}

      {portfolio.educations?.length > 0 && <BCTEducation educations={portfolio.educations} />}

      {settings?.showContactInfo && <BCTContact portfolio={portfolio} />}

      <BCTFooter portfolio={portfolio} />

      <BCTCookieBanner hasResponded={cookieConsent.hasResponded} onAccept={cookieConsent.accept} onDecline={cookieConsent.decline} />
    </div>
  );
};

export default BCT;
