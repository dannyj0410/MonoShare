import * as Sentry from "@sentry/react";
import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { LazyMotion, domMax } from "framer-motion";

import AuthGuard from "./components/guards/AuthGuard";

import Home from "./components/pages/Home";
import Header from "./components/layouts/Header";
import SignIn from "./components/pages/AuthPages/SignIn";
import CreateAccount from "./components/pages/AuthPages/CreateAccount";
import UserAndLogout from "./components/partials/CommonPartials/UserAndLogout";
import PageLoader from "./components/loaders/PageLoader";
import useScrollToTop from "./hooks/useScrollToTop";
import ErrorPage from "./components/pages/ErrorPage";

const SecretDetails = lazy(() => import("./components/pages/SecretDetails"));
const MySecrets = lazy(() => import("./components/pages/MySecrets"));
const ViewSecret = lazy(() => import("./components/pages/ViewSecret"));
const TermsOfService = lazy(() => import("./components/pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./components/pages/PrivacyPolicy"));
const NotFound = lazy(() => import("./components/pages/NotFound"));

function App() {
  const location = useLocation();
  useScrollToTop();
  return (
    <LazyMotion features={domMax} strict>
      <div className="app-container">
        <Header />
        <UserAndLogout />
        <Suspense fallback={<PageLoader />}>
          <Sentry.ErrorBoundary
            fallback={<ErrorPage />}
            key={location.pathname}
          >
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
          </Sentry.ErrorBoundary>
        </Suspense>
      </div>
    </LazyMotion>
  );
}

export default App;
