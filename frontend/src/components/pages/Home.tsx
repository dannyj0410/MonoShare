import { useEffect, useRef } from "react";
import { useAuthCheck } from "../../hooks/authHooks/useAuthCheck";
import SpotlightGlow from "../partials/MainPartials/SpotlightGlow";
import Hero from "../partials/MainPartials/Hero";

import CreateSecretForm from "../partials/CreateSecretPartials/CreateSecretForm";
import InfoSection from "../partials/InfoPartials/InfoSection";
import Features from "../partials/Features";
import Process from "../partials/ProcessPartials/Process";
import { useLocation } from "react-router-dom";
import Footer from "../partials/MainPartials/Footer";

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
      {/* <link rel="canonical" href="https://yourdomain.com/" /> */}
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
