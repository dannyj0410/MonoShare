import { lazy, Suspense, useEffect, useRef } from "react";
import { useAuthCheck } from "../../hooks/authHooks/useAuthCheck";
import SpotlightGlow from "../partials/HomePartials/SpotlightGlow";
import Hero from "../partials/HomePartials/Hero";

import CreateSecretForm from "../partials/HomePartials/CreateSecretPartials/CreateSecretForm";
import { useLocation } from "react-router-dom";
import Footer from "../layouts/Footer";
import { useInViewOnce } from "../../hooks/useInViewOnce";

const InfoSection = lazy(
  () => import("../partials/HomePartials/InfoSectionPartials/InfoSection"),
);
const Process = lazy(
  () => import("../partials/HomePartials/ProcessSectionPartials/Process"),
);
const Features = lazy(() => import("../partials/HomePartials/FeaturesSection"));

const Home = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthCheck();
  const createFormRef = useRef<HTMLDivElement>(null);
  const { ref: belowFoldRef, isVisible } = useInViewOnce<HTMLDivElement>({
    rootMargin: "400px",
  });

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

      <div ref={belowFoldRef}>
        {isVisible ? (
          <Suspense fallback={<div className="h-700" />}>
            <InfoSection />
            <Process />
            <Features />
            <Footer />
          </Suspense>
        ) : (
          <div className="h-700"></div>
        )}
      </div>
    </main>
  );
};

export default Home;
