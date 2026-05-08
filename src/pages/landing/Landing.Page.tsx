import React from "react";
import LandingNav from "./nav/LandingNav";
import Hero from "./hero/view/Hero";
import Features from "./features/view/Features";
import TemplateShowcase from "./showcase/view/TemplateShowcase";
import Pricing from "./pricing/view/Pricing";
import Footer from "./footer/view/Footer";

const LandingPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-background font-body'>
      <LandingNav />
      {/* sections will go here */}
      <main className='pt-16'>
        <Hero />
        <Features />
        <TemplateShowcase />
        <Pricing />
        <Footer />
      </main>
    </div>
  );
};

export default LandingPage;
