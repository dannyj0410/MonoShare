import { Link } from "react-router-dom";
import BackButton from "../partials/MainPartials/BackButton";

const TermsOfService = () => {
  const version = "1.0";
  return (
    <div className="legal-wrapper scroll-smooth">
      <title>Terms of Service | MonoShare</title>
      <div className="max-w-200 pt-25 pb-15 mx-auto z-10">
        <div className="legal-glow-center pointer-events-none" />

        <div className="text-center mb-14 pb-10 border-b border-gray-300/10">
          <h1 className="font-bold mb-4 text-[clamp(2rem,5vw,3rem)] leading-tight">
            Terms of Service
          </h1>
          <p className="electrolize text-xs text-(--gray) tracking-[0.08em]">
            Effective Date:{" "}
            <span className="text-(--main-light-blue)">13 April 2026</span>{" "}
            &nbsp;·&nbsp; Version:{" "}
            <span className="text-(--main-light-blue)">{version}</span>{" "}
            &nbsp;·&nbsp; Governing Law:{" "}
            <span className="text-(--main-light-blue)">
              Republic of Bulgaria / European Union
            </span>
          </p>
        </div>

        <div className="bg-[rgba(118,196,255,0.06)] border border-[rgba(118,196,255,0.18)] text-sm noto-sans leading-[1.8] rounded-lg py-6 px-7 mb-12 text-(--gray)">
          <strong className="text-(--white)">
            Please read these Terms carefully before using MonoShare.
          </strong>{" "}
          By accessing or using this service you confirm that you have read,
          understood, and agree to be bound by these Terms of Service ("Terms")
          and the accompanying{" "}
          <Link
            className="text-(--white) underline underline-offset-3 decoration-(--white)/30 hover:decoration-(--white)/70"
            to="/privacy-policy"
          >
            Privacy Policy
          </Link>
          . If you do not agree, you must not use MonoShare.
        </div>

        <nav className="toc bg-(--lgl-card-bg) border border-(--lgl-border) rounded-lg mb-15 px-7 py-8">
          <p className="toc-title electrolize text-[11px] tracking-[0.15em] uppercase text-(--main-light-blue) mb-4">
            Page Content
          </p>
          <ol className="list-none grid grid-cols-[1fr_1fr] max-sm:grid-cols-[1fr] gap-[6px_32px] [counter-reset:toc-counter]">
            <li>
              <a href="#s1">Definitions</a>
            </li>
            <li>
              <a href="#s2">Acceptance &amp; Eligibility</a>
            </li>
            <li>
              <a href="#s3">Description of Service</a>
            </li>
            <li>
              <a href="#s4">Account Registration</a>
            </li>
            <li>
              <a href="#s5">Acceptable Use</a>
            </li>
            <li>
              <a href="#s6">Zero-Knowledge Architecture</a>
            </li>
            <li>
              <a href="#s7">Secret Lifecycle &amp; Deletion</a>
            </li>
            <li>
              <a href="#s8">Intellectual Property</a>
            </li>
            <li>
              <a href="#s9">Disclaimers &amp; Warranties</a>
            </li>
            <li>
              <a href="#s10">Limitation of Liability</a>
            </li>
            <li>
              <a href="#s11">Indemnification</a>
            </li>
            <li>
              <a href="#s12">Termination</a>
            </li>
            <li>
              <a href="#s13">Governing Law &amp; Disputes</a>
            </li>
            <li>
              <a href="#s14">Changes to Terms</a>
            </li>
            <li>
              <a href="#s15">Contact</a>
            </li>
          </ol>
        </nav>

        <section className="legal-section" id="s1">
          <div className="legal-section-header">
            <span className="legal-section-num">01</span>
            <h2>Definitions</h2>
          </div>
          <p>
            For the purposes of these Terms, the following definitions apply:
          </p>
          <ul>
            <li>
              <strong>"Service"</strong> means the MonoShare web application
              accessible at [your domain], including all related APIs, features,
              and content.
            </li>
            <li>
              <strong>"Operator" / "we" / "us" / "our"</strong> means the
              individual developer, Daniel Jenkins, operating MonoShare, based
              in Bulgaria.
            </li>
            <li>
              <strong>"User" / "you"</strong> means any natural person who
              accesses or uses the Service, whether as a registered account
              holder or as an unauthenticated visitor.
            </li>
            <li>
              <strong>"Secret"</strong> means any text-based data submitted by a
              User for encrypted storage and single-use sharing via the Service.
            </li>
            <li>
              <strong>"Share Link" or "One-Time Link"</strong> means the unique
              URL, including the hash fragment containing the decryption key,
              generated by the Service upon creation of a Secret.
            </li>
            <li>
              <strong>"Decryption Key"</strong> means the AES-128-GCM
              cryptographic key embedded exclusively in the URL fragment of the
              Share Link, never transmitted to our servers.
            </li>
            <li>
              <strong>"Account"</strong> means a registered user profile created
              via the Service's sign-up functionality, protected by an email
              address and hashed password.
            </li>
            <li>
              <strong>"Content"</strong> means any data, text, or information
              that a User inputs into the Service.
            </li>
            <li>
              <strong>"GDPR"</strong> means Regulation (EU) 2016/679 of the
              European Parliament and of the Council, as applicable under
              Bulgarian law.
            </li>
          </ul>
        </section>

        <section className="legal-section" id="s2">
          <div className="legal-section-header">
            <span className="legal-section-num">02</span>
            <h2>Acceptance &amp; Eligibility</h2>
          </div>
          <h3>2.1 Acceptance</h3>
          <p>
            By creating a Secret, registering an Account, or otherwise using any
            part of the Service, you represent that you have read and agree to
            these Terms. Your continued use of the Service constitutes ongoing
            acceptance of any updated Terms.
          </p>
          <h3>2.2 Age Requirement</h3>
          <p>
            You must be at least <strong>16 years of age</strong> to use the
            Service. This minimum age is set in accordance with Article 8 of the
            GDPR as implemented under Bulgarian law. By using the Service, you
            represent and warrant that you meet this requirement. If you are
            under 16, you must not create an Account or submit any Content.
          </p>
          <h3>2.3 Legal Capacity</h3>
          <p>
            You represent that you have the full legal capacity to enter into a
            binding agreement and that using the Service does not violate any
            applicable law in your jurisdiction.
          </p>
          <div className="callout callout-warn">
            <strong>Notice:</strong> The Service is intended for personal and
            professional productivity use. It is not designed for, and must not
            be used by, individuals below the applicable age of digital consent
            in their jurisdiction.
          </div>
        </section>

        <section className="legal-section" id="s3">
          <div className="legal-section-header">
            <span className="legal-section-num">03</span>
            <h2>Description of Service</h2>
          </div>
          <h3>3.1 Core Functionality</h3>
          <p>
            MonoShare is a zero-knowledge, end-to-end encrypted secret-sharing
            platform. The Service allows Users to:
          </p>
          <ul>
            <li>
              Encrypt text-based Secrets entirely within their web browser
              before transmission;
            </li>
            <li>
              Generate a unique, single-use Share Link embedding a Decryption
              Key in the URL fragment;
            </li>
            <li>
              Configure Secrets with optional password protection, recipient
              email restriction, and expiration periods of 1 hour, 1 day, or 7
              days;
            </li>
            <li>
              Permanently and automatically delete Secrets upon their first view
              or upon expiration, whichever occurs first.
            </li>
          </ul>
          <h3>3.2 Account Features</h3>
          <p>Registered Account holders additionally receive access to:</p>
          <ul>
            <li>
              A personal dashboard ("My Secrets") listing active, viewed, and
              expired Secrets;
            </li>
            <li>
              The ability to view a Secret's metadata after creation and up
              until its removal through a secrets details page;
            </li>
            <li>
              Increased character limits for Secret content (up to 10,000
              characters vs. 1,000 characters for unauthenticated users);
            </li>
            <li>
              The ability to restrict a Secret's access to a specific verified
              email address;
            </li>
            <li>Manual deletion of Secrets prior to their expiration.</li>
          </ul>
          <h3>3.3 Free Service</h3>
          <p>
            Core features of the Service are provided free of charge. The
            Operator reserves the right to introduce paid tiers in the future,
            with advance notice to Users.
          </p>
          <h3>3.4 Service Availability</h3>
          <p>
            The Service is provided on an "as available" basis. We do not
            guarantee continuous, uninterrupted, or error-free access. Scheduled
            or unscheduled maintenance may result in temporary unavailability.
          </p>
        </section>

        <section className="legal-section" id="s4">
          <div className="legal-section-header">
            <span className="legal-section-num">04</span>
            <h2>Account Registration &amp; Security</h2>
          </div>
          <h3>4.1 Registration</h3>
          <p>
            To create an Account, you must provide a valid email address and a
            password meeting our minimum security requirements (at least 6
            characters, no spaces). You may only create one Account per email
            address.
          </p>
          <h3>4.2 Password Security</h3>
          <p>
            Your password is hashed using <strong>Argon2</strong> before
            storage. We never store your plaintext password. You are solely
            responsible for maintaining the confidentiality of your credentials
            and for all activity that occurs under your Account.
          </p>
          <h3>4.3 Session Management</h3>
          <p>
            Sessions are managed via{" "}
            <strong>HttpOnly, Secure, SameSite=Strict</strong> cookies with a
            7-day expiry. Session tokens are hashed with HMAC-SHA256
            server-side. You must notify us immediately of any unauthorized
            access to your Account.
          </p>
          <h3>4.4 Account Accuracy</h3>
          <p>
            You agree to provide accurate, current, and complete information at
            registration and to keep that information updated. Providing false
            information constitutes a breach of these Terms and may result in
            immediate Account termination.
          </p>
          <h3>4.5 No Account Transfer</h3>
          <p>
            Accounts are personal and non-transferable. You may not sell,
            assign, or share your Account with any third party.
          </p>
        </section>

        <section className="legal-section" id="s5">
          <div className="legal-section-header">
            <span className="legal-section-num">05</span>
            <h2>Acceptable Use Policy</h2>
          </div>
          <h3>5.1 Permitted Uses</h3>
          <p>
            You may use the Service exclusively for lawful purposes, including
            sharing passwords, API keys, access tokens, database credentials,
            and other legitimate sensitive professional or personal data.
          </p>
          <h3>5.2 Prohibited Conduct</h3>
          <p>
            You expressly agree <strong>not</strong> to use the Service to
            transmit, store, or share any Content that:
          </p>
          <ul>
            <li>
              Is illegal under Bulgarian law, EU law, or the laws of your
              country of residence;
            </li>
            <li>
              Constitutes, facilitates, or promotes criminal activity, including
              but not limited to fraud, identity theft, hacking, phishing, or
              social engineering attacks;
            </li>
            <li>
              Contains malicious code, malware, ransomware, exploits, or
              instructions for creating harmful software or weapons;
            </li>
            <li>
              Violates the intellectual property, privacy, or other legal rights
              of any third party;
            </li>
            <li>
              Constitutes child sexual abuse material (CSAM) or any content that
              sexually exploits or harms minors;
            </li>
            <li>
              Facilitates terrorist activity, violent extremism, or human
              trafficking;
            </li>
            <li>
              Is used to harass, threaten, defame, or intimidate any individual;
            </li>
            <li>Violates any export control or sanctions regulations.</li>
          </ul>
          <h3>5.3 Technical Prohibitions</h3>
          <p>You further agree not to:</p>
          <ul>
            <li>
              Attempt to bypass, circumvent, or defeat any rate limiting,
              authentication, or security mechanism of the Service;
            </li>
            <li>
              Conduct automated scraping, crawling, or bulk requests against the
              API;
            </li>
            <li>
              Reverse-engineer, decompile, or attempt to extract the source code
              of the Service;
            </li>
            <li>
              Attempt to access data or accounts belonging to other Users;
            </li>
            <li>
              Introduce any interference that degrades the availability,
              performance, or integrity of the Service.
            </li>
          </ul>
          <div className="callout callout-warn">
            <strong>Enforcement:</strong> Violation of this Acceptable Use
            Policy may result in immediate Account suspension or termination,
            rate limiting, IP blocking, and, where required by law, reporting to
            competent authorities, including law enforcement.
          </div>
          <h3>5.4 Rate Limiting</h3>
          <p>
            The Service implements rate limiting to protect infrastructure
            integrity: account creation is limited to 3 attempts per window,
            sign-in to 10 attempts per 10 minutes, Secret creation to 20 per 10
            minutes, and general API access to 100 requests per 10 minutes per
            IP address.
          </p>
        </section>

        <section className="legal-section" id="s6">
          <div className="legal-section-header">
            <span className="legal-section-num">06</span>
            <h2>Zero-Knowledge Architecture &amp; Technical Limitations</h2>
          </div>
          <div className="callout callout-green">
            <strong>Technical Fact:</strong> MonoShare is architecturally
            designed so that the Operator cannot read the content of your
            Secrets. Encryption and decryption occur exclusively in your browser
            using AES-128-GCM. The Decryption Key exists only in the URL
            fragment and is never transmitted to our servers.
          </div>
          <h3>6.1 What This Means</h3>
          <p>
            Because the Decryption Key is stored exclusively in the URL hash
            fragment (never sent to the server), the Operator has no technical
            capability to decrypt or read the plaintext content of any Secret.
            Our servers store only ciphertext and an initialization vector (IV).
          </p>
          <h3>6.2 User Responsibility for Link Security</h3>
          <p>
            The security of your Secret depends entirely on the confidentiality
            of the Share Link.{" "}
            <strong>
              You are solely responsible for transmitting the Share Link through
              a secure channel.
            </strong>{" "}
            If the Share Link is intercepted, the Secret content may be
            compromised. MonoShare bears no liability for disclosure resulting
            from insecure handling of Share Links by Users.
          </p>
          <h3>6.3 Password-Protected Secrets</h3>
          <p>
            Where a User applies optional password protection to a Secret, the
            password is verified server-side using Argon2 hashing. This provides
            an additional layer of access control but does not alter the
            zero-knowledge nature of the encryption architecture.
          </p>
          <h3>6.4 No Decryption for Law Enforcement</h3>
          <p>
            Due to the zero-knowledge design, the Operator is technically
            incapable of providing decrypted Secret content to law enforcement
            or any third party, even in response to a valid legal process. We
            can only provide encrypted ciphertext, which is cryptographically
            useless without the Decryption Key held solely by the User.
          </p>
          <h3>6.5 Limitation of Zero-Knowledge Claims</h3>
          <p>
            The zero-knowledge guarantee applies only to Secret content. Account
            metadata — including email addresses, creation timestamps,
            expiration times, IP addresses, and secret slugs — may be accessible
            to the Operator and may be disclosed pursuant to a valid legal
            obligation. See the Privacy Policy for full details.
          </p>
        </section>

        <section className="legal-section" id="s7">
          <div className="legal-section-header">
            <span className="legal-section-num">07</span>
            <h2>Secret Lifecycle, Deletion &amp; Data Retention</h2>
          </div>
          <h3>7.1 Automatic Deletion on View</h3>
          <p>
            Upon the first successful access and decryption of a Secret via a
            Share Link, the Service immediately and permanently overwrites the
            stored encrypted text and IV with empty values and records the view
            timestamp. This operation is atomic and irreversible.
          </p>
          <h3>7.2 Automatic Deletion on Expiration</h3>
          <p>
            Secrets that have not been viewed are automatically marked as
            expired upon reaching their configured expiration time (1 hour, 1
            day, or 7 days). The encrypted content is permanently deleted upon
            expiration. Expired Secrets cannot be recovered.
          </p>
          <h3>7.3 Manual Deletion by Account Holders</h3>
          <p>
            Registered Users may manually delete any of their active Secrets
            before expiration via the My Secrets dashboard. Manual deletion is
            immediate and permanent.
          </p>
          <h3>7.4 No Recovery</h3>
          <p>
            <strong>
              Deleted Secrets cannot be recovered under any circumstances.
            </strong>{" "}
            The Operator does not maintain backups of Secret content. By using
            the Service, you acknowledge and accept this.
          </p>
          <h3>7.5 Account Metadata Retention</h3>
          <p>
            Account metadata (email, hashed password, session records) is
            retained for the duration of your Account. Upon Account deletion,
            all associated data is permanently removed from our systems within
            30 days, subject to any legal retention obligations.
          </p>
          <h3>7.6 Unauthenticated Secret Metadata</h3>
          <p>
            For Secrets created without an Account, no user-identifiable
            information is stored beyond the encrypted content, IV, slug,
            configuration options, and timestamps. This data is deleted
            according to the lifecycle rules above.
          </p>
        </section>

        <section className="legal-section" id="s8">
          <div className="legal-section-header">
            <span className="legal-section-num">08</span>
            <h2>Intellectual Property</h2>
          </div>
          <h3>8.1 Operator's Intellectual Property</h3>
          <p>
            The Service, including its source code, design, visual elements,
            trademarks, and all underlying technology, is the exclusive property
            of Daniel Jenkins ("Operator"). Nothing in these Terms grants you
            any right, license, or interest in the Service's intellectual
            property beyond the limited license to use the Service as described
            herein.
          </p>
          <h3>8.2 Your Content</h3>
          <p>
            You retain full ownership of any Content you submit to the Service.
            By submitting Content, you grant the Operator a limited,
            non-exclusive, royalty-free, technical license solely to encrypt,
            store, transmit, and delete your Content as necessary to provide the
            Service. This license terminates upon deletion of the relevant
            Secret.
          </p>
          <h3>8.3 Feedback</h3>
          <p>
            If you provide the Operator with feedback, suggestions, or ideas
            regarding the Service, you grant the Operator a perpetual,
            irrevocable, royalty-free license to use such feedback without any
            obligation of compensation or attribution.
          </p>
        </section>

        <section className="legal-section" id="s9">
          <div className="legal-section-header">
            <span className="legal-section-num">09</span>
            <h2>Disclaimers &amp; Warranties</h2>
          </div>
          <div className="callout callout-warn">
            <strong>Important:</strong> Please read this section carefully as it
            limits the Operator's legal obligations to you.
          </div>
          <h3>9.1 "As Is" Basis</h3>
          <p>
            The Service is provided <strong>"as is"</strong> and{" "}
            <strong>"as available"</strong> without any warranty of any kind,
            express or implied, to the fullest extent permitted by applicable
            Bulgarian and EU law. The Operator expressly disclaims all
            warranties, including but not limited to:
          </p>
          <ul>
            <li>
              Implied warranties of merchantability, fitness for a particular
              purpose, and non-infringement;
            </li>
            <li>
              That the Service will be uninterrupted, error-free, or free of
              viruses or harmful components;
            </li>
            <li>That any defects in the Service will be corrected;</li>
            <li>That the Service will meet your specific requirements.</li>
          </ul>
          <h3>9.2 No Warranty of Absolute Security</h3>
          <p>
            While MonoShare employs state-of-the-art cryptographic practices,{" "}
            <strong>no system is perfectly secure.</strong> The Operator does
            not warrant that the Service is immune to all possible security
            threats. Cryptographic security depends on proper key management,
            which remains your responsibility.
          </p>
          <h3>9.3 Third-Party Infrastructure</h3>
          <p>
            The Service may depend on third-party infrastructure (hosting
            providers, database services, CDNs). The Operator is not liable for
            failures, outages, or security incidents originating with
            third-party providers.
          </p>
          <h3>9.4 Consumer Rights</h3>
          <p>
            Nothing in this section limits any statutory rights you may have
            under Bulgarian consumer protection law or EU consumer rights
            directives that cannot be lawfully excluded or limited.
          </p>
        </section>

        <section className="legal-section" id="s10">
          <div className="legal-section-header">
            <span className="legal-section-num">10</span>
            <h2>Limitation of Liability</h2>
          </div>
          <h3>10.1 Exclusion of Indirect Damages</h3>
          <p>
            To the maximum extent permitted by applicable law, the Operator
            shall not be liable for any indirect, incidental, special,
            consequential, punitive, or exemplary damages arising from your use
            of or inability to use the Service, including but not limited to:
          </p>
          <ul>
            <li>
              Loss of data, profits, revenue, goodwill, or business
              opportunities;
            </li>
            <li>
              Unauthorized access to or disclosure of your transmitted Content
              by a third party;
            </li>
            <li>
              Any damage resulting from your failure to maintain the
              confidentiality of your Share Link or Account credentials.
            </li>
          </ul>
          <h3>10.2 Aggregate Liability Cap</h3>
          <p>
            In jurisdictions where liability cannot be fully excluded, the
            Operator's total aggregate liability to you for all claims arising
            from or related to the Service shall not exceed{" "}
            <strong>€50 (fifty euros)</strong>, or the total amount paid by you
            to the Operator in the 12 months preceding the claim, whichever is
            greater.
          </p>
          <h3>10.3 Mandatory Consumer Rights</h3>
          <p>
            Nothing in this section limits liability for: death or personal
            injury caused by negligence; fraud or fraudulent misrepresentation;
            or any other liability that cannot be excluded under Bulgarian law,
            including the Bulgarian Obligations and Contracts Act and applicable
            EU consumer protection legislation.
          </p>
          <h3>10.4 Essential Basis of Bargain</h3>
          <p>
            You acknowledge that the Service is provided free of charge, that
            this limitation of liability reflects a fair allocation of risk
            between you and the Operator, and that the Operator would not
            provide the Service on these terms without such limitations.
          </p>
        </section>

        <section className="legal-section" id="s11">
          <div className="legal-section-header">
            <span className="legal-section-num">11</span>
            <h2>Indemnification</h2>
          </div>
          <p>
            To the extent permitted by applicable law, you agree to defend,
            indemnify, and hold harmless the Operator from and against any
            claims, liabilities, damages, losses, costs, or expenses (including
            reasonable legal fees) arising out of or in connection with:
          </p>
          <ul>
            <li>Your violation of these Terms;</li>
            <li>
              Your violation of any applicable law, regulation, or third-party
              right;
            </li>
            <li>Any Content you submit to or share via the Service;</li>
            <li>
              Your negligent or intentional misconduct in connection with your
              use of the Service.
            </li>
          </ul>
          <p>
            This indemnification obligation does not apply to the extent that a
            claim arises from the Operator's own negligence, fraud, or wilful
            misconduct.
          </p>
        </section>

        <section className="legal-section" id="s12">
          <div className="legal-section-header">
            <span className="legal-section-num">12</span>
            <h2>Termination</h2>
          </div>
          <h3>12.1 Termination by You</h3>
          <p>
            You may terminate your Account at any time by contacting us at the
            address provided in Section 15. Upon termination, your Account and
            all associated data will be permanently deleted in accordance with
            Section 7.5.
          </p>
          <h3>12.2 Termination by Operator</h3>
          <p>
            The Operator reserves the right to suspend or permanently terminate
            your Account or access to the Service, with or without notice, for:
          </p>
          <ul>
            <li>
              Breach of these Terms, particularly the Acceptable Use Policy;
            </li>
            <li>
              Conduct that endangers the security, integrity, or reputation of
              the Service or other Users;
            </li>
            <li>Non-compliance with any applicable law;</li>
            <li>
              Prolonged inactivity (greater than 24 months with no logins);
            </li>
            <li>Cessation of the Service entirely.</li>
          </ul>
          <h3>12.3 Effect of Termination</h3>
          <p>
            Upon termination, your right to use the Service immediately ceases.
            Provisions that by their nature should survive termination shall
            survive, including Sections 8 (Intellectual Property), 9
            (Disclaimers), 10 (Limitation of Liability), 11 (Indemnification),
            and 13 (Governing Law).
          </p>
        </section>

        <section className="legal-section" id="s13">
          <div className="legal-section-header">
            <span className="legal-section-num">13</span>
            <h2>Governing Law &amp; Dispute Resolution</h2>
          </div>
          <h3>13.1 Governing Law</h3>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of the <strong>Republic of Bulgaria</strong>, including
            applicable EU regulations as directly applicable in Bulgaria,
            without regard to conflict of laws principles.
          </p>
          <h3>13.2 Jurisdiction</h3>
          <p>
            Any dispute, controversy, or claim arising out of or in connection
            with these Terms or the Service shall be subject to the exclusive
            jurisdiction of the competent courts located in{" "}
            <strong>Bulgaria</strong>.
          </p>
          <h3>13.3 Consumer Rights</h3>
          <p>
            If you are a consumer resident in the European Union, you may also
            have the right to bring proceedings in the courts of your country of
            residence, and to access the EU Online Dispute Resolution platform
            at{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--main-light-blue) underline"
            >
              ec.europa.eu/consumers/odr
            </a>
            .
          </p>
          <h3>13.4 Informal Resolution</h3>
          <p>
            Before initiating formal proceedings, you agree to contact the
            Operator using the details in Section 15 and attempt to resolve the
            dispute informally within 30 days. This does not affect your
            statutory rights to seek urgent interim relief.
          </p>
        </section>

        <section className="legal-section" id="s14">
          <div className="legal-section-header">
            <span className="legal-section-num">14</span>
            <h2>Changes to These Terms</h2>
          </div>
          <p>
            The Operator reserves the right to modify these Terms at any time.
            Where changes are material, we will provide notice by:
          </p>
          <ul>
            <li>Displaying a prominent notice within the Service; and/or</li>
            <li>
              Sending an email notification to registered Account holders.
            </li>
          </ul>
          <p>
            Material changes will take effect no earlier than{" "}
            <strong>14 days</strong> after notification to existing Users.
            Non-material changes (such as corrections, clarifications, or
            changes required by law) may take effect immediately. Your continued
            use of the Service after the effective date of any change
            constitutes your acceptance of the updated Terms.
          </p>
          <p>
            We recommend reviewing these Terms periodically. The "Effective
            Date" at the top of this document indicates the date of the last
            revision.
          </p>
        </section>

        <section className="legal-section" id="s15">
          <div className="legal-section-header">
            <span className="legal-section-num">15</span>
            <h2>Contact Information</h2>
          </div>
          <p>
            For questions, concerns, account deletion requests, or legal notices
            relating to these Terms, please contact:
          </p>
          <div className="contact-card">
            <p>
              <strong>Operator:</strong> Daniel Jenkins
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
          <p className="mt-4 text-[13px]! text-(--gray)">
            We aim to respond to all enquiries within{" "}
            <strong className="text-(--white)">5 business days</strong>.
          </p>
        </section>

        <footer className="doc-footer">
          <p>
            MonoShare &nbsp;·&nbsp; Terms of Service &nbsp;·&nbsp; v{version}
          </p>
          <p>
            Governed by the laws of the Republic of Bulgaria and applicable EU
            law.
          </p>
          <p>
            <Link to="/privacy-policy" className="legal-link">
              View Privacy Policy
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

export default TermsOfService;
