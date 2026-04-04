import Link from "next/link";
import {
  Shield,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Upload your document",
    description:
      "Upload a PDF or image of any official immigration document — permit notices, appointment letters, refusal decisions, or administrative correspondence.",
  },
  {
    step: "02",
    title: "Extraction and categorisation",
    description:
      "Certa identifies the document type, issuing authority, key dates, and required actions. Documents are categorised and linked to relevant procedural guidance.",
  },
  {
    step: "03",
    title: "Structured next-step guidance",
    description:
      "Receive a clear, prioritised checklist of required actions, upcoming deadlines, and procedural steps — all in plain language.",
  },
  {
    step: "04",
    title: "Track your process",
    description:
      "Monitor upcoming deadlines, mark actions complete, and maintain a structured record of your administrative timeline in one place.",
  },
];

const CAPABILITIES = [
  {
    icon: FileText,
    title: "Document understanding",
    description:
      "Automated extraction of document type, issuing authority, reference numbers, dates, and required procedural actions from uploaded documents.",
  },
  {
    icon: CalendarClock,
    title: "Deadline visibility",
    description:
      "All extracted deadlines surfaced in a unified view. Alerts for approaching dates ensure no critical deadline is missed.",
  },
  {
    icon: ClipboardList,
    title: "Procedural next steps",
    description:
      "Structured checklists and ordered action plans for common immigration procedures — permit renewals, appeals, interview preparation, and more.",
  },
  {
    icon: MapPin,
    title: "Local system navigation",
    description:
      "Practical guidance on navigating local administrative systems: address registration, healthcare enrollment, school registration, and employment documentation.",
  },
  {
    icon: BookOpen,
    title: "Guidance library",
    description:
      "A structured library of informational guidance covering documentation, appointments, deadlines, and administrative processes.",
  },
  {
    icon: AlertCircle,
    title: "Action prioritisation",
    description:
      "Required actions are categorised by urgency. Urgent items are surfaced prominently to ensure the most time-sensitive tasks are addressed first.",
  },
];

const TRUST_ITEMS = [
  {
    icon: Lock,
    title: "Encrypted document storage",
    description: "All uploaded documents are encrypted in transit using TLS 1.3 and at rest using AES-256. Your documents are accessible only to you.",
  },
  {
    icon: Eye,
    title: "Private by design",
    description:
      "Certa does not sell, share, or process your documents for any purpose beyond providing you with structured guidance. No advertising. No data brokerage.",
  },
  {
    icon: Shield,
    title: "User-controlled records",
    description:
      "You retain full control over your documents. Delete individual documents or your entire account and data at any time, with immediate effect.",
  },
  {
    icon: CheckCircle,
    title: "Informational guidance only",
    description:
      "Certa provides structured document guidance and procedural information. It does not provide legal advice or legal representation.",
  },
];

const FAQS = [
  {
    q: "What types of documents can I upload?",
    a: "Certa is designed for official immigration and administrative documents: residence permit notices, work authorization letters, asylum-related correspondence, appointment notices, refusal decisions, and municipal registration documents. PDF and image formats (JPG, PNG) are supported.",
  },
  {
    q: "Is Certa a legal service?",
    a: "No. Certa is an informational guidance platform. It provides structured document explanation, procedural checklists, and administrative guidance. It does not provide legal advice, legal representation, or eligibility assessments. For legal matters, consult a qualified immigration attorney or accredited advisor.",
  },
  {
    q: "How accurate is the document extraction?",
    a: "Certa displays a confidence indicator for each document extraction. High-confidence extractions are typically accurate for standard-format official documents. You should always verify extracted dates and deadlines against your original document.",
  },
  {
    q: "Who can see my documents?",
    a: "Only you. Documents are associated with your account and are not shared with third parties. Certa staff do not access individual user documents except where required to resolve a specific support issue you have raised.",
  },
  {
    q: "Which countries is Certa designed for?",
    a: "The current version provides procedural guidance primarily oriented toward German administrative and immigration processes. Support for additional jurisdictions is in development.",
  },
  {
    q: "Can I use Certa to prepare for an immigration interview or appeal?",
    a: "Yes — Certa provides structured preparation checklists and procedural guidance for asylum interviews, permit renewals, and administrative appeals. This is informational guidance to help you organise your documents and understand the process, not legal preparation.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-neutral-900" strokeWidth={2} />
            <span className="text-sm font-semibold tracking-tight text-neutral-900">Certa</span>
          </div>
          <div className="hidden items-center gap-6 text-sm text-neutral-600 sm:flex">
            <a href="#how-it-works" className="transition-colors hover:text-neutral-900">How it works</a>
            <a href="#capabilities" className="transition-colors hover:text-neutral-900">Capabilities</a>
            <a href="#trust" className="transition-colors hover:text-neutral-900">Privacy</a>
            <a href="#faq" className="transition-colors hover:text-neutral-900">FAQ</a>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="border-b border-neutral-100 bg-white py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-600">
            <Shield className="h-3 w-3" strokeWidth={2} />
            Informational guidance — not legal advice
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
            Structured guidance for<br className="hidden sm:block" /> immigration procedures
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-500 md:text-lg">
            Upload official documents, identify key dates, and receive structured procedural guidance.
            Certa organises your immigration process so you can act with clarity and confidence.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Upload document
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                View demo
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-xs text-neutral-400">
            Certa provides structured information and document guidance, not legal advice.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <div className="border-b border-neutral-100 bg-neutral-50 py-6">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid grid-cols-3 divide-x divide-neutral-200">
            {[
              { value: "6", label: "Document categories" },
              { value: "8+", label: "Guidance modules" },
              { value: "100%", label: "User-controlled data" },
            ].map(({ value, label }) => (
              <div key={label} className="px-6 text-center first:pl-0 last:pr-0">
                <div className="text-2xl font-semibold text-neutral-900">{value}</div>
                <div className="mt-0.5 text-xs text-neutral-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <section id="how-it-works" className="border-b border-neutral-100 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12">
            <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">Process</p>
            <h2 className="mt-2 text-2xl font-semibold text-neutral-900 md:text-3xl">How Certa works</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map(({ step, title, description }) => (
              <div key={step} className="relative">
                <div className="mb-4 font-mono text-3xl font-light text-neutral-200">{step}</div>
                <h3 className="mb-2 text-sm font-semibold text-neutral-900">{title}</h3>
                <p className="text-sm leading-relaxed text-neutral-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="border-b border-neutral-100 bg-neutral-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12">
            <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">Platform</p>
            <h2 className="mt-2 text-2xl font-semibold text-neutral-900 md:text-3xl">Core capabilities</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-lg border border-neutral-200 bg-white p-5">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded border border-neutral-200 bg-neutral-50">
                  <Icon className="h-4 w-4 text-neutral-700" strokeWidth={1.75} />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-neutral-900">{title}</h3>
                <p className="text-xs leading-relaxed text-neutral-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document example preview */}
      <section className="border-b border-neutral-100 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">Example</p>
              <h2 className="mt-2 text-2xl font-semibold text-neutral-900 md:text-3xl">
                From document to action plan
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-500">
                Upload a permit renewal notice. Certa extracts the deadline, identifies the required documents,
                and generates a prioritised checklist — so you know exactly what to do and when.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Automatic document categorisation",
                  "Deadline extracted and surfaced",
                  "Ordered preparation checklist",
                  "Required actions by priority",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-neutral-700">
                    <CheckCircle className="h-4 w-4 shrink-0 text-neutral-400" strokeWidth={1.75} />
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
                <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-400">Residence Permit</span>
                <span className="rounded bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-600 border border-red-100">Action required</span>
              </div>
              <h3 className="mt-2 text-sm font-semibold text-neutral-900">Residence Permit Renewal Notice</h3>
              <p className="mt-0.5 text-xs text-neutral-500">Federal Office for Migration and Refugees</p>

              <Separator className="my-3" />

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Received", value: "15 Mar 2026" },
                  { label: "Deadline", value: "30 Jun 2026" },
                  { label: "Reference", value: "BAMF-2026-RE-04821" },
                  { label: "Confidence", value: "94% — High" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px] uppercase tracking-wide text-neutral-400">{label}</p>
                    <p className="mt-0.5 text-xs font-medium text-neutral-700">{value}</p>
                  </div>
                ))}
              </div>

              <Separator className="my-3" />

              <p className="text-xs font-medium text-neutral-700">Required actions</p>
              <ul className="mt-2 space-y-1.5">
                {[
                  { label: "Submit renewal application", urgency: "Urgent", done: false },
                  { label: "Gather employment documentation", urgency: "High", done: false },
                  { label: "Obtain biometric photographs", urgency: "High", done: true },
                ].map(({ label, urgency, done }) => (
                  <li key={label} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`h-1.5 w-1.5 rounded-full shrink-0 ${done ? "bg-neutral-300" : urgency === "Urgent" ? "bg-red-400" : "bg-amber-400"}`} />
                      <span className={`text-xs ${done ? "line-through text-neutral-400" : "text-neutral-700"}`}>{label}</span>
                    </div>
                    <span className={`text-[10px] ${done ? "text-neutral-400" : urgency === "Urgent" ? "text-red-500" : "text-amber-600"}`}>{done ? "Done" : urgency}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Privacy */}
      <section id="trust" className="border-b border-neutral-100 bg-neutral-50 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-12">
            <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">Privacy</p>
            <h2 className="mt-2 text-2xl font-semibold text-neutral-900 md:text-3xl">Trust and privacy</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-500">
              Immigration documents contain sensitive personal information. Certa is built with privacy as a foundational requirement, not an afterthought.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {TRUST_ITEMS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-lg border border-neutral-200 bg-white p-5">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded border border-neutral-200">
                  <Icon className="h-4 w-4 text-neutral-700" strokeWidth={1.75} />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-neutral-900">{title}</h3>
                <p className="text-xs leading-relaxed text-neutral-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-b border-neutral-100 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-12">
            <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">Questions</p>
            <h2 className="mt-2 text-2xl font-semibold text-neutral-900 md:text-3xl">Frequently asked questions</h2>
          </div>
          <div className="space-y-0 divide-y divide-neutral-200 rounded-lg border border-neutral-200 bg-white">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="px-5 py-4">
                <h3 className="text-sm font-semibold text-neutral-900">{q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl font-semibold text-neutral-900 md:text-3xl">
            Get organised. Stay informed.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-neutral-500">
            Upload your first document and receive structured procedural guidance in minutes.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/login">
              <Button size="lg">
                Start with Certa
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" size="lg">View demo dashboard</Button>
            </Link>
          </div>
          <p className="mt-6 text-xs text-neutral-400">
            Certa provides structured information and document guidance, not legal advice.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-neutral-500" strokeWidth={2} />
              <span className="text-sm font-semibold text-neutral-700">Certa</span>
              <span className="text-sm text-neutral-400">— Structured guidance for immigration procedures</span>
            </div>
            <div className="flex flex-wrap gap-5 text-xs text-neutral-500">
              <Link href="/login" className="transition-colors hover:text-neutral-900">Sign in</Link>
              <Link href="/guidance" className="transition-colors hover:text-neutral-900">Guidance</Link>
              <Link href="/settings" className="transition-colors hover:text-neutral-900">Settings</Link>
            </div>
          </div>
          <Separator className="my-6" />
          <p className="text-xs leading-relaxed text-neutral-400">
            Certa provides structured information and document guidance only. It does not provide legal advice, legal representation, or legal eligibility assessments. For matters requiring legal advice, consult a qualified immigration attorney or accredited legal advisor.
          </p>
          <p className="mt-2 text-xs text-neutral-400">© 2026 Certa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
