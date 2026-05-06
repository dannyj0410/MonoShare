import { useEffect, useRef } from "react";
import { useAuthCheck } from "../../hooks/authHooks/useAuthCheck";
import SpotlightGlow from "../partials/HomePartials/SpotlightGlow";
import Hero from "../partials/HomePartials/Hero";

import CreateSecretForm from "../partials/HomePartials/CreateSecretPartials/CreateSecretForm";
import InfoSection from "../partials/HomePartials/InfoSectionPartials/InfoSection";
import Features from "../partials/HomePartials/FeaturesSection";
import { useLocation } from "react-router-dom";
import Process from "../partials/HomePartials/ProcessSectionPartials/Process";
import Footer from "../layouts/Footer";

const Home = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthCheck();
  const createFormRef = useRef<HTMLDivElement>(null);

  const scrollToCreateForm = () => {
    createFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  useEffect(() => {
    if (location.state?.scrollToCreate) {
      scrollToCreateForm();
    }
  }, [location]);

  return (
    <main className="flex flex-col items-center">
      <link rel="canonical" href="https://monoshare.site" />
      <SpotlightGlow />
      <Hero scroll={scrollToCreateForm} />
      <CreateSecretForm
        key={isAuthenticated ? "auth" : "guest"}
        ref={createFormRef}
      />

      <InfoSection />
      <Process />
      <Features />
      <Footer />
    </main>
  );
};

export default Home;
