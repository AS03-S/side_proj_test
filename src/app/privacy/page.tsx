import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — migraDOCS",
  description: "How migraDOCS collects, uses, and protects your personal data.",
};

const LAST_UPDATED = "2026-04-19";
const CONTACT_EMAIL = "privacy@migradocs.org";
const COMPANY_NAME = "migraDOCS";
// TODO: Replace with registered company name and address before going live
const COMPANY_ADDRESS = "[Company name and registered address]";

export default function PrivacyPage() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif", color: "var(--ink, #0d1855)", background: "#fff", minHeight: "100vh" }}>
      {/* Nav */}
      <header style={{ borderBottom: "1px solid #dce4f8", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none", fontWeight: 700, fontSize: 16, color: "var(--navy, #1c2e9e)" }}>
          migraDOCS
        </Link>
        <Link href="/terms" style={{ fontSize: 13, color: "#5d6b9a", textDecoration: "none" }}>
          Terms of Service →
        </Link>
      </header>

      {/* Content */}
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 80px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ fontSize: 13, color: "#8a99c5", marginBottom: 40 }}>Last updated: {LAST_UPDATED}</p>

        <Section title="1. Who we are">
          <p>
            {COMPANY_NAME} is operated by {COMPANY_ADDRESS}. We provide a service that helps users
            understand immigration documents and navigate immigration processes.
          </p>
          <p>
            We are the <strong>data controller</strong> for the personal data described in this policy.
            Contact us about data protection matters at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </Section>

        <Section title="2. What data we collect">
          <h4>Waitlist (before launch)</h4>
          <ul>
            <li>Email address — to notify you when the service launches.</li>
          </ul>

          <h4>Account registration and use</h4>
          <ul>
            <li>Email address and display name (via Google sign-in)</li>
            <li>Google account identifier (used to link your account)</li>
            <li>Google Drive folder identifier (to store your documents in your own Drive)</li>
          </ul>

          <h4>Immigration process data</h4>
          <ul>
            <li>Text descriptions of your immigration situation that you enter</li>
            <li>Process plans, steps, and checklist items that you create or that are generated on your behalf</li>
            <li>Document file names and metadata (the actual files are stored in your own Google Drive, not on our servers)</li>
          </ul>

          <h4>Technical data</h4>
          <ul>
            <li>Server logs (including IP addresses) retained for up to 30 days for security and debugging purposes</li>
          </ul>
        </Section>

        <Section title="3. How we use your data">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #dce4f8" }}>
                <th style={{ textAlign: "left", padding: "8px 0", fontWeight: 600 }}>Purpose</th>
                <th style={{ textAlign: "left", padding: "8px 0", fontWeight: 600 }}>Legal basis (GDPR)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Notify waitlist members when the service launches", "Consent (Art. 6(1)(a))"],
                ["Provide and operate the service", "Contract (Art. 6(1)(b))"],
                ["Generate immigration process guidance using AI", "Contract (Art. 6(1)(b))"],
                ["Maintain security and prevent abuse", "Legitimate interest (Art. 6(1)(f))"],
                ["Comply with legal obligations", "Legal obligation (Art. 6(1)(c))"],
              ].map(([purpose, basis]) => (
                <tr key={purpose} style={{ borderBottom: "1px solid #dce4f8" }}>
                  <td style={{ padding: "10px 0", paddingRight: 16 }}>{purpose}</td>
                  <td style={{ padding: "10px 0", color: "#5d6b9a" }}>{basis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="4. AI processing and Anthropic">
          <p>
            When you describe your immigration situation, the text you enter may be sent to{" "}
            <strong>Anthropic PBC</strong> (San Francisco, USA) for AI processing. Anthropic acts as
            our data processor under a Data Processing Agreement that includes Standard Contractual
            Clauses (SCCs) for EU–US data transfers.
          </p>
          <p>
            Anthropic does not use API inputs to train its models. Your data is processed only to
            generate a response and is not retained by Anthropic beyond that request.
          </p>
          <p>
            We use pre-built process templates where possible to avoid sending your data to the AI
            entirely. AI is only invoked when no matching template exists for your situation.
          </p>
        </Section>

        <Section title="5. Data storage and international transfers">
          <p>
            Your account data and process plans are stored in <strong>Supabase</strong> (PostgreSQL
            database). Our Supabase project is hosted in the EU. Your documents are stored in your
            own <strong>Google Drive</strong> account, governed by Google's privacy policy.
          </p>
          <p>
            The Anthropic API is based in the United States. Data sent to the API is transferred
            under Standard Contractual Clauses as described in Section 4.
          </p>
        </Section>

        <Section title="6. How long we keep your data">
          <ul>
            <li><strong>Waitlist emails:</strong> Until the service launches and you have been notified, or until you ask us to delete your email.</li>
            <li><strong>Account and process data:</strong> For as long as you have an active account. You can delete your account and all associated data at any time.</li>
            <li><strong>Server logs:</strong> Up to 30 days.</li>
          </ul>
        </Section>

        <Section title="7. Your rights">
          <p>Under GDPR you have the right to:</p>
          <ul>
            <li><strong>Access</strong> the personal data we hold about you</li>
            <li><strong>Rectify</strong> inaccurate data</li>
            <li><strong>Erase</strong> your data ("right to be forgotten")</li>
            <li><strong>Restrict</strong> processing in certain circumstances</li>
            <li><strong>Data portability</strong> — receive your data in a machine-readable format</li>
            <li><strong>Object</strong> to processing based on legitimate interest</li>
            <li><strong>Withdraw consent</strong> at any time where processing is based on consent</li>
          </ul>
          <p>
            To exercise any of these rights, email us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will respond within 30 days.
            You also have the right to lodge a complaint with the Swedish supervisory authority,
            Integritetsskyddsmyndigheten (IMY) at{" "}
            <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer">imy.se</a>.
          </p>
        </Section>

        <Section title="8. Cookies">
          <p>
            We currently use only essential session cookies required for authentication. We do not
            use advertising or tracking cookies. If we add analytics in the future, this policy will
            be updated and your consent will be requested before any non-essential cookies are set.
          </p>
        </Section>

        <Section title="9. Children">
          <p>
            Our service is intended for users aged 18 and over. We do not knowingly collect personal
            data from children under 18. If you believe a child has provided us with personal data,
            please contact us and we will delete it promptly.
          </p>
        </Section>

        <Section title="10. Changes to this policy">
          <p>
            We may update this policy from time to time. We will notify registered users of material
            changes by email. The "Last updated" date at the top of this page reflects when the policy
            was last revised.
          </p>
        </Section>

        <Section title="11. Contact">
          <p>
            {COMPANY_NAME}<br />
            {COMPANY_ADDRESS}<br />
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </Section>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 12, color: "#1c2e9e" }}>{title}</h2>
      <div style={{ fontSize: 15, lineHeight: 1.7, color: "#283882" }}>
        {children}
      </div>
    </section>
  );
}
