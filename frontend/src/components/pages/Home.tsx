import Hero from "../partials/MainPartials/Hero";
import CreateForm from "../partials/CreateForm";
import Features from "../partials/Features";
import SpotlightGlow from "../partials/MainPartials/SpotlightGlow";

const Home = () => {
  return (
    <main className="flex flex-col items-center">
      {/* Add animations on load */}

      <SpotlightGlow />
      <Hero />
      <CreateForm />
      <Features />
    </main>
  );
};

export default Home;
