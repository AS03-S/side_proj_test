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

// ── Denmark — SIRI / Styrelsen for International Rekruttering ──────────────

const denmarkWorkPermit: ProcessTemplate = {
  id: "dk_work_permit",
  keywords: ["denmark work permit", "work denmark", "job denmark", "danish work visa", "opholdstilladelse arbejde", "positivliste denmark", "fast track denmark"],
  destination_country: "Denmark",
  jurisdiction: "Denmark",
  authority_name: "SIRI (Danish Agency for International Recruitment and Integration)",
  title: "Work Permit — Denmark",
  summary: "Non-EU/EEA nationals need a residence and work permit to work in Denmark. The Pay Limit Scheme (beløbsordningen) and Positive List are the most common routes for skilled workers.",
  timeline_summary: "Pay Limit Scheme: 30 days processing. Positive List: up to 3 months. Apply before arriving.",
  next_action: "Check whether your salary offer qualifies under the Pay Limit Scheme or if your profession is on the Positive List.",
  official_sources: [{ title: "SIRI — Work in Denmark", url: "https://www.nyidanmark.dk/en-GB/You-want-to-apply/Work" }],
  steps: [
    {
      title: "Identify your permit scheme",
      description: "Pay Limit Scheme: annual salary ≥ DKK 448,000 (2024). Positive List: certain occupations in shortage regardless of salary. Fast Track Scheme: for certified employers. Choose the most applicable scheme.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Salary checked against Pay Limit threshold (nyidanmark.dk)", item_type: "action" },
        { label: "Occupation checked against Positive List", item_type: "action" },
        { label: "Employer checked for Fast Track certification (if applicable)", item_type: "action" },
      ],
    },
    {
      title: "Apply online via nyidanmark.dk",
      description: "Both you and your employer submit parts of the application online.",
      estimated_duration: "1–2 days",
      checklist_items: [
        { label: "Online application submitted at nyidanmark.dk", item_type: "action" },
        { label: "Employer section completed by employer", item_type: "action" },
        { label: "Application fee paid (approx. DKK 3,655)", item_type: "payment" },
        { label: "Signed employment contract uploaded", item_type: "document" },
      ],
    },
    {
      title: "Attend Danish embassy for biometrics",
      description: "After submitting online, attend the Danish embassy or VFS Global centre in your home country to submit biometrics.",
      estimated_duration: "Appointment dependent",
      checklist_items: [
        { label: "Embassy or VFS Global appointment booked", item_type: "appointment" },
        { label: "Valid passport brought", item_type: "document" },
        { label: "Biometrics (photo and fingerprints) submitted", item_type: "action" },
      ],
    },
    {
      title: "Receive approval and travel",
      description: "On approval you receive a visa sticker to enter Denmark and then collect your residence card.",
      estimated_duration: "30 days (Pay Limit) – 3 months",
      checklist_items: [
        { label: "Approval letter and entry visa received", item_type: "document" },
        { label: "Travel to Denmark", item_type: "action" },
        { label: "Residence card (opholdskort) collected at local citizen service centre", item_type: "action" },
        { label: "CPR number applied for at borgerservice", item_type: "action" },
      ],
    },
  ],
};

const denmarkStudentPermit: ProcessTemplate = {
  id: "dk_student_permit",
  keywords: ["denmark student permit", "study denmark", "danish university", "studietilladelse denmark", "university denmark", "higher education denmark", "student visa denmark"],
  destination_country: "Denmark",
  jurisdiction: "Denmark",
  authority_name: "SIRI",
  title: "Student Residence Permit — Denmark",
  summary: "Non-EU/EEA nationals accepted at a Danish university or higher education institution must apply for a student residence permit before arriving.",
  timeline_summary: "Apply at least 3 months before your programme starts. Processing typically takes 1–2 months.",
  next_action: "Secure your university admission letter before applying.",
  official_sources: [{ title: "SIRI — Student permit", url: "https://www.nyidanmark.dk/en-GB/You-want-to-apply/Studies" }],
  steps: [
    {
      title: "Get university admission",
      description: "Apply to a Danish university and receive an official admission letter.",
      estimated_duration: "1–4 months",
      checklist_items: [
        { label: "Danish institution identified", item_type: "action" },
        { label: "Application submitted", item_type: "action" },
        { label: "Admission letter (optagelsesbrev) received", item_type: "document" },
      ],
    },
    {
      title: "Apply online",
      description: "Submit student permit application at nyidanmark.dk.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Application submitted at nyidanmark.dk", item_type: "action" },
        { label: "Application fee paid (approx. DKK 2,160)", item_type: "payment" },
        { label: "Admission letter uploaded", item_type: "document" },
        { label: "Proof of sufficient funds uploaded (DKK 6,243/month recommended)", item_type: "document" },
      ],
    },
    {
      title: "Attend embassy",
      description: "Appear at the Danish embassy for biometrics.",
      estimated_duration: "Appointment dependent",
      checklist_items: [
        { label: "Embassy appointment booked", item_type: "appointment" },
        { label: "Valid passport brought", item_type: "document" },
        { label: "Biometrics submitted", item_type: "action" },
      ],
    },
    {
      title: "Arrive and register",
      description: "After arrival, register at the municipal citizen service centre to get your CPR number.",
      estimated_duration: "First 2 weeks",
      checklist_items: [
        { label: "Borgerservice (citizen service) visited", item_type: "action" },
        { label: "CPR number received", item_type: "document" },
        { label: "Enrolled at university and student card received", item_type: "action" },
        { label: "Health insurance card (sygesikringsbevis) received", item_type: "document" },
      ],
    },
  ],
};

const denmarkFamilyReunification: ProcessTemplate = {
  id: "dk_family_reunification",
  keywords: ["denmark family reunification", "spouse visa denmark", "family visa denmark", "ægtefællesammenføring", "join family denmark", "family permit denmark"],
  destination_country: "Denmark",
  jurisdiction: "Denmark",
  authority_name: "SIRI",
  title: "Family Reunification — Denmark",
  summary: "Spouses and minor children of Danish residents can apply for family reunification. Denmark has some of the strictest family reunification requirements in the EU.",
  timeline_summary: "Processing takes 3–12 months. Meeting the strict requirements is the main challenge.",
  next_action: "Carefully review all conditions at nyidanmark.dk — Denmark's requirements are detailed and strict.",
  official_sources: [{ title: "SIRI — Family reunification", url: "https://www.nyidanmark.dk/en-GB/You-want-to-apply/Family" }],
  steps: [
    {
      title: "Check all conditions",
      description: "For spouse reunification with a non-Danish citizen sponsor: both must be 24+, sponsor needs strong ties to Denmark (attachment requirement), sufficient housing, no welfare dependence, financial guarantee (DKK ~55,400), and sponsor must have passed Danish integration exam or been in Denmark 10+ years.",
      estimated_duration: "1–2 weeks",
      checklist_items: [
        { label: "Both parties are 24 or older", item_type: "action" },
        { label: "Sponsor's ties to Denmark confirmed (especially if dual citizen)", item_type: "action" },
        { label: "Sufficient housing confirmed (size, ownership/rental)", item_type: "action" },
        { label: "Sponsor not on welfare (within past 3 years)", item_type: "action" },
        { label: "Financial guarantee (selvskyldnerkaution) arranged if needed", item_type: "action" },
        { label: "Sponsor meets integration requirements", item_type: "action" },
      ],
    },
    {
      title: "Apply online",
      description: "Submit application at nyidanmark.dk. The sponsor must be involved in the application.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Application submitted online", item_type: "action" },
        { label: "Application fee paid (approx. DKK 8,680)", item_type: "payment" },
        { label: "Marriage certificate uploaded (apostilled + translated)", item_type: "document" },
        { label: "Documentation of all conditions uploaded", item_type: "document" },
      ],
    },
    {
      title: "Embassy interview and biometrics",
      description: "Both applicant and potentially sponsor may be interviewed separately by Danish immigration authorities.",
      estimated_duration: "Appointment dependent",
      checklist_items: [
        { label: "Embassy appointment attended", item_type: "appointment" },
        { label: "Biometrics submitted", item_type: "action" },
        { label: "Any additional documents submitted as requested", item_type: "document" },
      ],
    },
    {
      title: "Await decision and travel",
      description: "SIRI makes the decision. Denmark has strict grounds for refusal — if refused, legal advice is recommended before appealing.",
      estimated_duration: "3–12 months",
      checklist_items: [
        { label: "Decision received", item_type: "document" },
        { label: "If approved: travel to Denmark and collect residence card", item_type: "action" },
        { label: "CPR number applied for", item_type: "action" },
        { label: "Integration programme (danskuddannelse) enrolled in", item_type: "action" },
      ],
    },
  ],
};

const denmarkCPRNumber: ProcessTemplate = {
  id: "dk_cpr_number",
  keywords: ["cpr number denmark", "cpr nummer", "danish id number", "register denmark", "borgerservice denmark", "civil registration denmark", "folkeregister"],
  destination_country: "Denmark",
  jurisdiction: "Denmark",
  authority_name: "Borgerservice (local municipality)",
  title: "CPR Number Registration — Denmark",
  summary: "The CPR number (Central Person Register number) is the Danish personal identity number. You must register at your local borgerservice to receive it. It is required for almost all services in Denmark.",
  timeline_summary: "CPR registration can be done within a few days of arrival. The number is issued immediately or within a few days.",
  next_action: "Book an appointment at your local borgerservice as soon as you have a fixed address in Denmark.",
  official_sources: [{ title: "Borger.dk — CPR registration", url: "https://www.borger.dk/da/Medborgerskab-og-rettigheder/Flytning-og-bopael/Tilmelding-til-folkeregisteret" }],
  steps: [
    {
      title: "Confirm eligibility",
      description: "You can register for a CPR number if you have a valid residence permit (or EU/EEA registration) and intend to live in Denmark for more than 3 months.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Valid residence permit or EU/EEA right of residence confirmed", item_type: "document" },
        { label: "Fixed address in Denmark obtained", item_type: "action" },
      ],
    },
    {
      title: "Book borgerservice appointment",
      description: "Book an appointment at the borgerservice office in the municipality where you live.",
      estimated_duration: "1–5 days waiting",
      checklist_items: [
        { label: "Local borgerservice identified", item_type: "action" },
        { label: "Appointment booked online or by phone", item_type: "appointment" },
      ],
    },
    {
      title: "Attend appointment",
      description: "Bring all required documents in original form.",
      estimated_duration: "30 minutes",
      checklist_items: [
        { label: "Valid passport", item_type: "document" },
        { label: "Residence permit or EU registration certificate", item_type: "document" },
        { label: "Proof of address (rental contract or owner documentation)", item_type: "document" },
        { label: "CPR number issued and yellow health insurance card (sundhedskort) requested", item_type: "document" },
      ],
    },
    {
      title: "Use CPR number",
      description: "The CPR number enables access to the Danish healthcare system, NemID/MitID, bank account, tax registration, and more.",
      estimated_duration: "Ongoing",
      checklist_items: [
        { label: "Yellow health insurance card (sundhedskort) received by post", item_type: "document" },
        { label: "MitID digital identity activated", item_type: "action" },
        { label: "Bank account opened", item_type: "action" },
        { label: "Tax card (skattekort) applied for at Skattestyrelsen", item_type: "action" },
      ],
    },
  ],
};

const denmarkPermanentResidence: ProcessTemplate = {
  id: "dk_permanent_residence",
  keywords: ["permanent residence denmark", "tidsubegrænset opholdstilladelse", "settle denmark", "permanent permit denmark", "indefinite denmark"],
  destination_country: "Denmark",
  jurisdiction: "Denmark",
  authority_name: "SIRI",
  title: "Permanent Residence Permit — Denmark",
  summary: "After 8 years of legal residence (4 under fast-track conditions), residents of Denmark can apply for a permanent residence permit. Denmark has demanding requirements including a language test, self-sufficiency, and integration conditions.",
  timeline_summary: "Processing takes 3–6 months.",
  next_action: "Check the current conditions carefully — Denmark's permanent residence requirements are among the most detailed in Europe.",
  official_sources: [{ title: "SIRI — Permanent residence", url: "https://www.nyidanmark.dk/en-GB/You-want-to-apply/Permanent-residence-permit" }],
  steps: [
    {
      title: "Check all conditions",
      description: "Standard: 8 years legal residence, Danish language test (Prøve i Dansk 2/3), employment for 4 years, no criminal record, not received certain welfare benefits, no outstanding debt to public, active civic participation points accumulated.",
      estimated_duration: "1 week",
      checklist_items: [
        { label: "8 years legal residence confirmed (or 4 under fast-track)", item_type: "action" },
        { label: "Danish language test passed (Prøve i Dansk 2 minimum, 3 for fast-track)", item_type: "action" },
        { label: "Employment history for required period documented", item_type: "action" },
        { label: "No disqualifying criminal convictions", item_type: "action" },
        { label: "No welfare benefits received in disqualifying period", item_type: "action" },
        { label: "Point requirement met (active citizenship activities)", item_type: "action" },
      ],
    },
    {
      title: "Gather documents",
      description: "Compile the required documentation.",
      estimated_duration: "1–2 weeks",
      checklist_items: [
        { label: "Current residence permit", item_type: "document" },
        { label: "Valid passport", item_type: "document" },
        { label: "Language test certificate (Prøve i Dansk)", item_type: "document" },
        { label: "Employment documentation (contracts, payslips, tax returns)", item_type: "document" },
        { label: "Criminal record extract", item_type: "document" },
        { label: "Documentation of active citizenship / volunteer work / courses", item_type: "document" },
      ],
    },
    {
      title: "Apply online",
      description: "Submit application at nyidanmark.dk.",
      estimated_duration: "3–6 months processing",
      checklist_items: [
        { label: "Online application submitted", item_type: "action" },
        { label: "Application fee paid (approx. DKK 3,040)", item_type: "payment" },
        { label: "Decision received", item_type: "document" },
        { label: "Permanent residence card collected", item_type: "action" },
      ],
    },
  ],
};

const denmarkCitizenship: ProcessTemplate = {
  id: "dk_citizenship",
  keywords: ["danish citizenship", "dansk statsborgerskab", "naturalisation denmark", "become danish", "danish passport", "danish nationality"],
  destination_country: "Denmark",
  jurisdiction: "Denmark",
  authority_name: "Ministry of Immigration and Integration / Folketing",
  title: "Danish Citizenship by Naturalisation",
  summary: "Danish citizenship is granted by a law passed in the Folketing (parliament) three times a year. Applicants must meet strict residency, language, and integration requirements.",
  timeline_summary: "Applications are processed every few months when a new naturalisation bill is introduced. Total time from application to citizenship can be 2–4 years.",
  next_action: "Check your eligibility and apply via the immigration authority — you must meet all conditions before your application can go to the Folketing.",
  official_sources: [{ title: "SIRI — Danish citizenship", url: "https://www.nyidanmark.dk/en-GB/You-want-to-apply/Citizenship" }],
  steps: [
    {
      title: "Check all conditions",
      description: "Requirements: 9 years legal residence (7 for some), Danish language test Prøve i Dansk 3 or higher, self-sufficiency (no welfare in 4 years before application), clean criminal record, no outstanding public debt, renounce prior citizenship (with exceptions).",
      estimated_duration: "1 week",
      checklist_items: [
        { label: "9 years (or qualifying reduced period) legal residence confirmed", item_type: "action" },
        { label: "Prøve i Dansk 3 (or equivalent) language test passed", item_type: "action" },
        { label: "No welfare benefits received in last 4 years", item_type: "action" },
        { label: "No disqualifying criminal convictions", item_type: "action" },
        { label: "No outstanding debt to public authorities", item_type: "action" },
        { label: "Prior citizenship renunciation reviewed", item_type: "action" },
      ],
    },
    {
      title: "Submit application",
      description: "Apply online at borger.dk. Your application will be checked and forwarded to be included in a naturalisation bill.",
      estimated_duration: "1 day to apply",
      checklist_items: [
        { label: "Application submitted at borger.dk", item_type: "action" },
        { label: "Application fee paid", item_type: "payment" },
        { label: "All supporting documents uploaded", item_type: "document" },
      ],
    },
    {
      title: "Folketing process and ceremony",
      description: "Your name is included in a naturalisation bill voted on by parliament three times a year. If passed, you attend a citizenship ceremony.",
      estimated_duration: "6–24 months",
      checklist_items: [
        { label: "Notification of inclusion in naturalisation bill received", item_type: "document" },
        { label: "Citizenship ceremony attended", item_type: "appointment" },
        { label: "Declaration of loyalty to Denmark made", item_type: "action" },
        { label: "Danish passport applied for", item_type: "action" },
      ],
    },
  ],
};

const denmarkAsylum: ProcessTemplate = {
  id: "dk_asylum",
  keywords: ["asylum denmark", "refugee denmark", "asyl danmark", "asylansøger", "protection denmark", "flee denmark"],
  destination_country: "Denmark",
  jurisdiction: "Denmark",
  authority_name: "Danish Immigration Service (Udlændingestyrelsen)",
  title: "Asylum Application — Denmark",
  summary: "Anyone in Denmark who needs international protection can apply for asylum. You must apply in person at the Danish Immigration Service or at the border.",
  timeline_summary: "Processing times vary: from months to years. Denmark processes some cases under a special fast-track procedure.",
  next_action: "Go to the nearest police station or the Danish Immigration Service reception centre and state that you want to apply for asylum.",
  official_sources: [{ title: "Danish Immigration Service — Asylum", url: "https://www.nyidanmark.dk/en-GB/You-want-to-apply/Asylum" }],
  steps: [
    {
      title: "Register application",
      description: "Go to a police station or the Danish Immigration Service (Udlændingestyrelsen) reception centre and declare your intention to seek asylum.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Police or reception centre visited", item_type: "action" },
        { label: "Asylum application registered", item_type: "action" },
        { label: "Any identity documents presented", item_type: "document" },
        { label: "Temporary accommodation assigned by Danish Immigration Service", item_type: "action" },
      ],
    },
    {
      title: "Asylum interview",
      description: "You will be called for an interview with the Danish Immigration Service to explain your protection needs. You have the right to legal representation and an interpreter.",
      estimated_duration: "Scheduled by authorities",
      checklist_items: [
        { label: "Interview appointment received", item_type: "appointment" },
        { label: "Legal representative (advokat) arranged", item_type: "action" },
        { label: "Interview attended", item_type: "appointment" },
      ],
    },
    {
      title: "Await decision",
      description: "The Danish Immigration Service makes a decision. A negative decision can be appealed to the Refugee Appeals Board (Flygtningenævnet).",
      estimated_duration: "Months to years",
      checklist_items: [
        { label: "Decision received", item_type: "document" },
        { label: "If approved: residence permit issued", item_type: "action" },
        { label: "If rejected: appeal to Flygtningenævnet within deadline", item_type: "action" },
      ],
    },
  ],
};

const denmarkGreenCard: ProcessTemplate = {
  id: "dk_green_card",
  keywords: ["denmark green card", "point based denmark", "greencard denmark", "grønt kort", "skilled worker points denmark", "points scheme denmark"],
  destination_country: "Denmark",
  jurisdiction: "Denmark",
  authority_name: "SIRI",
  title: "Establishment Card (formerly Green Card) — Denmark",
  summary: "The Establishment Card allows highly qualified non-EU/EEA nationals to come to Denmark to seek work or start a business, without needing a prior job offer.",
  timeline_summary: "Processing takes approximately 1 month.",
  next_action: "Check whether you meet the points criteria on nyidanmark.dk.",
  official_sources: [{ title: "SIRI — Establishment Card", url: "https://www.nyidanmark.dk/en-GB/You-want-to-apply/Work/Establishment-card" }],
  steps: [
    {
      title: "Check points eligibility",
      description: "You are assessed on education level, language skills (Danish, English, German, French), adaptability (age, Danish connections, previous stays), and salary history. A minimum number of points is required.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Points self-assessed using SIRI's points calculator", item_type: "action" },
        { label: "Education level documented", item_type: "document" },
        { label: "Language certifications gathered", item_type: "document" },
      ],
    },
    {
      title: "Apply online",
      description: "Submit application at nyidanmark.dk.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Application submitted online", item_type: "action" },
        { label: "Application fee paid (approx. DKK 3,655)", item_type: "payment" },
        { label: "Degree certificates and transcripts uploaded", item_type: "document" },
        { label: "Language certificates uploaded", item_type: "document" },
      ],
    },
    {
      title: "Embassy biometrics and decision",
      description: "Attend embassy for biometrics. If approved, the card allows 2 years to find work or establish a business.",
      estimated_duration: "~1 month processing",
      checklist_items: [
        { label: "Embassy appointment attended and biometrics submitted", item_type: "appointment" },
        { label: "Decision received", item_type: "document" },
        { label: "Establishment Card collected in Denmark", item_type: "action" },
        { label: "Once employed: convert to work permit or apply for Pay Limit permit", item_type: "action" },
      ],
    },
  ],
};

const denmarkIntegrationProgramme: ProcessTemplate = {
  id: "dk_integration_programme",
  keywords: ["integration program denmark", "danskuddannelse", "danish language course", "integrationsprogram", "learn danish", "danish for adults", "introduction program denmark"],
  destination_country: "Denmark",
  jurisdiction: "Denmark",
  authority_name: "Local municipality (kommune)",
  title: "Integration Programme & Danish Language Course (Danskuddannelse)",
  summary: "Newly arrived non-EU nationals are entitled and often obliged to participate in a 3-year integration programme run by their municipality. It includes free Danish language courses (danskuddannelse) and an introduction programme.",
  timeline_summary: "Enrolment should happen within the first weeks of receiving your residence permit. Courses are free.",
  next_action: "Contact your municipality as soon as you receive your residence permit to be enrolled in the integration programme.",
  official_sources: [{ title: "SIRI — Integration programme", url: "https://www.nyidanmark.dk/en-GB/Words-and-concepts/Residence/Danskuddannelse" }],
  steps: [
    {
      title: "Contact your municipality",
      description: "Your municipality (kommune) is responsible for offering you the integration programme. Contact the integration department (integrationafdeling) promptly.",
      estimated_duration: "First week",
      checklist_items: [
        { label: "Local municipality integration office contacted", item_type: "action" },
        { label: "Integration meeting/interview scheduled", item_type: "appointment" },
      ],
    },
    {
      title: "Language placement and course enrolment",
      description: "You will be assessed and placed in one of three Danskuddannelse levels (DU1, DU2, DU3). The programme is free of charge for the first 3 years.",
      estimated_duration: "1–2 weeks",
      checklist_items: [
        { label: "Language assessment completed", item_type: "action" },
        { label: "Danskuddannelse level assigned (DU1/DU2/DU3)", item_type: "action" },
        { label: "Language school and schedule confirmed", item_type: "action" },
        { label: "First class attended", item_type: "action" },
      ],
    },
    {
      title: "Complete Danish language test",
      description: "The integration programme aims for you to pass Prøve i Dansk 1, 2, or 3 depending on your level. Prøve i Dansk 2 is the minimum for many immigration applications.",
      estimated_duration: "1–3 years",
      checklist_items: [
        { label: "Prøve i Dansk exam registered for", item_type: "action" },
        { label: "Exam passed at target level", item_type: "action" },
        { label: "Certificate saved for future immigration applications", item_type: "document" },
      ],
    },
  ],
};

const denmarkEEARegistration: ProcessTemplate = {
  id: "dk_eea_registration",
  keywords: ["eu eea denmark", "eu citizen denmark", "registration certificate denmark", "registreringsbevis denmark", "right of residence denmark", "eu free movement denmark"],
  destination_country: "Denmark",
  jurisdiction: "Denmark",
  authority_name: "SIRI / Local Citizens Service",
  title: "EU/EEA Registration Certificate — Denmark",
  summary: "EU/EEA nationals can live and work in Denmark freely under EU freedom of movement rules. After 3 months, they must register and obtain a registration certificate (registreringsbevis).",
  timeline_summary: "Registration is done online or at a citizen service centre. Processing is usually same-day or within a few days.",
  next_action: "After establishing yourself in Denmark (work, study, self-sufficiency), apply for the registration certificate at SIRI's online portal.",
  official_sources: [{ title: "SIRI — EU/EEA citizens registration", url: "https://www.nyidanmark.dk/en-GB/You-want-to-apply/EU-EEA" }],
  steps: [
    {
      title: "Confirm qualifying basis",
      description: "You must be a worker, self-employed, student, self-sufficient, or family member of one of the above.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "EU/EEA passport or national ID confirmed", item_type: "document" },
        { label: "Qualifying basis confirmed: employment contract / enrolment letter / proof of funds", item_type: "document" },
      ],
    },
    {
      title: "Apply for registration certificate online",
      description: "Apply at SIRI's online portal (nyidanmark.dk). You may also be able to register at a borgerservice office.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Application submitted at nyidanmark.dk or borgerservice", item_type: "action" },
        { label: "Application fee paid (approx. DKK 375)", item_type: "payment" },
        { label: "Supporting documents uploaded (employment contract/study letter/bank statements)", item_type: "document" },
        { label: "Registration certificate (registreringsbevis) received", item_type: "document" },
      ],
    },
    {
      title: "Register for CPR number",
      description: "Take your registration certificate to the local borgerservice to register and get a CPR number.",
      estimated_duration: "1 day",
      checklist_items: [
        { label: "Borgerservice appointment attended", item_type: "appointment" },
        { label: "CPR number received", item_type: "document" },
        { label: "Yellow health insurance card applied for", item_type: "action" },
        { label: "MitID digital ID activated", item_type: "action" },
      ],
    },
  ],
};

// ── Spain — Extranjería / Ministerio del Interior ─────────────────────────

const spainWorkPermit: ProcessTemplate = {
  id: "es_work_permit",
  keywords: ["spain work permit", "work spain", "autorización trabajo", "cuenta ajena", "spain employment", "residencia trabajo", "trabajo españa"],
  destination_country: "Spain",
  jurisdiction: "Spain",
  authority_name: "Oficina de Extranjería / Ministerio del Interior",
  title: "Work and Residence Permit (Cuenta Ajena) — Spain",
  summary: "Non-EU/EEA nationals with a job offer in Spain must obtain a work and residence permit. The employer applies for a work authorisation (autorización de trabajo) first, then the worker applies for a visa at the Spanish consulate.",
  timeline_summary: "Processing typically takes 1–3 months. Apply well before the intended start date.",
  next_action: "Your employer must apply for the work authorisation before you can apply for your visa.",
  official_sources: [{ title: "Ministerio de Inclusión — Autorización de trabajo", url: "https://extranjeros.inclusion.gob.es/es/InformacionInteres/InformacionProcedimientos/Ciudadanosnocomunitarios/hoja049/index.html" }],
  steps: [
    { title: "Employer applies for work authorisation", description: "The employer submits the autorización de trabajo application to the Oficina de Extranjería in the province where the job is located. They must show no suitable Spanish or EU candidate was found.", estimated_duration: "1–3 months", checklist_items: [
      { label: "Job offer signed", item_type: "document" },
      { label: "Employer submits work authorisation application", item_type: "action" },
      { label: "Resolution (autorización) received", item_type: "document" },
    ]},
    { title: "Apply for visa at Spanish consulate", description: "Once the authorisation is granted, apply for a national visa (visado de residencia y trabajo) at the Spanish consulate in your home country within 1 month of the resolution.", estimated_duration: "1–4 weeks", checklist_items: [
      { label: "Consulate appointment booked", item_type: "appointment" },
      { label: "Valid passport (at least 1 year validity)", item_type: "document" },
      { label: "Work authorisation resolution", item_type: "document" },
      { label: "Criminal record certificate (apostilled)", item_type: "document" },
      { label: "Medical certificate", item_type: "document" },
      { label: "Visa fee paid", item_type: "payment" },
    ]},
    { title: "Enter Spain and register", description: "Enter Spain within the visa validity. Register at the local Oficina de Extranjería to obtain your TIE residence card.", estimated_duration: "First month", checklist_items: [
      { label: "Entered Spain within visa validity", item_type: "action" },
      { label: "NIE number registered (if not already obtained)", item_type: "action" },
      { label: "Padron municipal (address registration) completed at Ayuntamiento", item_type: "action" },
      { label: "TIE card appointment booked at Extranjería", item_type: "appointment" },
      { label: "TIE card collected", item_type: "document" },
    ]},
  ],
};

const spainStudentVisa: ProcessTemplate = {
  id: "es_student_visa",
  keywords: ["spain student visa", "study spain", "visa estudiante", "visado estudios", "student permit spain", "spanish university", "estudiar españa"],
  destination_country: "Spain",
  jurisdiction: "Spain",
  authority_name: "Spanish Consulate / Oficina de Extranjería",
  title: "Student Visa — Spain",
  summary: "Non-EU/EEA nationals accepted at a Spanish university or educational institution must apply for a student visa (visado de estudios) before arrival.",
  timeline_summary: "Apply at least 2 months before your course starts. Processing typically takes 4–8 weeks.",
  next_action: "Secure an acceptance letter from your Spanish institution before applying.",
  official_sources: [{ title: "Consulado España — Visado de estudios", url: "https://www.exteriores.gob.es/es/EmbajadasConsulados/Paginas/index.aspx" }],
  steps: [
    { title: "Obtain acceptance letter", description: "Apply to a Spanish university or accredited institution and receive an official acceptance (carta de admisión).", estimated_duration: "1–4 months", checklist_items: [
      { label: "Spanish institution identified and applied to", item_type: "action" },
      { label: "Acceptance letter received", item_type: "document" },
    ]},
    { title: "Apply at Spanish consulate", description: "Apply for the student visa at the Spanish consulate in your home country.", estimated_duration: "4–8 weeks", checklist_items: [
      { label: "Consulate appointment booked", item_type: "appointment" },
      { label: "Valid passport", item_type: "document" },
      { label: "Acceptance letter from institution", item_type: "document" },
      { label: "Proof of sufficient funds (approx. €600/month)", item_type: "document" },
      { label: "Health insurance covering Spain", item_type: "document" },
      { label: "Criminal record certificate (apostilled)", item_type: "document" },
      { label: "Visa fee paid", item_type: "payment" },
    ]},
    { title: "Arrive and obtain TIE card", description: "Once in Spain, register for a TIE (Tarjeta de Identidad de Extranjero) within 30 days of arrival if staying more than 6 months.", estimated_duration: "First month", checklist_items: [
      { label: "Padron municipal completed at local Ayuntamiento", item_type: "action" },
      { label: "TIE card appointment booked at Extranjería", item_type: "appointment" },
      { label: "TIE card collected", item_type: "document" },
      { label: "Enrolled at institution and student ID obtained", item_type: "action" },
    ]},
  ],
};

const spainNonLucrative: ProcessTemplate = {
  id: "es_non_lucrative",
  keywords: ["spain non lucrative visa", "visa no lucrativa", "retire spain", "passive income spain", "non working visa spain", "spain residency passive income"],
  destination_country: "Spain",
  jurisdiction: "Spain",
  authority_name: "Spanish Consulate / Oficina de Extranjería",
  title: "Non-Lucrative Residence Visa — Spain",
  summary: "Allows non-EU/EEA nationals with sufficient passive income or savings to live in Spain without working. Popular with retirees and remote workers (though remote work is technically restricted on this visa).",
  timeline_summary: "Consulate processing takes 4–8 weeks. Gather documents carefully as requirements are strict.",
  next_action: "Confirm you have sufficient funds (approx. €2,400/month for an individual) and gather apostilled documents.",
  official_sources: [{ title: "Consulado España — Visa no lucrativa", url: "https://www.exteriores.gob.es" }],
  steps: [
    { title: "Confirm financial eligibility", description: "You must show at least 400% of the Spanish IPREM (approx. €2,400/month) in passive income or savings for a single applicant.", estimated_duration: "1 week", checklist_items: [
      { label: "Monthly income or savings level confirmed (400% IPREM threshold)", item_type: "action" },
      { label: "Bank statements covering last 6 months gathered", item_type: "document" },
      { label: "Proof of income source (pension, investment, rental income)", item_type: "document" },
    ]},
    { title: "Gather and apostille documents", description: "All documents must be official, recent, and apostilled with a certified Spanish translation.", estimated_duration: "2–4 weeks", checklist_items: [
      { label: "Valid passport (min. 1 year validity)", item_type: "document" },
      { label: "Criminal record certificate (apostilled + translated)", item_type: "document" },
      { label: "Medical certificate from approved doctor", item_type: "document" },
      { label: "Proof of accommodation in Spain (rental contract or property deed)", item_type: "document" },
      { label: "Health insurance (full coverage, no co-payments, min. €30,000)", item_type: "document" },
    ]},
    { title: "Submit visa application at consulate", description: "Apply in person at the Spanish consulate serving your area of residence.", estimated_duration: "4–8 weeks", checklist_items: [
      { label: "Consulate appointment booked", item_type: "appointment" },
      { label: "Application form (EX-01) completed", item_type: "document" },
      { label: "All documents submitted", item_type: "action" },
      { label: "Visa fee paid", item_type: "payment" },
      { label: "Visa received and travel to Spain within validity", item_type: "action" },
      { label: "TIE card applied for within 30 days of arrival", item_type: "action" },
    ]},
  ],
};

const spainSelfEmployed: ProcessTemplate = {
  id: "es_self_employed",
  keywords: ["spain self employed", "autonomo spain", "freelance spain", "cuenta propia", "self employment visa spain", "start business spain"],
  destination_country: "Spain",
  jurisdiction: "Spain",
  authority_name: "Oficina de Extranjería",
  title: "Self-Employment Permit (Cuenta Propia) — Spain",
  summary: "Non-EU/EEA nationals who want to work as self-employed (autónomo) in Spain need a residence and work permit for self-employed activity.",
  timeline_summary: "Processing takes 1–3 months.",
  next_action: "Prepare your business plan and check that your professional qualifications are recognised in Spain if in a regulated profession.",
  official_sources: [{ title: "Extranjería — Cuenta propia", url: "https://extranjeros.inclusion.gob.es" }],
  steps: [
    { title: "Prepare business plan and documents", description: "Show your business activity is viable in Spain, you have the required qualifications, and sufficient funds.", estimated_duration: "2–4 weeks", checklist_items: [
      { label: "Business plan drafted (activity, clients, revenue projections)", item_type: "document" },
      { label: "Professional qualifications homologated if in regulated profession", item_type: "document" },
      { label: "Proof of funds to sustain activity", item_type: "document" },
      { label: "Criminal record certificate (apostilled)", item_type: "document" },
    ]},
    { title: "Apply at Spanish consulate", description: "Apply for self-employment visa (visado de residencia y trabajo por cuenta propia) at the consulate in your home country.", estimated_duration: "1–3 months", checklist_items: [
      { label: "Consulate appointment booked", item_type: "appointment" },
      { label: "Application form and all documents submitted", item_type: "action" },
      { label: "Visa fee paid", item_type: "payment" },
    ]},
    { title: "Enter Spain and register as autónomo", description: "Register with the Agencia Tributaria (tax authority), Social Security as autónomo, and get your TIE card.", estimated_duration: "First month", checklist_items: [
      { label: "Padron municipal completed", item_type: "action" },
      { label: "Registered with Agencia Tributaria (NIE + tax obligations)", item_type: "action" },
      { label: "Registered with Social Security as autónomo", item_type: "action" },
      { label: "TIE card applied for at Extranjería", item_type: "action" },
    ]},
  ],
};

const spainNIE: ProcessTemplate = {
  id: "es_nie",
  keywords: ["nie spain", "número identificación extranjero", "nie number", "foreigner id spain", "spain tax number foreigner", "nie certificate"],
  destination_country: "Spain",
  jurisdiction: "Spain",
  authority_name: "Policía Nacional / Consulado Español",
  title: "NIE Number (Número de Identificación de Extranjero) — Spain",
  summary: "The NIE is a personal tax and identification number required for almost all legal and financial activities in Spain — buying property, working, opening a bank account, signing contracts.",
  timeline_summary: "In Spain: appointment within days to weeks. At a consulate abroad: typically 2–4 weeks.",
  next_action: "Book an appointment at the Policía Nacional (in Spain) or the nearest Spanish consulate (from abroad).",
  official_sources: [{ title: "Policía Nacional — NIE", url: "https://www.policia.es/nie.html" }],
  steps: [
    { title: "Book appointment", description: "In Spain: book at sede.gob.es (cita previa for NIE at Policía Nacional or Extranjería). From abroad: contact the Spanish consulate.", estimated_duration: "Days to weeks waiting", checklist_items: [
      { label: "Appointment booked at Policía Nacional (sede.gob.es) or consulate", item_type: "appointment" },
    ]},
    { title: "Attend appointment with documents", description: "Bring completed EX-15 form, valid passport and copy, and justification for needing the NIE (job offer, property purchase, etc.).", estimated_duration: "1 day", checklist_items: [
      { label: "Form EX-15 (solicitud de NIE) completed", item_type: "document" },
      { label: "Valid passport + photocopy", item_type: "document" },
      { label: "Justification document (employment contract, property deed, etc.)", item_type: "document" },
      { label: "Tasas form 790 (fee paid, approx. €10–12)", item_type: "payment" },
    ]},
    { title: "Receive NIE certificate", description: "The NIE certificate (certificado de NIE) is issued immediately or within a few days. It is a green A4 certificate — not a residence card.", estimated_duration: "Same day to 1 week", checklist_items: [
      { label: "NIE certificate received", item_type: "document" },
      { label: "NIE used for tax registration, bank account, and other formalities", item_type: "action" },
    ]},
  ],
};

const spainEEARegistration: ProcessTemplate = {
  id: "es_eea_registration",
  keywords: ["eu registration spain", "certificado registro ue", "eu citizen spain", "registro ciudadano ue", "green certificate spain", "eu residency certificate spain"],
  destination_country: "Spain",
  jurisdiction: "Spain",
  authority_name: "Oficina de Extranjería / Policía Nacional",
  title: "EU/EEA Residence Certificate — Spain",
  summary: "EU/EEA citizens staying more than 3 months in Spain must register and obtain a Certificado de Registro de Ciudadano de la UE (the 'green certificate'). This acts as proof of residence.",
  timeline_summary: "Registration appointment typically available within 1–4 weeks. Certificate issued same day.",
  next_action: "Book a cita previa at the Oficina de Extranjería or Policía Nacional in your province.",
  official_sources: [{ title: "Extranjería — Certificado de registro UE", url: "https://extranjeros.inclusion.gob.es" }],
  steps: [
    { title: "Book appointment (cita previa)", description: "Book online at sede.gob.es for the Certificado de Registro de Ciudadano de la UE.", estimated_duration: "1–4 weeks waiting", checklist_items: [
      { label: "Appointment booked at sede.gob.es", item_type: "appointment" },
      { label: "Padron municipal (empadronamiento) completed at Ayuntamiento first", item_type: "action" },
    ]},
    { title: "Attend appointment", description: "Bring documents proving your EU identity and qualifying basis (work, study, self-sufficiency).", estimated_duration: "1 day", checklist_items: [
      { label: "EU passport or national identity card", item_type: "document" },
      { label: "Form EX-18 completed", item_type: "document" },
      { label: "Proof of qualifying basis: employment contract / enrolment letter / bank statements", item_type: "document" },
      { label: "Padron certificate (empadronamiento)", item_type: "document" },
      { label: "Tasas 790 fee paid (approx. €10)", item_type: "payment" },
    ]},
    { title: "Receive green certificate and NIE", description: "The green certificate with your NIE (Número de Identificación de Extranjero) number is issued at the appointment.", estimated_duration: "Same day", checklist_items: [
      { label: "Green certificate (Certificado de Registro) received", item_type: "document" },
      { label: "NIE number noted and used for banking, taxes, etc.", item_type: "action" },
    ]},
  ],
};

const spainFamilyReunification: ProcessTemplate = {
  id: "es_family_reunification",
  keywords: ["spain family reunification", "reagrupación familiar", "family visa spain", "spouse visa spain", "join family spain"],
  destination_country: "Spain",
  jurisdiction: "Spain",
  authority_name: "Oficina de Extranjería",
  title: "Family Reunification (Reagrupación Familiar) — Spain",
  summary: "Legal residents in Spain who have had a residence permit for at least 1 year (and renewed for at least 1 more year) can bring close family members to join them.",
  timeline_summary: "Processing typically takes 2–4 months.",
  next_action: "The sponsor in Spain must apply for family reunification — the family member cannot apply directly.",
  official_sources: [{ title: "Extranjería — Reagrupación familiar", url: "https://extranjeros.inclusion.gob.es" }],
  steps: [
    { title: "Sponsor checks eligibility and applies", description: "The sponsor must have held a residence permit for 1+ year and have renewed it. They must show adequate housing and sufficient income (at least 150% IPREM for spouse).", estimated_duration: "1–2 weeks prep", checklist_items: [
      { label: "Sponsor's residence permit validity confirmed (1 year held, renewed)", item_type: "document" },
      { label: "Income proof: at least 150% IPREM (approx. €900/month for spouse)", item_type: "document" },
      { label: "Housing adequacy report (informe de vivienda) obtained from Ayuntamiento", item_type: "document" },
      { label: "Application (EX-08 or EX-09) submitted at Extranjería", item_type: "action" },
    ]},
    { title: "Family member applies for visa at consulate", description: "Once authorisation is granted, the family member applies for a family reunification visa at the Spanish consulate.", estimated_duration: "4–8 weeks", checklist_items: [
      { label: "Authorisation granted and sent to family member", item_type: "document" },
      { label: "Consulate appointment booked", item_type: "appointment" },
      { label: "Passport and family relationship documents submitted", item_type: "document" },
      { label: "Visa fee paid", item_type: "payment" },
    ]},
    { title: "Family member arrives and gets TIE", description: "After arriving, the family member must obtain their own TIE residence card.", estimated_duration: "First month", checklist_items: [
      { label: "Padron completed at Ayuntamiento", item_type: "action" },
      { label: "TIE appointment booked at Extranjería", item_type: "appointment" },
      { label: "TIE card collected", item_type: "document" },
    ]},
  ],
};

const spainLongTermResidence: ProcessTemplate = {
  id: "es_long_term_residence",
  keywords: ["spain long term residence", "residencia larga duración", "permanent spain", "5 year spain", "long stay spain", "indefinite spain"],
  destination_country: "Spain",
  jurisdiction: "Spain",
  authority_name: "Oficina de Extranjería",
  title: "Long-Term / Permanent Residence — Spain",
  summary: "After 5 years of continuous legal residence in Spain, non-EU/EEA nationals can apply for long-term EU residence (residencia de larga duración). This gives the right to live and work indefinitely.",
  timeline_summary: "Processing takes 3–6 months.",
  next_action: "Confirm you have 5 continuous years of legal residence and gather your documents.",
  official_sources: [{ title: "Extranjería — Larga duración", url: "https://extranjeros.inclusion.gob.es" }],
  steps: [
    { title: "Check eligibility", description: "5 continuous years of legal residence, sufficient income, no serious criminal record, and no welfare abuse.", estimated_duration: "1 week", checklist_items: [
      { label: "5 years of continuous legal residence confirmed", item_type: "action" },
      { label: "Income at least 100% IPREM confirmed", item_type: "action" },
      { label: "No long absences from Spain (max 6 months per year, 10 months total)", item_type: "action" },
    ]},
    { title: "Gather documents and apply", description: "Submit application (form EX-11) at the Oficina de Extranjería.", estimated_duration: "3–6 months", checklist_items: [
      { label: "Form EX-11 completed", item_type: "document" },
      { label: "Valid passport", item_type: "document" },
      { label: "Current residence permit (TIE)", item_type: "document" },
      { label: "Proof of 5 years' residence (all prior permits, padron history)", item_type: "document" },
      { label: "Proof of income", item_type: "document" },
      { label: "Criminal record certificate", item_type: "document" },
      { label: "Tasas fee paid", item_type: "payment" },
      { label: "TIE card for long-term residence collected", item_type: "action" },
    ]},
  ],
};

const spainCitizenship: ProcessTemplate = {
  id: "es_citizenship",
  keywords: ["spanish citizenship", "ciudadanía española", "naturalización españa", "become spanish", "spanish passport", "nationality spain"],
  destination_country: "Spain",
  jurisdiction: "Spain",
  authority_name: "Ministerio de Justicia / Registro Civil",
  title: "Spanish Citizenship by Naturalisation",
  summary: "After 10 years of legal residence (2 years for nationals of Latin American countries, Portugal, Philippines, Equatorial Guinea, Andorra, and Sephardic Jews), you can apply for Spanish citizenship.",
  timeline_summary: "Processing has historically taken 1–3 years. Spain allows dual citizenship with many countries.",
  next_action: "Confirm your years of legal residence and gather the required documents.",
  official_sources: [{ title: "Ministerio de Justicia — Nacionalidad", url: "https://www.mjusticia.gob.es/es/ciudadanos/tramites/nacionalidad-residencia" }],
  steps: [
    { title: "Check eligibility", description: "Standard: 10 years legal residence (2 years for Iberoamerican nationals and others with special ties to Spain), no serious criminal record, basic Spanish language skills (DELE A2+), knowledge of Spanish constitution and society (CCSE exam).", estimated_duration: "1 week", checklist_items: [
      { label: "Years of legal residence confirmed (10 standard, 2 for eligible nationalities)", item_type: "action" },
      { label: "DELE A2 Spanish language certificate obtained", item_type: "document" },
      { label: "CCSE exam (knowledge of Spain) passed", item_type: "document" },
    ]},
    { title: "Apply online", description: "Submit application online via the Ministerio de Justicia portal (expediente de nacionalidad).", estimated_duration: "1–3 years processing", checklist_items: [
      { label: "Online application submitted", item_type: "action" },
      { label: "Application fee paid", item_type: "payment" },
      { label: "Passport, current TIE, criminal record, birth certificate (apostilled) uploaded", item_type: "document" },
      { label: "DELE and CCSE certificates uploaded", item_type: "document" },
      { label: "Resolution (resolución) received", item_type: "document" },
      { label: "Oath sworn at Registro Civil", item_type: "appointment" },
      { label: "Spanish passport applied for", item_type: "action" },
    ]},
  ],
};

const spainAsylum: ProcessTemplate = {
  id: "es_asylum",
  keywords: ["asylum spain", "asilo españa", "refugee spain", "international protection spain", "solicitud asilo", "asylum seeker spain"],
  destination_country: "Spain",
  jurisdiction: "Spain",
  authority_name: "Oficina de Asilo y Refugio (OAR)",
  title: "Asylum Application — Spain",
  summary: "Anyone in Spain who needs international protection can apply for asylum (protección internacional). Apply at the OAR in Madrid, a border post, or at a police station.",
  timeline_summary: "Processing times vary widely: from months to several years. You may stay in Spain while your case is pending.",
  next_action: "Go to the Oficina de Asilo y Refugio (OAR) in Madrid or a designated police station to register your asylum application.",
  official_sources: [{ title: "OAR — Solicitud de protección internacional", url: "https://www.interior.gob.es/opencms/es/servicios-al-ciudadano/tramites-y-gestiones/extranjeria/asilo-y-refugio/" }],
  steps: [
    { title: "Register application", description: "Present yourself at OAR (Madrid), a police station designated for asylum, or a border post. State clearly that you are requesting international protection.", estimated_duration: "1 day", checklist_items: [
      { label: "OAR or designated police station visited", item_type: "action" },
      { label: "Application intention stated (manifestación de la voluntad)", item_type: "action" },
      { label: "Any available identity documents presented", item_type: "document" },
      { label: "Appointment to formalise application (formalización) given", item_type: "appointment" },
    ]},
    { title: "Formalise the application", description: "At the scheduled appointment you give a full account of your reasons for seeking protection (audiencia). You have the right to a lawyer and interpreter.", estimated_duration: "Scheduled date", checklist_items: [
      { label: "Legal representation arranged (free legal aid available)", item_type: "action" },
      { label: "Formalisation appointment attended", item_type: "appointment" },
      { label: "Red documentation card (tarjeta roja) received — provisional stay authorisation", item_type: "document" },
    ]},
    { title: "Await decision", description: "OAR examines your case and issues a resolution. If approved, you receive refugee status or subsidiary protection. If rejected, you can appeal.", estimated_duration: "Months to years", checklist_items: [
      { label: "Decision received", item_type: "document" },
      { label: "If approved: residence permit and travel document issued", item_type: "action" },
      { label: "If rejected: appeal to Audiencia Nacional within 2 months", item_type: "action" },
    ]},
  ],
};

// ── Italy — Ministero dell'Interno / Questura ──────────────────────────────

const italyWorkVisa: ProcessTemplate = {
  id: "it_work_visa",
  keywords: ["italy work visa", "work italy", "visto lavoro", "nulla osta lavoro", "decreto flussi", "italy employment", "lavoro italia", "work permit italy"],
  destination_country: "Italy",
  jurisdiction: "Italy",
  authority_name: "Sportello Unico per l'Immigrazione / Questura",
  title: "Work Visa (Nulla Osta) — Italy",
  summary: "Non-EU nationals need a work authorisation (nulla osta) obtained by the Italian employer before applying for a visa. Italy regulates entries through an annual quota decree (decreto flussi).",
  timeline_summary: "The decree flussi opens once or twice per year. Applications fill extremely quickly. Plan 3–6 months ahead.",
  next_action: "Monitor the Ministero dell'Interno website for the next decreto flussi opening date and prepare all documents in advance.",
  official_sources: [{ title: "Ministero dell'Interno — Flussi", url: "https://www.interno.gov.it/it/temi/immigrazione-e-asilo/flussi-migratori" }],
  steps: [
    { title: "Employer applies for nulla osta during decreto flussi", description: "The employer submits a request to the Sportello Unico per l'Immigrazione when the annual quota opens. Applications fill within hours or days.", estimated_duration: "Quota-dependent", checklist_items: [
      { label: "Decreto flussi opening date monitored", item_type: "action" },
      { label: "Employer submits nulla osta request online", item_type: "action" },
      { label: "Nulla osta issued by Sportello Unico", item_type: "document" },
    ]},
    { title: "Apply for entry visa at Italian consulate", description: "Once the nulla osta is issued, apply for a visto di ingresso per lavoro at the Italian consulate in your home country within 6 months.", estimated_duration: "4–8 weeks", checklist_items: [
      { label: "Italian consulate appointment booked", item_type: "appointment" },
      { label: "Valid passport", item_type: "document" },
      { label: "Nulla osta document", item_type: "document" },
      { label: "Medical insurance", item_type: "document" },
      { label: "Visa fee paid", item_type: "payment" },
    ]},
    { title: "Arrive and sign employment contract", description: "Within 8 days of arrival, go to the Sportello Unico to sign the employment contract and start the residence permit process.", estimated_duration: "First 2 weeks", checklist_items: [
      { label: "Arrived in Italy within visa validity", item_type: "action" },
      { label: "Sportello Unico visited within 8 days to sign contract", item_type: "action" },
      { label: "Codice fiscale obtained from Agenzia delle Entrate", item_type: "action" },
      { label: "Permesso di soggiorno application submitted at Post Office (kit postale)", item_type: "action" },
    ]},
  ],
};

const italyStudentVisa: ProcessTemplate = {
  id: "it_student_visa",
  keywords: ["italy student visa", "visto studio", "study italy", "university italy", "student permit italy", "italian university", "studiare italia"],
  destination_country: "Italy",
  jurisdiction: "Italy",
  authority_name: "Italian Consulate / Questura",
  title: "Student Visa — Italy",
  summary: "Non-EU nationals accepted at an Italian university or educational institution must obtain a student visa (visto per studio) before arrival.",
  timeline_summary: "Apply 2–3 months before your course start. Processing takes 4–8 weeks.",
  next_action: "Apply to an Italian institution and obtain an acceptance letter before contacting the consulate.",
  official_sources: [{ title: "Studiare in Italia — Visto per studio", url: "https://www.studiare-in-italia.it/studentistranieri/" }],
  steps: [
    { title: "Get university admission", description: "Apply through Universitaly (for degree courses) or directly to the institution for language/other courses.", estimated_duration: "1–4 months", checklist_items: [
      { label: "Applied via Universitaly or directly to institution", item_type: "action" },
      { label: "Acceptance letter (lettera di ammissione) received", item_type: "document" },
    ]},
    { title: "Apply for student visa", description: "Apply at the Italian consulate in your home country.", estimated_duration: "4–8 weeks", checklist_items: [
      { label: "Consulate appointment booked", item_type: "appointment" },
      { label: "Valid passport", item_type: "document" },
      { label: "Acceptance letter", item_type: "document" },
      { label: "Proof of accommodation in Italy", item_type: "document" },
      { label: "Proof of sufficient funds (approx. €448/month)", item_type: "document" },
      { label: "Health insurance", item_type: "document" },
      { label: "Visa fee paid (approx. €50)", item_type: "payment" },
    ]},
    { title: "Arrive and apply for permesso di soggiorno", description: "Within 8 days of arrival, apply for a permesso di soggiorno at the Post Office using the kit postale.", estimated_duration: "First 2 weeks", checklist_items: [
      { label: "Kit postale (immigration kit) obtained at Post Office", item_type: "action" },
      { label: "Permesso di soggiorno application submitted", item_type: "action" },
      { label: "Codice fiscale obtained", item_type: "action" },
      { label: "Enrolled at university and student card received", item_type: "action" },
    ]},
  ],
};

const italyPermessoDiSoggiorno: ProcessTemplate = {
  id: "it_permesso_soggiorno",
  keywords: ["permesso di soggiorno", "residence permit italy", "stay permit italy", "italy residence card", "soggiorno italy", "questura italy"],
  destination_country: "Italy",
  jurisdiction: "Italy",
  authority_name: "Questura / Post Office (Poste Italiane)",
  title: "Residence Permit (Permesso di Soggiorno) — Italy",
  summary: "All non-EU nationals staying in Italy for more than 90 days must apply for a permesso di soggiorno within 8 days of arrival. The application is submitted at the Post Office using an immigration kit.",
  timeline_summary: "Application is submitted immediately; the actual permit card can take 2–6 months to be issued. You receive a receipt (ricevuta) that acts as proof of status in the meantime.",
  next_action: "Obtain the immigration kit (kit postale per stranieri) at any Post Office and submit within 8 days of arrival.",
  official_sources: [{ title: "Polizia di Stato — Permesso di soggiorno", url: "https://www.poliziadistato.it/articolo/191" }],
  steps: [
    { title: "Obtain kit and complete application", description: "Get the yellow immigration kit at a Post Office (Poste Italiane). Complete the form carefully — errors cause delays.", estimated_duration: "1–2 days", checklist_items: [
      { label: "Immigration kit (kit postale) obtained at Post Office", item_type: "action" },
      { label: "Application form (modulo 1 or specific form for permit type) completed", item_type: "document" },
      { label: "All required documents photocopied", item_type: "document" },
    ]},
    { title: "Submit at designated Post Office", description: "Submit the kit at a Post Office with immigration services (not all branches). Pay the fee.", estimated_duration: "1 day", checklist_items: [
      { label: "Designated Post Office (with immigration service) visited", item_type: "action" },
      { label: "Passport + visa copy", item_type: "document" },
      { label: "4 passport photos", item_type: "document" },
      { label: "Fee paid (approx. €70–100 depending on permit type)", item_type: "payment" },
      { label: "Ricevuta (receipt) received — keep this carefully", item_type: "document" },
    ]},
    { title: "Attend Questura appointment for biometrics", description: "You will be called to the Questura to give fingerprints and collect your permit card.", estimated_duration: "2–6 months waiting", checklist_items: [
      { label: "Questura appointment notice received", item_type: "document" },
      { label: "Questura appointment attended, biometrics given", item_type: "appointment" },
      { label: "Permesso di soggiorno card collected", item_type: "document" },
    ]},
  ],
};

const italyCodiceFiscale: ProcessTemplate = {
  id: "it_codice_fiscale",
  keywords: ["codice fiscale", "italian tax code", "tax number italy", "fiscal code italy", "cf italy", "codice fiscale straniero"],
  destination_country: "Italy",
  jurisdiction: "Italy",
  authority_name: "Agenzia delle Entrate",
  title: "Codice Fiscale (Tax Identification Number) — Italy",
  summary: "The codice fiscale is Italy's personal tax code, required for almost all legal and financial activities — employment, banking, healthcare, renting, mobile contracts, and more.",
  timeline_summary: "Issued immediately at the Agenzia delle Entrate office or by the Italian consulate abroad.",
  next_action: "Visit your nearest Agenzia delle Entrate office with your passport, or apply at the Italian consulate before travelling.",
  official_sources: [{ title: "Agenzia delle Entrate — Codice fiscale", url: "https://www.agenziaentrate.gov.it/portale/web/guest/schede/istanze/richiesta-ts-cf/info-ts-cf" }],
  steps: [
    { title: "Apply in Italy or at consulate abroad", description: "In Italy: walk into any Agenzia delle Entrate office with your passport and fill in form AA4/8. Abroad: apply at the Italian consulate.", estimated_duration: "Same day", checklist_items: [
      { label: "Nearest Agenzia delle Entrate office or Italian consulate identified", item_type: "action" },
      { label: "Valid passport or ID card", item_type: "document" },
      { label: "Form AA4/8 completed (available at office)", item_type: "document" },
      { label: "Codice fiscale certificate received", item_type: "document" },
    ]},
    { title: "Request physical health card (tessera sanitaria)", description: "Once registered with the Italian health system (SSN), your codice fiscale is also printed on a physical health card.", estimated_duration: "Weeks to months", checklist_items: [
      { label: "Registered with local ASL (health authority) if eligible", item_type: "action" },
      { label: "Tessera sanitaria received by post", item_type: "document" },
    ]},
  ],
};

const italyFamilyReunification: ProcessTemplate = {
  id: "it_family_reunification",
  keywords: ["italy family reunification", "ricongiungimento familiare", "family visa italy", "spouse visa italy", "join family italy"],
  destination_country: "Italy",
  jurisdiction: "Italy",
  authority_name: "Sportello Unico per l'Immigrazione",
  title: "Family Reunification (Ricongiungimento Familiare) — Italy",
  summary: "Legal residents in Italy with at least 1 year on their permesso di soggiorno can apply to bring their spouse and minor children to join them.",
  timeline_summary: "Processing takes 3–6 months. The sponsor applies in Italy; family members apply for a visa abroad.",
  next_action: "The sponsor must apply at the Sportello Unico per l'Immigrazione — family members cannot apply directly.",
  official_sources: [{ title: "Ministero dell'Interno — Ricongiungimento familiare", url: "https://www.interno.gov.it" }],
  steps: [
    { title: "Sponsor applies for nulla osta", description: "The sponsor (resident in Italy) applies to the Sportello Unico per l'Immigrazione proving adequate income and housing.", estimated_duration: "1–3 months", checklist_items: [
      { label: "Permesso di soggiorno with at least 1 year validity confirmed", item_type: "document" },
      { label: "Income proof: at least €6,500/year for spouse (more for each child)", item_type: "document" },
      { label: "Housing certificate (idoneità alloggiativa) obtained from Comune", item_type: "document" },
      { label: "Application submitted to Sportello Unico", item_type: "action" },
      { label: "Nulla osta issued", item_type: "document" },
    ]},
    { title: "Family member applies for visa", description: "With the nulla osta, the family member applies for a visto per ricongiungimento familiare at the Italian consulate.", estimated_duration: "4–8 weeks", checklist_items: [
      { label: "Consulate appointment booked", item_type: "appointment" },
      { label: "Nulla osta and relationship documents submitted", item_type: "document" },
      { label: "Visa fee paid", item_type: "payment" },
    ]},
    { title: "Arrive and apply for permesso di soggiorno", description: "Within 8 days of arrival, the family member applies for their own permesso di soggiorno.", estimated_duration: "First 2 weeks", checklist_items: [
      { label: "Kit postale submitted at Post Office within 8 days", item_type: "action" },
      { label: "Codice fiscale obtained", item_type: "action" },
    ]},
  ],
};

const italyLongTermResidence: ProcessTemplate = {
  id: "it_long_term_residence",
  keywords: ["italy long term residence", "permesso CE lungo periodo", "permanent italy", "5 years italy", "carta soggiorno", "lungo periodo"],
  destination_country: "Italy",
  jurisdiction: "Italy",
  authority_name: "Questura",
  title: "EU Long-Term Residence Permit (Permesso CE) — Italy",
  summary: "After 5 years of continuous legal residence in Italy, non-EU nationals can apply for an EU long-term residence permit (permesso di soggiorno CE per soggiornanti di lungo periodo). It gives the right to live and work in Italy indefinitely.",
  timeline_summary: "Processing takes 3–6 months at the Questura.",
  next_action: "Confirm 5 continuous years of legal stay and gather income and language documentation.",
  official_sources: [{ title: "Polizia di Stato — Lungo periodo", url: "https://www.poliziadistato.it" }],
  steps: [
    { title: "Check eligibility", description: "5 years of continuous legal residence, sufficient income (at least social allowance level), Italian language B1 certificate (or Italian school/university), no serious criminal record.", estimated_duration: "1 week", checklist_items: [
      { label: "5 years continuous legal residence confirmed", item_type: "action" },
      { label: "Income above minimum threshold confirmed", item_type: "action" },
      { label: "Italian language B1 certificate obtained (CILS, CELI, PLIDA, or DITALS)", item_type: "document" },
    ]},
    { title: "Apply at Questura", description: "Submit application at the immigration office of the provincial Questura.", estimated_duration: "3–6 months", checklist_items: [
      { label: "Current permesso di soggiorno", item_type: "document" },
      { label: "Passport", item_type: "document" },
      { label: "5 years' history of permits", item_type: "document" },
      { label: "Income proof (CUD, tax return, payslips)", item_type: "document" },
      { label: "Italian language certificate", item_type: "document" },
      { label: "Fee paid (marca da bollo €16 + administrative fee)", item_type: "payment" },
      { label: "Permesso CE card collected", item_type: "document" },
    ]},
  ],
};

const italyCitizenship: ProcessTemplate = {
  id: "it_citizenship",
  keywords: ["italian citizenship", "cittadinanza italiana", "naturalizzazione italia", "become italian", "italian passport", "nationalità italiana"],
  destination_country: "Italy",
  jurisdiction: "Italy",
  authority_name: "Ministero dell'Interno / Prefettura",
  title: "Italian Citizenship by Naturalisation",
  summary: "After 10 years of legal residence in Italy (4 years for EU citizens, 5 for stateless persons and refugees), you can apply for Italian citizenship. Italy allows dual citizenship.",
  timeline_summary: "Processing takes 2–4 years due to high application volumes. Applications are submitted online via the Ministero dell'Interno portal.",
  next_action: "Check your years of residence and gather all required documents — the list is extensive.",
  official_sources: [{ title: "Ministero dell'Interno — Cittadinanza", url: "https://www.interno.gov.it/it/temi/cittadinanza" }],
  steps: [
    { title: "Check eligibility", description: "10 years legal residence (4 for EU citizens), Italian language B1, no serious criminal record, sufficient income.", estimated_duration: "1 week", checklist_items: [
      { label: "10 years (or reduced period) legal residence confirmed", item_type: "action" },
      { label: "Italian language B1 certificate", item_type: "document" },
      { label: "Income at least €8,263/year confirmed", item_type: "action" },
    ]},
    { title: "Apply online via Ministero dell'Interno portal", description: "Submit the application at cittadinanza.dlci.interno.it. The process is entirely online from 2016 onwards.", estimated_duration: "2–4 years processing", checklist_items: [
      { label: "SPID or CIE digital identity created (if already in Italy)", item_type: "action" },
      { label: "Application submitted online", item_type: "action" },
      { label: "Application fee paid (€250)", item_type: "payment" },
      { label: "Birth certificate (apostilled + translated) uploaded", item_type: "document" },
      { label: "Criminal record from Italy and country of origin uploaded", item_type: "document" },
      { label: "Income documents uploaded", item_type: "document" },
      { label: "Language certificate uploaded", item_type: "document" },
      { label: "Decree of naturalisation (decreto di concessione) received", item_type: "document" },
      { label: "Oath sworn at Comune within 6 months of decree", item_type: "appointment" },
    ]},
  ],
};

const italyAsylum: ProcessTemplate = {
  id: "it_asylum",
  keywords: ["asylum italy", "asilo italia", "refugee italy", "protezione internazionale", "richiedente asilo", "asylum seeker italy"],
  destination_country: "Italy",
  jurisdiction: "Italy",
  authority_name: "Commissione Territoriale per il Riconoscimento della Protezione Internazionale",
  title: "Asylum / International Protection — Italy",
  summary: "Anyone in Italy who needs international protection can apply for asylum. Applications are submitted at the Questura (police headquarters) and assessed by a Territorial Commission.",
  timeline_summary: "Processing times vary widely: from 6 months to over 2 years. You may stay in Italy while your case is pending.",
  next_action: "Go to the Questura in your province and declare your intention to seek international protection.",
  official_sources: [{ title: "UNHCR Italy — Come fare domanda", url: "https://www.unhcr.org/it/protezione/richiesta-di-asilo" }],
  steps: [
    { title: "Declare intention at Questura", description: "Go to the immigration office of the Questura and state you want to apply for international protection (protezione internazionale).", estimated_duration: "1 day", checklist_items: [
      { label: "Questura immigration office (Ufficio Immigrazione) visited", item_type: "action" },
      { label: "Asylum intention declared", item_type: "action" },
      { label: "Appointment to formalise application given", item_type: "appointment" },
    ]},
    { title: "Formalise application (verbalizzazione)", description: "At the appointment, you give your personal details and reasons for seeking protection. You have the right to an interpreter and legal aid.", estimated_duration: "Scheduled date", checklist_items: [
      { label: "Legal aid arranged if needed", item_type: "action" },
      { label: "Verbalizzazione (formal registration) completed at Questura", item_type: "appointment" },
      { label: "C3 form completed", item_type: "document" },
      { label: "Permesso di soggiorno for pending asylum (6-month renewable) received", item_type: "document" },
    ]},
    { title: "Commission interview and decision", description: "The Territorial Commission calls you for a hearing. They assess your case and issue a decision (refugee status, subsidiary protection, humanitarian protection, or rejection).", estimated_duration: "6 months–2 years", checklist_items: [
      { label: "Commission hearing attended", item_type: "appointment" },
      { label: "Decision received", item_type: "document" },
      { label: "If rejected: appeal to Tribunal within 30 days", item_type: "action" },
    ]},
  ],
};

const italyEEARegistration: ProcessTemplate = {
  id: "it_eea_registration",
  keywords: ["eu citizen italy", "iscrizione anagrafe italy", "eu registration italy", "residency certificate italy", "certificato residenza ue", "eu free movement italy"],
  destination_country: "Italy",
  jurisdiction: "Italy",
  authority_name: "Comune (Anagrafe)",
  title: "EU/EEA Residence Registration (Iscrizione Anagrafe) — Italy",
  summary: "EU/EEA citizens staying more than 3 months in Italy must register with the local Anagrafe (municipal registry) to obtain a certificate of residence (certificato di residenza / attestato di soggiorno).",
  timeline_summary: "Registration can usually be done within a few days. The certificate is issued immediately or within a few weeks.",
  next_action: "Go to the Anagrafe office at your local Comune to register your address.",
  official_sources: [{ title: "Ministero dell'Interno — Cittadini UE", url: "https://www.interno.gov.it" }],
  steps: [
    { title: "Register at the Anagrafe", description: "Bring documents showing your EU identity and qualifying basis (work, study, self-sufficiency). Some Comuni allow online pre-registration.", estimated_duration: "1 day", checklist_items: [
      { label: "Comune Anagrafe office identified and appointment booked (if required)", item_type: "appointment" },
      { label: "EU passport or national identity card", item_type: "document" },
      { label: "Proof of qualifying basis: employment contract / enrolment letter / bank statements", item_type: "document" },
      { label: "Proof of accommodation (rental contract, owner declaration)", item_type: "document" },
      { label: "Registration form completed at office", item_type: "action" },
    ]},
    { title: "Receive certificate of residence", description: "The Anagrafe registers your address and issues a residence certificate. With this you can apply for your codice fiscale, open a bank account, and access public services.", estimated_duration: "Same day to 2 weeks", checklist_items: [
      { label: "Certificato di residenza / attestato di soggiorno received", item_type: "document" },
      { label: "Codice fiscale obtained from Agenzia delle Entrate", item_type: "action" },
      { label: "Health system (SSN) registration completed at local ASL", item_type: "action" },
    ]},
  ],
};

// ── France — OFII / Préfecture ─────────────────────────────────────────────

const franceTalentPassport: ProcessTemplate = {
  id: "fr_talent_passport",
  keywords: ["france talent passport", "passeport talent", "highly skilled france", "exceptional talent france", "french work visa skilled"],
  destination_country: "France",
  jurisdiction: "France",
  authority_name: "Préfecture / French Consulate",
  title: "Passeport Talent — France",
  summary: "A 4-year renewable residence permit for highly qualified workers, researchers, investors, artists, and entrepreneurs. Covers the holder and family under a single permit.",
  timeline_summary: "Consulate processing takes 4–8 weeks. In-country prefectural processing takes 1–3 months.",
  next_action: "Identify which Passeport Talent category applies to you (salaried employee, researcher, investor, etc.) and gather your documents.",
  official_sources: [{ title: "Service-public.fr — Passeport Talent", url: "https://www.service-public.fr/particuliers/vosdroits/F16922" }],
  steps: [
    { title: "Identify your category and gather documents", description: "There are several Passeport Talent categories: highly qualified employee (salary ≥ 1.5× SMIC), researcher, EU Blue Card, company creator, investor, artist/cultural professional. Each has specific document requirements.", estimated_duration: "1–2 weeks", checklist_items: [
      { label: "Category identified", item_type: "action" },
      { label: "Employment contract or proof of activity", item_type: "document" },
      { label: "Degree/qualification proof (level equivalent to Master's for most categories)", item_type: "document" },
      { label: "Valid passport", item_type: "document" },
    ]},
    { title: "Apply at French consulate (from abroad) or préfecture (in France)", description: "If outside France, apply for a long-stay visa (visa de long séjour valant titre de séjour — VLS-TS) at the French consulate. If already in France, apply at the préfecture.", estimated_duration: "4–8 weeks", checklist_items: [
      { label: "Consulate or préfecture appointment booked", item_type: "appointment" },
      { label: "Application form and documents submitted", item_type: "action" },
      { label: "Fee paid", item_type: "payment" },
      { label: "Passeport Talent permit received (4 years, renewable)", item_type: "document" },
    ]},
    { title: "Validate visa and register with OFII", description: "Within 3 months of arrival, validate your VLS-TS online via the ANEF portal (administration-etrangers-en-france.interieur.gouv.fr).", estimated_duration: "First 3 months", checklist_items: [
      { label: "VLS-TS validated online via ANEF portal", item_type: "action" },
      { label: "OFII medical visit completed if required", item_type: "appointment" },
    ]},
  ],
};

const franceWorkAuthorisation: ProcessTemplate = {
  id: "fr_work_authorisation",
  keywords: ["france work permit", "autorisation travail", "work visa france", "salaried employee france", "titre sejour salarie", "work france non eu"],
  destination_country: "France",
  jurisdiction: "France",
  authority_name: "DREETS / French Consulate",
  title: "Work Authorisation (Autorisation de Travail) — France",
  summary: "Non-EU/EEA nationals who do not qualify for the Passeport Talent need a work authorisation issued by the regional labour authority (DREETS) before the employer can hire them.",
  timeline_summary: "DREETS processing takes 2–4 months. Apply well in advance.",
  next_action: "Your employer applies for the work authorisation — you cannot apply directly.",
  official_sources: [{ title: "Service-public.fr — Autorisation de travail", url: "https://www.service-public.fr/professionnels-entreprises/vosdroits/F23107" }],
  steps: [
    { title: "Employer applies for work authorisation at DREETS", description: "The employer submits an online application via the ANEF portal proving the job could not be filled by an EU/EEA candidate (opposabilité de l'emploi check).", estimated_duration: "2–4 months", checklist_items: [
      { label: "Job offer confirmed and signed", item_type: "document" },
      { label: "Employer submits application on ANEF portal", item_type: "action" },
      { label: "DREETS authorisation issued", item_type: "document" },
    ]},
    { title: "Apply for long-stay visa at French consulate", description: "With the authorisation, apply for a VLS-TS 'salarié' at the French consulate.", estimated_duration: "4–8 weeks", checklist_items: [
      { label: "Consulate appointment booked", item_type: "appointment" },
      { label: "Passport, work authorisation, employment contract submitted", item_type: "document" },
      { label: "Visa fee paid", item_type: "payment" },
    ]},
    { title: "Arrive and validate visa", description: "Validate your VLS-TS online within 3 months of arrival. The visa acts as your residence permit for the first year.", estimated_duration: "First 3 months", checklist_items: [
      { label: "VLS-TS validated via ANEF portal", item_type: "action" },
      { label: "OFII medical visit attended if required", item_type: "appointment" },
      { label: "Titre de séjour 'salarié' applied for before VLS expires", item_type: "action" },
    ]},
  ],
};

const franceStudentVisa: ProcessTemplate = {
  id: "fr_student_visa",
  keywords: ["france student visa", "visa etudiant", "study france", "french university", "campus france", "etudes france"],
  destination_country: "France",
  jurisdiction: "France",
  authority_name: "French Consulate / Campus France",
  title: "Student Visa (Visa Étudiant Long Séjour) — France",
  summary: "Non-EU students accepted at a French institution apply for a long-stay student visa (VLS-TS étudiant) via Campus France (mandatory for most countries).",
  timeline_summary: "Start the Campus France process 3–4 months before your course. Visa processing takes 3–8 weeks.",
  next_action: "Check if your country requires Campus France pre-registration (most do) and start there first.",
  official_sources: [{ title: "Campus France — Apply", url: "https://www.campusfrance.org/en" }],
  steps: [
    { title: "Register with Campus France (if required)", description: "Most non-EU students must first register on the Campus France portal for their country, submit their academic profile, and attend an interview.", estimated_duration: "4–8 weeks", checklist_items: [
      { label: "Campus France portal account created", item_type: "action" },
      { label: "Academic records and transcripts uploaded", item_type: "document" },
      { label: "Campus France interview attended (if required)", item_type: "appointment" },
      { label: "Campus France reference number obtained", item_type: "document" },
    ]},
    { title: "Apply for student visa at French consulate", description: "With your university acceptance and Campus France number, apply for the VLS-TS étudiant.", estimated_duration: "3–8 weeks", checklist_items: [
      { label: "University acceptance letter", item_type: "document" },
      { label: "Proof of financial resources (approx. €615/month)", item_type: "document" },
      { label: "Accommodation proof in France", item_type: "document" },
      { label: "Health insurance", item_type: "document" },
      { label: "Visa fee paid (approx. €99)", item_type: "payment" },
    ]},
    { title: "Validate visa on arrival", description: "Within 3 months of arrival validate your VLS-TS on the ANEF portal — this activates your residence permit status.", estimated_duration: "First month", checklist_items: [
      { label: "VLS-TS validated on ANEF portal (anef.interieur.gouv.fr)", item_type: "action" },
      { label: "Enrolled at university and student card obtained", item_type: "action" },
      { label: "French social security (CPAM) registration completed", item_type: "action" },
    ]},
  ],
};

const franceFamilyReunification: ProcessTemplate = {
  id: "fr_family_reunification",
  keywords: ["france family reunification", "regroupement familial", "family visa france", "spouse france", "join family france"],
  destination_country: "France",
  jurisdiction: "France",
  authority_name: "OFII / Préfecture",
  title: "Family Reunification (Regroupement Familial) — France",
  summary: "Legal residents in France for at least 18 months can bring their spouse and minor children. The request is filed with OFII, which checks housing and income conditions.",
  timeline_summary: "OFII processing takes 3–6 months. Apply well in advance.",
  next_action: "The sponsor in France submits the application to OFII — family members cannot apply directly.",
  official_sources: [{ title: "OFII — Regroupement familial", url: "https://www.ofii.fr/regroupement-familial/" }],
  steps: [
    { title: "Sponsor applies to OFII", description: "The sponsor must have lived in France for at least 18 months, have stable income (about 1× SMIC net for a spouse), and adequate housing.", estimated_duration: "3–6 months", checklist_items: [
      { label: "18 months of legal residence in France confirmed", item_type: "action" },
      { label: "Income at or above SMIC threshold confirmed", item_type: "action" },
      { label: "Housing meets required surface area (at least 22m² for a couple + 10m² per additional person)", item_type: "action" },
      { label: "Application submitted to OFII online or by post", item_type: "action" },
      { label: "OFII authorisation received", item_type: "document" },
    ]},
    { title: "Family member applies for visa", description: "With the OFII authorisation, the family member applies for a long-stay visa at the French consulate.", estimated_duration: "4–8 weeks", checklist_items: [
      { label: "Consulate appointment booked", item_type: "appointment" },
      { label: "OFII authorisation + relationship documents submitted", item_type: "document" },
      { label: "Medical examination abroad passed", item_type: "appointment" },
      { label: "Visa fee paid", item_type: "payment" },
    ]},
    { title: "Arrive and validate", description: "Validate VLS-TS on the ANEF portal within 3 months. OFII will also conduct a medical visit and welcome meeting in France.", estimated_duration: "First 3 months", checklist_items: [
      { label: "VLS-TS validated on ANEF portal", item_type: "action" },
      { label: "OFII medical visit in France attended", item_type: "appointment" },
    ]},
  ],
};

const franceCarteDeResident: ProcessTemplate = {
  id: "fr_carte_de_resident",
  keywords: ["carte de resident france", "10 year card france", "permanent france", "long term residence france", "carte resident"],
  destination_country: "France",
  jurisdiction: "France",
  authority_name: "Préfecture",
  title: "Carte de Résident (10-Year Permit) — France",
  summary: "After 5 years of regular residence in France, non-EU nationals can apply for a 10-year carte de résident, giving the right to live and work indefinitely.",
  timeline_summary: "Processing at the préfecture takes 2–4 months.",
  next_action: "Confirm 5 years of continuous legal residence and book a préfecture appointment.",
  official_sources: [{ title: "Service-public.fr — Carte de résident", url: "https://www.service-public.fr/particuliers/vosdroits/F11580" }],
  steps: [
    { title: "Check eligibility", description: "5 years of regular residence, stable and sufficient income, basic French (A2+), no threat to public order.", estimated_duration: "1 week", checklist_items: [
      { label: "5 years of continuous legal residence confirmed", item_type: "action" },
      { label: "Stable income above poverty threshold confirmed", item_type: "action" },
      { label: "French language level A2 or higher", item_type: "action" },
    ]},
    { title: "Apply at préfecture", description: "Book an appointment online via the ANEF portal and submit documents.", estimated_duration: "2–4 months", checklist_items: [
      { label: "Appointment booked via ANEF portal", item_type: "appointment" },
      { label: "Current titre de séjour", item_type: "document" },
      { label: "Proof of 5 years' residence (all prior permits)", item_type: "document" },
      { label: "Proof of income (last 3 payslips or tax return)", item_type: "document" },
      { label: "Tax stamp (timbre fiscal) paid", item_type: "payment" },
      { label: "Carte de résident collected", item_type: "document" },
    ]},
  ],
};

const franceCitizenship: ProcessTemplate = {
  id: "fr_citizenship",
  keywords: ["french citizenship", "naturalisation france", "become french", "french passport", "nationalite francaise", "naturalisation française"],
  destination_country: "France",
  jurisdiction: "France",
  authority_name: "Ministère de l'Intérieur / Préfecture",
  title: "French Citizenship by Naturalisation",
  summary: "After 5 years of legal residence in France (2 years for graduates of French higher education), you can apply for naturalisation. France allows dual citizenship.",
  timeline_summary: "Processing takes 12–18 months.",
  next_action: "Confirm your residence years and gather the extensive document list — preparation takes several weeks.",
  official_sources: [{ title: "Service-public.fr — Naturalisation", url: "https://www.service-public.fr/particuliers/vosdroits/F2213" }],
  steps: [
    { title: "Check eligibility", description: "5 years legal residence (2 for French-degree graduates, immediate for spouses of French citizens married 4 years), French level B1, stable income, no serious criminal record, assimilation into French society.", estimated_duration: "1 week", checklist_items: [
      { label: "5 years (or reduced period) of legal residence confirmed", item_type: "action" },
      { label: "French language B1 certificate obtained", item_type: "document" },
      { label: "No disqualifying criminal convictions", item_type: "action" },
    ]},
    { title: "Submit dossier at préfecture", description: "Submit the naturalisation dossier in person at the préfecture. The document list is long — get the full checklist from the préfecture website.", estimated_duration: "12–18 months processing", checklist_items: [
      { label: "Préfecture appointment booked", item_type: "appointment" },
      { label: "Birth certificate (apostilled + translated)", item_type: "document" },
      { label: "Full residence history with all prior permits", item_type: "document" },
      { label: "Income proof (last 3 tax returns)", item_type: "document" },
      { label: "French language certificate (B1)", item_type: "document" },
      { label: "Criminal record from France and country of origin", item_type: "document" },
      { label: "Naturalisation decree received from Ministère", item_type: "document" },
      { label: "French passport applied for", item_type: "action" },
    ]},
  ],
};

const franceAsylum: ProcessTemplate = {
  id: "fr_asylum",
  keywords: ["asylum france", "asile france", "refugee france", "ofpra", "demande asile", "protection internationale france"],
  destination_country: "France",
  jurisdiction: "France",
  authority_name: "OFPRA (Office français de protection des réfugiés et apatrides)",
  title: "Asylum Application — France",
  summary: "Anyone in France needing international protection applies to OFPRA. The first step is registering with the préfecture to obtain an asylum seeker's attestation.",
  timeline_summary: "OFPRA targets a 6-month decision. Complex cases take longer. You may stay in France while pending.",
  next_action: "Go to the SPADA (structure de premier accueil des demandeurs d'asile) or préfecture in your department to start the process.",
  official_sources: [{ title: "OFPRA — Demander l'asile", url: "https://www.ofpra.gouv.fr/fr/asile/les-procedures-de-l-asile/la-demande-d-asile" }],
  steps: [
    { title: "Register with SPADA / préfecture", description: "Go to the SPADA (first reception structure) or préfecture immigration office and declare your intention to seek asylum. You'll receive an appointment at the préfecture.", estimated_duration: "1 day", checklist_items: [
      { label: "SPADA or préfecture visited", item_type: "action" },
      { label: "Asylum intention declared", item_type: "action" },
      { label: "Attestation de demande d'asile received (allows staying in France)", item_type: "document" },
    ]},
    { title: "Submit OFPRA application", description: "You have 21 days from the attestation to submit your asylum application to OFPRA with a written account of your situation.", estimated_duration: "Within 21 days", checklist_items: [
      { label: "OFPRA application form completed (in French)", item_type: "document" },
      { label: "Written account of protection needs submitted", item_type: "document" },
      { label: "Identity documents submitted (or declaration if none)", item_type: "document" },
    ]},
    { title: "OFPRA interview and decision", description: "OFPRA invites you for an interview and then issues a decision. If rejected, you can appeal to the CNDA (National Court of Asylum).", estimated_duration: "6–12 months", checklist_items: [
      { label: "OFPRA interview attended (with interpreter)", item_type: "appointment" },
      { label: "Decision received", item_type: "document" },
      { label: "If approved: refugee status card issued", item_type: "action" },
      { label: "If rejected: CNDA appeal filed within 1 month", item_type: "action" },
    ]},
  ],
};

const franceEEARegistration: ProcessTemplate = {
  id: "fr_eea_registration",
  keywords: ["eu citizen france", "eu registration france", "attestation sejour france", "droit sejour france", "eu free movement france"],
  destination_country: "France",
  jurisdiction: "France",
  authority_name: "Préfecture / Mairie",
  title: "EU/EEA Right of Residence — France",
  summary: "EU/EEA citizens can live and work in France freely. After 3 months they have a right of residence; after 5 years they acquire permanent right of residence. No formal registration card is mandatory, but a certificate (attestation) can be requested.",
  timeline_summary: "France does not require EU citizens to carry a residence card, but an attestation can be issued on request at the préfecture.",
  next_action: "If you want an official attestation, contact your local préfecture. More practically, register at the mairie (city hall) for social services access.",
  official_sources: [{ title: "Service-public.fr — Citoyen UE en France", url: "https://www.service-public.fr/particuliers/vosdroits/F13512" }],
  steps: [
    { title: "Confirm qualifying basis", description: "Worker, self-employed, student, or self-sufficient person with health insurance. After 3 months you have a right of residence automatically by law.", estimated_duration: "1 day", checklist_items: [
      { label: "EU/EEA passport or national ID", item_type: "document" },
      { label: "Qualifying basis confirmed (employment, study, or sufficient resources)", item_type: "action" },
    ]},
    { title: "Register at mairie and obtain social security number", description: "Register at the local mairie for practical access to services. Register with CPAM for health insurance (carte vitale).", estimated_duration: "1–4 weeks", checklist_items: [
      { label: "Address registered at mairie", item_type: "action" },
      { label: "CPAM health insurance registration completed", item_type: "action" },
      { label: "French social security number received", item_type: "document" },
      { label: "Carte vitale applied for", item_type: "action" },
    ]},
    { title: "Request attestation at préfecture (optional)", description: "If proof of residence status is needed, request an attestation de droit au séjour at the préfecture.", estimated_duration: "Weeks", checklist_items: [
      { label: "Préfecture appointment booked (if attestation desired)", item_type: "appointment" },
      { label: "ID and proof of qualifying basis submitted", item_type: "document" },
      { label: "Attestation received", item_type: "document" },
    ]},
  ],
};

const ukFamilyVisa: ProcessTemplate = {
  id: "uk_family_visa",
  keywords: ["uk family visa", "spouse visa uk", "partner visa uk", "family route uk", "join family uk", "uk marriage visa"],
  destination_country: "United Kingdom",
  jurisdiction: "United Kingdom",
  authority_name: "UK Home Office / UKVI",
  title: "UK Family Visa (Spouse / Partner Route)",
  summary: "Allows spouses, civil partners, and unmarried partners of British citizens or settled persons to join them in the UK. Leads to settlement after 5 years.",
  timeline_summary: "Processing takes 12–24 weeks from outside the UK. Priority and super-priority services are available for a fee.",
  next_action: "Confirm your sponsor meets the financial requirement (£29,000/year gross income as of 2024) before applying.",
  official_sources: [{ title: "GOV.UK — Family visa", url: "https://www.gov.uk/uk-family-visa" }],
  steps: [
    { title: "Check eligibility and financial requirement", description: "The UK sponsor must earn at least £29,000/year (threshold subject to change). The relationship must be genuine and subsisting.", estimated_duration: "1 week", checklist_items: [
      { label: "Sponsor income confirmed at or above £29,000/year", item_type: "action" },
      { label: "Genuine relationship evidence gathered (photos, messages, travel history)", item_type: "document" },
      { label: "English language requirement checked (A2 level — SELT test or passport from majority English-speaking country)", item_type: "action" },
    ]},
    { title: "Apply online and pay", description: "Apply on GOV.UK. Pay the visa fee and Immigration Health Surcharge (IHS).", estimated_duration: "1 day", checklist_items: [
      { label: "Online application completed at gov.uk", item_type: "action" },
      { label: "Visa fee paid (approx. £1,846 from outside UK)", item_type: "payment" },
      { label: "Immigration Health Surcharge paid (£1,035/year)", item_type: "payment" },
    ]},
    { title: "Biometrics and document upload", description: "Attend a visa application centre for biometrics and upload supporting documents.", estimated_duration: "Appointment dependent", checklist_items: [
      { label: "Visa Application Centre appointment attended", item_type: "appointment" },
      { label: "Passport submitted or scanned", item_type: "document" },
      { label: "Sponsor's financial evidence uploaded", item_type: "document" },
      { label: "Relationship evidence uploaded", item_type: "document" },
      { label: "Decision received and BRP collected on arrival", item_type: "action" },
    ]},
  ],
};

const ukILR: ProcessTemplate = {
  id: "uk_ilr",
  keywords: ["uk ilr", "indefinite leave to remain", "uk settlement", "permanent uk", "uk settled status", "uk permanent residence"],
  destination_country: "United Kingdom",
  jurisdiction: "United Kingdom",
  authority_name: "UK Home Office / UKVI",
  title: "Indefinite Leave to Remain (ILR) — UK",
  summary: "ILR grants the right to live and work in the UK permanently with no time restrictions. Eligibility depends on your visa route — most routes require 5 years of continuous residence.",
  timeline_summary: "Standard processing: 6 months. Priority: 5 working days. Super-priority: next working day.",
  next_action: "Check which ILR route applies to your current visa and confirm you have met the continuous residence requirement.",
  official_sources: [{ title: "GOV.UK — Indefinite leave to remain", url: "https://www.gov.uk/indefinite-leave-to-remain" }],
  steps: [
    { title: "Check eligibility", description: "Most routes require 5 continuous years in the UK, passing the Life in the UK test, English level B1+, and not exceeding 180 days' absence in any 12-month period.", estimated_duration: "1 week", checklist_items: [
      { label: "5 years of continuous residence in UK confirmed", item_type: "action" },
      { label: "Absences checked (max 180 days per year)", item_type: "action" },
      { label: "Life in the UK test passed", item_type: "document" },
      { label: "English B1 SELT certificate obtained (if required for your route)", item_type: "document" },
    ]},
    { title: "Apply online and pay", description: "Apply on GOV.UK. Choose standard, priority, or super-priority service.", estimated_duration: "1 day", checklist_items: [
      { label: "Online ILR application submitted", item_type: "action" },
      { label: "Application fee paid (approx. £2,885)", item_type: "payment" },
      { label: "Biometric Residence Permit (BRP) or eVisa issued", item_type: "document" },
    ]},
  ],
};

const ukCitizenship: ProcessTemplate = {
  id: "uk_citizenship",
  keywords: ["british citizenship", "uk naturalisation", "become british", "british passport", "uk citizenship application"],
  destination_country: "United Kingdom",
  jurisdiction: "United Kingdom",
  authority_name: "UK Home Office",
  title: "British Citizenship by Naturalisation",
  summary: "After holding ILR (or settled status) for 12 months (or immediately if married to a British citizen), you can apply for British citizenship by naturalisation.",
  timeline_summary: "Processing takes 6–9 months. UK generally does not allow dual citizenship with all countries but does not require renunciation on naturalisation.",
  next_action: "Confirm you have held ILR/settled status for 12 months and meet the residence and language requirements.",
  official_sources: [{ title: "GOV.UK — British citizenship", url: "https://www.gov.uk/british-citizenship" }],
  steps: [
    { title: "Check eligibility", description: "Must have ILR/settled status for 12 months, 5 years of UK residence (3 if spouse of British citizen), no more than 450 days' absence in 5 years (90 in final year), Life in the UK test passed, English B1+.", estimated_duration: "1 week", checklist_items: [
      { label: "ILR/settled status held for 12 months confirmed", item_type: "action" },
      { label: "Absence record checked (max 450 days in 5 years, 90 in final year)", item_type: "action" },
      { label: "Life in the UK test certificate", item_type: "document" },
      { label: "English B1+ certificate (if required)", item_type: "document" },
    ]},
    { title: "Apply online and attend ceremony", description: "Apply via GOV.UK, pay the fee, and if approved attend a citizenship ceremony.", estimated_duration: "6–9 months", checklist_items: [
      { label: "Online application submitted", item_type: "action" },
      { label: "Application fee paid (£1,500)", item_type: "payment" },
      { label: "Biometrics submitted", item_type: "action" },
      { label: "Approval letter received", item_type: "document" },
      { label: "Citizenship ceremony attended", item_type: "appointment" },
      { label: "Certificate of naturalisation received", item_type: "document" },
      { label: "British passport applied for", item_type: "action" },
    ]},
  ],
};

const ukAsylum: ProcessTemplate = {
  id: "uk_asylum",
  keywords: ["uk asylum", "asylum uk", "refugee uk", "protection uk", "asylum seeker uk", "home office asylum"],
  destination_country: "United Kingdom",
  jurisdiction: "United Kingdom",
  authority_name: "UK Home Office",
  title: "Asylum Application — United Kingdom",
  summary: "Anyone in the UK who fears persecution in their home country can claim asylum. Claims must be made as soon as possible after arrival.",
  timeline_summary: "The Home Office aims to decide within 6 months but many cases take longer.",
  next_action: "Claim asylum as soon as possible — delays can negatively affect your case. Go to the Asylum Intake Unit or call the Home Office.",
  official_sources: [{ title: "GOV.UK — Claim asylum", url: "https://www.gov.uk/claim-asylum" }],
  steps: [
    { title: "Make your asylum claim", description: "Call the Home Office Asylum Intake Unit or attend in person. You will be screened and given an asylum registration card (ARC).", estimated_duration: "1 day", checklist_items: [
      { label: "Asylum Intake Unit contacted or attended in person", item_type: "action" },
      { label: "Screening interview completed", item_type: "appointment" },
      { label: "Asylum Registration Card (ARC) received", item_type: "document" },
    ]},
    { title: "Substantive interview", description: "The Home Office conducts a detailed interview about your asylum claim. You have the right to legal representation.", estimated_duration: "Scheduled by Home Office", checklist_items: [
      { label: "Legal representative arranged (Legal Aid available)", item_type: "action" },
      { label: "Substantive asylum interview attended", item_type: "appointment" },
      { label: "Any additional evidence submitted", item_type: "document" },
    ]},
    { title: "Await decision", description: "The Home Office issues a decision. If refused, you can appeal to the First-tier Tribunal (Immigration and Asylum Chamber).", estimated_duration: "6–24 months", checklist_items: [
      { label: "Decision letter received", item_type: "document" },
      { label: "If approved: refugee status and permission to stay granted", item_type: "action" },
      { label: "If refused: appeal to First-tier Tribunal within 14 days", item_type: "action" },
    ]},
  ],
};

const ukEUSS: ProcessTemplate = {
  id: "uk_euss",
  keywords: ["eu settlement scheme", "euss uk", "settled status uk", "pre-settled status", "eu citizen uk", "brexit uk residence"],
  destination_country: "United Kingdom",
  jurisdiction: "United Kingdom",
  authority_name: "UK Home Office",
  title: "EU Settlement Scheme (EUSS) — UK",
  summary: "EU, EEA and Swiss citizens who were living in the UK before 31 December 2020 can apply for settled or pre-settled status under the EUSS. The scheme remains open for late applications.",
  timeline_summary: "Most applications decided within 5 working days. Some take longer if evidence is needed.",
  next_action: "Apply via the EU Exit: ID Document Check app or online if you have a valid EU identity document or BRP.",
  official_sources: [{ title: "GOV.UK — EU Settlement Scheme", url: "https://www.gov.uk/settled-status-eu-citizens-families" }],
  steps: [
    { title: "Check eligibility", description: "You must be an EU/EEA/Swiss citizen (or their family member) who was living in the UK before 31 December 2020. Settled status requires 5 years' continuous residence; pre-settled status for less than 5 years.", estimated_duration: "1 day", checklist_items: [
      { label: "EU/EEA/Swiss nationality or qualifying family member confirmed", item_type: "action" },
      { label: "UK residence before 31 Dec 2020 confirmed", item_type: "action" },
      { label: "Years of UK residence calculated (settled = 5 years, pre-settled = less)", item_type: "action" },
    ]},
    { title: "Apply online or via app", description: "Apply for free using the UKVI online service. Use the EU Exit: ID Document Check app to scan your identity document.", estimated_duration: "30 minutes", checklist_items: [
      { label: "Application started at gov.uk/settled-status-eu-citizens-families", item_type: "action" },
      { label: "Identity verified via app or online", item_type: "action" },
      { label: "Proof of UK residence uploaded (if needed)", item_type: "document" },
      { label: "Settled or pre-settled status granted (digital status — no physical card)", item_type: "document" },
    ]},
  ],
};

// ── Finland — Migri ────────────────────────────────────────────────────────

const finlandWorkPermit: ProcessTemplate = {
  id: "fi_work_permit",
  keywords: ["finland work permit", "work finland", "residence permit employee finland", "työlupa", "migri work", "oleskelulupa työ"],
  destination_country: "Finland",
  jurisdiction: "Finland",
  authority_name: "Migri (Finnish Immigration Service)",
  title: "Residence Permit for Employee — Finland",
  summary: "Non-EU/EEA nationals with a job offer in Finland apply for a residence permit for an employed person (työntekijän oleskelulupa) via Migri. The employer must first confirm the job meets Finnish labour conditions.",
  timeline_summary: "Processing takes 1–3 months. Apply online via Enter Finland before arriving.",
  next_action: "Your employer submits their part of the application first via Enter Finland, then you complete the rest.",
  official_sources: [{ title: "Migri — Residence permit for employees", url: "https://migri.fi/en/residence-permit-for-an-employed-person" }],
  steps: [
    { title: "Employer submits their part", description: "The employer fills in the employer section in Enter Finland (enterfinland.fi), confirming the job terms meet Finnish standards.", estimated_duration: "1 week", checklist_items: [
      { label: "Employer registered and section completed in Enter Finland", item_type: "action" },
      { label: "Employment contract signed", item_type: "document" },
    ]},
    { title: "Applicant submits online application", description: "Complete your part of the application in Enter Finland, attach required documents, and pay the fee.", estimated_duration: "1 day", checklist_items: [
      { label: "Account created at enterfinland.fi", item_type: "action" },
      { label: "Application form completed", item_type: "action" },
      { label: "Valid passport scanned and uploaded", item_type: "document" },
      { label: "Processing fee paid (€490 approx.)", item_type: "payment" },
    ]},
    { title: "Visit Finnish mission for biometrics", description: "Attend the Finnish embassy or consulate in your home country to give biometrics.", estimated_duration: "Appointment dependent", checklist_items: [
      { label: "Embassy appointment booked", item_type: "appointment" },
      { label: "Biometrics submitted at embassy", item_type: "action" },
      { label: "Permit decision received", item_type: "document" },
      { label: "Residence permit card collected at police station in Finland", item_type: "action" },
    ]},
  ],
};

const finlandStudentPermit: ProcessTemplate = {
  id: "fi_student_permit",
  keywords: ["finland student permit", "study finland", "student visa finland", "university finland", "opiskelijan oleskelulupa", "migri student"],
  destination_country: "Finland",
  jurisdiction: "Finland",
  authority_name: "Migri",
  title: "Student Residence Permit — Finland",
  summary: "Non-EU/EEA students accepted at a Finnish university or institution of higher education must apply for a student residence permit via Enter Finland before arriving.",
  timeline_summary: "Apply 2–3 months before studies begin. Processing takes 1–2 months.",
  next_action: "Get your acceptance letter from a Finnish institution, then apply via enterfinland.fi.",
  official_sources: [{ title: "Migri — Student residence permit", url: "https://migri.fi/en/student-s-residence-permit" }],
  steps: [
    { title: "Obtain acceptance letter", description: "Apply to a Finnish university or higher education institution and receive an official acceptance.", estimated_duration: "1–4 months", checklist_items: [
      { label: "Finnish institution identified and applied to", item_type: "action" },
      { label: "Acceptance letter received", item_type: "document" },
    ]},
    { title: "Apply via Enter Finland", description: "Complete the student residence permit application online.", estimated_duration: "1–2 months processing", checklist_items: [
      { label: "Application submitted at enterfinland.fi", item_type: "action" },
      { label: "Acceptance letter uploaded", item_type: "document" },
      { label: "Proof of funds (approx. €560/month) uploaded", item_type: "document" },
      { label: "Fee paid (€350 approx.)", item_type: "payment" },
      { label: "Biometrics at Finnish embassy submitted", item_type: "appointment" },
      { label: "Permit card collected at police station in Finland", item_type: "action" },
    ]},
  ],
};

const finlandPermanentResidence: ProcessTemplate = {
  id: "fi_permanent_residence",
  keywords: ["finland permanent residence", "pysyvä oleskelulupa", "settle finland", "4 years finland", "permanent permit finland"],
  destination_country: "Finland",
  jurisdiction: "Finland",
  authority_name: "Migri",
  title: "Permanent Residence Permit — Finland",
  summary: "After 4 years of continuous residence in Finland on a continuous permit (type A), non-EU nationals can apply for a permanent residence permit (pysyvä oleskelulupa, type P).",
  timeline_summary: "Processing takes 1–3 months via Enter Finland.",
  next_action: "Confirm you have held a continuous permit (A) for 4 years without long breaks from Finland.",
  official_sources: [{ title: "Migri — Permanent residence permit", url: "https://migri.fi/en/permanent-residence-permit" }],
  steps: [
    { title: "Check eligibility", description: "4 continuous years on a continuous permit (A), no serious criminal convictions, and not lived mainly outside Finland.", estimated_duration: "1 week", checklist_items: [
      { label: "4 years on continuous permit (A) confirmed", item_type: "action" },
      { label: "No long absences from Finland (generally max 2 years total)", item_type: "action" },
    ]},
    { title: "Apply via Enter Finland", description: "Submit the application online and pay the fee.", estimated_duration: "1–3 months", checklist_items: [
      { label: "Application submitted at enterfinland.fi", item_type: "action" },
      { label: "Current permit and passport uploaded", item_type: "document" },
      { label: "Fee paid (€160 approx.)", item_type: "payment" },
      { label: "Permit decision received", item_type: "document" },
      { label: "Permanent permit card collected at police station", item_type: "action" },
    ]},
  ],
};

const finlandCitizenship: ProcessTemplate = {
  id: "fi_citizenship",
  keywords: ["finnish citizenship", "suomen kansalaisuus", "naturalisation finland", "become finnish", "finnish passport"],
  destination_country: "Finland",
  jurisdiction: "Finland",
  authority_name: "Migri",
  title: "Finnish Citizenship by Naturalisation",
  summary: "After 5 years of continuous residence in Finland (4 if a Nordic citizen), applicants can apply for Finnish citizenship. Finland requires renouncing prior citizenship in most cases, but dual citizenship is allowed with many countries.",
  timeline_summary: "Processing takes 6–12 months.",
  next_action: "Check the residency and language requirements, then apply via Enter Finland.",
  official_sources: [{ title: "Migri — Finnish citizenship", url: "https://migri.fi/en/citizenship" }],
  steps: [
    { title: "Check eligibility", description: "5 years of continuous residence on a permanent permit (P) or long-term EU permit, Finnish or Swedish language proficiency (A2 level minimum, B1 preferred), no serious criminal convictions.", estimated_duration: "1 week", checklist_items: [
      { label: "5 years of continuous residence confirmed", item_type: "action" },
      { label: "Permanent permit (P) held", item_type: "document" },
      { label: "Finnish or Swedish language proficiency confirmed", item_type: "action" },
    ]},
    { title: "Apply via Enter Finland", description: "Submit the citizenship application online and pay the fee.", estimated_duration: "6–12 months", checklist_items: [
      { label: "Application submitted at enterfinland.fi", item_type: "action" },
      { label: "Fee paid (€540 approx.)", item_type: "payment" },
      { label: "Citizenship granted by Migri decision", item_type: "document" },
      { label: "Finnish passport applied for at police station", item_type: "action" },
    ]},
  ],
};

const finlandHenkilotunnus: ProcessTemplate = {
  id: "fi_henkilotunnus",
  keywords: ["henkilötunnus", "finnish personal id", "finnish social security number", "dvv finland", "population register finland", "hetu"],
  destination_country: "Finland",
  jurisdiction: "Finland",
  authority_name: "DVV (Digital and Population Data Services Agency)",
  title: "Finnish Personal Identity Code (Henkilötunnus) — Finland",
  summary: "The henkilötunnus (hetu) is Finland's personal identity code, required for banking, healthcare, employment, and most public services. It is issued by DVV when you register as a Finnish resident.",
  timeline_summary: "Registration can be done at a DVV service point. The code is issued on the spot or within a few days.",
  next_action: "Visit a DVV service point with your residence permit and passport to register.",
  official_sources: [{ title: "DVV — Registration for persons moving to Finland", url: "https://dvv.fi/en/registration-of-persons-moving-to-finland" }],
  steps: [
    { title: "Visit DVV service point", description: "Attend a DVV service point in person with your valid residence permit and passport.", estimated_duration: "1 day", checklist_items: [
      { label: "DVV service point located (dvv.fi)", item_type: "action" },
      { label: "Valid passport", item_type: "document" },
      { label: "Residence permit card", item_type: "document" },
      { label: "Henkilötunnus issued at appointment", item_type: "document" },
    ]},
    { title: "Use henkilötunnus for services", description: "With your code, register with the tax authority (Vero), open a bank account, register with a health centre, and sign up for Kela (Social Insurance Institution).", estimated_duration: "First 2 weeks", checklist_items: [
      { label: "Tax card (verokortti) applied for at Vero (vero.fi)", item_type: "action" },
      { label: "Kela registration completed for health insurance", item_type: "action" },
      { label: "Bank account opened", item_type: "action" },
      { label: "Local health centre (terveyskeskus) registered with", item_type: "action" },
    ]},
  ],
};

// ── Switzerland — SEM / Cantonal Migration Offices ─────────────────────────

const switzerlandBPermit: ProcessTemplate = {
  id: "ch_b_permit",
  keywords: ["switzerland b permit", "b aufenthaltsbewilligung", "residence permit switzerland", "work switzerland", "swiss b permit", "aufenthalt schweiz"],
  destination_country: "Switzerland",
  jurisdiction: "Switzerland",
  authority_name: "Cantonal Migration Office (Migrationsamt)",
  title: "B Permit (Residence Permit) — Switzerland",
  summary: "The B permit (Aufenthaltsbewilligung) is the standard Swiss residence permit for non-EU/EEA nationals working or living in Switzerland. It is initially issued for 1 year and renewable.",
  timeline_summary: "Processing takes 2–4 months. Applications go through both cantonal and federal (SEM) authorities.",
  next_action: "Your Swiss employer applies for a work permit (Arbeitsbewilligung) to the cantonal migration office — you cannot apply directly from abroad.",
  official_sources: [{ title: "SEM — Residence permits", url: "https://www.sem.admin.ch/sem/en/home/themen/aufenthalt.html" }],
  steps: [
    { title: "Employer applies for work permit to cantonal office", description: "The Swiss employer submits a request to the cantonal migration office, which forwards it to SEM. Switzerland has annual quotas for non-EU/EEA workers.", estimated_duration: "2–4 months", checklist_items: [
      { label: "Employer confirms job offer and Swiss salary standard met", item_type: "action" },
      { label: "Employer submits request to cantonal Migrationsamt", item_type: "action" },
      { label: "Cantonal + SEM approval received", item_type: "document" },
    ]},
    { title: "Apply for entry visa at Swiss representation", description: "With approval, apply for a national visa (D visa) at the Swiss embassy or consulate.", estimated_duration: "4–8 weeks", checklist_items: [
      { label: "Swiss embassy appointment booked", item_type: "appointment" },
      { label: "Approval document and passport submitted", item_type: "document" },
      { label: "Visa fee paid", item_type: "payment" },
    ]},
    { title: "Register in Switzerland and collect B permit", description: "Register at the local Einwohnerkontrolle/contrôle des habitants within 14 days of arrival.", estimated_duration: "First 2 weeks", checklist_items: [
      { label: "Registered at local commune/Einwohnerkontrolle within 14 days", item_type: "action" },
      { label: "B permit card collected from cantonal migration office", item_type: "document" },
      { label: "AHV/IV social insurance number registered", item_type: "action" },
    ]},
  ],
};

const switzerlandCPermit: ProcessTemplate = {
  id: "ch_c_permit",
  keywords: ["switzerland c permit", "settlement permit switzerland", "niederlassungsbewilligung", "permanent swiss", "c aufenthalt"],
  destination_country: "Switzerland",
  jurisdiction: "Switzerland",
  authority_name: "Cantonal Migration Office",
  title: "C Permit (Settlement Permit) — Switzerland",
  summary: "The C permit (Niederlassungsbewilligung) grants permanent residence in Switzerland with no time limit. Non-EU/EEA nationals can apply after 10 years of residence (5 years for nationals of certain countries).",
  timeline_summary: "Processing takes 2–4 months at the cantonal migration office.",
  next_action: "Confirm your years of residence and that you meet the integration criteria.",
  official_sources: [{ title: "SEM — Settlement permit", url: "https://www.sem.admin.ch/sem/en/home/themen/aufenthalt/drittstaaten/niederlassungsbewilligung.html" }],
  steps: [
    { title: "Check eligibility", description: "10 years of legal residence in Switzerland on a B permit (5 years for US, Canadian, Australian, New Zealand citizens and some others), good integration (language, no welfare reliance, no criminal record).", estimated_duration: "1 week", checklist_items: [
      { label: "10 years (or 5 years for eligible nationalities) of legal residence confirmed", item_type: "action" },
      { label: "Language proficiency confirmed (level A2+ in a national language)", item_type: "action" },
      { label: "No welfare benefit reliance confirmed", item_type: "action" },
      { label: "No serious criminal convictions", item_type: "action" },
    ]},
    { title: "Apply at cantonal migration office", description: "Submit the C permit application to the cantonal migration office (Migrationsamt).", estimated_duration: "2–4 months", checklist_items: [
      { label: "Application submitted at cantonal Migrationsamt", item_type: "action" },
      { label: "Current B permit and passport submitted", item_type: "document" },
      { label: "Language certificate uploaded", item_type: "document" },
      { label: "Residence history documentation", item_type: "document" },
      { label: "C permit card collected", item_type: "document" },
    ]},
  ],
};

const switzerlandStudentPermit: ProcessTemplate = {
  id: "ch_student_permit",
  keywords: ["switzerland student permit", "study switzerland", "student visa switzerland", "swiss university", "studienbewilligung"],
  destination_country: "Switzerland",
  jurisdiction: "Switzerland",
  authority_name: "Cantonal Migration Office / Swiss Representation",
  title: "Student Residence Permit — Switzerland",
  summary: "Non-EU/EEA students accepted at a Swiss university or higher education institution must apply for a student residence permit (Aufenthaltsbewilligung für Studierende).",
  timeline_summary: "Apply 2–3 months before studies start. Processing takes 4–8 weeks.",
  next_action: "Obtain your university acceptance letter, then apply for an entry visa at the Swiss consulate.",
  official_sources: [{ title: "SEM — Students", url: "https://www.sem.admin.ch/sem/en/home/themen/aufenthalt/drittstaaten/studium.html" }],
  steps: [
    { title: "Get university acceptance", description: "Apply to a Swiss university (ETH, EPFL, or cantonal universities) and receive an official acceptance letter.", estimated_duration: "1–4 months", checklist_items: [
      { label: "Swiss institution identified and applied to", item_type: "action" },
      { label: "Acceptance letter received", item_type: "document" },
    ]},
    { title: "Apply for entry visa at Swiss consulate", description: "Apply for a D visa for study purposes at the Swiss consulate in your home country.", estimated_duration: "4–8 weeks", checklist_items: [
      { label: "Swiss consulate appointment booked", item_type: "appointment" },
      { label: "Acceptance letter submitted", item_type: "document" },
      { label: "Proof of financial means (CHF ~1,500/month)", item_type: "document" },
      { label: "Health insurance covering Switzerland", item_type: "document" },
      { label: "Visa fee paid", item_type: "payment" },
    ]},
    { title: "Register in Switzerland", description: "Register at the local commune (Einwohnerkontrolle) within 14 days and collect your residence permit.", estimated_duration: "First 2 weeks", checklist_items: [
      { label: "Registered at commune within 14 days", item_type: "action" },
      { label: "Student residence permit card collected", item_type: "document" },
      { label: "Enrolled at university and student card received", item_type: "action" },
    ]},
  ],
};

const switzerlandCitizenship: ProcessTemplate = {
  id: "ch_citizenship",
  keywords: ["swiss citizenship", "schweizer bürgerrecht", "naturalisation switzerland", "become swiss", "swiss passport"],
  destination_country: "Switzerland",
  jurisdiction: "Switzerland",
  authority_name: "Cantonal / Federal Chancellery (SEM)",
  title: "Swiss Citizenship by Naturalisation",
  summary: "Swiss naturalisation requires 10 years of residence in Switzerland (years aged 8–17 count double), permanent residence (C permit), integration, and approval at commune, cantonal, and federal levels. Switzerland does not generally allow dual citizenship.",
  timeline_summary: "The process typically takes 1–3 years and involves multiple levels of approval.",
  next_action: "Confirm you have a C permit and 10 qualifying years of residence, then contact your commune to start the process.",
  official_sources: [{ title: "SEM — Naturalisation", url: "https://www.sem.admin.ch/sem/en/home/themen/buergerrecht.html" }],
  steps: [
    { title: "Check eligibility", description: "10 years of residence in Switzerland (years age 8–17 count double), C permit held, good integration (language, knowledge of Switzerland, no criminal record, financially independent).", estimated_duration: "1 week", checklist_items: [
      { label: "10 qualifying years of residence confirmed", item_type: "action" },
      { label: "C permit held", item_type: "document" },
      { label: "Language proficiency (B1 in a national language)", item_type: "action" },
      { label: "Swiss citizenship renunciation of prior nationality considered", item_type: "action" },
    ]},
    { title: "Apply at commune level", description: "Contact your commune (Gemeinde/commune) to begin the naturalisation application. Each commune has its own requirements and integration test.", estimated_duration: "6–12 months", checklist_items: [
      { label: "Commune naturalisation application submitted", item_type: "action" },
      { label: "Integration test / interview at commune level passed", item_type: "appointment" },
      { label: "Commune approval received", item_type: "document" },
    ]},
    { title: "Cantonal and federal approval", description: "After commune approval, the application goes to the canton and then to SEM for federal approval.", estimated_duration: "6–18 months", checklist_items: [
      { label: "Cantonal naturalisation application processed", item_type: "action" },
      { label: "Federal SEM approval received", item_type: "document" },
      { label: "Swiss passport applied for", item_type: "action" },
    ]},
  ],
};

const switzerlandAsylum: ProcessTemplate = {
  id: "ch_asylum",
  keywords: ["asylum switzerland", "asyl schweiz", "refugee switzerland", "sem asylum", "schutzstatus schweiz", "asylum seeker switzerland"],
  destination_country: "Switzerland",
  jurisdiction: "Switzerland",
  authority_name: "SEM (State Secretariat for Migration)",
  title: "Asylum Application — Switzerland",
  summary: "Anyone who needs protection in Switzerland can apply for asylum. Applications are submitted at a federal asylum centre (Bundesasylzentrum). Switzerland has an accelerated procedure for most cases.",
  timeline_summary: "Accelerated procedure: decision within 140 days. Extended procedure: up to several years. You may stay in Switzerland while your case is pending.",
  next_action: "Go to a federal asylum centre (Bundesasylzentrum / Centre fédéral pour requérants d'asile) and declare your intention to seek asylum.",
  official_sources: [{ title: "SEM — Asylum procedure", url: "https://www.sem.admin.ch/sem/en/home/asyl/asylverfahren.html" }],
  steps: [
    { title: "Register at federal asylum centre", description: "Go to any federal asylum centre and declare you want to apply for asylum. You will be assigned to a centre for processing.", estimated_duration: "1 day", checklist_items: [
      { label: "Federal asylum centre visited and asylum declared", item_type: "action" },
      { label: "Biometrics taken", item_type: "action" },
      { label: "Any identity documents submitted", item_type: "document" },
      { label: "Asylum application (N-registration) confirmed", item_type: "document" },
    ]},
    { title: "Asylum hearing", description: "SEM conducts a detailed hearing on your reasons for fleeing. You have the right to legal representation and an interpreter.", estimated_duration: "Weeks to months", checklist_items: [
      { label: "Legal representative arranged (free representation available)", item_type: "action" },
      { label: "Hearing attended with interpreter", item_type: "appointment" },
    ]},
    { title: "Await decision", description: "SEM issues a decision. If rejected, you can appeal to the Federal Administrative Court (TAF) within 30 days.", estimated_duration: "Months to years", checklist_items: [
      { label: "Decision received", item_type: "document" },
      { label: "If approved: refugee status and residence permit (B) issued", item_type: "action" },
      { label: "If rejected: appeal to Federal Administrative Court within 30 days", item_type: "action" },
    ]},
  ],
};

// ── Ireland — INIS / ISD ───────────────────────────────────────────────────

const irelandWorkPermit: ProcessTemplate = {
  id: "ie_work_permit",
  keywords: ["ireland work permit", "employment permit ireland", "work ireland", "ireland job", "critical skills ireland", "general employment permit"],
  destination_country: "Ireland",
  jurisdiction: "Ireland",
  authority_name: "Department of Enterprise, Trade and Employment (DETE)",
  title: "General Employment Permit — Ireland",
  summary: "Non-EU/EEA nationals with a job offer earning at least €34,000/year can apply for a General Employment Permit. The employer must demonstrate the position was advertised to Irish/EU candidates first (Labour Market Needs Test).",
  timeline_summary: "Processing takes 2–4 months. Apply before travelling to Ireland.",
  next_action: "Confirm your salary meets the €34,000 threshold and that your employer has completed the Labour Market Needs Test.",
  official_sources: [{ title: "DETE — Employment permits", url: "https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/" }],
  steps: [
    { title: "Employer completes Labour Market Needs Test", description: "The employer must advertise the role to Irish/EU candidates first and show no suitable candidate was found, unless the role is on the Highly Skilled Eligible Occupations List.", estimated_duration: "4–6 weeks", checklist_items: [
      { label: "Role advertised on national jobs site (jobs.ie or similar) for min. 28 days", item_type: "action" },
      { label: "EURES advertisement placed", item_type: "action" },
      { label: "No suitable Irish/EU candidate confirmed", item_type: "action" },
    ]},
    { title: "Apply online via EPOS", description: "Submit the employment permit application via the EPOS (Employment Permits Online System). Either the employer or employee can apply.", estimated_duration: "2–4 months", checklist_items: [
      { label: "Application submitted on epos.enterprise.gov.ie", item_type: "action" },
      { label: "Signed employment contract uploaded", item_type: "document" },
      { label: "Passport copy uploaded", item_type: "document" },
      { label: "Fee paid (€500–€1,000 depending on permit duration)", item_type: "payment" },
      { label: "Employment permit received", item_type: "document" },
    ]},
    { title: "Apply for entry visa and register in Ireland", description: "If visa required, apply at Irish embassy. After arrival, register with GNIB/IRP within 90 days.", estimated_duration: "First month in Ireland", checklist_items: [
      { label: "Irish visa applied for at embassy (if required)", item_type: "action" },
      { label: "GNIB/IRP registration appointment booked at aislingregistrations.inis.gov.ie", item_type: "appointment" },
      { label: "IRP (Irish Residence Permit) card collected", item_type: "document" },
    ]},
  ],
};

const irelandStudentVisa: ProcessTemplate = {
  id: "ie_student_visa",
  keywords: ["ireland student visa", "study ireland", "irish university", "student permit ireland", "stamp 2 ireland"],
  destination_country: "Ireland",
  jurisdiction: "Ireland",
  authority_name: "INIS (Irish Naturalisation and Immigration Service)",
  title: "Student Visa (Stamp 2) — Ireland",
  summary: "Non-EU/EEA students enrolled in a full-time course on Ireland's Interim List of Eligible Programmes (ILEP) must apply for a student visa and register for Stamp 2 permission.",
  timeline_summary: "Visa processing takes 4–8 weeks. Apply at least 3 months before your course starts.",
  next_action: "Confirm your course is on the ILEP list, then apply for a D student visa at the Irish Naturalisation and Immigration Service.",
  official_sources: [{ title: "INIS — Student visa", url: "https://www.irishimmigration.ie/coming-to-study-in-ireland/" }],
  steps: [
    { title: "Enrol in an ILEP course", description: "Your course must be on Ireland's Interim List of Eligible Programmes and full-time (at least 15 hours/week).", estimated_duration: "1–4 months", checklist_items: [
      { label: "Course confirmed on ILEP list", item_type: "action" },
      { label: "Enrolment letter received", item_type: "document" },
    ]},
    { title: "Apply for student visa online", description: "Apply via the Online Visa Application System (AVATS).", estimated_duration: "4–8 weeks", checklist_items: [
      { label: "Application submitted at visas.inis.gov.ie", item_type: "action" },
      { label: "Enrolment letter and proof of tuition fees paid uploaded", item_type: "document" },
      { label: "Proof of funds (€7,000+ for 1 year)", item_type: "document" },
      { label: "Visa fee paid (€60 single entry)", item_type: "payment" },
    ]},
    { title: "Arrive and register for Stamp 2", description: "Register at the GNIB/IRP within 90 days of arrival to receive Stamp 2 permission.", estimated_duration: "First month", checklist_items: [
      { label: "IRP registration appointment booked", item_type: "appointment" },
      { label: "IRP card (Stamp 2) collected", item_type: "document" },
    ]},
  ],
};

const irelandStamp4: ProcessTemplate = {
  id: "ie_stamp4",
  keywords: ["stamp 4 ireland", "ireland permanent", "long term ireland", "inis stamp 4", "ireland settlement", "indefinite stay ireland"],
  destination_country: "Ireland",
  jurisdiction: "Ireland",
  authority_name: "INIS",
  title: "Stamp 4 (Long-Term Residence) — Ireland",
  summary: "Stamp 4 gives the right to work and live in Ireland without a separate work permit. It is granted after 5 years of legal residence, to refugees, and to others who qualify. It leads to citizenship eligibility.",
  timeline_summary: "Applications are assessed by INIS; processing times vary (months to over a year currently).",
  next_action: "Check your eligibility: 5 years of legal residence on certain stamps, or qualifying status (refugee, family member of Irish citizen, etc.).",
  official_sources: [{ title: "INIS — Long term residence", url: "https://www.irishimmigration.ie/my-situation-has-changed-since-i-arrived-in-ireland/long-term-residence/" }],
  steps: [
    { title: "Check eligibility", description: "5 years of legal residence on Stamp 1, 1G, 2, 2A or 3 (excluding time on Stamp 2 for English language courses). Or qualifying as a refugee, family member of Irish citizen, etc.", estimated_duration: "1 week", checklist_items: [
      { label: "5 years of eligible legal residence confirmed", item_type: "action" },
      { label: "No serious criminal convictions", item_type: "action" },
    ]},
    { title: "Apply to INIS", description: "Submit a long-term residence application by post or online to INIS.", estimated_duration: "Months to 1 year+", checklist_items: [
      { label: "Application submitted to INIS", item_type: "action" },
      { label: "All previous IRP cards / immigration stamps included", item_type: "document" },
      { label: "Passport copies included", item_type: "document" },
      { label: "Stamp 4 permission granted and IRP renewed", item_type: "document" },
    ]},
  ],
};

const irelandCitizenship: ProcessTemplate = {
  id: "ie_citizenship",
  keywords: ["irish citizenship", "ireland naturalisation", "become irish", "irish passport", "citizenship ireland"],
  destination_country: "Ireland",
  jurisdiction: "Ireland",
  authority_name: "INIS / Department of Justice",
  title: "Irish Citizenship by Naturalisation",
  summary: "After 5 years of continuous legal residence in Ireland (1 year immediately before the application + 4 of the previous 8 years), you can apply for Irish citizenship. Ireland allows dual citizenship.",
  timeline_summary: "Processing currently takes 20–24 months.",
  next_action: "Confirm your reckonable residence adds up to 5 years and check for the next INIS naturalisation application window.",
  official_sources: [{ title: "INIS — Naturalisation", url: "https://www.irishimmigration.ie/citizenship/naturalisation/" }],
  steps: [
    { title: "Calculate reckonable residence", description: "The year immediately before your application must be on Stamp 4/5/6 or equivalent. The previous 8 years must include at least 4 reckonable years. Time on Stamp 1 for studies does not fully count.", estimated_duration: "1 week", checklist_items: [
      { label: "Reckonable residence years calculated", item_type: "action" },
      { label: "1 year immediately before application on qualifying stamp confirmed", item_type: "action" },
      { label: "Good character requirement considered (no serious convictions)", item_type: "action" },
    ]},
    { title: "Apply online via INIS", description: "Submit naturalisation application via the INIS online portal when the application window opens.", estimated_duration: "20–24 months processing", checklist_items: [
      { label: "Application submitted online", item_type: "action" },
      { label: "Application fee paid (€175, waived for refugees)", item_type: "payment" },
      { label: "All passport copies and immigration history submitted", item_type: "document" },
      { label: "Certificate of naturalisation received", item_type: "document" },
      { label: "Declaration of fidelity made at ceremony", item_type: "appointment" },
      { label: "Irish passport applied for", item_type: "action" },
    ]},
  ],
};

// ── Catalog export ─────────────────────────────────────────────────────────

export const PROCESS_TEMPLATES: ProcessTemplate[] = [
  // France
  franceTalentPassport,
  franceWorkAuthorisation,
  franceStudentVisa,
  franceFamilyReunification,
  franceCarteDeResident,
  franceCitizenship,
  franceAsylum,
  franceEEARegistration,
  // Switzerland
  switzerlandBPermit,
  switzerlandCPermit,
  switzerlandStudentPermit,
  switzerlandCitizenship,
  switzerlandAsylum,
  // Finland
  finlandWorkPermit,
  finlandStudentPermit,
  finlandPermanentResidence,
  finlandCitizenship,
  finlandHenkilotunnus,
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
  ukFamilyVisa,
  ukILR,
  ukCitizenship,
  ukAsylum,
  ukEUSS,
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
  // Denmark
  denmarkWorkPermit,
  denmarkStudentPermit,
  denmarkFamilyReunification,
  denmarkCPRNumber,
  denmarkPermanentResidence,
  denmarkCitizenship,
  denmarkAsylum,
  denmarkGreenCard,
  denmarkIntegrationProgramme,
  denmarkEEARegistration,
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
  // Italy
  italyWorkVisa,
  italyStudentVisa,
  italyPermessoDiSoggiorno,
  italyCodiceFiscale,
  italyFamilyReunification,
  italyLongTermResidence,
  italyCitizenship,
  italyAsylum,
  italyEEARegistration,
  // Spain
  spainWorkPermit,
  spainStudentVisa,
  spainNonLucrative,
  spainSelfEmployed,
  spainNIE,
  spainEEARegistration,
  spainFamilyReunification,
  spainLongTermResidence,
  spainCitizenship,
  spainAsylum,
  // Netherlands
  netherlandsHighlySkilledMigrant,
  // Ireland
  irelandCriticalSkills,
  irelandWorkPermit,
  irelandStudentVisa,
  irelandStamp4,
  irelandCitizenship,
  // Australia
  australiaSkilledIndependent,
  // Canada
  canadaExpressEntry,
  // USA
  usaJ1InternTrainee,
];
