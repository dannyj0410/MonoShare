import { useEffect, useRef } from "react";
import { useAuthCheck } from "../../hooks/authHooks/useAuthCheck";
import SpotlightGlow from "../partials/MainPartials/SpotlightGlow";
import Hero from "../partials/MainPartials/Hero";

import CreateSecretForm from "../partials/CreateSecretPartials/CreateSecretForm";
import InfoSection from "../partials/InfoPartials/InfoSection";
import Features from "../partials/Features";
import Process from "../partials/ProcessPartials/Process";
import { useLocation } from "react-router-dom";

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
      {/* Add animations on load */}
      <SpotlightGlow />
      <Hero scroll={scrollToCreateForm} />
      <CreateSecretForm
        isAuthenticated={isAuthenticated}
        key={isAuthenticated ? "auth" : "guest"}
        ref={createFormRef}
      />

      <InfoSection />
      <Process />
      <Features />
    </main>
  );
};

export default Home;
