import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";

import AuthGuard from "./components/guards/AuthGuard";

import Home from "./components/pages/Home";
import Header from "./components/partials/MainPartials/Header";
import SignIn from "./components/pages/AuthPages/SignIn";
import CreateAccount from "./components/pages/AuthPages/CreateAccount";
import ViewSecret from "./components/pages/ViewSecret";
import UserAndLogout from "./components/partials/MainPartials/UserAndLogout";
import PageLoader from "./components/loaders/PageLoader";
import NotFound from "./components/pages/NotFound";
import TermsOfService from "./components/pages/TermsOfService";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";

const SecretDetails = lazy(() => import("./components/pages/SecretDetails"));
const MySecrets = lazy(() => import("./components/pages/MySecrets"));

function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="app-container">
        <Header />
        <UserAndLogout />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/secret/:id" element={<ViewSecret />} />
            <Route path="/details/:id" element={<SecretDetails />} />
            <Route
              path="/my-secrets"
              element={
                <AuthGuard mode="protected">
                  <MySecrets />
                </AuthGuard>
              }
            />
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
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </LazyMotion>
  );
}

export default App;
