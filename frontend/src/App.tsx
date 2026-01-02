import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import SecretDetails from "./components/pages/SecretDetails";
import MySecrets from "./components/pages/MySecrets";
import Header from "./components/partials/MainPartials/Header";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<SecretDetails />} />
        <Route path="/mysecrets" element={<MySecrets />} />
      </Routes>
    </div>
  );
}

export default App;
