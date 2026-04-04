import { GuidanceModule, LocalSystemCard } from "@/types";

export const GUIDANCE_MODULES: GuidanceModule[] = [
  {
    id: "gm-001",
    category: "documentation",
    title: "Residence Permit Renewal Process",
    description:
      "Step-by-step procedural guidance for renewing your residence permit before expiry. Covers required documents, booking appointments, and submission procedures.",
    estimatedTime: "3–5 weeks",
    priority: "urgent",
    steps: [
      {
        id: "gm-001-s1",
        order: 1,
        title: "Verify current permit expiry date",
        description: "Confirm the exact expiry date on your current permit and calculate the 8-week renewal window.",
        notes: "Applications submitted fewer than 8 weeks before expiry may not be processed in time.",
      },
      {
        id: "gm-001-s2",
        order: 2,
        title: "Compile required documents",
        description:
          "Gather all documents listed on your local Ausländerbehörde requirement sheet, including passport, employment contract, income proof, biometric photos, and registration certificate.",
      },
      {
        id: "gm-001-s3",
        order: 3,
        title: "Book appointment at Ausländerbehörde",
        description:
          "Use the local authority's online booking portal to secure an appointment. Slots are typically available 4–6 weeks in advance.",
        notes: "Print your booking confirmation and bring it to your appointment.",
      },
      {
        id: "gm-001-s4",
        order: 4,
        title: "Submit application and supporting documents",
        description: "Attend your appointment with originals and copies of all required documents. Pay the processing fee.",
      },
      {
        id: "gm-001-s5",
        order: 5,
        title: "Receive acknowledgment (Fiktionsbescheinigung)",
        description:
          "Upon submission, you will receive a Fiktionsbescheinigung — a bridging certificate confirming legal residence status while your renewal is processed.",
      },
    ],
  },
  {
    id: "gm-002",
    category: "appointments",
    title: "Preparing for an Asylum Interview",
    description:
      "Structured guidance on how to prepare for a formal asylum determination interview, including documentation, statement preparation, and interpreter arrangements.",
    estimatedTime: "1–2 weeks preparation",
    priority: "urgent",
    steps: [
      {
        id: "gm-002-s1",
        order: 1,
        title: "Review your appointment notice",
        description: "Confirm the interview date, time, and location. Note the case reference number for all correspondence.",
      },
      {
        id: "gm-002-s2",
        order: 2,
        title: "Arrange an interpreter if required",
        description:
          "If you require an interpreter, notify the reception centre at least 5 working days before the interview. Free interpretation services are available.",
      },
      {
        id: "gm-002-s3",
        order: 3,
        title: "Prepare your personal statement",
        description:
          "Document your personal circumstances, reasons for your asylum claim, and any supporting evidence. Organize information chronologically.",
        notes: "Be precise and factual. Inconsistencies may affect the determination process.",
      },
      {
        id: "gm-002-s4",
        order: 4,
        title: "Assemble supporting evidence",
        description:
          "Collect all relevant supporting documents: identity documents, travel records, medical records, and any evidence corroborating your account.",
      },
      {
        id: "gm-002-s5",
        order: 5,
        title: "Attend the interview",
        description:
          "Arrive at least 30 minutes early. Bring originals of all documents. Follow all instructions from the interviewing officer.",
      },
    ],
  },
  {
    id: "gm-003",
    category: "deadlines",
    title: "Understanding Appeal Deadlines",
    description:
      "Guidance on identifying and responding to administrative appeal deadlines following an immigration decision. Covers Widerspruch procedures and statutory timelines.",
    estimatedTime: "30 days from notice",
    priority: "urgent",
    steps: [
      {
        id: "gm-003-s1",
        order: 1,
        title: "Identify the appeal deadline on the refusal notice",
        description:
          "Locate the date of the decision and calculate the 30-day statutory appeal window. Note: this period typically begins from the date of receipt.",
      },
      {
        id: "gm-003-s2",
        order: 2,
        title: "Request the official statement of reasons",
        description:
          "If not included, request the Begründung (statement of reasons) from the issuing authority in writing. This is essential for preparing a substantiated appeal.",
      },
      {
        id: "gm-003-s3",
        order: 3,
        title: "Prepare appeal documentation",
        description:
          "Draft a written Widerspruch clearly referencing the case number, the decision being contested, and the grounds for appeal.",
        notes:
          "Certa provides informational guidance only. For drafting legal arguments, consult a qualified immigration advisor.",
      },
      {
        id: "gm-003-s4",
        order: 4,
        title: "Submit appeal before deadline",
        description:
          "Deliver your appeal by registered post or in person to the relevant authority before the deadline. Retain proof of submission.",
      },
    ],
  },
  {
    id: "gm-004",
    category: "administrative",
    title: "Obtaining Certified Document Translations",
    description:
      "Procedural guidance on obtaining certified translations of official documents for administrative submissions. Covers what qualifies as a certified translation and how to find certified translators.",
    estimatedTime: "5–10 business days",
    priority: "high",
    steps: [
      {
        id: "gm-004-s1",
        order: 1,
        title: "Identify documents requiring certified translation",
        description:
          "Review your correspondence to determine which documents require certified translation and into which language.",
      },
      {
        id: "gm-004-s2",
        order: 2,
        title: "Locate a court-certified translator (beeidigter Übersetzer)",
        description:
          "Use official directories to find state-certified translators. Translations from uncertified providers are generally not accepted by immigration authorities.",
      },
      {
        id: "gm-004-s3",
        order: 3,
        title: "Provide originals for translation",
        description:
          "Provide the translator with the original document. Certified translations must be based on originals, not copies.",
      },
      {
        id: "gm-004-s4",
        order: 4,
        title: "Collect certified translations",
        description:
          "A certified translation includes the translator's stamp and signature. Verify completeness before submitting to the authority.",
      },
    ],
  },
  {
    id: "gm-005",
    category: "local_navigation",
    title: "Municipal Address Registration (Anmeldung)",
    description:
      "Step-by-step procedural guide for registering your address with the local municipal office (Einwohnermeldeamt), a mandatory requirement within 14 days of arrival.",
    estimatedTime: "1–3 business days",
    priority: "high",
    steps: [
      {
        id: "gm-005-s1",
        order: 1,
        title: "Obtain landlord confirmation (Wohnungsgeberbestätigung)",
        description:
          "Ask your landlord or accommodation provider to complete the official Wohnungsgeberbestätigung form, confirming your tenancy.",
      },
      {
        id: "gm-005-s2",
        order: 2,
        title: "Book appointment at Einwohnermeldeamt",
        description:
          "Many municipalities require prior appointments. Use your city's official portal to book a registration appointment.",
      },
      {
        id: "gm-005-s3",
        order: 3,
        title: "Attend registration with required documents",
        description: "Bring your passport, completed registration form (Anmeldeformular), and the Wohnungsgeberbestätigung.",
      },
      {
        id: "gm-005-s4",
        order: 4,
        title: "Receive Meldebescheinigung",
        description:
          "Upon successful registration, you will receive the Meldebescheinigung (registration certificate). Retain this document — it is required for numerous subsequent administrative processes.",
      },
    ],
  },
  {
    id: "gm-006",
    category: "documentation",
    title: "Family Reunification Documentation Requirements",
    description:
      "Overview of standard documentation requirements for family reunification applications, including what certified translations are required and typical processing timelines.",
    estimatedTime: "3–6 months (processing)",
    priority: "normal",
    steps: [
      {
        id: "gm-006-s1",
        order: 1,
        title: "Determine applicable family reunification category",
        description:
          "Family reunification procedures differ depending on your residence status (refugee, subsidiary protection, standard residence permit). Identify which category applies.",
      },
      {
        id: "gm-006-s2",
        order: 2,
        title: "Compile core documentation",
        description:
          "Gather passports, marriage or birth certificates, proof of residence, proof of income, and housing adequacy documentation for all household members.",
      },
      {
        id: "gm-006-s3",
        order: 3,
        title: "Obtain certified translations",
        description: "All documents not in the official language of the host country must be provided with certified translations.",
      },
      {
        id: "gm-006-s4",
        order: 4,
        title: "Submit application at competent authority",
        description:
          "Submit the completed application package at your local Ausländerbehörde or, where applicable, at the relevant embassy for family members applying from abroad.",
      },
    ],
  },
  {
    id: "gm-007",
    category: "administrative",
    title: "Tax Identification Number Registration",
    description:
      "Guidance on obtaining your Steueridentifikationsnummer (Tax ID), which is automatically issued after municipal registration and required for employment and financial administration.",
    estimatedTime: "2–4 weeks (after Anmeldung)",
    priority: "normal",
    steps: [
      {
        id: "gm-007-s1",
        order: 1,
        title: "Complete municipal address registration",
        description:
          "Your Tax Identification Number (Steuer-ID) is issued automatically by the Bundeszentralamt für Steuern approximately 2–4 weeks after your Anmeldung.",
      },
      {
        id: "gm-007-s2",
        order: 2,
        title: "Receive Steuer-ID by post",
        description:
          "The Steuer-ID is sent by post to your registered address. Ensure your address registration is correct and complete.",
      },
      {
        id: "gm-007-s3",
        order: 3,
        title: "Register with local Finanzamt if required",
        description:
          "If you are self-employed or have income not covered by employer withholding, register with your local tax office (Finanzamt) to establish tax obligations.",
      },
    ],
  },
  {
    id: "gm-008",
    category: "appointments",
    title: "Booking Government Appointments Online",
    description:
      "Practical guidance on navigating official online appointment booking systems for immigration and administrative services.",
    estimatedTime: "15–30 minutes",
    priority: "normal",
    steps: [
      {
        id: "gm-008-s1",
        order: 1,
        title: "Identify the competent authority",
        description:
          "Determine the correct authority for your appointment type — Ausländerbehörde for immigration matters, Einwohnermeldeamt for registration, Finanzamt for tax matters.",
      },
      {
        id: "gm-008-s2",
        order: 2,
        title: "Access the official booking portal",
        description: "Use only the official municipal or federal government website to access appointment booking. Avoid third-party services.",
      },
      {
        id: "gm-008-s3",
        order: 3,
        title: "Select the correct appointment category",
        description: "Choose the specific appointment type that matches your procedure. Selecting the wrong category may require rebooking.",
      },
      {
        id: "gm-008-s4",
        order: 4,
        title: "Confirm and retain booking confirmation",
        description: "Print or save your booking confirmation. Bring it to your appointment — many offices require it for entry.",
      },
    ],
  },
];

export const LOCAL_SYSTEM_CARDS: LocalSystemCard[] = [
  {
    id: "ls-001",
    title: "Housing Registration (Anmeldung)",
    description:
      "Registering your address at the local municipal office is a legal obligation within 14 days of moving into your accommodation. The Meldebescheinigung received is required for almost all subsequent administrative processes.",
    category: "Housing",
    steps: [
      "Obtain Wohnungsgeberbestätigung from your landlord",
      "Book appointment at Einwohnermeldeamt (city registration office)",
      "Bring passport, registration form, and landlord confirmation",
      "Receive Meldebescheinigung (registration certificate)",
    ],
    officialNote: "This registration is mandatory and cannot be deferred. Delays may affect your residence permit and access to services.",
  },
  {
    id: "ls-002",
    title: "Healthcare System Registration",
    description:
      "Registering with the statutory health insurance system (gesetzliche Krankenversicherung) and finding a local GP provides access to medical services under the public health scheme.",
    category: "Healthcare",
    steps: [
      "Select a statutory health insurance provider (Krankenkasse) — e.g. TK, AOK, Barmer",
      "Complete enrollment form with your employer or directly with the Krankenkasse",
      "Receive your electronic health card (eGK)",
      "Register with a local GP (Hausarzt) using your health insurance card",
    ],
    officialNote:
      "Employment typically triggers mandatory enrollment in statutory health insurance. Confirm your enrollment status with your employer or HR department.",
  },
  {
    id: "ls-003",
    title: "School Enrollment",
    description:
      "Children are subject to compulsory education (Schulpflicht) and must be enrolled at an appropriate school. The enrollment process is managed through the local school authority.",
    category: "Education",
    steps: [
      "Contact the local Schulamt (school authority) or Bildungsamt for enrollment guidance",
      "Obtain placement recommendation based on age and language assessment if applicable",
      "Complete enrollment form and provide required documentation (passport, vaccination records, previous school records if available)",
      "Attend introductory meeting with school administration",
    ],
    officialNote:
      "Language support programs (Willkommensklassen or Sprachförderklassen) may be available for children requiring German language development.",
  },
  {
    id: "ls-004",
    title: "Employment Documentation",
    description:
      "Beginning employment requires several administrative registrations including social security enrollment, tax card submission, and work permit verification.",
    category: "Employment",
    steps: [
      "Provide employer with Tax Identification Number (Steuer-ID) and social security number",
      "Confirm work authorization status with employer HR",
      "Register with Deutsche Rentenversicherung for pension contributions if not auto-enrolled",
      "Open a German bank account for salary processing (requires Meldebescheinigung)",
    ],
    officialNote:
      "Your employment contract should specify working hours, salary, and notice periods. Retain a signed copy for your records.",
  },
  {
    id: "ls-005",
    title: "Opening a Bank Account",
    description:
      "A German bank account (Girokonto) is required for salary payments, direct debits, and numerous administrative transactions. Several banks offer basic accounts (Basiskonto) to all residents.",
    category: "Finance",
    steps: [
      "Gather required documents: passport, Meldebescheinigung, and residence permit",
      "Compare bank options: Sparkasse, Deutsche Bank, or digital banks (N26, DKB)",
      "Visit branch or complete online application",
      "Receive IBAN and account details — provide to employer and utility providers",
    ],
    officialNote: "Under the EU Payment Accounts Directive, all legal residents are entitled to a basic payment account.",
  },
  {
    id: "ls-006",
    title: "Public Transport Registration",
    description:
      "Germany's public transport network (Öffentlicher Personennahverkehr, ÖPNV) offers subscription tickets (Abonnement) that provide cost-effective access to buses, trams, and trains.",
    category: "Transport",
    steps: [
      "Identify your local transport authority (VVS, HVV, MVV, BVG, etc.)",
      "Review available subscription options: monthly, annual, Deutschlandticket",
      "Register online or at a transit service center with valid ID",
      "Receive transit card or register mobile app",
    ],
    officialNote:
      "The Deutschlandticket (€49/month) provides nationwide second-class public transit access and is widely recommended for regular commuters.",
  },
];
