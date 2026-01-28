import { Route, Routes } from "react-router-dom";

import AuthGuard from "./components/guards/AuthGuard";

import Home from "./components/pages/Home";
import SecretDetails from "./components/pages/SecretDetails";
import MySecrets from "./components/pages/MySecrets";
import Header from "./components/partials/MainPartials/Header";
import SignIn from "./components/pages/AuthPages/SignIn";
import CreateAccount from "./components/pages/AuthPages/CreateAccount";

function App() {
  return (
    <div className="app-container">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<SecretDetails />} />
        {/* <Route
          path="/mysecrets"
          element={
            <AuthGuard mode="protected">
              <MySecrets />
            </AuthGuard>
          }
        /> */}
        <Route path="/mysecrets" element={<MySecrets />} />
        <Route
          path="/sign-in"
          element={
            <AuthGuard mode="guest">
              <SignIn />
            </AuthGuard>
          }
        />
        <Route
          path="/create-account"
          element={
            <AuthGuard mode="guest">
              <CreateAccount />
            </AuthGuard>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
