import { Link } from "react-router-dom";
import { useAuthCheck } from "../../../hooks/authHooks/useAuthCheck";
import { LazyMotion, m, type Variants } from "framer-motion";
import { useState } from "react";

const loadFeatures = () =>
  import("framer-motion").then((res) => res.domAnimation);

const footerVariants: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};
const Footer = () => {
  const { isAuthenticated } = useAuthCheck();
  const [hasEnteredView, setHasEnteredView] = useState(false);

  const navLinks = [
    { label: "Home", to: "/" },
    {
      label: "Create Secret",
      to: "/",
      state: { scrollToCreate: true },
    },
    { label: "Sign In", to: "/sign-in", hide: isAuthenticated },
    { label: "Create Account", to: "/create-account", hide: isAuthenticated },
    { label: "My Secrets", to: "/my-secrets", hide: !isAuthenticated },
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Terms of Service", to: "/terms-of-service" },
  ].filter((link) => !link.hide);

  return (
    <LazyMotion features={loadFeatures}>
      <m.footer
        onViewportEnter={() => setHasEnteredView(true)}
        className="footer-root relative w-full overflow-hidden pt-40 pb-3 px-8 rounded-t-[7vw]"
      >
        {/* overlay to keep top half dark */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_120%,transparent_40%,#000407_100%)] pointer-events-none z-0" /> */}

        {hasEnteredView && (
          <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center gap-14">
            <m.div
              initial="initial"
              animate="show"
              variants={footerVariants}
              className="flex flex-col items-center gap-6"
            >
              <span
                className="hero-text-glow text-6xl
font-bold text-(--main-light-blue) arvo select-none"
              >
                MonoShare
              </span>
              <p className="electrolize text-(--gray) text-sm text-center max-w-xs">
                Your personal secret capsule.
              </p>
            </m.div>

            {/* Divider  */}
            <div className="footer-divider w-full max-w-2xl" />

            {/* Nav links */}
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap justify-center gap-x-10 gap-y-4"
            >
              {navLinks.map(({ label, to, state }) => (
                <Link
                  key={label}
                  to={to}
                  state={state}
                  className="electrolize text-sm text-(--gray) hover:text-(--white) hover:bg-gray-500/15 px-2 py-0.5 rounded-lg transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Bottom bar */}
            <div className="flex flex-col items-center gap-1 mt-2">
              <p className="noto-sans text-xs text-(--gray)/35">
                Built for privacy-first sharing.
              </p>
              <small className="noto-sans text-xs text-(--gray)/50">
                &copy; <time dateTime="2026">2026</time> MonoShare. All rights
                reserved.
              </small>
            </div>
          </div>
        )}
      </m.footer>
    </LazyMotion>
  );
};

export default Footer;
