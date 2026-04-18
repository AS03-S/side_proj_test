// Process catalog — structured templates for known immigration/admin processes.
// Primary source for plan generation; Claude fills gaps when no template matches.

export interface TemplateChecklistItem {
  label: string;
  item_type: "document" | "action" | "appointment" | "payment" | "other";
  notes?: string;
}

export interface TemplateStep {
  title: string;
  description: string;
  estimated_duration?: string;
  checklist_items: TemplateChecklistItem[];
}

export interface ProcessTemplate {
  id: string;
  /** Short keywords/phrases used for matching */
  keywords: string[];
  destination_country: string;
  jurisdiction: string;
  authority_name: string;
  title: string;
  summary: string;
  timeline_summary: string;
  next_action: string;
  official_sources?: { title: string; url: string }[];
  steps: TemplateStep[];
}

// ── Sweden — Migrationsverket ──────────────────────────────────────────────

const swedenWorkPermit: ProcessTemplate = {
  id: "se_work_permit",
  keywords: ["work", "job", "employment", "arbetstillstånd", "work permit", "employer", "hired", "position", "salary"],
  destination_country: "Sweden",
  jurisdiction: "Sweden",
  authority_name: "Migrationsverket",
  title: "Work Permit (Arbetstillstånd) — Sweden",
  summary: "Required for non-EU/EEA nationals who have been offered employment in Sweden. The employer typically initiates part of the application.",
  timeline_summary: "Applications are typically decided within 4–8 months. Processing times vary by case load.",
  next_action: "Confirm your employer will support the application, then start gathering required documents.",
  official_sources: [{ title: "Migrationsverket — Work permit", url: "https://www.migrationsverket.se/en/apply-for-work-permit" }],
  steps: [
    {
      title: "Employer confirms offer and initiates application",
      description: "Your employer in Sweden must confirm the job offer meets Migrationsverket requirements: salary at least at collective agreement level, full-time or specified hours, and union notification.",
      estimated_duration: "1–2 weeks",
      checklist_items: [
        { label: "Written job offer received", item_type: "document" },
        { label: "Employer confirms salary meets collective agreement level", item_type: "action" },
        { label: "Employer notifies relevant trade union (if applicable)", item_type: "action" },
      ],
    },
    {
      title: "Gather required documents",
      description: "Collect all supporting documents before submitting. Missing documents are a common cause of delays.",
      estimated_duration: "1–2 weeks",
      checklist_items: [
        { label: "Valid passport (min. 6 months beyond planned stay)", item_type: "document" },
        { label: "Signed employment contract or offer letter", item_type: "document" },
        { label: "Proof of qualifications (degree, certificates)", item_type: "document" },
        { label: "Passport-style photo", item_type: "document" },
      ],
    },
    {
      title: "Submit application online via Migrationsverket",
      description: "Apply online through Migrationsverket's e-service. You and your employer each complete your respective parts. Pay the application fee.",
      estimated_duration: "1–3 days",
      checklist_items: [
        { label: "Online application submitted (applicant section)", item_type: "action" },
        { label: "Employer completes their section online", item_type: "action" },
        { label: "Application fee paid (SEK 2 000 for most work permits)", item_type: "payment" },
        { label: "Confirmation email / case number saved", item_type: "action" },
      ],
    },
    {
      title: "Biometrics appointment (if required)",
      description: "Depending on your situation, you may need to attend an appointment at a Swedish embassy or application centre in your country to submit biometric data.",
      estimated_duration: "1–4 weeks to get appointment",
      checklist_items: [
        { label: "Check if biometrics appointment is required", item_type: "action" },
        { label: "Book appointment at nearest Swedish embassy / VFS centre", item_type: "appointment" },
        { label: "Attend appointment and submit biometrics", item_type: "appointment" },
      ],
    },
    {
      title: "Await decision from Migrationsverket",
      description: "Processing typically takes 4–8 months. You can track your case online using your case number. Do not travel to Sweden to work before a decision is made.",
      estimated_duration: "4–8 months",
      checklist_items: [
        { label: "Case number noted for online tracking", item_type: "action" },
        { label: "Decision letter received", item_type: "document" },
        { label: "Residence permit card collected (if approved)", item_type: "action" },
      ],
    },
  ],
};

const swedenStudentPermit: ProcessTemplate = {
  id: "se_student_permit",
  keywords: ["study", "student", "university", "school", "course", "admission", "högskola", "student permit", "studies"],
  destination_country: "Sweden",
  jurisdiction: "Sweden",
  authority_name: "Migrationsverket",
  title: "Student Permit (Uppehållstillstånd för studier) — Sweden",
  summary: "Required for non-EU/EEA students studying in Sweden for more than 90 days. You must have a confirmed place at a Swedish educational institution.",
  timeline_summary: "Apply at least 2–3 months before your course starts. Decisions typically take 1–3 months.",
  next_action: "Confirm your admission letter is in hand, then apply online as early as possible.",
  official_sources: [{ title: "Migrationsverket — Student permit", url: "https://www.migrationsverket.se/en/student-permit" }],
  steps: [
    {
      title: "Obtain admission letter from Swedish institution",
      description: "You must have an unconditional offer of a place at a Swedish university, college, or school before applying.",
      estimated_duration: "Varies",
      checklist_items: [
        { label: "Unconditional admission letter received", item_type: "document" },
        { label: "Course start date confirmed", item_type: "action" },
        { label: "Tuition fee payment confirmed (if applicable)", item_type: "payment" },
      ],
    },
    {
      title: "Gather required documents",
      description: "Prepare all documents before submitting the application.",
      estimated_duration: "1 week",
      checklist_items: [
        { label: "Valid passport (covering the full study period)", item_type: "document" },
        { label: "Admission letter from Swedish institution", item_type: "document" },
        { label: "Proof of sufficient funds (min. SEK 8 514/month)", item_type: "document" },
        { label: "Proof of health insurance (if applicable)", item_type: "document" },
        { label: "Passport-style photo", item_type: "document" },
      ],
    },
    {
      title: "Apply online via Migrationsverket",
      description: "Submit your application online. Pay the application fee. Apply well before your course starts — processing takes time.",
      estimated_duration: "1–2 days",
      checklist_items: [
        { label: "Online application completed and submitted", item_type: "action" },
        { label: "Application fee paid (SEK 1 000)", item_type: "payment" },
        { label: "All documents uploaded", item_type: "document" },
        { label: "Case number saved", item_type: "action" },
      ],
    },
    {
      title: "Await decision",
      description: "Processing typically takes 1–3 months. If you need to submit biometrics, Migrationsverket will contact you.",
      estimated_duration: "1–3 months",
      checklist_items: [
        { label: "Decision received from Migrationsverket", item_type: "document" },
        { label: "Residence permit card collected (if approved)", item_type: "action" },
      ],
    },
  ],
};

const swedenResidencePermitRenewal: ProcessTemplate = {
  id: "se_residence_permit_renewal",
  keywords: ["residence permit", "renew", "renewal", "uppehållstillstånd", "extend", "extension", "living in sweden", "stay in sweden"],
  destination_country: "Sweden",
  jurisdiction: "Sweden",
  authority_name: "Migrationsverket",
  title: "Residence Permit Renewal — Sweden",
  summary: "If you already hold a Swedish residence permit and wish to continue living in Sweden, you must apply for renewal before your current permit expires.",
  timeline_summary: "Apply at least 3 months before your permit expires. Processing can take 4–12 months.",
  next_action: "Check your current permit expiry date and apply as early as possible — at least 3 months before expiry.",
  official_sources: [{ title: "Migrationsverket — Extend residence permit", url: "https://www.migrationsverket.se/en/extend-permit" }],
  steps: [
    {
      title: "Check eligibility and gather documents",
      description: "Confirm you meet the requirements for renewal based on your permit type (work, family, etc.). Gather all supporting documents.",
      estimated_duration: "1–2 weeks",
      checklist_items: [
        { label: "Current residence permit details noted (expiry, type)", item_type: "document" },
        { label: "Valid passport obtained", item_type: "document" },
        { label: "Supporting documents gathered (employment contract, payslips, etc.)", item_type: "document" },
        { label: "Biometric photos taken (35×45mm)", item_type: "document" },
      ],
    },
    {
      title: "Submit application online",
      description: "Apply through Migrationsverket's online service. You can apply while still in Sweden on your current permit.",
      estimated_duration: "1–2 days",
      checklist_items: [
        { label: "Online application submitted", item_type: "action" },
        { label: "Application fee paid (SEK 2 000 for work-based)", item_type: "payment" },
        { label: "Case number saved", item_type: "action" },
      ],
    },
    {
      title: "Book and attend service centre appointment",
      description: "For some permit types you need to attend a Migrationsverket service centre to submit biometrics. Book early — wait times can be 2–4 weeks.",
      estimated_duration: "2–4 weeks to get appointment",
      checklist_items: [
        { label: "Appointment booked at Migrationsverket service centre", item_type: "appointment" },
        { label: "All documents organised for appointment", item_type: "action" },
        { label: "Appointment attended", item_type: "appointment" },
      ],
    },
    {
      title: "Await decision",
      description: "Processing times vary by permit type and case load, typically 4–12 months. You can legally stay in Sweden while your renewal application is being processed.",
      estimated_duration: "4–12 months",
      checklist_items: [
        { label: "Decision received from Migrationsverket", item_type: "document" },
        { label: "New permit card collected", item_type: "action" },
      ],
    },
  ],
};

const swedenFamilyReunification: ProcessTemplate = {
  id: "se_family_reunification",
  keywords: ["family", "spouse", "partner", "child", "parent", "reunification", "join", "anhöriginvandring", "relative"],
  destination_country: "Sweden",
  jurisdiction: "Sweden",
  authority_name: "Migrationsverket",
  title: "Family Reunification (Anhöriginvandring) — Sweden",
  summary: "Allows family members to join a person who holds a valid residence or work permit in Sweden. The sponsor in Sweden must meet income and housing requirements.",
  timeline_summary: "Processing typically takes 6–12 months. Apply as early as possible.",
  next_action: "Confirm the sponsor's permit status and start gathering required documents.",
  official_sources: [{ title: "Migrationsverket — Family reunification", url: "https://www.migrationsverket.se/en/family-reunification" }],
  steps: [
    {
      title: "Confirm sponsor eligibility",
      description: "The person in Sweden (the sponsor) must hold a valid permit for at least one year and meet income and housing requirements.",
      estimated_duration: "1 week",
      checklist_items: [
        { label: "Sponsor's valid residence/work permit confirmed", item_type: "document" },
        { label: "Sponsor's income meets requirement (check current threshold)", item_type: "action" },
        { label: "Sponsor has suitable housing for the family", item_type: "action" },
      ],
    },
    {
      title: "Submit application online",
      description: "The applying family member submits an online application via Migrationsverket's e-service (My Pages). The sponsor in Sweden also completes their part.",
      estimated_duration: "1–3 days",
      checklist_items: [
        { label: "Online application submitted by family member", item_type: "action" },
        { label: "Application fee paid (SEK 1 500 per adult)", item_type: "payment" },
        { label: "Sponsor completes their section online", item_type: "action" },
        { label: "Case number saved", item_type: "action" },
      ],
    },
    {
      title: "Submit supporting documents",
      description: "Provide certified documents proving the family relationship, housing, and income.",
      estimated_duration: "1–3 weeks",
      checklist_items: [
        { label: "Passports for all applicants", item_type: "document" },
        { label: "Proof of relationship (marriage certificate, birth certificate)", item_type: "document" },
        { label: "Certified translation of relationship documents (into Swedish)", item_type: "document" },
        { label: "Sponsor's income documentation (payslips, employment contract)", item_type: "document" },
        { label: "Housing documentation (tenancy agreement or ownership)", item_type: "document" },
      ],
    },
    {
      title: "Embassy appointment and biometrics",
      description: "The applying family member attends an appointment at the nearest Swedish embassy or consulate in their country of residence to submit biometric data.",
      estimated_duration: "1–6 weeks to get appointment",
      checklist_items: [
        { label: "Appointment booked at Swedish embassy/consulate", item_type: "appointment" },
        { label: "All original documents brought to appointment", item_type: "action" },
        { label: "Biometrics submitted", item_type: "appointment" },
      ],
    },
    {
      title: "Await decision and collect permit",
      description: "Migrationsverket reviews the application. A positive decision results in a residence permit card, which must be collected in person in Sweden.",
      estimated_duration: "6–12 months",
      checklist_items: [
        { label: "Decision received from Migrationsverket", item_type: "document" },
        { label: "Permit card collected in Sweden (if approved)", item_type: "action" },
        { label: "Address registration in Sweden completed (Folkbokföring)", item_type: "action" },
      ],
    },
  ],
};

const swedenCitizenship: ProcessTemplate = {
  id: "se_citizenship",
  keywords: ["citizenship", "medborgarskap", "naturalisation", "naturalization", "become swedish", "swedish citizen", "passport"],
  destination_country: "Sweden",
  jurisdiction: "Sweden",
  authority_name: "Migrationsverket",
  title: "Swedish Citizenship (Medborgarskap)",
  summary: "You can apply for Swedish citizenship after living in Sweden for a number of years with a residence permit, meeting language and residency requirements.",
  timeline_summary: "Processing typically takes 6–12 months after a complete application is submitted.",
  next_action: "Check how many years you have lived in Sweden and whether you meet the residency requirement.",
  official_sources: [{ title: "Migrationsverket — Swedish citizenship", url: "https://www.migrationsverket.se/en/citizenship" }],
  steps: [
    {
      title: "Check eligibility",
      description: "Most applicants must have lived in Sweden for at least 5 years with a valid permit, have a clean criminal record, and be able to support themselves.",
      estimated_duration: "1 week",
      checklist_items: [
        { label: "Years of residence in Sweden confirmed", item_type: "action" },
        { label: "Permanent residence permit or long-term permit confirmed", item_type: "document" },
        { label: "No disqualifying criminal convictions (self-check)", item_type: "action" },
      ],
    },
    {
      title: "Gather documents",
      description: "Collect identity documents and proof of residence.",
      estimated_duration: "1–2 weeks",
      checklist_items: [
        { label: "Valid passport or national identity document", item_type: "document" },
        { label: "Residence permit card", item_type: "document" },
        { label: "Population register extract (from Skatteverket)", item_type: "document" },
      ],
    },
    {
      title: "Apply online via Migrationsverket",
      description: "Submit application online and pay the fee.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Online application submitted", item_type: "action" },
        { label: "Application fee paid (SEK 1 500)", item_type: "payment" },
        { label: "Case number saved", item_type: "action" },
      ],
    },
    {
      title: "Await decision",
      description: "Processing takes 6–12 months. Migrationsverket may request additional information.",
      estimated_duration: "6–12 months",
      checklist_items: [
        { label: "Decision letter received", item_type: "document" },
        { label: "Swedish passport applied for (if approved)", item_type: "action" },
      ],
    },
  ],
};

const swedenAsylum: ProcessTemplate = {
  id: "se_asylum",
  keywords: ["asylum", "refugee", "protection", "asyl", "asylansökan", "flee", "persecution", "stateless", "asylum seeker", "protection sweden"],
  destination_country: "Sweden",
  jurisdiction: "Sweden",
  authority_name: "Migrationsverket",
  title: "Asylum Application (Asylansökan) — Sweden",
  summary: "Anyone in Sweden who needs international protection can apply for asylum. You must apply in person at a Migrationsverket office or at the border. The process involves registration, an investigation, and a decision.",
  timeline_summary: "The investigation process typically takes 3–15 months. You may stay in Sweden while your case is being examined.",
  next_action: "Go to the nearest Migrationsverket office to register your asylum application in person.",
  official_sources: [{ title: "Migrationsverket — Applying for asylum", url: "https://www.migrationsverket.se/en/applying-for-asylum" }],
  steps: [
    {
      title: "Register your asylum application",
      description: "Go to a Migrationsverket office to register your application in person. Bring any identity documents you have. You will be photographed and have your fingerprints taken.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Nearest Migrationsverket office located", item_type: "action" },
        { label: "All identity documents brought (passport, ID, travel documents)", item_type: "document" },
        { label: "Application registered and case number received", item_type: "action" },
        { label: "Temporary ID document (LMA card) received", item_type: "document" },
      ],
    },
    {
      title: "Receive housing and support",
      description: "Migrationsverket offers accommodation while your application is processed. You may also arrange your own housing.",
      estimated_duration: "Ongoing",
      checklist_items: [
        { label: "Housing offer from Migrationsverket reviewed", item_type: "action" },
        { label: "Daily allowance (dagersättning) applied for if needed", item_type: "action" },
        { label: "Access to healthcare and schooling for children confirmed", item_type: "action" },
      ],
    },
    {
      title: "Asylum investigation interview",
      description: "You will be invited to an interview with Migrationsverket where you explain why you need protection. You have the right to an interpreter and legal counsel.",
      estimated_duration: "Scheduled by Migrationsverket",
      checklist_items: [
        { label: "Interview appointment received", item_type: "appointment" },
        { label: "Legal counsel / public counsel arranged", item_type: "action" },
        { label: "Interpreter confirmed for interview language", item_type: "action" },
        { label: "Interview attended", item_type: "appointment" },
        { label: "Any additional documents submitted after interview", item_type: "document" },
      ],
    },
    {
      title: "Await decision",
      description: "Migrationsverket investigates your case and makes a decision. If approved, you receive a residence permit. If rejected, you have the right to appeal to the Migration Court.",
      estimated_duration: "3–15 months",
      checklist_items: [
        { label: "Decision letter received from Migrationsverket", item_type: "document" },
        { label: "If approved: residence permit card collected", item_type: "action" },
        { label: "If rejected: appeal deadline noted (3 weeks from decision)", item_type: "action" },
        { label: "If appealing: appeal submitted to Migration Court", item_type: "action" },
      ],
    },
  ],
};

const swedenPermanentResidence: ProcessTemplate = {
  id: "se_permanent_residence",
  keywords: ["permanent residence", "PUT", "permanent uppehållstillstånd", "settle sweden", "stay permanently", "permanent permit sweden", "long term residence"],
  destination_country: "Sweden",
  jurisdiction: "Sweden",
  authority_name: "Migrationsverket",
  title: "Permanent Residence Permit (PUT) — Sweden",
  summary: "After living in Sweden for a qualifying period on a temporary permit, you can apply for a permanent residence permit (permanentuppehållstillstånd). Requirements depend on your permit type.",
  timeline_summary: "Processing typically takes 6–12 months. Apply when you meet the residency requirement.",
  next_action: "Check how long you have held your current permit and whether you meet the requirement for permanent residence.",
  official_sources: [{ title: "Migrationsverket — Permanent residence permit", url: "https://www.migrationsverket.se/en/permanent-residence-permit" }],
  steps: [
    {
      title: "Check eligibility",
      description: "Most paths require 4–5 years of continuous residence in Sweden. Work permit holders, refugees, and family members have different thresholds. You must also have supported yourself (self-sufficiency requirement).",
      estimated_duration: "1 week",
      checklist_items: [
        { label: "Years of residence in Sweden confirmed", item_type: "action" },
        { label: "Current permit type noted (work, family, refugee)", item_type: "document" },
        { label: "Self-sufficiency requirement checked (income, employment)", item_type: "action" },
        { label: "No long breaks from Sweden (max 6 months at a time)", item_type: "action" },
      ],
    },
    {
      title: "Gather documents",
      description: "Collect proof of identity, residence history, and income.",
      estimated_duration: "1–2 weeks",
      checklist_items: [
        { label: "Valid passport or travel document", item_type: "document" },
        { label: "Current residence permit card", item_type: "document" },
        { label: "Proof of income / employment for the past years (payslips, tax returns)", item_type: "document" },
        { label: "Population register extract from Skatteverket", item_type: "document" },
        { label: "Biometric passport photos", item_type: "document" },
      ],
    },
    {
      title: "Apply online via Migrationsverket",
      description: "Submit application through Migrationsverket's e-service. The fee varies by permit type.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Online application submitted", item_type: "action" },
        { label: "Application fee paid (SEK 2 000 for most applicants)", item_type: "payment" },
        { label: "Case number saved", item_type: "action" },
      ],
    },
    {
      title: "Attend service centre appointment",
      description: "You will likely need to attend a Migrationsverket service centre to submit biometrics for the new permit card.",
      estimated_duration: "2–4 weeks to get appointment",
      checklist_items: [
        { label: "Service centre appointment booked", item_type: "appointment" },
        { label: "Documents organised for appointment", item_type: "action" },
        { label: "Appointment attended and biometrics submitted", item_type: "appointment" },
      ],
    },
    {
      title: "Await decision and collect permanent permit card",
      description: "Processing takes 6–12 months. A positive decision means you can live in Sweden indefinitely.",
      estimated_duration: "6–12 months",
      checklist_items: [
        { label: "Decision received from Migrationsverket", item_type: "document" },
        { label: "Permanent residence permit card collected", item_type: "action" },
      ],
    },
  ],
};

// ── Sweden — Skatteverket / SFI / EEA ─────────────────────────────────────

const swedenFolkbokforing: ProcessTemplate = {
  id: "se_folkbokforing",
  keywords: ["folkbokföring", "personnummer", "population registration", "personal number", "skatteverket", "register sweden", "swedish id number", "swedish personal identity"],
  destination_country: "Sweden",
  jurisdiction: "Sweden",
  authority_name: "Skatteverket",
  title: "Population Registration & Personnummer — Sweden",
  summary: "Anyone planning to live in Sweden for more than 12 months must register with Skatteverket (Tax Agency). Registration gives you a personnummer (personal identity number), which is required for most everyday services.",
  timeline_summary: "Appointment waiting times vary by office, typically 1–4 weeks. The personnummer is issued within a few weeks of the appointment.",
  next_action: "Book an appointment at your nearest Skatteverket service office.",
  official_sources: [{ title: "Skatteverket — Population registration", url: "https://www.skatteverket.se/en/living-in-sweden/population-registration" }],
  steps: [
    {
      title: "Confirm you are eligible to register",
      description: "You may register if you have a valid residence permit (or right of residence) and intend to live in Sweden for more than 12 months. EU/EEA citizens must have registered their right of residence first.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Valid residence permit or EU/EEA registration certificate confirmed", item_type: "document" },
        { label: "Intention to stay in Sweden for more than 12 months confirmed", item_type: "action" },
      ],
    },
    {
      title: "Book an appointment at Skatteverket",
      description: "Visit the Skatteverket website or call to book an appointment at a local service office. Bring all required documents — Skatteverket will not accept applications by post for first-time registration.",
      estimated_duration: "1–4 weeks (waiting time)",
      checklist_items: [
        { label: "Nearest Skatteverket service office located", item_type: "action" },
        { label: "Appointment booked online or by phone", item_type: "appointment" },
      ],
    },
    {
      title: "Attend appointment with documents",
      description: "Bring original documents. You will fill in a registration form (SKV 7665) at the office.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Valid passport", item_type: "document" },
        { label: "Residence permit card or EU/EEA registration certificate", item_type: "document" },
        { label: "Proof of address in Sweden (rental contract or equivalent)", item_type: "document" },
        { label: "Proof of civil status if relevant (marriage certificate, birth certificate for children)", item_type: "document" },
        { label: "Registration form SKV 7665 completed at office", item_type: "action" },
      ],
    },
    {
      title: "Receive your personnummer",
      description: "After registration, Skatteverket processes your application and sends your personnummer by post. It typically arrives within a few weeks.",
      estimated_duration: "1–4 weeks",
      checklist_items: [
        { label: "Personnummer letter received in post", item_type: "document" },
        { label: "Tax card (skattsedel) noted for employer", item_type: "document" },
        { label: "Bank account, healthcare, and other services registered with personnummer", item_type: "action" },
      ],
    },
  ],
};

const swedenSFI: ProcessTemplate = {
  id: "se_sfi",
  keywords: ["sfi", "swedish for immigrants", "svenska för invandrare", "learn swedish", "swedish language course", "language school sweden", "swedish lessons", "kommunvux"],
  destination_country: "Sweden",
  jurisdiction: "Sweden",
  authority_name: "Local municipality (kommun)",
  title: "Swedish for Immigrants (SFI) — Enrollment",
  summary: "SFI (Svenska för invandrare) is a free Swedish language course offered by every municipality. It is open to adult residents who lack basic knowledge of Swedish and have a personnummer.",
  timeline_summary: "Enrollment can usually happen within a few weeks of arriving. Courses are ongoing and free of charge.",
  next_action: "Contact your local municipality (kommun) to register for SFI.",
  official_sources: [{ title: "Skolverket — SFI information", url: "https://www.skolverket.se/utbildning/komvux/svenska-for-invandrare-sfi" }],
  steps: [
    {
      title: "Confirm eligibility",
      description: "You must be 16 or older, registered in the municipality (have a personnummer), and lack basic knowledge of Swedish. SFI is free of charge.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Personnummer obtained from Skatteverket", item_type: "document" },
        { label: "Registered as a resident in the municipality confirmed", item_type: "action" },
      ],
    },
    {
      title: "Find and contact your municipality's SFI provider",
      description: "Each municipality organises SFI differently — some run it directly, others through adult education centres (komvux). Find the right contact on your municipality's website.",
      estimated_duration: "1–3 days",
      checklist_items: [
        { label: "Municipality SFI/komvux contact identified", item_type: "action" },
        { label: "Application submitted (online, in person, or by phone depending on municipality)", item_type: "action" },
      ],
    },
    {
      title: "Placement test and course assignment",
      description: "The SFI school will assess your education level and prior language skills and place you in one of four study paths (A, B, C, D). No prior knowledge of Swedish is required.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Placement test / interview completed", item_type: "appointment" },
        { label: "Study path (A/B/C/D) assigned", item_type: "action" },
        { label: "Schedule and location confirmed", item_type: "action" },
      ],
    },
    {
      title: "Attend SFI classes",
      description: "Attend your assigned classes. SFI is offered in the mornings, evenings, and sometimes online. You can also study at your own pace (flex-SFI). Attendance is required to receive any related benefits.",
      estimated_duration: "6–24 months (varies by individual)",
      checklist_items: [
        { label: "First class attended", item_type: "action" },
        { label: "School materials / digital login received", item_type: "action" },
        { label: "Final exam (SFI-prov) passed when ready", item_type: "action" },
      ],
    },
  ],
};

const swedenEEARegistration: ProcessTemplate = {
  id: "se_eea_registration",
  keywords: ["eu eea registration", "uppehållsrätt", "right of residence", "eu citizen sweden", "eea citizen sweden", "migrationsverket eu", "free movement sweden", "eu registration certificate"],
  destination_country: "Sweden",
  jurisdiction: "Sweden",
  authority_name: "Migrationsverket",
  title: "EU/EEA Right of Residence Registration — Sweden",
  summary: "EU/EEA nationals can live and work in Sweden under EU freedom of movement rules. If staying more than 3 months, you should register your right of residence (uppehållsrätt) with Migrationsverket to obtain a registration certificate.",
  timeline_summary: "Registration is typically processed the same day or within a few days at a service centre. A registration certificate (uppehållsintyg) is issued immediately.",
  next_action: "Gather proof that you meet one of the qualifying conditions (worker, student, self-sufficient, job-seeker) and book a Migrationsverket appointment.",
  official_sources: [{ title: "Migrationsverket — EU/EEA citizens", url: "https://www.migrationsverket.se/en/eu-eea-citizens" }],
  steps: [
    {
      title: "Confirm you qualify",
      description: "You must be an EU/EEA national and meet one of the qualifying conditions: employed/self-employed in Sweden, studying full-time with sufficient resources, self-sufficient, or a job seeker with genuine prospects.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "EU/EEA nationality confirmed (passport or national ID)", item_type: "document" },
        { label: "Qualifying status identified: worker / student / self-sufficient / job-seeker", item_type: "action" },
      ],
    },
    {
      title: "Gather supporting documents",
      description: "The documents depend on your qualifying condition.",
      estimated_duration: "1–2 weeks",
      checklist_items: [
        { label: "Valid EU passport or national identity card", item_type: "document" },
        { label: "If employed: employment contract or employer letter", item_type: "document" },
        { label: "If student: enrollment confirmation + proof of comprehensive health insurance + proof of sufficient funds", item_type: "document" },
        { label: "If self-sufficient: bank statements or proof of income", item_type: "document" },
        { label: "If job-seeking: proof of active job search (applications, CV)", item_type: "document" },
      ],
    },
    {
      title: "Register at a Migrationsverket service centre",
      description: "Visit a Migrationsverket service centre in person. You can apply online first and then verify in person, or handle everything at the service centre.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Online application submitted at migrationsverket.se (optional but recommended)", item_type: "action" },
        { label: "Appointment at service centre booked", item_type: "appointment" },
        { label: "All original documents brought to appointment", item_type: "action" },
        { label: "Biometrics / photos taken at service centre", item_type: "action" },
      ],
    },
    {
      title: "Receive registration certificate (uppehållsintyg)",
      description: "The registration certificate is normally issued at the service centre visit or shortly afterwards. You should then register with Skatteverket to get your personnummer.",
      estimated_duration: "Same day or up to 1 week",
      checklist_items: [
        { label: "Registration certificate (uppehållsintyg) received", item_type: "document" },
        { label: "Register with Skatteverket for personnummer (see separate guide)", item_type: "action" },
      ],
    },
  ],
};

const ukStudentVisa: ProcessTemplate = {
  id: "uk_student_visa",
  keywords: ["uk student", "student visa uk", "study uk", "university uk", "england", "britain", "student route", "cas", "confirmation of acceptance"],
  destination_country: "United Kingdom",
  jurisdiction: "United Kingdom",
  authority_name: "UK Home Office / UKVI",
  title: "UK Student Visa (Student Route)",
  summary: "Required for non-UK nationals studying a full-time course at a licensed UK student sponsor (university, college, or school) for more than 6 months.",
  timeline_summary: "Apply up to 6 months before your course starts. Decisions typically take 3 weeks (priority) or up to 12 weeks (standard).",
  next_action: "Obtain your Confirmation of Acceptance for Studies (CAS) from your UK institution before applying.",
  official_sources: [{ title: "UK Visas and Immigration — Student visa", url: "https://www.gov.uk/student-visa" }],
  steps: [
    {
      title: "Receive CAS from your UK institution",
      description: "Your university or college will issue a Confirmation of Acceptance for Studies (CAS) number. You cannot apply without it.",
      estimated_duration: "Varies by institution",
      checklist_items: [
        { label: "Unconditional offer letter received", item_type: "document" },
        { label: "CAS number issued by institution", item_type: "document" },
        { label: "Tuition fees paid or payment plan confirmed", item_type: "payment" },
      ],
    },
    {
      title: "Gather required documents",
      description: "Prepare all documents before applying online.",
      estimated_duration: "1–2 weeks",
      checklist_items: [
        { label: "Valid passport", item_type: "document" },
        { label: "CAS reference number", item_type: "document" },
        { label: "Proof of funds (28 consecutive days in bank account)", item_type: "document" },
        { label: "ATAS certificate (if course requires it)", item_type: "document" },
        { label: "English language certificate (if required)", item_type: "document" },
        { label: "Tuberculosis test certificate (if from listed country)", item_type: "document" },
        { label: "Parental consent (if under 18)", item_type: "document" },
      ],
    },
    {
      title: "Apply online and pay the fee",
      description: "Apply online via UKVI. You must also pay the Immigration Health Surcharge (IHS) as part of the application.",
      estimated_duration: "1–2 days",
      checklist_items: [
        { label: "Online application submitted on gov.uk", item_type: "action" },
        { label: "Visa application fee paid (£363 from outside UK)", item_type: "payment" },
        { label: "Immigration Health Surcharge paid (£776/year)", item_type: "payment" },
      ],
    },
    {
      title: "Biometrics appointment at Visa Application Centre",
      description: "Book and attend an appointment at a UKVI Visa Application Centre to submit biometric data and original documents.",
      estimated_duration: "1–4 weeks to get appointment",
      checklist_items: [
        { label: "VAC appointment booked", item_type: "appointment" },
        { label: "All original documents brought", item_type: "action" },
        { label: "Biometrics submitted", item_type: "appointment" },
      ],
    },
    {
      title: "Await decision and collect BRP",
      description: "Standard processing takes up to 12 weeks; priority service takes up to 5 working days (extra fee). On arrival in UK, collect your Biometric Residence Permit within 10 days.",
      estimated_duration: "3–12 weeks",
      checklist_items: [
        { label: "Visa decision received", item_type: "document" },
        { label: "Travel to UK completed", item_type: "action" },
        { label: "BRP collected from post office within 10 days of arrival", item_type: "action" },
      ],
    },
  ],
};

const ukSkilledWorkerVisa: ProcessTemplate = {
  id: "uk_skilled_worker",
  keywords: ["skilled worker", "uk work visa", "work in uk", "tier 2", "sponsor licence", "certificate of sponsorship", "cos", "england work", "britain job"],
  destination_country: "United Kingdom",
  jurisdiction: "United Kingdom",
  authority_name: "UK Home Office / UKVI",
  title: "UK Skilled Worker Visa",
  summary: "Allows skilled workers with a job offer from a UK-licensed sponsor to work in the UK. The role must meet the skill and salary thresholds.",
  timeline_summary: "Apply up to 3 months before your start date. Priority decisions in 5 working days; standard up to 8 weeks.",
  next_action: "Your UK employer must hold a sponsor licence and issue a Certificate of Sponsorship (CoS) before you can apply.",
  official_sources: [{ title: "UK Visas and Immigration — Skilled Worker visa", url: "https://www.gov.uk/skilled-worker-visa" }],
  steps: [
    {
      title: "Employer issues Certificate of Sponsorship",
      description: "Your employer must be a licensed UK sponsor and assign you a CoS with a reference number. You cannot apply without it.",
      estimated_duration: "1–2 weeks",
      checklist_items: [
        { label: "Employer holds UKVI sponsor licence (verify)", item_type: "action" },
        { label: "Certificate of Sponsorship (CoS) reference number received", item_type: "document" },
        { label: "Role meets skill level (RQF3+) and salary thresholds", item_type: "action" },
      ],
    },
    {
      title: "Gather required documents",
      description: "Prepare documents before applying online.",
      estimated_duration: "1 week",
      checklist_items: [
        { label: "Valid passport", item_type: "document" },
        { label: "CoS reference number", item_type: "document" },
        { label: "Proof of English language ability", item_type: "document" },
        { label: "Bank statements showing maintenance funds (if required)", item_type: "document" },
        { label: "Tuberculosis test result (if from listed country)", item_type: "document" },
        { label: "Criminal record certificate (if required)", item_type: "document" },
      ],
    },
    {
      title: "Apply online and pay fees",
      description: "Apply online via UKVI. Pay the application fee and the Immigration Health Surcharge.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Online application submitted", item_type: "action" },
        { label: "Visa fee paid (£719 for 3+ years from outside UK)", item_type: "payment" },
        { label: "Immigration Health Surcharge paid (£1,035/year)", item_type: "payment" },
      ],
    },
    {
      title: "Biometrics appointment",
      description: "Attend a UKVI Visa Application Centre to submit biometrics and documents.",
      estimated_duration: "1–3 weeks",
      checklist_items: [
        { label: "VAC appointment booked", item_type: "appointment" },
        { label: "Biometrics and documents submitted", item_type: "appointment" },
      ],
    },
    {
      title: "Await decision and travel to UK",
      description: "Standard processing up to 8 weeks; priority 5 working days. Collect your BRP within 10 days of arrival in the UK.",
      estimated_duration: "5 days – 8 weeks",
      checklist_items: [
        { label: "Decision received", item_type: "document" },
        { label: "Travel to UK completed", item_type: "action" },
        { label: "BRP collected within 10 days of arrival", item_type: "action" },
      ],
    },
  ],
};

const ukGraduateVisa: ProcessTemplate = {
  id: "uk_graduate_visa",
  keywords: ["graduate visa", "graduate route", "uk after graduation", "stay after study uk", "post study work", "psw"],
  destination_country: "United Kingdom",
  jurisdiction: "United Kingdom",
  authority_name: "UK Home Office / UKVI",
  title: "UK Graduate Visa (Graduate Route)",
  summary: "Allows international students who have completed a UK degree to stay and work (or look for work) in the UK for 2 years (3 years for PhD graduates).",
  timeline_summary: "Apply before your current Student visa expires. Decision typically within 8 weeks.",
  next_action: "Confirm your degree has been formally awarded by your UK institution before applying.",
  official_sources: [{ title: "UK Visas and Immigration — Graduate visa", url: "https://www.gov.uk/graduate-visa" }],
  steps: [
    {
      title: "Confirm degree completion",
      description: "Your UK institution must confirm your degree has been awarded. Apply before your current Student visa expires.",
      estimated_duration: "Varies",
      checklist_items: [
        { label: "Degree formally awarded / confirmation letter obtained", item_type: "document" },
        { label: "Current Student visa expiry date noted", item_type: "action" },
      ],
    },
    {
      title: "Apply online",
      description: "Apply online from inside the UK before your current visa expires.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Online application submitted (from inside UK)", item_type: "action" },
        { label: "Application fee paid (£700)", item_type: "payment" },
        { label: "Immigration Health Surcharge paid", item_type: "payment" },
        { label: "Biometrics provided via UKVCAS appointment", item_type: "appointment" },
      ],
    },
    {
      title: "Await decision",
      description: "Decisions typically take up to 8 weeks. You can work full-time while waiting if you applied in-country before your visa expired.",
      estimated_duration: "Up to 8 weeks",
      checklist_items: [
        { label: "Decision received", item_type: "document" },
        { label: "BRP collected if issued", item_type: "action" },
      ],
    },
  ],
};

// ── UK — Youth Mobility ────────────────────────────────────────────────────

const ukYouthMobility: ProcessTemplate = {
  id: "uk_youth_mobility",
  keywords: ["youth mobility", "working holiday uk", "internship uk", "intern uk", "short term work uk", "yms", "uk intern"],
  destination_country: "United Kingdom",
  jurisdiction: "United Kingdom",
  authority_name: "UK Home Office / UKVI",
  title: "UK Youth Mobility Scheme",
  summary: "Allows young people (18–30) from eligible countries to live and work in the UK for up to 2 years. Includes internships and paid work.",
  timeline_summary: "Apply up to 3 months before intended travel. Decisions typically within 3 weeks.",
  next_action: "Check if your nationality qualifies, then apply online.",
  official_sources: [{ title: "UK Youth Mobility Scheme", url: "https://www.gov.uk/youth-mobility" }],
  steps: [
    {
      title: "Check eligibility",
      description: "Must be 18–30, hold a qualifying nationality, and have at least £2,530 in savings.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Nationality confirmed as eligible for YMS", item_type: "action" },
        { label: "Age 18–30 at time of application", item_type: "action" },
        { label: "£2,530 savings held for 28 consecutive days", item_type: "document" },
      ],
    },
    {
      title: "Apply online and pay fees",
      description: "Apply online from outside the UK. Pay the visa fee and Immigration Health Surcharge.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Online application submitted on gov.uk", item_type: "action" },
        { label: "Visa fee paid (£259)", item_type: "payment" },
        { label: "Immigration Health Surcharge paid (£776/year)", item_type: "payment" },
      ],
    },
    {
      title: "Biometrics at Visa Application Centre",
      description: "Attend a UKVI Visa Application Centre to submit biometrics and documents.",
      estimated_duration: "1–3 weeks to get appointment",
      checklist_items: [
        { label: "VAC appointment booked", item_type: "appointment" },
        { label: "Passport and bank statements brought", item_type: "document" },
        { label: "Biometrics submitted", item_type: "appointment" },
      ],
    },
    {
      title: "Receive decision and travel",
      description: "Standard decision within 3 weeks. Collect BRP within 10 days of arriving in the UK.",
      estimated_duration: "Up to 3 weeks",
      checklist_items: [
        { label: "Visa decision received", item_type: "document" },
        { label: "Travel to UK completed", item_type: "action" },
        { label: "BRP collected from post office", item_type: "action" },
      ],
    },
  ],
};

// ── Germany ────────────────────────────────────────────────────────────────

const germanyEUBlueCard: ProcessTemplate = {
  id: "de_eu_blue_card",
  keywords: ["germany work", "work in germany", "blue card", "eu blue card", "deutschland", "germany job", "skilled worker germany", "germany employment", "german work permit"],
  destination_country: "Germany",
  jurisdiction: "Germany",
  authority_name: "Local Foreigners Authority (Ausländerbehörde)",
  title: "EU Blue Card — Germany",
  summary: "Residence and work permit for highly qualified non-EU/EEA nationals with a job offer meeting the salary threshold. Valid for up to 4 years.",
  timeline_summary: "Apply at the German embassy before travel, or in Germany after arrival on a job-seeker or national visa. Processing 4–12 weeks.",
  next_action: "Confirm your job offer meets the salary threshold, then apply at the German embassy.",
  official_sources: [{ title: "Make it in Germany — EU Blue Card", url: "https://www.make-it-in-germany.com/en/visa-residence/types/eu-blue-card" }],
  steps: [
    {
      title: "Confirm job offer and salary threshold",
      description: "Your job offer must meet the annual gross salary threshold (€45,300 general; €35,100 for shortage occupations in 2024).",
      estimated_duration: "1 week",
      checklist_items: [
        { label: "Signed employment contract received", item_type: "document" },
        { label: "Salary meets Blue Card threshold confirmed", item_type: "action" },
        { label: "Degree/qualifications recognised or equivalent confirmed", item_type: "action" },
      ],
    },
    {
      title: "Gather required documents",
      description: "Collect identity and qualification documents. Foreign degrees may need recognition via anabin database.",
      estimated_duration: "1–3 weeks",
      checklist_items: [
        { label: "Valid passport", item_type: "document" },
        { label: "Employment contract (signed)", item_type: "document" },
        { label: "University degree certificate + certified translation", item_type: "document" },
        { label: "Proof of degree recognition (if required)", item_type: "document" },
        { label: "Biometric passport photos", item_type: "document" },
      ],
    },
    {
      title: "Apply at German embassy / consulate",
      description: "Apply for a national (D) visa at the German embassy in your home country to enter Germany and then convert to Blue Card.",
      estimated_duration: "4–12 weeks",
      checklist_items: [
        { label: "Embassy appointment booked", item_type: "appointment" },
        { label: "Visa application fee paid (€75)", item_type: "payment" },
        { label: "All documents submitted at embassy", item_type: "appointment" },
        { label: "National visa received", item_type: "document" },
      ],
    },
    {
      title: "Register in Germany and apply for Blue Card",
      description: "After arrival, register your address (Anmeldung) and apply for the EU Blue Card at the local Ausländerbehörde.",
      estimated_duration: "2–6 weeks",
      checklist_items: [
        { label: "Address registered at local registration office (Anmeldung)", item_type: "action" },
        { label: "Appointment at Ausländerbehörde booked", item_type: "appointment" },
        { label: "EU Blue Card issued", item_type: "document" },
        { label: "Health insurance proof provided (gesetzliche or private)", item_type: "document" },
      ],
    },
  ],
};

const germanyJobSeekerVisa: ProcessTemplate = {
  id: "de_job_seeker_visa",
  keywords: ["germany job seeker", "job search germany", "looking for work germany", "jobseeker visa germany", "find job germany", "german job seeker"],
  destination_country: "Germany",
  jurisdiction: "Germany",
  authority_name: "German Embassy / Ausländerbehörde",
  title: "Germany Job Seeker Visa",
  summary: "Allows qualified non-EU/EEA nationals to travel to Germany for up to 6 months to look for work. Requires a recognised degree.",
  timeline_summary: "Apply at the German embassy in your home country. Processing typically 4–8 weeks.",
  next_action: "Book an appointment at the nearest German embassy and gather qualification documents.",
  official_sources: [{ title: "Make it in Germany — Job Seeker Visa", url: "https://www.make-it-in-germany.com/en/visa-residence/types/job-seeker-visa" }],
  steps: [
    {
      title: "Check eligibility",
      description: "Must hold a recognised university degree or vocational qualification and have sufficient funds to support yourself.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Degree/qualifications confirmed as recognised in Germany", item_type: "action" },
        { label: "Sufficient funds confirmed (approx. €947/month)", item_type: "action" },
        { label: "German language skills assessed (B1+ recommended)", item_type: "action" },
      ],
    },
    {
      title: "Gather documents and apply",
      description: "Apply at the German embassy in your country with your qualifications and financial proof.",
      estimated_duration: "4–8 weeks",
      checklist_items: [
        { label: "Valid passport", item_type: "document" },
        { label: "University degree + certified translation", item_type: "document" },
        { label: "Proof of funds (bank statements)", item_type: "document" },
        { label: "CV / application letter", item_type: "document" },
        { label: "Embassy appointment booked and attended", item_type: "appointment" },
        { label: "Visa fee paid (€75)", item_type: "payment" },
        { label: "Job Seeker Visa received", item_type: "document" },
      ],
    },
    {
      title: "Travel to Germany and job search",
      description: "You have up to 6 months to find a job. Once you have an offer, apply to convert to a work permit or EU Blue Card.",
      estimated_duration: "Up to 6 months",
      checklist_items: [
        { label: "Address registered in Germany (Anmeldung)", item_type: "action" },
        { label: "Job offer secured", item_type: "action" },
        { label: "Work permit or EU Blue Card application submitted", item_type: "action" },
      ],
    },
  ],
};

// ── Germany (continued) ────────────────────────────────────────────────────

const germanyFamilyReunification: ProcessTemplate = {
  id: "de_family_reunification",
  keywords: ["germany family reunification", "family visa germany", "spouse visa germany", "familienzusammenführung", "nachzug", "join family germany", "dependent visa germany"],
  destination_country: "Germany",
  jurisdiction: "Germany",
  authority_name: "German Embassy / Ausländerbehörde",
  title: "Family Reunification Visa — Germany",
  summary: "Allows spouses and minor children of German residents or citizens to join them in Germany. The sponsor must prove sufficient income and suitable housing.",
  timeline_summary: "Embassy appointments can take weeks to months to obtain. After submission, processing takes 4–12 weeks.",
  next_action: "Contact the German embassy or consulate in your home country to check current appointment availability.",
  official_sources: [{ title: "BAMF — Family reunification", url: "https://www.bamf.de/EN/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Familie/familie-node.html" }],
  steps: [
    {
      title: "Sponsor confirms eligibility",
      description: "The person already in Germany (sponsor) must have a valid residence permit for at least 12 months, sufficient income (above social welfare threshold), and adequate housing.",
      estimated_duration: "1–2 weeks",
      checklist_items: [
        { label: "Sponsor's residence permit validity confirmed (min. 12 months remaining)", item_type: "document" },
        { label: "Income proof gathered (last 3 payslips, employment contract)", item_type: "document" },
        { label: "Housing adequacy confirmed (rental contract, room sizes)", item_type: "document" },
      ],
    },
    {
      title: "Applicant books embassy appointment",
      description: "The family member abroad must apply at the German embassy or consulate in their country of residence. Book as early as possible — appointments can be scarce.",
      estimated_duration: "Weeks to months (appointment wait)",
      checklist_items: [
        { label: "Nearest German embassy or consulate identified", item_type: "action" },
        { label: "Appointment booked online", item_type: "appointment" },
        { label: "Application form (Antrag auf Erteilung eines Visums) completed", item_type: "document" },
      ],
    },
    {
      title: "Gather and submit documents",
      description: "Both the sponsor and applicant must provide documents. Requirements vary slightly by embassy.",
      estimated_duration: "1–2 weeks",
      checklist_items: [
        { label: "Valid passport (at least 6 months beyond intended stay)", item_type: "document" },
        { label: "Passport-size biometric photos", item_type: "document" },
        { label: "Marriage certificate or birth certificate (apostilled/translated)", item_type: "document" },
        { label: "Proof of relationship (photos, correspondence if needed)", item_type: "document" },
        { label: "Sponsor's documents sent from Germany", item_type: "document" },
        { label: "Visa fee paid (€75)", item_type: "payment" },
        { label: "All documents submitted at embassy appointment", item_type: "appointment" },
      ],
    },
    {
      title: "Receive visa and travel",
      description: "If approved, you receive a national visa (D visa) valid for 3–6 months. You must enter Germany and register within its validity.",
      estimated_duration: "4–12 weeks processing",
      checklist_items: [
        { label: "Visa decision received", item_type: "document" },
        { label: "Passport with visa collected from embassy", item_type: "action" },
        { label: "Travel to Germany arranged within visa validity", item_type: "action" },
        { label: "Address registered at Einwohnermeldeamt within 2 weeks of arrival", item_type: "action" },
        { label: "Residence permit applied for at Ausländerbehörde", item_type: "action" },
      ],
    },
  ],
};

const germanyAusbuildung: ProcessTemplate = {
  id: "de_ausbildung",
  keywords: ["ausbildung", "vocational training germany", "apprenticeship germany", "dual training", "berufsausbildung", "vocational visa", "ausbildungsvisum"],
  destination_country: "Germany",
  jurisdiction: "Germany",
  authority_name: "German Embassy / Ausländerbehörde",
  title: "Vocational Training Visa (Ausbildung) — Germany",
  summary: "Allows non-EU nationals to come to Germany for a recognised vocational training programme (Ausbildung). Germany has a strong demand for trainees in many sectors.",
  timeline_summary: "Finding an Ausbildung placement can take months. Visa processing takes 4–12 weeks after application.",
  next_action: "Find an accredited Ausbildung position in Germany and confirm your employer will support the visa application.",
  official_sources: [{ title: "Make it in Germany — Ausbildung", url: "https://www.make-it-in-germany.com/en/working-in-germany/training/ausbildung" }],
  steps: [
    {
      title: "Find an Ausbildung placement",
      description: "Search for a recognised dual vocational training position (betriebliche Ausbildung) with a German employer. The training company and vocational school together form the programme.",
      estimated_duration: "1–6 months",
      checklist_items: [
        { label: "Ausbildung position found (job boards: Make it in Germany, Bundesagentur für Arbeit)", item_type: "action" },
        { label: "Training contract (Ausbildungsvertrag) signed with employer", item_type: "document" },
        { label: "Programme is in the list of recognised occupations (Ausbildungsberufe)", item_type: "action" },
      ],
    },
    {
      title: "Obtain recognition of school qualifications (if needed)",
      description: "Your previous school-leaving certificate may need to be recognised as equivalent to a German school qualification. Contact anabin database or relevant authority.",
      estimated_duration: "4–12 weeks",
      checklist_items: [
        { label: "Qualifications checked on anabin database", item_type: "action" },
        { label: "Recognition applied for if required", item_type: "action" },
        { label: "Recognition certificate obtained", item_type: "document" },
      ],
    },
    {
      title: "Apply for vocational training visa",
      description: "Apply at the German embassy in your home country.",
      estimated_duration: "4–12 weeks",
      checklist_items: [
        { label: "Embassy appointment booked", item_type: "appointment" },
        { label: "Valid passport", item_type: "document" },
        { label: "Signed training contract", item_type: "document" },
        { label: "Proof of German language skills (usually B1 minimum)", item_type: "document" },
        { label: "School-leaving certificate and recognition (if applicable)", item_type: "document" },
        { label: "Proof of accommodation in Germany", item_type: "document" },
        { label: "Visa fee paid (€75)", item_type: "payment" },
      ],
    },
    {
      title: "Arrive and register",
      description: "After arrival, register your address and apply for a residence permit for vocational training.",
      estimated_duration: "First 2 weeks",
      checklist_items: [
        { label: "Address registered at Einwohnermeldeamt", item_type: "action" },
        { label: "Residence permit applied for at Ausländerbehörde", item_type: "action" },
        { label: "Bank account opened", item_type: "action" },
        { label: "Health insurance enrolled", item_type: "action" },
      ],
    },
  ],
};

const germanyStudentVisa: ProcessTemplate = {
  id: "de_student_visa",
  keywords: ["germany student visa", "study germany", "university germany", "studienvisum", "hochschule", "german university", "study permit germany", "student residence germany"],
  destination_country: "Germany",
  jurisdiction: "Germany",
  authority_name: "German Embassy / Ausländerbehörde",
  title: "Student Visa — Germany",
  summary: "Non-EU nationals who have been accepted at a German university or recognised higher education institution can apply for a student visa (Studienvisum).",
  timeline_summary: "Allow at least 3 months before your intended start date. Processing takes 4–12 weeks.",
  next_action: "Secure a university admission letter (Zulassungsbescheid) before applying for the visa.",
  official_sources: [{ title: "DAAD — Visa and residence permit", url: "https://www.daad.de/en/study-and-research-in-germany/plan-your-studies/visa-and-residence-permit/" }],
  steps: [
    {
      title: "Receive university admission",
      description: "Apply to and receive an admission letter from a state-recognised German university. German universities are largely tuition-free.",
      estimated_duration: "2–6 months",
      checklist_items: [
        { label: "German university (Hochschule) identified", item_type: "action" },
        { label: "Application submitted to university", item_type: "action" },
        { label: "Admission letter (Zulassungsbescheid) received", item_type: "document" },
      ],
    },
    {
      title: "Open blocked account (Sperrkonto)",
      description: "You must prove you can fund your studies. The standard method is opening a blocked account with at least €11,208 (as of 2024) deposited.",
      estimated_duration: "1–4 weeks",
      checklist_items: [
        { label: "Blocked account opened (Deutsche Bank, Fintiba, Expatrio, etc.)", item_type: "action" },
        { label: "Required amount deposited (check current year's figure)", item_type: "payment" },
        { label: "Blocked account confirmation letter obtained", item_type: "document" },
      ],
    },
    {
      title: "Apply for student visa at German embassy",
      description: "Apply at the German embassy or consulate in your home country.",
      estimated_duration: "4–12 weeks",
      checklist_items: [
        { label: "Embassy appointment booked", item_type: "appointment" },
        { label: "Valid passport", item_type: "document" },
        { label: "University admission letter", item_type: "document" },
        { label: "Blocked account proof", item_type: "document" },
        { label: "German language proof (if degree is in German) or English proof", item_type: "document" },
        { label: "Health insurance proof (travel/incoming insurance for visa; statutory insurance after arrival)", item_type: "document" },
        { label: "Biometric photos", item_type: "document" },
        { label: "Visa fee paid (€75)", item_type: "payment" },
      ],
    },
    {
      title: "Arrive and enrol",
      description: "After arrival, register your address, enrol at the university, and convert your visa to a student residence permit.",
      estimated_duration: "First 3 weeks",
      checklist_items: [
        { label: "Address registered at Einwohnermeldeamt", item_type: "action" },
        { label: "Enrolled at university and student ID obtained", item_type: "action" },
        { label: "Statutory health insurance activated (TK, AOK, Barmer, etc.)", item_type: "action" },
        { label: "Residence permit applied for at Ausländerbehörde", item_type: "action" },
        { label: "Blocked account accessed (monthly release begins)", item_type: "action" },
      ],
    },
  ],
};

const germanySettlement: ProcessTemplate = {
  id: "de_niederlassungserlaubnis",
  keywords: ["niederlassungserlaubnis", "permanent residence germany", "settle germany", "permanent permit germany", "long term germany", "indefinite leave germany", "unbefristet aufenthalt"],
  destination_country: "Germany",
  jurisdiction: "Germany",
  authority_name: "Ausländerbehörde",
  title: "Permanent Settlement Permit (Niederlassungserlaubnis) — Germany",
  summary: "After living in Germany for a qualifying period (usually 5 years), non-EU nationals can apply for a permanent settlement permit (Niederlassungserlaubnis), allowing indefinite residence.",
  timeline_summary: "Processing takes 4–12 weeks at the local Ausländerbehörde.",
  next_action: "Check whether you meet the 5-year residency requirement and language/integration conditions.",
  official_sources: [{ title: "BAMF — Settlement permit", url: "https://www.bamf.de/EN/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Niederlassung/niederlassung-node.html" }],
  steps: [
    {
      title: "Check eligibility",
      description: "Standard requirements: 5 years of legal residence on certain permit types, adequate German language skills (B1), sufficient income (no reliance on welfare), pension contributions paid, clean criminal record, and a valid current permit.",
      estimated_duration: "1 week",
      checklist_items: [
        { label: "5 years of continuous legal residence confirmed", item_type: "action" },
        { label: "Current permit type checked (must be an eligible permit category)", item_type: "document" },
        { label: "No welfare benefits (Bürgergeld/Sozialhilfe) received", item_type: "action" },
        { label: "German language level B1 or higher confirmed", item_type: "action" },
        { label: "Pension insurance contributions history confirmed", item_type: "action" },
      ],
    },
    {
      title: "Gather documents",
      description: "Collect all supporting documents. Requirements vary slightly by Ausländerbehörde.",
      estimated_duration: "1–2 weeks",
      checklist_items: [
        { label: "Valid passport", item_type: "document" },
        { label: "Current residence permit", item_type: "document" },
        { label: "Proof of income (recent payslips, employment contract)", item_type: "document" },
        { label: "German language certificate (B1 or integration course completion)", item_type: "document" },
        { label: "Pension insurance statement (Rentenversicherungsverlauf)", item_type: "document" },
        { label: "Criminal record clearance (Führungszeugnis)", item_type: "document" },
        { label: "Rental contract and registration confirmation (Meldebescheinigung)", item_type: "document" },
        { label: "Biometric photos", item_type: "document" },
      ],
    },
    {
      title: "Apply at Ausländerbehörde",
      description: "Submit your application in person at the local foreigners' authority.",
      estimated_duration: "4–12 weeks",
      checklist_items: [
        { label: "Appointment booked at Ausländerbehörde", item_type: "appointment" },
        { label: "All documents submitted at appointment", item_type: "action" },
        { label: "Application fee paid (approx. €113)", item_type: "payment" },
        { label: "Receipt / interim permit received while waiting", item_type: "document" },
        { label: "Niederlassungserlaubnis card collected", item_type: "action" },
      ],
    },
  ],
};

const germanyAnmeldung: ProcessTemplate = {
  id: "de_anmeldung",
  keywords: ["anmeldung", "register address germany", "einwohnermeldeamt", "registration germany", "meldebescheinigung", "address registration", "residence registration germany"],
  destination_country: "Germany",
  jurisdiction: "Germany",
  authority_name: "Einwohnermeldeamt (Bürgeramt)",
  title: "Address Registration (Anmeldung) — Germany",
  summary: "Everyone living in Germany must register their address at the local Einwohnermeldeamt (citizens' office) within 14 days of moving in. You will receive a Meldebescheinigung (registration confirmation), which is needed for almost everything else.",
  timeline_summary: "The registration itself takes minutes at the office. Getting an appointment can take a few days to several weeks in large cities.",
  next_action: "Book an appointment at your local Bürgeramt/Einwohnermeldeamt as soon as you have a fixed address.",
  official_sources: [{ title: "Berlin.de — Anmeldung (example)", url: "https://www.berlin.de/einwanderung/en/living/registration/" }],
  steps: [
    {
      title: "Find your local Einwohnermeldeamt",
      description: "The relevant office depends on the district (Bezirk) of your address. Search '[your city] Bürgeramt Anmeldung' to find the right office and book online.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Local Bürgeramt/Einwohnermeldeamt identified", item_type: "action" },
        { label: "Appointment booked (online or by phone)", item_type: "appointment" },
      ],
    },
    {
      title: "Attend appointment",
      description: "Bring your completed registration form and required documents.",
      estimated_duration: "30 minutes",
      checklist_items: [
        { label: "Registration form (Anmeldeformular) completed", item_type: "document" },
        { label: "Valid passport or national ID card", item_type: "document" },
        { label: "Landlord confirmation (Wohnungsgeberbestätigung) — required since 2015", item_type: "document" },
        { label: "Appointment attended", item_type: "appointment" },
        { label: "Meldebescheinigung (registration confirmation) received", item_type: "document" },
      ],
    },
    {
      title: "Use Meldebescheinigung for other registrations",
      description: "The Meldebescheinigung is required for opening a bank account, applying for a tax ID, registering with health insurance, and applying for a residence permit.",
      estimated_duration: "Ongoing",
      checklist_items: [
        { label: "Bank account opened with Meldebescheinigung", item_type: "action" },
        { label: "Tax ID (Steueridentifikationsnummer) received by post (automatic, ~2 weeks)", item_type: "document" },
        { label: "Health insurance enrolled", item_type: "action" },
        { label: "Residence permit application started at Ausländerbehörde (if non-EU)", item_type: "action" },
      ],
    },
  ],
};

const germanyFreelanceVisa: ProcessTemplate = {
  id: "de_freelance_visa",
  keywords: ["freelance visa germany", "freiberufler", "self-employed germany", "freelancer germany", "niederlassungserlaubnis selbständig", "freiberuflich visa", "creative visa germany"],
  destination_country: "Germany",
  jurisdiction: "Germany",
  authority_name: "German Embassy / Ausländerbehörde",
  title: "Freelance / Self-Employment Visa — Germany",
  summary: "Germany offers a residence permit for freelancers (Freiberufler) and the self-employed. Freelancers in regulated professions (artists, writers, journalists, engineers, teachers) have a clearer path than commercial self-employment.",
  timeline_summary: "Embassy processing takes 4–12 weeks. Initial permit is typically issued for 1–3 years.",
  next_action: "Identify whether your activity qualifies as a liberal profession (freier Beruf) or commercial self-employment (Gewerbe), as the requirements differ.",
  official_sources: [{ title: "Make it in Germany — Self-employment", url: "https://www.make-it-in-germany.com/en/working-in-germany/self-employed" }],
  steps: [
    {
      title: "Determine your activity type",
      description: "Liberal professions (freie Berufe) include artists, writers, musicians, journalists, architects, doctors, lawyers, engineers, and teachers. Commercial self-employment requires additional trade registration (Gewerbeanmeldung).",
      estimated_duration: "1 week",
      checklist_items: [
        { label: "Activity classified: liberal profession or commercial self-employment", item_type: "action" },
        { label: "Relevant professional association or chamber contacted if applicable", item_type: "action" },
      ],
    },
    {
      title: "Prepare business concept and financial projections",
      description: "You need a viable business plan showing clients, expected income, and German market demand for your services.",
      estimated_duration: "2–4 weeks",
      checklist_items: [
        { label: "Business plan (Geschäftsplan) written", item_type: "document" },
        { label: "Existing client letters of intent or contracts (strongly recommended)", item_type: "document" },
        { label: "Financial projections for first 2 years", item_type: "document" },
        { label: "Professional portfolio or credentials", item_type: "document" },
      ],
    },
    {
      title: "Apply at German embassy",
      description: "Apply for a national visa (D visa) for self-employment at the German embassy in your home country.",
      estimated_duration: "4–12 weeks",
      checklist_items: [
        { label: "Embassy appointment booked", item_type: "appointment" },
        { label: "Valid passport", item_type: "document" },
        { label: "Business plan and client letters submitted", item_type: "document" },
        { label: "Proof of professional qualifications", item_type: "document" },
        { label: "Health insurance proof", item_type: "document" },
        { label: "Proof of sufficient funds to start", item_type: "document" },
        { label: "Visa fee paid (€75)", item_type: "payment" },
      ],
    },
    {
      title: "Arrive, register, and obtain residence permit",
      description: "After arrival, complete Anmeldung and apply for a residence permit for self-employment at the Ausländerbehörde.",
      estimated_duration: "First 3 weeks",
      checklist_items: [
        { label: "Anmeldung (address registration) completed", item_type: "action" },
        { label: "Trade registration (Gewerbeanmeldung) filed if commercial self-employment", item_type: "action" },
        { label: "Business bank account opened", item_type: "action" },
        { label: "Residence permit applied for at Ausländerbehörde", item_type: "action" },
      ],
    },
  ],
};

const germanyCitizenship: ProcessTemplate = {
  id: "de_citizenship",
  keywords: ["german citizenship", "einbürgerung", "naturalisation germany", "become german", "german passport", "german nationality", "staatsbürgerschaft"],
  destination_country: "Germany",
  jurisdiction: "Germany",
  authority_name: "Einbürgerungsbehörde (Naturalisation Office)",
  title: "German Citizenship by Naturalisation (Einbürgerung)",
  summary: "After living in Germany for 5 years (reduced to 3 for exceptional integration), legal residents can apply for German citizenship. Germany now allows dual citizenship.",
  timeline_summary: "Processing typically takes 12–24 months depending on the state and workload.",
  next_action: "Check your years of legal residence and whether you meet the income, language, and integration requirements.",
  official_sources: [{ title: "BAMF — Naturalisation", url: "https://www.bamf.de/EN/Themen/Integration/Einbuergerung/einbuergerung-node.html" }],
  steps: [
    {
      title: "Check eligibility",
      description: "Standard: 5 years legal residence, B1 German (C1 preferred), self-sufficient income, no serious criminal convictions, renunciation of prior citizenship (exceptions apply — Germany now widely accepts dual citizenship).",
      estimated_duration: "1 week",
      checklist_items: [
        { label: "5 years (or 3 years with exceptional integration) of legal residence confirmed", item_type: "action" },
        { label: "No reliance on welfare benefits", item_type: "action" },
        { label: "German language level B1+ confirmed", item_type: "action" },
        { label: "No significant criminal record", item_type: "action" },
        { label: "Dual citizenship situation reviewed (Germany generally permits it now)", item_type: "action" },
      ],
    },
    {
      title: "Gather documents",
      description: "The required documents list is extensive. Your local naturalisation office may have a specific checklist.",
      estimated_duration: "4–8 weeks",
      checklist_items: [
        { label: "Valid passport", item_type: "document" },
        { label: "Current residence permit", item_type: "document" },
        { label: "Meldebescheinigung (current registration)", item_type: "document" },
        { label: "Proof of income / employment (last 3 payslips)", item_type: "document" },
        { label: "German language certificate (B1 or integration course graduation)", item_type: "document" },
        { label: "Criminal record clearance (Führungszeugnis, €13)", item_type: "document" },
        { label: "Birth certificate (apostilled + translated if not German)", item_type: "document" },
        { label: "Marriage/divorce certificates if applicable", item_type: "document" },
        { label: "Pension insurance record", item_type: "document" },
      ],
    },
    {
      title: "Submit application to naturalisation office",
      description: "Submit to the Einbürgerungsbehörde in your city/district. Some offices allow online pre-registration.",
      estimated_duration: "12–24 months processing",
      checklist_items: [
        { label: "Appointment at Einbürgerungsbehörde booked", item_type: "appointment" },
        { label: "Application form completed and submitted", item_type: "action" },
        { label: "Application fee paid (€255, reduced to €51 for minors)", item_type: "payment" },
        { label: "Naturalisation certificate (Einbürgerungsurkunde) received", item_type: "document" },
        { label: "German passport applied for", item_type: "action" },
      ],
    },
  ],
};

const germanyRecognition: ProcessTemplate = {
  id: "de_qualification_recognition",
  keywords: ["anerkennung", "qualification recognition germany", "foreign qualification germany", "anabin", "zab", "nostrification", "foreign degree germany", "berufsanerkennung"],
  destination_country: "Germany",
  jurisdiction: "Germany",
  authority_name: "Relevant competent authority (varies by profession)",
  title: "Foreign Qualification Recognition — Germany",
  summary: "Foreign professional and academic qualifications can be recognised in Germany to allow you to work in regulated professions or have your degree accepted. The process depends on the profession and the country of origin.",
  timeline_summary: "Recognition processes range from a few weeks (academic equivalency) to 12+ months (regulated professions requiring assessments).",
  next_action: "Use the Recognition Finder at anerkennung-in-deutschland.de to identify the correct authority and procedure for your qualification.",
  official_sources: [{ title: "Anerkennung in Deutschland — Recognition Finder", url: "https://www.anerkennung-in-deutschland.de/en" }],
  steps: [
    {
      title: "Identify your qualification type and competent authority",
      description: "Regulated professions (doctors, nurses, teachers, engineers in certain roles) require formal recognition. Non-regulated professions can use recognition for labour market advantage. Use the Recognition Finder tool to find the right authority.",
      estimated_duration: "1–3 days",
      checklist_items: [
        { label: "Profession classified as regulated or non-regulated", item_type: "action" },
        { label: "Competent authority identified via anerkennung-in-deutschland.de", item_type: "action" },
        { label: "Recognition Finder checklist downloaded", item_type: "document" },
      ],
    },
    {
      title: "Have documents translated and apostilled",
      description: "All foreign documents must be officially translated into German by a certified translator and, where required, apostilled.",
      estimated_duration: "2–6 weeks",
      checklist_items: [
        { label: "Original diplomas/certificates gathered", item_type: "document" },
        { label: "Transcripts (academic records) obtained", item_type: "document" },
        { label: "Certified German translation completed", item_type: "document" },
        { label: "Apostille obtained from issuing country (if required)", item_type: "document" },
      ],
    },
    {
      title: "Submit recognition application",
      description: "Submit to the competent authority. For academic degrees, ZAB (Central Office for Foreign Education) or anabin database may suffice.",
      estimated_duration: "Varies (weeks to months)",
      checklist_items: [
        { label: "Application submitted to competent authority", item_type: "action" },
        { label: "Application fee paid (varies by authority and profession)", item_type: "payment" },
        { label: "Recognition notice (Anerkennungsbescheid) or equivalency statement received", item_type: "document" },
      ],
    },
    {
      title: "Complete any compensation measures if required",
      description: "For regulated professions, if there are qualification gaps, you may need to complete an adaptation course (Anpassungslehrgang) or aptitude test (Eignungsprüfung).",
      estimated_duration: "3–12 months (if applicable)",
      checklist_items: [
        { label: "Compensation measure requirement noted (if any)", item_type: "action" },
        { label: "Adaptation course or aptitude test completed (if required)", item_type: "action" },
        { label: "Full recognition certificate issued", item_type: "document" },
      ],
    },
  ],
};

// ── Netherlands ────────────────────────────────────────────────────────────

const netherlandsHighlySkilledMigrant: ProcessTemplate = {
  id: "nl_highly_skilled_migrant",
  keywords: ["netherlands work", "holland work", "dutch work permit", "highly skilled migrant", "kennismigrant", "amsterdam job", "netherlands employment", "dutch employer"],
  destination_country: "Netherlands",
  jurisdiction: "Netherlands",
  authority_name: "IND (Immigration and Naturalisation Service)",
  title: "Highly Skilled Migrant Permit — Netherlands",
  summary: "Work and residence permit for non-EU/EEA skilled workers with a job offer from an IND-recognised sponsor employer. One of the fastest routes to the Netherlands.",
  timeline_summary: "Your employer applies first. IND decides within 2 weeks for recognised sponsors.",
  next_action: "Confirm your employer is an IND-recognised sponsor, then have them initiate the application.",
  official_sources: [{ title: "IND — Highly Skilled Migrant", url: "https://ind.nl/en/residence-permits/work/highly-skilled-migrant" }],
  steps: [
    {
      title: "Employer initiates application with IND",
      description: "Your employer must be an IND-recognised sponsor and submit the application on your behalf.",
      estimated_duration: "1–2 weeks",
      checklist_items: [
        { label: "Employer confirmed as IND recognised sponsor", item_type: "action" },
        { label: "Salary meets HSM threshold confirmed (€5,331/month gross in 2024 for 30+)", item_type: "action" },
        { label: "Employer submits application to IND", item_type: "action" },
      ],
    },
    {
      title: "Gather personal documents",
      description: "Provide identity documents to your employer for submission.",
      estimated_duration: "1 week",
      checklist_items: [
        { label: "Valid passport", item_type: "document" },
        { label: "Degree certificates (if applicable)", item_type: "document" },
        { label: "Signed employment contract", item_type: "document" },
      ],
    },
    {
      title: "IND issues MVV / entry visa (if required)",
      description: "If you need a short-stay visa to enter the Netherlands, IND issues an MVV (provisional residence permit).",
      estimated_duration: "2 weeks (recognised sponsors)",
      checklist_items: [
        { label: "MVV / entry visa received (if applicable)", item_type: "document" },
        { label: "Travel to Netherlands completed", item_type: "action" },
      ],
    },
    {
      title: "Register and collect residence permit",
      description: "After arrival, register at the municipality and collect your residence permit card from IND.",
      estimated_duration: "2–4 weeks",
      checklist_items: [
        { label: "Registered at municipality (gemeente)", item_type: "action" },
        { label: "BSN (citizen service number) obtained", item_type: "action" },
        { label: "Residence permit card collected from IND desk", item_type: "document" },
      ],
    },
  ],
};

// ── Ireland ────────────────────────────────────────────────────────────────

const irelandCriticalSkills: ProcessTemplate = {
  id: "ie_critical_skills",
  keywords: ["ireland work", "irish work permit", "critical skills ireland", "dublin job", "ireland employment permit", "work in ireland", "ireland tech job"],
  destination_country: "Ireland",
  jurisdiction: "Ireland",
  authority_name: "Department of Enterprise, Trade and Employment (DETE)",
  title: "Critical Skills Employment Permit — Ireland",
  summary: "Fast-track work permit for non-EEA nationals in high-demand occupations (tech, healthcare, engineering). Valid for 2 years, renewable.",
  timeline_summary: "Online application via DETE portal. Processing typically 4–8 weeks.",
  next_action: "Check that your occupation is on the Critical Skills Occupations List and that your salary meets the threshold (€38,000+).",
  official_sources: [{ title: "DETE — Critical Skills Employment Permit", url: "https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/permit-types/critical-skills-employment-permit/" }],
  steps: [
    {
      title: "Confirm eligibility",
      description: "Job must be on the Critical Skills Occupations List (or pay €64,000+ regardless of role). Requires a degree or equivalent.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Occupation on Critical Skills list confirmed", item_type: "action" },
        { label: "Salary meets threshold (€38,000+ or €64,000+)", item_type: "action" },
        { label: "Degree or equivalent qualification confirmed", item_type: "action" },
      ],
    },
    {
      title: "Gather documents",
      estimated_duration: "1–2 weeks",
      description: "Collect all required documents for the online application.",
      checklist_items: [
        { label: "Valid passport", item_type: "document" },
        { label: "Signed contract of employment", item_type: "document" },
        { label: "Degree certificate + translation (if not in English)", item_type: "document" },
        { label: "Tax clearance / compliance documentation (employer)", item_type: "document" },
      ],
    },
    {
      title: "Apply online via DETE portal",
      description: "The application can be submitted by the employer or the applicant. Pay the fee online.",
      estimated_duration: "4–8 weeks processing",
      checklist_items: [
        { label: "Online application submitted at dete.ie", item_type: "action" },
        { label: "Application fee paid (€1,000 for 2-year permit)", item_type: "payment" },
        { label: "Permit letter received", item_type: "document" },
      ],
    },
    {
      title: "Entry visa and registration in Ireland",
      description: "Use the permit letter to apply for an entry visa (if required). Register with GNIB/IRP within 90 days of arrival.",
      estimated_duration: "2–4 weeks",
      checklist_items: [
        { label: "Entry visa applied for (if required)", item_type: "action" },
        { label: "Travel to Ireland completed", item_type: "action" },
        { label: "IRP (Irish Residence Permit) registered within 90 days", item_type: "appointment" },
      ],
    },
  ],
};

// ── Australia ──────────────────────────────────────────────────────────────

const australiaSkilledIndependent: ProcessTemplate = {
  id: "au_skilled_independent_189",
  keywords: ["australia work visa", "australia skilled", "skilled independent australia", "subclass 189", "189 visa", "australia permanent residency", "move to australia", "au work permit"],
  destination_country: "Australia",
  jurisdiction: "Australia",
  authority_name: "Department of Home Affairs",
  title: "Skilled Independent Visa (Subclass 189) — Australia",
  summary: "Points-tested permanent residency visa for skilled workers not sponsored by an employer or family member. No sponsor required.",
  timeline_summary: "Submit an Expression of Interest (EOI) via SkillSelect. Invitation to apply typically issued within 1–24 months depending on points score.",
  next_action: "Get your skills assessed by the relevant assessing authority and calculate your points score.",
  official_sources: [{ title: "Home Affairs — Subclass 189", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189" }],
  steps: [
    {
      title: "Skills assessment",
      description: "Have your qualifications assessed by the relevant Australian assessing body for your occupation.",
      estimated_duration: "4–12 weeks",
      checklist_items: [
        { label: "Relevant assessing authority identified (e.g. Engineers Australia, ACS, AHPRA)", item_type: "action" },
        { label: "Skills assessment application submitted", item_type: "action" },
        { label: "Positive skills assessment received", item_type: "document" },
      ],
    },
    {
      title: "English language test",
      description: "Sit an approved English test (IELTS, PTE, TOEFL) and achieve the required score.",
      estimated_duration: "2–4 weeks",
      checklist_items: [
        { label: "English test booked (IELTS / PTE / TOEFL)", item_type: "appointment" },
        { label: "Required score achieved", item_type: "document" },
      ],
    },
    {
      title: "Submit Expression of Interest (EOI) in SkillSelect",
      description: "Create an EOI online. You will be ranked by points. Higher scores receive invitations faster.",
      estimated_duration: "1 day (then wait for invitation)",
      checklist_items: [
        { label: "EOI submitted in SkillSelect", item_type: "action" },
        { label: "Points score maximised (age, English, work experience, education)", item_type: "action" },
        { label: "Invitation to Apply (ITA) received", item_type: "document" },
      ],
    },
    {
      title: "Lodge visa application",
      description: "After receiving an ITA, you have 60 days to lodge the full application online and pay the fee.",
      estimated_duration: "8–18 months processing",
      checklist_items: [
        { label: "Full visa application lodged online (within 60 days of ITA)", item_type: "action" },
        { label: "Visa application fee paid (AUD $4,640 primary applicant)", item_type: "payment" },
        { label: "Health examination completed", item_type: "appointment" },
        { label: "Police clearance certificates provided", item_type: "document" },
        { label: "Visa grant received", item_type: "document" },
      ],
    },
  ],
};

// ── Canada ─────────────────────────────────────────────────────────────────

const canadaExpressEntry: ProcessTemplate = {
  id: "ca_express_entry",
  keywords: ["canada work visa", "canada immigration", "express entry", "federal skilled worker canada", "canada permanent residency", "canadian work permit", "canada pr", "move to canada"],
  destination_country: "Canada",
  jurisdiction: "Canada",
  authority_name: "Immigration, Refugees and Citizenship Canada (IRCC)",
  title: "Express Entry — Federal Skilled Worker (Canada)",
  summary: "Points-based permanent residency pathway for skilled workers. Managed through the Express Entry pool. No employer or provincial sponsor required.",
  timeline_summary: "IRCC targets a 6-month processing time after invitation to apply. Wait for invitation varies by CRS score.",
  next_action: "Check your eligibility (NOC TEER 0-3 occupation, language test, and 1 year skilled work experience), then create an Express Entry profile.",
  official_sources: [{ title: "IRCC — Express Entry", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html" }],
  steps: [
    {
      title: "Language test",
      description: "Sit an approved test (IELTS General or CELPIP for English; TEF Canada for French) and meet CLB 7 minimum.",
      estimated_duration: "2–4 weeks",
      checklist_items: [
        { label: "Language test booked (IELTS / CELPIP / TEF)", item_type: "appointment" },
        { label: "CLB 7 or higher achieved", item_type: "document" },
      ],
    },
    {
      title: "Educational Credential Assessment (ECA)",
      description: "Have foreign education assessed by a IRCC-designated organisation (e.g. WES).",
      estimated_duration: "4–12 weeks",
      checklist_items: [
        { label: "ECA organisation selected (e.g. WES, ICAS)", item_type: "action" },
        { label: "ECA application submitted", item_type: "action" },
        { label: "ECA report received", item_type: "document" },
      ],
    },
    {
      title: "Create Express Entry profile",
      description: "Submit your profile to the Express Entry pool. You will receive a Comprehensive Ranking System (CRS) score.",
      estimated_duration: "1 day (then wait for draw)",
      checklist_items: [
        { label: "Express Entry profile created on IRCC portal", item_type: "action" },
        { label: "CRS score calculated and noted", item_type: "action" },
        { label: "Invitation to Apply (ITA) received at a draw", item_type: "document" },
      ],
    },
    {
      title: "Submit application for permanent residence",
      description: "After ITA, submit a complete application within 60 days. IRCC targets 6-month processing.",
      estimated_duration: "6 months processing",
      checklist_items: [
        { label: "Full application submitted (within 60 days of ITA)", item_type: "action" },
        { label: "Application fee paid (CAD $1,365 + right of permanent residence fee CAD $515)", item_type: "payment" },
        { label: "Medical exam completed", item_type: "appointment" },
        { label: "Police clearance certificates provided", item_type: "document" },
        { label: "Confirmation of Permanent Residence (COPR) received", item_type: "document" },
      ],
    },
  ],
};

// ── USA ────────────────────────────────────────────────────────────────────

const usaJ1InternTrainee: ProcessTemplate = {
  id: "us_j1_intern_trainee",
  keywords: ["usa intern", "us internship", "j1 visa", "j-1 intern", "exchange visitor usa", "intern united states", "trainee usa", "us exchange program"],
  destination_country: "United States",
  jurisdiction: "United States",
  authority_name: "U.S. Department of State / USCIS",
  title: "J-1 Intern / Trainee Visa — USA",
  summary: "Exchange visitor visa for internships (current students/recent graduates, up to 12 months) or trainee programs (professionals, up to 18 months) in the USA.",
  timeline_summary: "Apply at least 2–3 months before start date. DS-160 + embassy interview required.",
  next_action: "Secure a sponsor organisation (designated programme sponsor) who will issue your DS-2019 form.",
  official_sources: [{ title: "U.S. Dept of State — J-1 Visa", url: "https://j1visa.state.gov/programs/intern" }],
  steps: [
    {
      title: "Secure a J-1 sponsor organisation",
      description: "You must work through a U.S. Department of State designated sponsor who issues the DS-2019.",
      estimated_duration: "2–6 weeks",
      checklist_items: [
        { label: "Designated sponsor organisation identified and agreed", item_type: "action" },
        { label: "DS-2019 (Certificate of Eligibility) received from sponsor", item_type: "document" },
        { label: "SEVIS fee paid ($35 intern / $220 trainee) at FMJfee.com", item_type: "payment" },
      ],
    },
    {
      title: "Complete DS-160 application and pay visa fee",
      description: "Complete the DS-160 online, pay the MRV fee, and schedule a U.S. embassy interview.",
      estimated_duration: "1–2 weeks",
      checklist_items: [
        { label: "DS-160 application completed online", item_type: "action" },
        { label: "MRV visa fee paid ($185)", item_type: "payment" },
        { label: "Embassy appointment scheduled", item_type: "appointment" },
      ],
    },
    {
      title: "Embassy / consulate interview",
      description: "Attend the interview at the U.S. embassy in your country with all required documents.",
      estimated_duration: "1–3 weeks to get appointment",
      checklist_items: [
        { label: "Valid passport brought", item_type: "document" },
        { label: "DS-2019 and SEVIS fee receipt brought", item_type: "document" },
        { label: "DS-160 confirmation page brought", item_type: "document" },
        { label: "Proof of ties to home country", item_type: "document" },
        { label: "Interview attended; J-1 visa stamp in passport", item_type: "appointment" },
      ],
    },
    {
      title: "Travel to USA and SEVIS activation",
      description: "Enter the USA no earlier than 30 days before your programme start date. Your sponsor activates your SEVIS record.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Entry to USA completed (port of entry)", item_type: "action" },
        { label: "SEVIS record activated by sponsor", item_type: "action" },
        { label: "Local address and emergency contact registered with sponsor", item_type: "action" },
      ],
    },
  ],
};

// ── Norway — UDI ───────────────────────────────────────────────────────────

const norwayWorkPermit: ProcessTemplate = {
  id: "no_work_permit",
  keywords: ["norway work permit", "work norway", "skilled worker norway", "arbeidsinnvandring", "oppholdstillatelse arbeid", "norway employment", "job norway"],
  destination_country: "Norway",
  jurisdiction: "Norway",
  authority_name: "UDI (Norwegian Directorate of Immigration)",
  title: "Skilled Worker Residence Permit — Norway",
  summary: "Non-EU/EEA nationals who have received a job offer in Norway can apply for a residence permit as a skilled worker (faglært). The employer must confirm the offer meets Norwegian salary and conditions standards.",
  timeline_summary: "Processing typically takes 2–4 months. Apply before travelling to Norway.",
  next_action: "Confirm your job offer meets UDI's skilled worker criteria and gather your documents.",
  official_sources: [{ title: "UDI — Skilled worker", url: "https://www.udi.no/en/want-to-apply/work-immigration/skilled-workers-from-countries-outside-the-eea-and-switzerland/" }],
  steps: [
    {
      title: "Confirm job offer qualifies",
      description: "Your offer must be full-time (or at least part-time with sufficient salary), within a profession requiring skills, and pay at least the standard Norwegian wage for the role. The employer must be registered in Norway.",
      estimated_duration: "1 week",
      checklist_items: [
        { label: "Job offer letter received", item_type: "document" },
        { label: "Salary meets Norwegian standard for profession confirmed", item_type: "action" },
        { label: "Employer registered in Norwegian business registry (Brønnøysund)", item_type: "action" },
      ],
    },
    {
      title: "Apply online via UDI",
      description: "Submit your application online at udi.no before arriving in Norway. Pay the application fee online.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "UDI online application completed at udi.no", item_type: "action" },
        { label: "Application fee paid (NOK 6,300 approx.)", item_type: "payment" },
        { label: "Application reference number saved", item_type: "action" },
      ],
    },
    {
      title: "Submit biometrics at Norwegian embassy",
      description: "After applying online, you must appear in person at a Norwegian embassy or consulate to submit biometrics and original documents.",
      estimated_duration: "Appointment dependent",
      checklist_items: [
        { label: "Embassy appointment booked", item_type: "appointment" },
        { label: "Valid passport", item_type: "document" },
        { label: "Signed employment contract", item_type: "document" },
        { label: "Educational certificates / diploma confirming skilled status", item_type: "document" },
        { label: "Biometrics (fingerprints and photo) submitted at embassy", item_type: "action" },
      ],
    },
    {
      title: "Await decision and travel",
      description: "UDI processes the application. If approved, you receive an approval letter and must collect your residence card in Norway.",
      estimated_duration: "2–4 months",
      checklist_items: [
        { label: "Approval decision received", item_type: "document" },
        { label: "Travel to Norway within approval period", item_type: "action" },
        { label: "Residence card (oppholdskort) collected at police station in Norway", item_type: "action" },
        { label: "National identity number (fødselsnummer) applied for at Skatteetaten", item_type: "action" },
      ],
    },
  ],
};

const norwayStudentPermit: ProcessTemplate = {
  id: "no_student_permit",
  keywords: ["norway student visa", "study norway", "student permit norway", "university norway", "studietillatelse", "norwegian university", "higher education norway"],
  destination_country: "Norway",
  jurisdiction: "Norway",
  authority_name: "UDI (Norwegian Directorate of Immigration)",
  title: "Student Residence Permit — Norway",
  summary: "Non-EU/EEA nationals accepted at a Norwegian university or higher education institution must apply for a student residence permit before arriving in Norway.",
  timeline_summary: "Apply as early as possible — processing can take 2–4 months.",
  next_action: "Secure your admission letter from a Norwegian institution before applying.",
  official_sources: [{ title: "UDI — Student permit", url: "https://www.udi.no/en/want-to-apply/studies/" }],
  steps: [
    {
      title: "Get admission to a Norwegian institution",
      description: "Apply and receive acceptance from a Norwegian university or university college. Norwegian universities offer many English-taught programmes.",
      estimated_duration: "1–4 months",
      checklist_items: [
        { label: "Norwegian institution identified (universities, university colleges)", item_type: "action" },
        { label: "Application submitted", item_type: "action" },
        { label: "Admission letter (opptaksbrev) received", item_type: "document" },
      ],
    },
    {
      title: "Apply online via UDI",
      description: "Submit the student residence permit application online at udi.no before arriving in Norway.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "UDI online application submitted", item_type: "action" },
        { label: "Application fee paid (approx. NOK 5,900)", item_type: "payment" },
        { label: "Proof of sufficient funds attached (NOK ~116,369/year or equivalent)", item_type: "document" },
        { label: "Admission letter attached", item_type: "document" },
      ],
    },
    {
      title: "Submit documents at Norwegian embassy",
      description: "Appear at the nearest Norwegian embassy with original documents and biometrics.",
      estimated_duration: "Appointment dependent",
      checklist_items: [
        { label: "Embassy appointment booked", item_type: "appointment" },
        { label: "Valid passport", item_type: "document" },
        { label: "Biometrics submitted at embassy", item_type: "action" },
      ],
    },
    {
      title: "Arrive and register",
      description: "After arriving in Norway with your permit, register with the police and Skatteetaten to get your identity number.",
      estimated_duration: "First 2 weeks",
      checklist_items: [
        { label: "Registered with police within 1 week of arrival", item_type: "action" },
        { label: "D-number or fødselsnummer applied for at Skatteetaten", item_type: "action" },
        { label: "Enrolled at institution and student ID received", item_type: "action" },
      ],
    },
  ],
};

const norwayFamilyImmigration: ProcessTemplate = {
  id: "no_family_immigration",
  keywords: ["norway family reunification", "family visa norway", "spouse norway", "familieinnvandring", "join family norway", "dependent visa norway"],
  destination_country: "Norway",
  jurisdiction: "Norway",
  authority_name: "UDI (Norwegian Directorate of Immigration)",
  title: "Family Immigration — Norway",
  summary: "Spouses, registered partners, cohabitants, and children of Norwegian residents can apply for a family immigration permit (familieinnvandring).",
  timeline_summary: "Processing takes 3–8 months on average.",
  next_action: "Check that your sponsor meets the income requirement (underholdskravet) before applying.",
  official_sources: [{ title: "UDI — Family immigration", url: "https://www.udi.no/en/want-to-apply/family-immigration/" }],
  steps: [
    {
      title: "Sponsor confirms income requirement",
      description: "The person in Norway (reference person) must have had sufficient income the previous year and be expected to have sufficient income going forward. The amount is updated annually.",
      estimated_duration: "1 week",
      checklist_items: [
        { label: "Sponsor's income last year checked against UDI threshold", item_type: "action" },
        { label: "Sponsor's income documentation gathered (tax return, payslips)", item_type: "document" },
      ],
    },
    {
      title: "Apply online",
      description: "The applicant (or the reference person on their behalf) submits the application online at udi.no.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Online application submitted at udi.no", item_type: "action" },
        { label: "Application fee paid (NOK 10,700 approx. for spouse)", item_type: "payment" },
        { label: "Relationship documentation uploaded (marriage certificate, photos)", item_type: "document" },
      ],
    },
    {
      title: "Attend embassy interview",
      description: "The applicant must attend an interview at the Norwegian embassy in their home country. Both partners may be interviewed separately to verify the relationship.",
      estimated_duration: "Appointment dependent",
      checklist_items: [
        { label: "Embassy appointment booked", item_type: "appointment" },
        { label: "Valid passport brought", item_type: "document" },
        { label: "Marriage certificate or proof of relationship (apostilled)", item_type: "document" },
        { label: "Biometrics submitted", item_type: "action" },
        { label: "Interview attended", item_type: "appointment" },
      ],
    },
    {
      title: "Await decision and travel",
      description: "If approved, travel to Norway and register with the police.",
      estimated_duration: "3–8 months",
      checklist_items: [
        { label: "Approval received", item_type: "document" },
        { label: "Travel to Norway arranged", item_type: "action" },
        { label: "Registered with local police in Norway", item_type: "action" },
        { label: "Residence card collected", item_type: "action" },
      ],
    },
  ],
};

const norwayEEARegistration: ProcessTemplate = {
  id: "no_eea_registration",
  keywords: ["eu eea norway", "eu citizen norway", "registration norway eu", "registreringsbevis", "right of residence norway", "nordic passport", "eea right norway"],
  destination_country: "Norway",
  jurisdiction: "Norway",
  authority_name: "UDI / Local police",
  title: "EU/EEA Registration Certificate — Norway",
  summary: "EU/EEA citizens can live and work in Norway freely but must register with the police after 3 months. The registration certificate (registreringsbevis) documents your right of residence.",
  timeline_summary: "Registration can be done within days of arriving. Appointment wait varies by region.",
  next_action: "Ensure you have a qualifying basis (work, study, self-sufficiency) and book a police registration appointment.",
  official_sources: [{ title: "UDI — EEA registration", url: "https://www.udi.no/en/want-to-apply/eea-and-switzerland/" }],
  steps: [
    {
      title: "Confirm you have a qualifying basis",
      description: "You must be a worker, self-employed, student, self-sufficient person, or family member of one of the above.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "EU/EEA passport or national ID confirmed", item_type: "document" },
        { label: "Qualifying basis confirmed: employment contract, enrolment letter, or proof of funds", item_type: "document" },
      ],
    },
    {
      title: "Register at a police station",
      description: "Attend a police station (politistasjon) that handles immigration registration. Bring all original documents.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Police station appointment booked (some allow walk-ins)", item_type: "appointment" },
        { label: "Valid EU/EEA passport or national ID", item_type: "document" },
        { label: "Proof of basis: employment contract / enrolment letter / bank statements", item_type: "document" },
        { label: "Completed registration form", item_type: "document" },
        { label: "Registration certificate (registreringsbevis) received", item_type: "document" },
      ],
    },
    {
      title: "Apply for D-number or national identity number",
      description: "To receive pay, pay taxes, and access services, you need a D-number (for short stays) or a fødselsnummer (national identity number for stays over 6 months). Apply at Skatteetaten.",
      estimated_duration: "1–4 weeks",
      checklist_items: [
        { label: "Skatteetaten office visited with registration certificate and passport", item_type: "action" },
        { label: "D-number or fødselsnummer received", item_type: "document" },
        { label: "Employer notified of tax number", item_type: "action" },
      ],
    },
  ],
};

const norwayPermanentResidence: ProcessTemplate = {
  id: "no_permanent_residence",
  keywords: ["permanent residence norway", "permanent opphold", "bosettingstillatelse", "settle norway", "indefinite norway", "long term norway"],
  destination_country: "Norway",
  jurisdiction: "Norway",
  authority_name: "UDI (Norwegian Directorate of Immigration)",
  title: "Permanent Residence Permit (Permanent Opphold) — Norway",
  summary: "After 3 years of legal residence in Norway (reduced from 5 for some), you may apply for a permanent residence permit (bosettingstillatelse). It gives the right to live and work in Norway indefinitely.",
  timeline_summary: "Processing takes 6–12 months.",
  next_action: "Confirm you have 3 years of continuous legal residence and meet the Norwegian language / social studies requirement.",
  official_sources: [{ title: "UDI — Permanent residence", url: "https://www.udi.no/en/want-to-apply/permanent-residence-permit/" }],
  steps: [
    {
      title: "Check eligibility",
      description: "You need 3 years of continuous legal residence, no serious criminal offences, no misuse of welfare benefits, and completion of 600 hours of Norwegian language and social studies (or passed a test).",
      estimated_duration: "1 week",
      checklist_items: [
        { label: "3 years of legal residence in Norway confirmed", item_type: "action" },
        { label: "No long breaks from Norway (less than 7 months total absence)", item_type: "action" },
        { label: "600 hours Norwegian language / social studies completed or test passed", item_type: "action" },
        { label: "No significant criminal record or welfare misuse", item_type: "action" },
      ],
    },
    {
      title: "Apply online at UDI",
      description: "Submit the application at udi.no. You can apply up to 1 year before you meet the 3-year requirement.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Online application submitted at udi.no", item_type: "action" },
        { label: "Application fee paid (approx. NOK 5,900)", item_type: "payment" },
        { label: "Language/social studies certificate uploaded", item_type: "document" },
        { label: "Residence history documentation uploaded", item_type: "document" },
      ],
    },
    {
      title: "Submit biometrics at police",
      description: "Attend the local police immigration unit to submit biometrics for the permanent residence card.",
      estimated_duration: "Appointment dependent",
      checklist_items: [
        { label: "Police appointment booked", item_type: "appointment" },
        { label: "Biometrics submitted", item_type: "action" },
        { label: "Decision letter received", item_type: "document" },
        { label: "Permanent residence card collected", item_type: "action" },
      ],
    },
  ],
};

const norwayCitizenship: ProcessTemplate = {
  id: "no_citizenship",
  keywords: ["norwegian citizenship", "norsk statsborgerskap", "naturalisation norway", "become norwegian", "norwegian passport", "norwegian nationality"],
  destination_country: "Norway",
  jurisdiction: "Norway",
  authority_name: "UDI (Norwegian Directorate of Immigration)",
  title: "Norwegian Citizenship by Naturalisation",
  summary: "After 7 years of legal residence in Norway (5 for spouses of Norwegian citizens), you can apply for Norwegian citizenship. Norway requires you to renounce prior citizenship in most cases.",
  timeline_summary: "Processing takes 12–20 months.",
  next_action: "Confirm you have completed the required residence years, language test, and are prepared to renounce prior citizenship if applicable.",
  official_sources: [{ title: "UDI — Norwegian citizenship", url: "https://www.udi.no/en/want-to-apply/citizenship/" }],
  steps: [
    {
      title: "Check eligibility",
      description: "Standard: 7 years in Norway (last 2 on permanent residence), passed Norwegian language test (B1 oral) or completed 600 hours Norwegian, no serious criminal record, renounce prior citizenship (exemptions exist for some countries and for those who cannot renounce).",
      estimated_duration: "1 week",
      checklist_items: [
        { label: "7 years legal residence confirmed", item_type: "action" },
        { label: "Permanent residence permit held for at least 1 year", item_type: "action" },
        { label: "Norwegian language test (B1 oral) passed or 600 hours completed", item_type: "action" },
        { label: "Citizenship renunciation reviewed (prior citizenship situation)", item_type: "action" },
      ],
    },
    {
      title: "Apply online",
      description: "Submit the application at udi.no.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Online application submitted", item_type: "action" },
        { label: "Application fee paid (approx. NOK 4,200)", item_type: "payment" },
        { label: "Language certificate uploaded", item_type: "document" },
        { label: "Residence history documentation uploaded", item_type: "document" },
      ],
    },
    {
      title: "Attend citizenship ceremony",
      description: "If approved, you will be invited to a citizenship ceremony where you pledge loyalty to Norway. After the ceremony, you can apply for a Norwegian passport.",
      estimated_duration: "12–20 months processing + ceremony",
      checklist_items: [
        { label: "Approval letter received", item_type: "document" },
        { label: "Citizenship ceremony attended and pledge made", item_type: "appointment" },
        { label: "Confirmation of citizenship issued", item_type: "document" },
        { label: "Norwegian passport applied for", item_type: "action" },
        { label: "Prior citizenship renounced if required", item_type: "action" },
      ],
    },
  ],
};

const norwayAsylum: ProcessTemplate = {
  id: "no_asylum",
  keywords: ["asylum norway", "refugee norway", "asyl norge", "asylsøker", "protection norway", "flee norway", "asylum seeker norway"],
  destination_country: "Norway",
  jurisdiction: "Norway",
  authority_name: "UDI / Politiet (Police)",
  title: "Asylum Application — Norway",
  summary: "Anyone in Norway who needs international protection can apply for asylum. You must apply as soon as possible after arrival. UDI investigates your case and makes a decision.",
  timeline_summary: "Processing times vary widely: from a few months to several years depending on case complexity and country of origin.",
  next_action: "Go to the nearest police station or border crossing and state that you wish to apply for asylum.",
  official_sources: [{ title: "UDI — Asylum", url: "https://www.udi.no/en/want-to-apply/protection-asylum/" }],
  steps: [
    {
      title: "Register asylum application with police",
      description: "Go to a police station (politistasjon) with an immigration unit, or to the National Arrival Centre (Nasjonalt ankomstsenter) in Råde. State clearly that you are applying for asylum.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Police station or arrival centre visited", item_type: "action" },
        { label: "Application registered and case number received", item_type: "action" },
        { label: "Any identity documents presented", item_type: "document" },
        { label: "Temporary accommodation assigned by UDI", item_type: "action" },
      ],
    },
    {
      title: "Asylum interview with UDI",
      description: "You will be called to an interview where you explain why you need protection. You have the right to an interpreter. You may bring a lawyer.",
      estimated_duration: "Scheduled by UDI",
      checklist_items: [
        { label: "Interview appointment received", item_type: "appointment" },
        { label: "Legal aid / lawyer arranged if needed", item_type: "action" },
        { label: "Interpreter language confirmed", item_type: "action" },
        { label: "Interview attended", item_type: "appointment" },
      ],
    },
    {
      title: "Await decision",
      description: "UDI assesses your case. If approved, you receive a protection permit. If rejected, you can appeal to the Immigration Appeals Board (UNE).",
      estimated_duration: "Months to years",
      checklist_items: [
        { label: "Decision letter received from UDI", item_type: "document" },
        { label: "If approved: residence permit received", item_type: "action" },
        { label: "If rejected: appeal deadline noted (3 weeks) and UNE appeal submitted if applicable", item_type: "action" },
      ],
    },
  ],
};

const norwayNorskprøven: ProcessTemplate = {
  id: "no_norskproven",
  keywords: ["norskprøven", "norwegian language test", "norwegian test", "norsk test", "language certificate norway", "b1 norwegian", "norsk eksamen"],
  destination_country: "Norway",
  jurisdiction: "Norway",
  authority_name: "Kompetanse Norge / Vox",
  title: "Norwegian Language Test (Norskprøven)",
  summary: "The Norskprøven is the official Norwegian language test required for permanent residence and citizenship. It tests reading, writing, listening, and speaking at levels A1–B2.",
  timeline_summary: "Tests are held several times per year. Registration closes several weeks before each test date.",
  next_action: "Register for the Norskprøven at kompetanse.no well before you need the result for your permit application.",
  official_sources: [{ title: "Kompetanse Norge — Norskprøven", url: "https://www.kompetansenorge.no/norsk-og-samfunnskunnskap/norskproven/" }],
  steps: [
    {
      title: "Find your test level and register",
      description: "Choose the appropriate test level (A1–A2, B1–B2). For permanent residence you need B1 oral; for citizenship you need B1 oral. Register at the municipality or adult education centre near you.",
      estimated_duration: "1 week",
      checklist_items: [
        { label: "Required test level identified (B1 oral for most immigration purposes)", item_type: "action" },
        { label: "Local test provider found (voksenopplæring / adult education centre)", item_type: "action" },
        { label: "Registration completed and confirmed", item_type: "action" },
        { label: "Test fee paid", item_type: "payment" },
      ],
    },
    {
      title: "Prepare for the test",
      description: "The test covers all four skills. Free preparation materials are available at norskprøven.no. Many municipalities offer free Norwegian courses (norskkurs).",
      estimated_duration: "Weeks to months",
      checklist_items: [
        { label: "Free practice materials used at norskproven.no", item_type: "action" },
        { label: "Norwegian course enrolled in if needed", item_type: "action" },
      ],
    },
    {
      title: "Take the test and receive results",
      description: "Written tests are held at designated centres; speaking tests are conducted at your adult education centre. Results are sent digitally.",
      estimated_duration: "Test day + 2–4 weeks for results",
      checklist_items: [
        { label: "Written test attended", item_type: "appointment" },
        { label: "Speaking test attended", item_type: "appointment" },
        { label: "Results certificate received digitally", item_type: "document" },
        { label: "Certificate saved for UDI/immigration applications", item_type: "document" },
      ],
    },
  ],
};

const norwayFreelance: ProcessTemplate = {
  id: "no_self_employed",
  keywords: ["self-employed norway", "freelance norway", "start business norway", "sole trader norway", "enkeltpersonforetak", "selvstendig næringsdrivende", "freelancer norway"],
  destination_country: "Norway",
  jurisdiction: "Norway",
  authority_name: "UDI / Brønnøysundregistrene",
  title: "Self-Employment / Freelance Permit — Norway",
  summary: "Non-EU/EEA nationals can apply for a residence permit based on self-employment or running a business in Norway. The activity must be able to support you financially.",
  timeline_summary: "Processing takes 3–6 months.",
  next_action: "Prepare a viable business plan showing income potential in Norway before applying.",
  official_sources: [{ title: "UDI — Self-employed", url: "https://www.udi.no/en/want-to-apply/work-immigration/self-employed/" }],
  steps: [
    {
      title: "Prepare business concept",
      description: "You need a strong business plan showing market need, expected income, and your qualifications.",
      estimated_duration: "2–4 weeks",
      checklist_items: [
        { label: "Business plan written (market analysis, revenue projections)", item_type: "document" },
        { label: "Proof of professional qualifications or prior business experience", item_type: "document" },
        { label: "Client letters of intent (strongly recommended)", item_type: "document" },
      ],
    },
    {
      title: "Apply online at UDI",
      description: "Submit the self-employment permit application at udi.no before arriving in Norway.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Online application submitted at udi.no", item_type: "action" },
        { label: "Application fee paid (approx. NOK 6,300)", item_type: "payment" },
        { label: "Business plan and supporting documents uploaded", item_type: "document" },
      ],
    },
    {
      title: "Submit biometrics and await decision",
      description: "Attend Norwegian embassy for biometrics. UDI assesses the viability of your business.",
      estimated_duration: "3–6 months",
      checklist_items: [
        { label: "Embassy appointment attended", item_type: "appointment" },
        { label: "Decision received", item_type: "document" },
        { label: "Enkeltpersonforetak (sole proprietorship) registered at Brønnøysundregistrene after arrival", item_type: "action" },
        { label: "Residence card collected at police", item_type: "action" },
      ],
    },
  ],
};

const norwayQualificationRecognition: ProcessTemplate = {
  id: "no_qualification_recognition",
  keywords: ["qualification recognition norway", "foreign degree norway", "nokut", "godkjenning utdanning", "recognize diploma norway", "credential evaluation norway"],
  destination_country: "Norway",
  jurisdiction: "Norway",
  authority_name: "NOKUT (Norwegian Agency for Quality Assurance in Education)",
  title: "Foreign Qualification Recognition — Norway",
  summary: "NOKUT evaluates foreign higher education qualifications for the Norwegian labour market. Regulated professions (healthcare, teaching, engineering) require separate professional approval.",
  timeline_summary: "NOKUT general recognition takes 4–6 weeks. Regulated profession recognition varies.",
  next_action: "Apply to NOKUT for a general recognition statement, or to the relevant professional body if your profession is regulated.",
  official_sources: [{ title: "NOKUT — Foreign education recognition", url: "https://www.nokut.no/en/foreign-education/recognition-of-foreign-higher-education/" }],
  steps: [
    {
      title: "Identify recognition type needed",
      description: "General recognition from NOKUT is for most workers wanting to document their level. Regulated professions (nurse, doctor, teacher, etc.) need authorisation from specific bodies (Helsedirektoratet, Udir, etc.).",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Profession identified as regulated or non-regulated", item_type: "action" },
        { label: "Relevant body identified (NOKUT, Helsedirektoratet, Udir, etc.)", item_type: "action" },
      ],
    },
    {
      title: "Collect and translate documents",
      description: "Gather your diplomas, transcripts, and have them translated into Norwegian or English by a certified translator.",
      estimated_duration: "2–4 weeks",
      checklist_items: [
        { label: "Original diplomas and transcripts gathered", item_type: "document" },
        { label: "Certified translation into Norwegian or English", item_type: "document" },
        { label: "Apostille obtained if required", item_type: "document" },
      ],
    },
    {
      title: "Apply to NOKUT or professional body",
      description: "Submit application online via NOKUT's portal or the relevant authority.",
      estimated_duration: "4–6 weeks (NOKUT); longer for regulated professions",
      checklist_items: [
        { label: "Application submitted online", item_type: "action" },
        { label: "Application fee paid", item_type: "payment" },
        { label: "Recognition statement / professional authorisation received", item_type: "document" },
        { label: "Document shared with employer or included in job applications", item_type: "action" },
      ],
    },
  ],
};

// ── Catalog export ─────────────────────────────────────────────────────────

export const PROCESS_TEMPLATES: ProcessTemplate[] = [
  // Sweden
  swedenWorkPermit,
  swedenStudentPermit,
  swedenResidencePermitRenewal,
  swedenFamilyReunification,
  swedenCitizenship,
  swedenAsylum,
  swedenPermanentResidence,
  swedenFolkbokforing,
  swedenSFI,
  swedenEEARegistration,
  // United Kingdom
  ukStudentVisa,
  ukSkilledWorkerVisa,
  ukGraduateVisa,
  ukYouthMobility,
  // Germany
  germanyEUBlueCard,
  germanyJobSeekerVisa,
  germanyFamilyReunification,
  germanyAusbuildung,
  germanyStudentVisa,
  germanySettlement,
  germanyAnmeldung,
  germanyFreelanceVisa,
  germanyCitizenship,
  germanyRecognition,
  // Norway
  norwayWorkPermit,
  norwayStudentPermit,
  norwayFamilyImmigration,
  norwayEEARegistration,
  norwayPermanentResidence,
  norwayCitizenship,
  norwayAsylum,
  norwayNorskprøven,
  norwayFreelance,
  norwayQualificationRecognition,
  // Netherlands
  netherlandsHighlySkilledMigrant,
  // Ireland
  irelandCriticalSkills,
  // Australia
  australiaSkilledIndependent,
  // Canada
  canadaExpressEntry,
  // USA
  usaJ1InternTrainee,
];
