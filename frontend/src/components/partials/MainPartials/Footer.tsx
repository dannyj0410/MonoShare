import { Link } from "react-router-dom";
import { useAuthCheck } from "../../../hooks/authHooks/useAuthCheck";
import { m, type Variants } from "framer-motion";

const MotionLink = m.create(Link);

const footerVariants: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.3,
      ease: "easeInOut",
    },
  },
};

const navVariants: Variants = {
  initial: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeInOut",
      staggerChildren: 0.25,
      delayChildren: 0.3,
    },
  },
};

const linkVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const Footer = () => {
  const { isAuthenticated } = useAuthCheck();

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
    <footer className="footer-root relative w-full overflow-hidden pt-40 pb-3 px-8 rounded-t-[7vw]">
      {/* overlay to keep top half dark */}
      {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_120%,transparent_40%,#000407_100%)] pointer-events-none z-0" /> */}

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center gap-14">
        <m.div
          initial="initial"
          whileInView="show"
          variants={footerVariants}
          viewport={{ amount: 0.1, once: true }}
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
        <m.nav
          initial="initial"
          whileInView="show"
          variants={navVariants}
          viewport={{ once: true, amount: 0.1 }}
          aria-label="Footer navigation"
          className="flex flex-wrap justify-center gap-x-10 gap-y-4"
        >
          {navLinks.map(({ label, to, state }) => (
            <MotionLink
              key={label}
              to={to}
              state={state}
              variants={linkVariants}
              className="electrolize text-sm text-(--gray) hover:text-(--white) hover:bg-gray-500/15 px-2 py-0.5 rounded-lg transition-colors duration-200"
            >
              {label}
            </MotionLink>
          ))}
        </m.nav>

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
    </footer>
  );
};

export default Footer;
