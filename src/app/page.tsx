import Link from "next/link";
import {
  FileText,
  CalendarClock,
  ChevronRight,
  CheckCircle,
  Lock,
  Eye,
  ArrowRight,
  MapPin,
  ClipboardList,
  AlertCircle,
  BookOpen,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "We read it",
    description:
      "Upload a PDF or image of any official immigration document — permit notices, appointment letters, refusal decisions, or administrative correspondence.",
  },
  {
    step: "02",
    title: "We explain it",
    description:
      "DOX identifies the document type, issuing authority, key dates, and what is being asked of you — in plain language, not legal jargon.",
  },
  {
    step: "03",
    title: "We tell you what to do",
    description:
      "Receive a clear, prioritised list of required actions, upcoming deadlines, and step-by-step procedural guidance.",
  },
  {
    step: "04",
    title: "You stay on track",
    description:
      "Monitor your deadlines, mark tasks done, and keep a complete record of your administrative process in one place.",
  },
];

const CAPABILITIES = [
  {
    icon: FileText,
    title: "Document understanding",
    description:
      "DOX reads your document and extracts the document type, issuing authority, reference numbers, dates, and what is being asked of you.",
  },
  {
    icon: CalendarClock,
    title: "Deadline visibility",
    description:
      "All deadlines surfaced in a single view. Alerts for approaching dates ensure no critical deadline is missed.",
  },
  {
    icon: ClipboardList,
    title: "What to do next",
    description:
      "Structured checklists and ordered action plans for common immigration procedures — permit renewals, appeals, interview preparation, and more.",
  },
  {
    icon: MapPin,
    title: "Local system navigation",
    description:
      "Practical guidance on local administrative systems: address registration, healthcare, school registration, and employment documentation.",
  },
  {
    icon: BookOpen,
    title: "Guidance library",
    description:
      "A structured library of procedural guidance covering documentation, appointments, deadlines, and administrative processes.",
  },
  {
    icon: AlertCircle,
    title: "Priority actions",
    description:
      "Required actions sorted by urgency. The most time-sensitive tasks are always shown first.",
  },
];

const TRUST_ITEMS = [
  {
    icon: Lock,
    title: "Original files never stored",
    description: "DOX reads your document and discards it immediately. Only the extracted summary is saved — encrypted and accessible only by you.",
  },
  {
    icon: Eye,
    title: "Private by design",
    description:
      "DOX does not sell, share, or process your documents for any purpose beyond providing you with structured guidance. No advertising. No data brokerage.",
  },
  {
    icon: Shield,
    title: "User-controlled records",
    description:
      "You retain full control over your data. Delete individual records or your entire account at any time, with immediate effect.",
  },
  {
    icon: CheckCircle,
    title: "Informational guidance only",
    description:
      "DOX provides structured document guidance and procedural information. It does not provide legal advice or legal representation.",
  },
];

const FAQS = [
  {
    q: "What types of documents can I upload?",
    a: "DOX is designed for official immigration and administrative documents: residence permit notices, work authorization letters, asylum-related correspondence, appointment notices, refusal decisions, and municipal registration documents. PDF and image formats (JPG, PNG) are supported.",
  },
  {
    q: "Is DOX a legal service?",
    a: "No. DOX is an informational guidance platform. It provides structured document explanation, procedural checklists, and administrative guidance. It does not provide legal advice, legal representation, or eligibility assessments. For legal matters, consult a qualified immigration attorney or accredited advisor.",
  },
  {
    q: "Does DOX store my documents?",
    a: "No. DOX reads your document to extract the key information, then discards the original file immediately. Only the structured summary — dates, required actions, document type — is saved to your account, encrypted at rest.",
  },
  {
    q: "Who can see my information?",
    a: "Only you. Your extracted document data is associated with your account and is not shared with third parties. DOX staff do not access individual user data except where required to resolve a specific support issue you have raised.",
  },
  {
    q: "Which countries is DOX designed for?",
    a: "The current version provides procedural guidance primarily oriented toward German administrative and immigration processes. Support for additional jurisdictions is in development.",
  },
  {
    q: "Can I use DOX to prepare for an immigration interview or appeal?",
    a: "Yes — DOX provides structured preparation checklists and procedural guidance for asylum interviews, permit renewals, and administrative appeals. This is informational guidance to help you organise your documents and understand the process, not legal preparation.",
  },
];

function DoxLogoNav() {
  return (
    <svg viewBox="0 0 120 48" xmlns="http://www.w3.org/2000/svg" className="h-7 w-auto">
      <defs>
        <linearGradient id="doxGrad-nav" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#020086" />
          <stop offset="100%" stopColor="#57e4d7" />
        </linearGradient>
      </defs>
      <text
        x="0" y="40"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="48"
        fontWeight="700"
        fill="url(#doxGrad-nav)"
        letterSpacing="-1"
      >DOX</text>
    </svg>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/">
            <DoxLogoNav />
          </Link>
          <div className="hidden items-center gap-6 text-sm sm:flex" style={{ color: "rgba(2,0,134,0.6)" }}>
            <a href="#how-it-works" className="transition-colors hover:text-[#020086]">How it works</a>
            <a href="#capabilities" className="transition-colors hover:text-[#020086]">Capabilities</a>
            <a href="#trust" className="transition-colors hover:text-[#020086]">Privacy</a>
            <a href="#faq" className="transition-colors hover:text-[#020086]">FAQ</a>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="border-b border-neutral-200 bg-white py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl" style={{ color: "#020086" }}>
            The system,<br className="hidden sm:block" /> translated.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed md:text-lg" style={{ color: "rgba(2,0,134,0.6)" }}>
            Upload your immigration documents. Understand what they mean, what&apos;s being asked of you, and what to do next.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Upload document
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a
              href="#how-it-works"
              className="text-sm transition-colors"
              style={{ color: "rgba(2,0,134,0.55)" }}
            >
              See how it works ↓
            </a>
          </div>
          <p className="mt-8 text-xs" style={{ color: "rgba(2,0,134,0.4)" }}>
            DOX provides structured information and document guidance, not legal advice.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-b border-neutral-200 bg-neutral-50 py-6">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-3 divide-x divide-neutral-200">
            {[
              { value: "6", label: "Document categories" },
              { value: "8+", label: "Guidance modules" },
              { value: "0", label: "Original files stored" },
            ].map(({ value, label }) => (
              <div key={label} className="px-6 text-center first:pl-0 last:pr-0">
                <div className="text-2xl font-semibold" style={{ color: "#020086" }}>{value}</div>
                <div className="mt-0.5 text-xs" style={{ color: "rgba(2,0,134,0.5)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <section id="how-it-works" className="border-b border-neutral-200 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12">
            <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "rgba(2,0,134,0.4)" }}>Process</p>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl" style={{ color: "#020086" }}>How DOX works</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map(({ step, title, description }) => (
              <div key={step} className="relative">
                <div className="mb-4 font-mono text-3xl font-light" style={{ color: "#57e4d7" }}>{step}</div>
                <h3 className="mb-2 text-sm font-semibold" style={{ color: "#020086" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(2,0,134,0.55)" }}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="border-b border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12">
            <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "rgba(2,0,134,0.4)" }}>Platform</p>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl" style={{ color: "#020086" }}>Core capabilities</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-lg border border-neutral-200 bg-white p-5">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded border border-neutral-200" style={{ background: "rgba(87,228,215,0.1)" }}>
                  <Icon className="h-4 w-4" style={{ color: "#020086" }} strokeWidth={1.75} />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold" style={{ color: "#020086" }}>{title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(2,0,134,0.55)" }}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document example preview */}
      <section className="border-b border-neutral-200 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "rgba(2,0,134,0.4)" }}>Example</p>
              <h2 className="mt-2 text-2xl font-semibold md:text-3xl" style={{ color: "#020086" }}>
                From document to action plan
              </h2>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(2,0,134,0.55)" }}>
                Upload a permit renewal notice. DOX reads the document, identifies the deadline, and generates a prioritised action list — so you know exactly what to do and when.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Document type identified",
                  "Deadline surfaced immediately",
                  "Preparation checklist generated",
                  "Required actions by priority",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "#020086" }}>
                    <CheckCircle className="h-4 w-4 shrink-0" style={{ color: "#57e4d7" }} strokeWidth={1.75} />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/documents/doc-001">
                  <Button variant="outline">
                    View example document
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mock document card */}
            <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[10px] font-medium uppercase tracking-widest" style={{ color: "rgba(2,0,134,0.4)" }}>Residence Permit</span>
                <span className="rounded px-2 py-0.5 text-[10px] font-medium" style={{ background: "#57e4d7", color: "#020086" }}>Action required</span>
              </div>
              <h3 className="mt-2 text-sm font-semibold" style={{ color: "#020086" }}>Residence Permit Renewal Notice</h3>
              <p className="mt-0.5 text-xs" style={{ color: "rgba(2,0,134,0.5)" }}>Federal Office for Migration and Refugees</p>

              <Separator className="my-3" />

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Received", value: "15 Mar 2026" },
                  { label: "Deadline", value: "30 Jun 2026" },
                  { label: "Reference", value: "BAMF-2026-RE-04821" },
                  { label: "Confidence", value: "94% — High" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px] uppercase tracking-wide" style={{ color: "rgba(2,0,134,0.4)" }}>{label}</p>
                    <p className="mt-0.5 text-xs font-medium" style={{ color: "#020086" }}>{value}</p>
                  </div>
                ))}
              </div>

              <Separator className="my-3" />

              <p className="text-xs font-medium" style={{ color: "#020086" }}>Required actions</p>
              <ul className="mt-2 space-y-1.5">
                {[
                  { label: "Submit renewal application", urgency: "Urgent", done: false },
                  { label: "Gather employment documentation", urgency: "High", done: false },
                  { label: "Obtain biometric photographs", urgency: "High", done: true },
                ].map(({ label, urgency, done }) => (
                  <li key={label} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: done ? "rgba(2,0,134,0.2)" : "#57e4d7" }} />
                      <span className="text-xs" style={{ color: done ? "rgba(2,0,134,0.35)" : "#020086", textDecoration: done ? "line-through" : "none" }}>{label}</span>
                    </div>
                    <span className="text-[10px]" style={{ color: done ? "rgba(2,0,134,0.35)" : "#020086" }}>{done ? "Done" : urgency}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Privacy */}
      <section id="trust" className="border-b border-neutral-200 bg-neutral-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12">
            <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "rgba(2,0,134,0.4)" }}>Privacy</p>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl" style={{ color: "#020086" }}>Trust and privacy</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: "rgba(2,0,134,0.55)" }}>
              Immigration documents contain sensitive personal information. DOX is built with privacy as a foundational requirement, not an afterthought.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {TRUST_ITEMS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-lg border border-neutral-200 bg-white p-5">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded border border-neutral-200" style={{ background: "rgba(87,228,215,0.1)" }}>
                  <Icon className="h-4 w-4" style={{ color: "#020086" }} strokeWidth={1.75} />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold" style={{ color: "#020086" }}>{title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(2,0,134,0.55)" }}>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-b border-neutral-200 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-12">
            <p className="text-xs font-medium uppercase tracking-widest" style={{ color: "rgba(2,0,134,0.4)" }}>Questions</p>
            <h2 className="mt-2 text-2xl font-semibold md:text-3xl" style={{ color: "#020086" }}>Frequently asked questions</h2>
          </div>
          <div className="space-y-0 divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="px-5 py-4">
                <h3 className="text-sm font-semibold" style={{ color: "#020086" }}>{q}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(2,0,134,0.55)" }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl" style={{ color: "#020086" }}>
            Upload your first document.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed" style={{ color: "rgba(2,0,134,0.55)" }}>
            Find out what it means, what&apos;s being asked of you, and what to do next.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Get started with DOX
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <p className="text-xs" style={{ color: "rgba(2,0,134,0.4)" }}>
              DOX provides structured information and document guidance, not legal advice.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <span className="text-sm font-bold" style={{ color: "#020086", fontFamily: "Georgia, serif" }}>DOX</span>
              <span className="ml-2 text-sm" style={{ color: "rgba(2,0,134,0.5)" }}>· The system, translated.</span>
            </div>
            <div className="flex flex-wrap gap-5 text-xs" style={{ color: "rgba(2,0,134,0.5)" }}>
              <Link href="/login" className="transition-colors hover:text-[#020086]">Sign in</Link>
              <Link href="/guidance" className="transition-colors hover:text-[#020086]">Guidance</Link>
              <Link href="/settings" className="transition-colors hover:text-[#020086]">Settings</Link>
              <span className="cursor-pointer transition-colors hover:text-[#020086]">Privacy Policy</span>
              <span className="cursor-pointer transition-colors hover:text-[#020086]">Terms of Use</span>
            </div>
          </div>
          <Separator className="my-5" />
          <p className="text-xs leading-relaxed" style={{ color: "rgba(2,0,134,0.4)" }}>
            © 2026 DOX. Structured document guidance, not legal advice. DOX does not provide legal advice, legal representation, or immigration eligibility assessments. For matters requiring legal advice, consult a qualified immigration attorney or accredited legal advisor.
          </p>
        </div>
      </footer>
    </div>
  );
}
