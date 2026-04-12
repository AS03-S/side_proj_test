# migraDOCS — The system, translated.

> migraDOCS provides structured information and document guidance, not legal advice.

## Overview

migraDOCS is a serious, institutional-grade web application that helps users upload immigration-related documents, understand their contents, extract key dates and required actions, and receive structured procedural next-step guidance. Original files are never stored — only the extracted structured summary is retained.
Note: Still under construction.

## Setup

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm run start
```

## Demo access

All authentication is mocked. Use any email and password to sign in on `/login`. You will be logged in as demo user `A. Meier`. Demo note: original file storage is intentionally suppressed by design (GDPR-safe architecture).

Pre-seeded demo documents:
- Residence Permit Renewal Notice (BAMF)
- Request for Additional Documentation (State Immigration Office Berlin)
- Asylum Interview Appointment Notice (Hamburg Branch)
- Appeal Deadline Notice — Work Permit Refusal
- Health Insurance Enrollment Confirmation (TK)
- Municipal Registration Certificate (Meldebescheinigung)

## Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/login` | Sign in / sign up |
| `/dashboard` | Overview: deadlines, actions, activity |
| `/documents` | Document list with search and filters |
| `/documents/[id]` | Document detail: summary, actions, checklist |
| `/guidance` | Guidance modules + local system navigation |
| `/settings` | Profile, language, notifications, privacy |

## Tech stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **lucide-react** (icons)
- Custom UI components (Button, Card, Badge, Input, Progress, Separator)

## Folder structure

```
src/
├── app/
│   ├── (app)/                  # Authenticated app shell (shared sidebar layout)
│   │   ├── layout.tsx          # Sidebar + main content wrapper
│   │   ├── dashboard/          # /dashboard
│   │   ├── documents/          # /documents
│   │   │   └── [id]/           # /documents/[id]
│   │   ├── guidance/           # /guidance
│   │   └── settings/           # /settings
│   ├── login/                  # /login
│   ├── page.tsx                # / (landing)
│   └── layout.tsx              # Root layout
├── components/
│   ├── ui/                     # Base UI components (Button, Card, Badge, etc.)
│   ├── layout/                 # Sidebar, TopBar
│   └── documents/              # UploadModal
├── lib/
│   ├── auth.ts                 # Mock auth (localStorage-based)
│   ├── utils.ts                # cn(), formatDate(), etc.
│   └── data/
│       ├── documents.ts        # 6 seeded demo documents
│       ├── guidance.ts         # 8 guidance modules + 6 local system cards
│       └── activity.ts         # 8 demo activity items
└── types/
    └── index.ts                # All TypeScript types
```

## What remains for production

### Backend / infrastructure
- [ ] Real authentication (NextAuth.js, Clerk, or Auth0)
- [ ] Database (PostgreSQL — documents, users, actions, checklists)
- [ ] Encrypted file storage (S3-compatible)
- [ ] Document processing pipeline (OCR + structured extraction)
- [ ] Real AI extraction (LLM with structured output for dates, categories, required actions)
- [ ] Server-side session management and API routes

### Feature completeness
- [ ] Persistent document upload with file storage
- [ ] Deadline notification system (email / push)
- [ ] Full multilingual support (next-intl)
- [ ] Document deletion with confirmed data erasure
- [ ] Audit trail of all document interactions
- [ ] Admin/ops monitoring dashboard

### Compliance / legal
- [ ] GDPR/CCPA-compliant consent management
- [ ] Privacy policy, terms of service, and data processing agreement
- [ ] Formal legal disclaimer review by immigration law counsel
- [ ] Cookie consent banner

### Quality / production readiness
- [ ] End-to-end tests (Playwright)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring
- [ ] Rate limiting and abuse prevention

---

*migraDOCS provides structured information and document guidance only. It does not provide legal advice, legal representation, or immigration eligibility assessments.*
