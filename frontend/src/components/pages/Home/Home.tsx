import "./Home.css";
import Hero from "../../partials/Hero";
import CreateForm from "../../partials/CreateForm";
import Features from "../../partials/Features";
import SpotlightGlow from "../../partials/SpotlightGlow";

const Home = () => {
  return (
    <main className="flex flex-col items-center">
      <SpotlightGlow />
      <Hero />
      <CreateForm />
      <Features />
    </main>
  );
};

export default Home;
