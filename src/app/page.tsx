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
      "migraDOCS identifies the document type, issuing authority, key dates, and what is being asked of you — in plain language, not legal jargon.",
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
      "migraDOCS reads your document and extracts the document type, issuing authority, reference numbers, dates, and what is being asked of you.",
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
    title: "Process tracking",
    description:
      "Track your immigration processes step by step. Visual timelines show where you are, what is done, and what comes next.",
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
    description:
      "migraDOCS reads your document and discards it immediately. Only the extracted summary is saved — encrypted and accessible only by you.",
  },
  {
    icon: Eye,
    title: "Private by design",
    description:
      "migraDOCS does not sell, share, or process your documents for any purpose beyond providing you with structured guidance. No advertising. No data brokerage.",
  },
  {
    icon: Shield,
    title: "User-controlled records",
    description:
      "You decide what is stored and for how long. Delete any document or your entire account at any time. Your data leaves with you.",
  },
];

const FAQS = [
  {
    q: "Is migraDOCS legal advice?",
    a: "No. migraDOCS is an information and organisation tool. It does not provide legal advice, legal representation, or immigration consultancy. For legal questions, always consult a qualified immigration lawyer.",
  },
  {
    q: "Which countries does migraDOCS support?",
    a: "Version 1 focuses on Sweden, with guidance calibrated to Swedish immigration authorities and processes (Migrationsverket). Additional jurisdictions are planned.",
  },
  {
    q: "Can migraDOCS guarantee my application will succeed?",
    a: "No. migraDOCS cannot and does not predict or guarantee outcomes. It helps you understand documents, stay organised, and follow procedures — decisions remain with the relevant authorities.",
  },
  {
    q: "How does migraDOCS handle my documents?",
    a: "Uploaded files are processed to extract key information and immediately discarded. Only the structured summary is stored, encrypted, and accessible only to you.",
  },
  {
    q: "What is the difference between migraDOCS and a lawyer?",
    a: "migraDOCS organises documents and explains what they say. A lawyer advises on legal strategy, represents you in proceedings, and can act on your behalf. If your situation is complex or involves an appeal, you should seek qualified legal advice.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <span className="logo-wordmark" style={{ fontSize: "1.5rem", color: "#0d1b2e" }}>
            migraDOCS
          </span>
          <div className="hidden items-center gap-6 text-xs text-neutral-500 sm:flex">
            <a href="#how-it-works" className="transition-colors hover:text-neutral-900">How it works</a>
            <a href="#capabilities" className="transition-colors hover:text-neutral-900">Capabilities</a>
            <a href="#privacy" className="transition-colors hover:text-neutral-900">Privacy</a>
            <a href="#faq" className="transition-colors hover:text-neutral-900">FAQ</a>
          </div>
          <Link href="/login">
            <Button size="sm">Sign in</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <div className="mb-4 inline-flex items-center rounded border border-neutral-200 bg-neutral-50 px-3 py-1">
          <span className="text-xs text-neutral-500">Sweden — V1 · Powered by Claude AI</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">
          Your immigration documents,<br />
          <span className="text-navy">finally explained.</span>
        </h1>
        <p className="mt-5 text-base text-neutral-500 leading-relaxed max-w-xl mx-auto">
          Upload any immigration document. migraDOCS reads it, explains it in plain language, and tells you exactly what to do next — no jargon, no guesswork.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/login">
            <Button size="lg">
              Get started free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">
              View demo
            </Button>
          </Link>
        </div>
        <p className="mt-4 text-[11px] text-neutral-400">
          migraDOCS provides document organisation and information only. This is not legal advice.
        </p>
      </section>

      <Separator />

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-10 text-center text-2xl font-bold text-neutral-950">How it works</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map(({ step, title, description }) => (
            <div key={step} className="rounded-lg border border-neutral-200 bg-white p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <div className="mb-3 text-xs font-bold tracking-widest text-neutral-400">{step}</div>
              <h3 className="mb-2 text-sm font-semibold text-neutral-950">{title}</h3>
              <p className="text-xs leading-relaxed text-neutral-500">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Capabilities */}
      <section id="capabilities" className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-10 text-center text-2xl font-bold text-neutral-950">Capabilities</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-lg border border-neutral-200 bg-white p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded border border-neutral-200 bg-neutral-50">
                  <Icon className="h-4 w-4 text-navy" strokeWidth={1.75} />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-neutral-950">{title}</h3>
                <p className="text-xs leading-relaxed text-neutral-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Privacy */}
      <section id="privacy" className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-3 text-center text-2xl font-bold text-neutral-950">Built for privacy</h2>
        <p className="mb-10 text-center text-sm text-neutral-500">
          Your immigration documents are sensitive. We designed migraDOCS with that in mind.
        </p>
        <div className="grid gap-6 sm:grid-cols-3">
          {TRUST_ITEMS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded border border-neutral-200 bg-neutral-50">
                <Icon className="h-3.5 w-3.5 text-navy" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="mb-1 text-xs font-semibold text-neutral-950">{title}</h3>
                <p className="text-xs leading-relaxed text-neutral-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* FAQ */}
      <section id="faq" className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="mb-10 text-center text-2xl font-bold text-neutral-950">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="rounded-lg border border-neutral-200 bg-white p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <h3 className="mb-2 text-sm font-semibold text-neutral-950">{q}</h3>
                <p className="text-xs leading-relaxed text-neutral-500">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* CTA */}
      <section className="mx-auto max-w-xl px-6 py-16 text-center">
        <h2 className="mb-3 text-2xl font-bold text-neutral-950">Ready to get started?</h2>
        <p className="mb-6 text-sm text-neutral-500">
          Upload your first document and understand exactly what it is telling you — and what you need to do next.
        </p>
        <Link href="/login">
          <Button size="lg">
            Start for free <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-8">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <span className="logo-wordmark text-neutral-400" style={{ fontSize: "1rem" }}>migraDOCS</span>
            <p className="text-center text-[11px] leading-relaxed text-neutral-400 max-w-lg">
              migraDOCS provides document organisation and information only. This is not legal advice.
              For legal questions, consult a qualified immigration lawyer.
            </p>
          </div>
          <div className="mt-4 flex items-center justify-center gap-4">
            <CheckCircle className="h-3.5 w-3.5 text-neutral-300" />
            <span className="text-[10px] text-neutral-400">Sweden · V1</span>
            <span className="text-[10px] text-neutral-300">·</span>
            <span className="text-[10px] text-neutral-400">Powered by Claude AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
