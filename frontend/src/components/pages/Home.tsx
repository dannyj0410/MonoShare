import Hero from "../partials/MainPartials/Hero";
import CreateSecretForm from "../partials/CreateSecretForm";
import Features from "../partials/Features";
import SpotlightGlow from "../partials/MainPartials/SpotlightGlow";
import { useRef } from "react";
import { useAuthCheck } from "../../hooks/authHooks/useAuthCheck";

const Home = () => {
  const { isAuthenticated } = useAuthCheck();
  const createFormRef = useRef<HTMLDivElement>(null);

  // 3. Define the scroll function
  const scrollToCreateForm = () => {
    createFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };
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
      <Features />
    </main>
  );
};

export default Home;
