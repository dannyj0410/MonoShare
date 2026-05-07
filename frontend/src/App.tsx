import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { LazyMotion, domMax } from "framer-motion";

import AuthGuard from "./components/guards/AuthGuard";

import Home from "./components/pages/Home";
import Header from "./components/layouts/Header";
import SignIn from "./components/pages/AuthPages/SignIn";
import CreateAccount from "./components/pages/AuthPages/CreateAccount";
import ViewSecret from "./components/pages/ViewSecret";
import UserAndLogout from "./components/partials/CommonPartials/UserAndLogout";
import PageLoader from "./components/loaders/PageLoader";
import NotFound from "./components/pages/NotFound";
import TermsOfService from "./components/pages/TermsOfService";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import useScrollToTop from "./hooks/useScrollToTop";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./components/pages/ErrorPage";

const SecretDetails = lazy(() => import("./components/pages/SecretDetails"));
const MySecrets = lazy(() => import("./components/pages/MySecrets"));

function App() {
  const location = useLocation();
  useScrollToTop();
  return (
    <LazyMotion features={domMax} strict>
      <div className="app-container">
        <Header />
        <UserAndLogout />
        <Suspense fallback={<PageLoader />}>
          <ErrorBoundary
            fallback={<ErrorPage />}
            resetKeys={[location.pathname]}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/secret/:id" element={<ViewSecret />} />
              <Route
                path="/details/:id"
                element={
                  <AuthGuard mode="protected">
                    <SecretDetails />
                  </AuthGuard>
                }
              />
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
          </ErrorBoundary>
        </Suspense>
      </div>
    </LazyMotion>
  );
}

export default App;
