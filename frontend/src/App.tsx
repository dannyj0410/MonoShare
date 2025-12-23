import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import SecretDetails from "./components/pages/SecretDetails";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<SecretDetails />} />
      </Routes>
    </div>
  );
}

export default App;
