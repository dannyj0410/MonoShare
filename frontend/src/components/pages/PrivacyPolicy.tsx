import { Link } from "react-router-dom";
import BackButton from "../partials/MainPartials/BackButton";

const PrivacyPolicy = () => {
  const version = "1.0";
  return (
    <div className="legal-wrapper scroll-smooth">
      <title>Privacy Policy | MonoShare</title>
      <div className="max-w-200 pt-25 pb-15 mx-auto z-10">
        <div className="legal-glow-center pointer-events-none" />

        <div className="text-center mb-14 pb-10 border-b border-gray-300/10">
          <h1 className="font-bold mb-4 text-[clamp(2rem,5vw,3rem)] leading-tight">
            Privacy Policy
          </h1>
          <p className="electrolize text-xs text-(--gray) tracking-[0.08em]">
            Effective Date:{" "}
            <span className="text-(--main-light-blue)">13 April 2026</span>{" "}
            &nbsp;·&nbsp; Version:{" "}
            <span className="text-(--main-light-blue)">{version}</span>{" "}
            &nbsp;·&nbsp; Jurisdiction:{" "}
            <span className="text-(--main-light-blue)">Bulgaria / GDPR</span>
          </p>
        </div>

        <div className="bg-[rgba(118,196,255,0.06)] border border-[rgba(118,196,255,0.18)] text-sm noto-sans leading-[1.8] rounded-lg py-6 px-7 mb-12 text-(--gray)">
          <strong className="text-(--white)">
            Your privacy is fundamental to MonoShare.
          </strong>{" "}
          This Privacy Policy explains what personal data we collect, how we use
          it, the legal basis for processing under the GDPR, and your rights as
          a data subject. MonoShare is operated by Daniel Jenkins, an individual
          developer based in Bulgaria, EU. This Policy applies to all users of
          the Service regardless of location.
        </div>

        <nav className="toc bg-(--lgl-card-bg) border border-(--lgl-border) rounded-lg mb-15 px-7 py-8">
          <p className="toc-title electrolize text-[11px] tracking-[0.15em] uppercase text-(--main-light-blue) mb-4">
            Page Content
          </p>
          <ol className="list-none grid grid-cols-[1fr_1fr] max-sm:grid-cols-[1fr] gap-[6px_32px] [counter-reset:toc-counter]">
            <li>
              <a href="#p1">Data Controller</a>
            </li>
            <li>
              <a href="#p2">Data We Collect</a>
            </li>
            <li>
              <a href="#p3">How We Collect Data</a>
            </li>
            <li>
              <a href="#p4">Purposes &amp; Legal Bases</a>
            </li>
            <li>
              <a href="#p5">Zero-Knowledge &amp; Secret Content</a>
            </li>
            <li>
              <a href="#p6">Data Retention</a>
            </li>
            <li>
              <a href="#p7">Data Sharing &amp; Transfers</a>
            </li>
            <li>
              <a href="#p8">Cookies &amp; Session Technology</a>
            </li>
            <li>
              <a href="#p9">Security Measures</a>
            </li>
            <li>
              <a href="#p10">Your GDPR Rights</a>
            </li>
            <li>
              <a href="#p11">Children's Privacy</a>
            </li>
            <li>
              <a href="#p12">Changes to This Policy</a>
            </li>
            <li>
              <a href="#p13">Contact &amp; Complaints</a>
            </li>
          </ol>
        </nav>

        <section className="legal-section" id="p1">
          <div className="legal-section-header">
            <span className="legal-section-num">01</span>
            <h2>Data Controller</h2>
          </div>
          <p>
            For the purposes of Regulation (EU) 2016/679 ("GDPR"), the data
            controller responsible for your personal data is:
          </p>
          <div className="contact-card">
            <p>
              <strong>Controller:</strong> Daniel Jenkins (individual developer)
            </p>
            <p>
              <strong>Service:</strong> MonoShare
            </p>
            <p>
              <strong>Location:</strong> Bulgaria, European Union
            </p>
            <p>
              <strong>Email:</strong> dan.jnks104@gmail.com
            </p>
          </div>
          <p className="mt-3.5">
            As the operator is an individual developer and the Service currently
            does not meet the thresholds requiring a formal Data Protection
            Officer (DPO) appointment under Article 37 GDPR, no DPO has been
            appointed. All data protection enquiries should be directed to the
            contact above.
          </p>
        </section>

        <section className="legal-section" id="p2">
          <div className="legal-section-header">
            <span className="legal-section-num">02</span>
            <h2>Personal Data We Collect</h2>
          </div>
          <div className="callout callout-green">
            <strong>Privacy-by-design principle:</strong> MonoShare is built to
            collect the minimum data necessary to operate the Service. Secret
            content is never readable by us due to zero-knowledge encryption.
          </div>
          <h3>2.1 Account Data (Registered Users Only)</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Data Element</th>
                <th>Description</th>
                <th>Required?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Email address</strong>
                </td>
                <td>
                  Used for account identification, login, and recipient email
                  restriction features
                </td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>
                  <strong>Hashed password</strong>
                </td>
                <td>
                  Argon2 hash of your password. Plaintext password never stored
                </td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>
                  <strong>Account creation timestamp</strong>
                </td>
                <td>Date and time the account was created</td>
                <td>Automatic</td>
              </tr>
              <tr>
                <td>
                  <strong>Session token hash</strong>
                </td>
                <td>
                  HMAC-SHA256 hash of session token stored in database for
                  session validation
                </td>
                <td>Automatic</td>
              </tr>
              <tr>
                <td>
                  <strong>Session expiry</strong>
                </td>
                <td>7-day rolling session expiry timestamp</td>
                <td>Automatic</td>
              </tr>
            </tbody>
          </table>

          <h3>2.2 Secret Metadata (All Users)</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Data Element</th>
                <th>Description</th>
                <th>Who</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Secret slug</strong>
                </td>
                <td>
                  A random 12-character alphanumeric identifier. Not personally
                  identifiable
                </td>
                <td>All users</td>
              </tr>
              <tr>
                <td>
                  <strong>Encrypted content &amp; IV</strong>
                </td>
                <td>
                  AES-128-GCM ciphertext and initialization vector. Content is
                  unreadable without the Decryption Key, which we never possess
                </td>
                <td>All users</td>
              </tr>
              <tr>
                <td>
                  <strong>Recipient email address</strong>
                </td>
                <td>
                  Optional. If set, restricts Secret access to a named email
                  address
                </td>
                <td>Registered users only</td>
              </tr>
              <tr>
                <td>
                  <strong>Hashed Secret password</strong>
                </td>
                <td>
                  Optional Argon2 hash of a user-defined Secret access password.
                  Plaintext never stored
                </td>
                <td>All users (optional)</td>
              </tr>
              <tr>
                <td>
                  <strong>Expiration timestamp</strong>
                </td>
                <td>
                  Configured time at which the Secret auto-deletes (1h, 1d, or
                  7d)
                </td>
                <td>All users</td>
              </tr>
              <tr>
                <td>
                  <strong>Creation timestamp</strong>
                </td>
                <td>Date and time the Secret was created</td>
                <td>All users</td>
              </tr>
              <tr>
                <td>
                  <strong>View timestamp</strong>
                </td>
                <td>
                  Date and time the Secret was first accessed (recorded upon
                  view)
                </td>
                <td>All users</td>
              </tr>
              <tr>
                <td>
                  <strong>Creator account link</strong>
                </td>
                <td>
                  Database reference linking a Secret to an Account (if created
                  by a registered user)
                </td>
                <td>Registered users only</td>
              </tr>
            </tbody>
          </table>

          <h3>2.3 Technical &amp; Log Data</h3>
          <p>
            When you interact with the Service, our servers and infrastructure
            may automatically log:
          </p>
          <ul>
            <li>
              <strong>IP address</strong> — used for rate limiting, abuse
              prevention, and security monitoring;
            </li>
            <li>
              <strong>HTTP request metadata</strong> — including request path,
              method, response code, and timestamp;
            </li>
            <li>
              <strong>User-Agent string</strong> — browser and operating system
              type, used for compatibility and security purposes;
            </li>
            <li>
              <strong>Error logs</strong> — technical error data for debugging
              and service improvement.
            </li>
          </ul>
          <p>
            Server logs are subject to the retention periods of our hosting
            infrastructure provider. We do not create user profiles from log
            data or use it for behavioural tracking.
          </p>

          <h3>2.4 Data We Do NOT Collect</h3>
          <p>MonoShare does not collect:</p>
          <ul>
            <li>
              Plaintext Secret content (technically impossible due to
              zero-knowledge architecture);
            </li>
            <li>Decryption keys (never transmitted to the server);</li>
            <li>
              Tracking cookies, advertising identifiers, or cross-site tracking
              data;
            </li>
            <li>Payment information (the Service is currently free);</li>
            <li>
              Location data beyond IP-level geolocation used for rate limiting;
            </li>
            <li>
              Special categories of personal data as defined by Article 9 GDPR
              (e.g., health, biometric, racial, or political data).
            </li>
          </ul>
        </section>

        <section className="legal-section" id="p3">
          <div className="legal-section-header">
            <span className="legal-section-num">03</span>
            <h2>How We Collect Data</h2>
          </div>
          <p>We collect personal data through the following means:</p>
          <ul>
            <li>
              <strong>Directly from you</strong> — when you register an Account
              (email, password), create a Secret (configuration options,
              optional recipient email, optional password), or contact us;
            </li>
            <li>
              <strong>Automatically</strong> — server-side logging of IP
              addresses, User-Agent strings, and request metadata when you
              access the Service;
            </li>
            <li>
              <strong>Via cookies and session tokens</strong> — a single session
              cookie is set upon login to maintain your authenticated session
              (see Section 8).
            </li>
          </ul>
          <p>
            We do not collect data from third-party brokers, social media
            platforms, or advertising networks.
          </p>
        </section>

        <section className="legal-section" id="p4">
          <div className="legal-section-header">
            <span className="legal-section-num">04</span>
            <h2>Purposes of Processing &amp; Legal Bases</h2>
          </div>
          <p>
            Under Article 13 of the GDPR, we are required to identify the legal
            basis for each processing activity. The following table sets out our
            processing activities, their purposes, and the applicable legal
            basis:
          </p>
          <table className="data-table">
            <thead>
              <tr>
                <th>Processing Activity</th>
                <th>Purpose</th>
                <th>Legal Basis (GDPR Art. 6)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Account creation &amp; management</strong>
                </td>
                <td>
                  Creating and maintaining your user account and enabling
                  authenticated features
                </td>
                <td>Art. 6(1)(b) — Performance of contract</td>
              </tr>
              <tr>
                <td>
                  <strong>Secret storage &amp; delivery</strong>
                </td>
                <td>
                  Encrypting, storing, and serving Secrets per user
                  configuration
                </td>
                <td>Art. 6(1)(b) — Performance of contract</td>
              </tr>
              <tr>
                <td>
                  <strong>Session management</strong>
                </td>
                <td>Maintaining your login session via HttpOnly cookies</td>
                <td>Art. 6(1)(b) — Performance of contract</td>
              </tr>
              <tr>
                <td>
                  <strong>Rate limiting &amp; abuse prevention</strong>
                </td>
                <td>
                  Protecting Service integrity by rate-limiting API requests
                  using IP addresses
                </td>
                <td>
                  Art. 6(1)(f) — Legitimate interests (security and
                  infrastructure protection)
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Security logging</strong>
                </td>
                <td>
                  Maintaining server access and error logs for debugging,
                  incident response, and security
                </td>
                <td>Art. 6(1)(f) — Legitimate interests (security)</td>
              </tr>
              <tr>
                <td>
                  <strong>Automatic deletion</strong>
                </td>
                <td>
                  Deleting Secrets upon view or expiration as per the Service's
                  design
                </td>
                <td>Art. 6(1)(b) — Performance of contract</td>
              </tr>
              <tr>
                <td>
                  <strong>Compliance with legal obligations</strong>
                </td>
                <td>
                  Disclosing data in response to valid legal orders, court
                  orders, or mandatory regulatory requirements
                </td>
                <td>Art. 6(1)(c) — Legal obligation</td>
              </tr>
            </tbody>
          </table>
          <h3>4.1 Legitimate Interests Assessment</h3>
          <p>
            Where we rely on legitimate interests (Article 6(1)(f)), we have
            assessed that our interests in maintaining a secure and reliable
            service are not overridden by your fundamental rights and freedoms,
            given the minimal nature of the data processed for these purposes
            (primarily IP addresses for rate-limiting) and the direct benefit to
            all users of a protected service.
          </p>
        </section>

        <section className="legal-section" id="p5">
          <div className="legal-section-header">
            <span className="legal-section-num">05</span>
            <h2>Zero-Knowledge Architecture &amp; Secret Content</h2>
          </div>
          <div className="callout callout-green">
            <strong>Core Privacy Guarantee:</strong> MonoShare is technically
            designed so that the Operator cannot access the plaintext content of
            any Secret. This is not merely a policy commitment — it is an
            architectural constraint.
          </div>
          <h3>5.1 Client-Side Encryption</h3>
          <p>
            All Secret content is encrypted in your browser using{" "}
            <strong>AES-128-GCM</strong> before being transmitted over HTTPS to
            our servers. The encryption key is generated locally in your browser
            and embedded exclusively in the <strong>URL fragment (hash)</strong>{" "}
            of the Share Link.
          </p>
          <h3>5.2 URL Fragment Privacy</h3>
          <p>
            URL fragments (the portion of a URL after the "#" symbol) are{" "}
            <strong>not transmitted to web servers</strong> by browsers as part
            of HTTP requests. This means the Decryption Key exists only in the
            Share Link itself and is never sent to, or accessible by,
            MonoShare's servers.
          </p>
          <h3>5.3 What We Store Server-Side</h3>
          <p>
            Our database stores only: the encrypted ciphertext, the
            initialization vector (IV), and Secret configuration metadata
            (expiration, timestamps, optional recipient email, optional password
            hash). Without the Decryption Key, the stored ciphertext is
            cryptographically meaningless.
          </p>
          <h3>5.4 Implication for Data Requests</h3>
          <p>
            Because we do not possess Decryption Keys, we are technically
            incapable of providing readable Secret content in response to any
            legal process (court orders, police requests, subpoenas). We can
            only provide the encrypted ciphertext. Metadata (email addresses,
            timestamps, slugs) is not protected by zero-knowledge encryption and
            may be subject to disclosure pursuant to a valid legal obligation.
          </p>
          <h3>5.5 Recipient Email Privacy</h3>
          <p>
            Where a registered User optionally sets a recipient email
            restriction on a Secret, that email address is stored in plaintext
            in our database as an access control mechanism. It is used solely to
            verify the recipient's identity and is subject to the same deletion
            schedule as the Secret itself.
          </p>
        </section>

        <section className="legal-section" id="p6">
          <div className="legal-section-header">
            <span className="legal-section-num">06</span>
            <h2>Data Retention</h2>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Data Category</th>
                <th>Retention Period</th>
                <th>Basis for Retention</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Active Secret content (ciphertext + IV)</strong>
                </td>
                <td>
                  Until first view or expiration (max 7 days), whichever is
                  earlier. Immediately overwritten upon triggering event.
                </td>
                <td>Service operation (contract)</td>
              </tr>
              <tr>
                <td>
                  <strong>
                    Viewed/expired Secret metadata (slug, timestamps)
                  </strong>
                </td>
                <td>
                  Retained for the duration of the linked Account for dashboard
                  display; deleted with Account upon deletion.
                </td>
                <td>Service operation (contract)</td>
              </tr>
              <tr>
                <td>
                  <strong>Unauthenticated Secret records</strong>
                </td>
                <td>
                  Deleted immediately upon view or expiration. No Account link;
                  no persistent metadata retention after deletion.
                </td>
                <td>Service operation (contract)</td>
              </tr>
              <tr>
                <td>
                  <strong>Account data (email, password hash)</strong>
                </td>
                <td>
                  Duration of Account. Permanently deleted within 30 days of
                  Account deletion request.
                </td>
                <td>Contract / Legal obligation</td>
              </tr>
              <tr>
                <td>
                  <strong>Session tokens</strong>
                </td>
                <td>
                  7-day rolling expiry. Deleted immediately upon logout or
                  Account deletion.
                </td>
                <td>Security / Contract</td>
              </tr>
              <tr>
                <td>
                  <strong>Server / access logs (IP, User-Agent)</strong>
                </td>
                <td>
                  Subject to hosting provider's log retention policies
                  (typically 30–90 days). Not retained by us beyond
                  infrastructure defaults.
                </td>
                <td>Legitimate interests (security)</td>
              </tr>
            </tbody>
          </table>
          <div className="callout callout-blue">
            <strong>Note:</strong> We do not retain any data beyond what is
            strictly necessary for the purpose for which it was collected. The
            deletion of Secrets is automatic and irrevocable by design.
          </div>
        </section>

        <section className="legal-section" id="p7">
          <div className="legal-section-header">
            <span className="legal-section-num">07</span>
            <h2>Data Sharing &amp; Third-Party Transfers</h2>
          </div>
          <h3>7.1 General Principle</h3>
          <p>
            MonoShare does <strong>not</strong> sell, rent, or trade your
            personal data to any third party for commercial purposes. We do not
            share data with advertising networks, data brokers, or analytics
            providers.
          </p>
          <h3>7.2 Infrastructure Providers</h3>
          <p>
            To operate the Service, we rely on third-party infrastructure
            providers (hosting, database, CDN). These providers act as{" "}
            <strong>data processors</strong> under Article 28 GDPR and process
            data only on our instruction and in accordance with data processing
            agreements. They do not have independent access to or rights over
            your data. Current categories of providers include:
          </p>
          <ul>
            <li>
              <strong>Cloud hosting / deployment platform</strong> (e.g.,
              Render, Fly.io, or similar);
            </li>
            <li>
              <strong>Managed database provider</strong> (MongoDB Atlas or
              equivalent);
            </li>
            <li>
              <strong>Font delivery</strong> (Google Fonts — served via standard
              CDN; only font files are requested, no tracking data is sent to
              Google from MonoShare's backend).
            </li>
          </ul>
          <p>
            A full list of sub-processors is available upon request by
            contacting us at the details in Section 13.
          </p>
          <h3>7.3 Legal Disclosures</h3>
          <p>
            We may disclose personal data (excluding Secret ciphertext, which we
            cannot decrypt) to:
          </p>
          <ul>
            <li>
              Law enforcement, judicial authorities, or regulatory bodies where
              required by Bulgarian law, EU law, or a binding court order;
            </li>
            <li>
              Legal counsel or advisors in connection with defending or
              prosecuting legal claims;
            </li>
            <li>
              A successor entity in the event of a business acquisition, merger,
              or transfer of assets — in which case you will be notified in
              advance.
            </li>
          </ul>
          <h3>7.4 International Transfers</h3>
          <p>
            If any of our infrastructure providers process personal data outside
            the European Economic Area (EEA), we ensure such transfers are
            protected by appropriate safeguards pursuant to Chapter V of the
            GDPR, including Standard Contractual Clauses (SCCs) as approved by
            the European Commission, or adequacy decisions where applicable.
          </p>
        </section>

        <section className="legal-section" id="p8">
          <div className="legal-section-header">
            <span className="legal-section-num">08</span>
            <h2>Cookies &amp; Session Technology</h2>
          </div>
          <h3>8.1 Session Cookie</h3>
          <p>
            MonoShare uses <strong>one functional session cookie</strong> placed
            upon user login. This cookie has the following properties:
          </p>
          <table className="data-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Name</strong>
                </td>
                <td>
                  <code>session</code>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Type</strong>
                </td>
                <td>HttpOnly session cookie</td>
              </tr>
              <tr>
                <td>
                  <strong>Secure</strong>
                </td>
                <td>Yes (transmitted over HTTPS only in production)</td>
              </tr>
              <tr>
                <td>
                  <strong>SameSite</strong>
                </td>
                <td>Strict (not sent cross-site)</td>
              </tr>
              <tr>
                <td>
                  <strong>Expiry</strong>
                </td>
                <td>7 days (rolling)</td>
              </tr>
              <tr>
                <td>
                  <strong>Content</strong>
                </td>
                <td>
                  A random session token (not user-identifiable without
                  server-side lookup)
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Purpose</strong>
                </td>
                <td>
                  Maintain authenticated session; verifying identity for
                  protected API routes
                </td>
              </tr>
            </tbody>
          </table>
          <h3>8.2 No Tracking or Advertising Cookies</h3>
          <p>
            MonoShare does <strong>not</strong> use tracking cookies, analytics
            cookies, advertising identifiers, fingerprinting techniques, or any
            persistent client-side storage for user profiling. No third-party
            tracking scripts are embedded in the Service.
          </p>
          <h3>8.3 Cookie Consent</h3>
          <p>
            The session cookie described above is strictly necessary for the
            authenticated functionality of the Service. Under Recital 25 of the
            ePrivacy Directive and its implementation, strictly necessary
            cookies do not require separate consent. No consent banner is
            therefore required for this cookie. If we introduce any
            non-essential cookies in the future, we will implement appropriate
            consent mechanisms.
          </p>
        </section>

        <section className="legal-section" id="p9">
          <div className="legal-section-header">
            <span className="legal-section-num">09</span>
            <h2>Security Measures</h2>
          </div>
          <p>
            We implement technical and organisational security measures
            proportionate to the risk presented by the data we process,
            including:
          </p>
          <ul>
            <li>
              <strong>AES-128-GCM client-side encryption</strong> for all Secret
              content, with keys never accessible to the server;
            </li>
            <li>
              <strong>Argon2 password hashing</strong> for all stored passwords
              (account passwords and optional Secret passwords);
            </li>
            <li>
              <strong>HMAC-SHA256 session token hashing</strong> with a
              server-side secret key;
            </li>
            <li>
              <strong>HttpOnly, Secure, SameSite=Strict cookies</strong> to
              prevent client-side token access and CSRF attacks;
            </li>
            <li>
              <strong>HTTPS/TLS</strong> for all data in transit;
            </li>
            <li>
              <strong>HTTP security headers</strong>: X-Content-Type-Options,
              X-Frame-Options (DENY), Referrer-Policy (no-referrer),
              Permissions-Policy, and a restrictive Content-Security-Policy;
            </li>
            <li>
              <strong>Rate limiting</strong> on all sensitive endpoints using
              IP-based controls;
            </li>
            <li>
              <strong>LRU-cached session validation</strong> to reduce database
              exposure on repeated requests;
            </li>
            <li>
              <strong>Request payload size limits</strong> (100kb JSON limit) to
              prevent denial-of-service attacks;
            </li>
            <li>
              <strong>X-Robots-Tag headers</strong> on private routes to prevent
              search engine indexing of sensitive pages.
            </li>
          </ul>
          <div className="callout callout-warn">
            <strong>Important:</strong> No system is perfectly secure. While we
            implement strong security practices, we cannot guarantee absolute
            protection against all threats. In the event of a personal data
            breach affecting your rights and freedoms, we will notify the
            relevant supervisory authority (CPDP, Bulgaria) within 72 hours of
            becoming aware, and affected individuals without undue delay, as
            required by Article 33–34 GDPR.
          </div>
        </section>

        <section className="legal-section" id="p10">
          <div className="legal-section-header">
            <span className="legal-section-num">10</span>
            <h2>Your Rights as a Data Subject (GDPR)</h2>
          </div>
          <p>
            Under the GDPR (Articles 15–22), you have the following rights
            regarding your personal data. To exercise any of these rights,
            contact us using the details in Section 13. We will respond within{" "}
            <strong>one calendar month</strong> of receiving your verified
            request (extendable by two months for complex requests).
          </p>
          <div className="rights-grid">
            <div className="right-card">
              <p className="right-card-title">Right of Access (Art. 15)</p>
              <p>
                Request a copy of the personal data we hold about you and
                information about how we process it.
              </p>
            </div>
            <div className="right-card">
              <p className="right-card-title">
                Right to Rectification (Art. 16)
              </p>
              <p>
                Request correction of inaccurate or incomplete personal data.
                For email corrections, contact us directly.
              </p>
            </div>
            <div className="right-card">
              <p className="right-card-title">Right to Erasure (Art. 17)</p>
              <p>
                Request deletion of your personal data where there is no
                compelling reason for its continued processing. Includes Account
                deletion.
              </p>
            </div>
            <div className="right-card">
              <p className="right-card-title">Right to Restriction (Art. 18)</p>
              <p>
                Request restriction of processing of your data in certain
                circumstances, such as where you contest its accuracy.
              </p>
            </div>
            <div className="right-card">
              <p className="right-card-title">
                Right to Data Portability (Art. 20)
              </p>
              <p>
                Receive your personal data in a structured, commonly used,
                machine-readable format where processing is based on contract or
                consent.
              </p>
            </div>
            <div className="right-card">
              <p className="right-card-title">Right to Object (Art. 21)</p>
              <p>
                Object to processing based on legitimate interests, including
                any profiling. We will cease processing unless we can
                demonstrate compelling legitimate grounds.
              </p>
            </div>
            <div className="right-card">
              <p className="right-card-title">
                Right Not to be Subject to Automated Decision-Making (Art. 22)
              </p>
              <p>
                MonoShare does not make automated decisions with legal or
                similarly significant effects based on personal data profiling.
              </p>
            </div>
            <div className="right-card">
              <p className="right-card-title">
                Right to Lodge a Complaint (Art. 77)
              </p>
              <p>
                Lodge a complaint with the Bulgarian CPDP or any EU supervisory
                authority if you believe we have violated your rights.
              </p>
            </div>
          </div>
          <h3>10.1 Bulgarian Supervisory Authority</h3>
          <p>
            The competent data protection supervisory authority in Bulgaria is
            the <strong>Commission for Personal Data Protection (CPDP)</strong>:
          </p>
          <div className="contact-card">
            <p>
              <strong>Commission for Personal Data Protection (КЗЛД)</strong>
            </p>
            <p>2 Prof. Tsvetan Lazarov Blvd., Sofia 1592, Bulgaria</p>
            <p>
              Website:{" "}
              <a
                href="https://www.cpdp.bg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--main-light-blue) underline underline-offset-2"
              >
                www.cpdp.bg
              </a>
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:kzld@cpdp.bg"
                className="text-(--main-light-blue) underline underline-offset-2"
              >
                kzld@cpdp.bg
              </a>
            </p>
          </div>
          <p className="mt-3.5 text-(--gray)">
            You also have the right to lodge a complaint with the supervisory
            authority in your EU member state of habitual residence, place of
            work, or the place of the alleged infringement (Article 77 GDPR).
          </p>
          <h3>10.2 Verification of Identity</h3>
          <p>
            To protect your privacy, we may need to verify your identity before
            processing certain requests. We will not charge a fee for responding
            to requests unless they are manifestly unfounded or excessive, in
            which case we may charge a reasonable fee or refuse the request.
          </p>
          <h3>10.3 Practical Limitations</h3>
          <p>
            Due to the zero-knowledge architecture, we cannot provide the
            plaintext content of any Secret even in response to a subject access
            request (Article 15 GDPR), as we do not possess the Decryption Key.
            We can confirm the metadata associated with your Secrets (slugs,
            creation dates, expiration dates, recipient emails).
          </p>
        </section>

        <section className="legal-section" id="p11">
          <div className="legal-section-header">
            <span className="legal-section-num">11</span>
            <h2>Children's Privacy</h2>
          </div>
          <p>
            The Service is not directed at children under the age of{" "}
            <strong>16</strong>, consistent with Article 8 GDPR as implemented
            in Bulgarian law. We do not knowingly collect personal data from
            children under 16. If we become aware that we have inadvertently
            collected personal data from a child under the applicable age of
            digital consent, we will take immediate steps to delete that data.
          </p>
          <p>
            If you are a parent or guardian and believe your child under 16 has
            provided personal data to MonoShare, please contact us immediately
            using the details in Section 13.
          </p>
        </section>

        <section className="legal-section" id="p12">
          <div className="legal-section-header">
            <span className="legal-section-num">12</span>
            <h2>Changes to This Privacy Policy</h2>
          </div>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices, technology, legal requirements, or other
            factors. We will notify you of material changes by:
          </p>
          <ul>
            <li>Displaying a prominent notice within the Service; and/or</li>
            <li>
              Sending an email notification to registered Account holders;
            </li>
          </ul>
          <p>
            at least <strong>14 days</strong> before the changes take effect for
            existing users. Non-material changes or corrections may be made
            without prior notice. We encourage you to review this Policy
            periodically. The "Effective Date" at the top indicates when it was
            last revised.
          </p>
          <p>
            Your continued use of the Service after the effective date of any
            revised Policy constitutes your acknowledgment of and agreement to
            the updated Policy.
          </p>
        </section>

        <section className="legal-section" id="p13">
          <div className="legal-section-header">
            <span className="legal-section-num">13</span>
            <h2>Contact &amp; Complaints</h2>
          </div>
          <p>
            For any questions, requests to exercise your GDPR rights, or privacy
            complaints, please contact us at:
          </p>
          <div className="contact-card">
            <p>
              <strong>Data Controller:</strong> Daniel Jenkins
            </p>
            <p>
              <strong>Service:</strong> MonoShare
            </p>
            <p>
              <strong>Location:</strong> Bulgaria, European Union
            </p>
            <p>
              <strong>Email:</strong> dan.jnks104@gmail.com
            </p>
            <p>
              <strong>Portfolio:</strong>{" "}
              <a
                href="https://daniel-jenkins-portfolio.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--main-light-blue) underline underline-offset-2 decoration-(--main-light-blue)/40 hover:decoration-(--main-light-blue)"
              >
                daniel-jenkins-portfolio.onrender.com
              </a>
            </p>
          </div>
          <p className="mt-4 text-(--gray) text-[13px]!">
            We aim to acknowledge all privacy requests within{" "}
            <strong className="text-(--white)">72 hours</strong> and resolve
            them within{" "}
            <strong className="text-(--white)">one calendar month</strong> as
            required by GDPR Article 12. If you are dissatisfied with our
            response, you have the right to lodge a complaint with the CPDP
            (details in Section 10.1).
          </p>
        </section>

        <footer className="doc-footer">
          <p>MonoShare &nbsp;·&nbsp; Privacy Policy &nbsp;·&nbsp; v1.0</p>
          <p>
            In compliance with GDPR (EU) 2016/679 as applicable under Bulgarian
            law.
          </p>
          <p>
            <Link to="/terms-of-service" className="legal-link">
              View Terms of Service
            </Link>
          </p>
        </footer>
        <div className="flex justify-center mr-6 scale-95">
          <BackButton navback={false} fallbackPath="/" />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
