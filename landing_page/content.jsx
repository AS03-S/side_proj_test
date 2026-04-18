// Copy in 4 languages. Kept short and serious.
const CONTENT = {
  EN: {
    dir: "ltr",
    nav_cta: "Join the waitlist",
    lang_label: "Language",
    hero_kicker: "STRUCTURED INFORMATION · NOT LEGAL ADVICE",
    hero_h1_1: "The immigration system,",
    hero_h1_2: "translated.",
    hero_sub: "Upload a document. Understand what it means. Know what to do, and when.",
    hero_cta: "Join the waitlist",
    hero_meta: "No file is stored. Processed and discarded.",
    doc_plain: "Plain language",
    doc_deadline: "Deadline",
    doc_action: "Required action",
    docs: [
      { type: "Permit Notice", auth: "Immigration Authority", date: "Issued 12 April 2026", translation: "Your work permit has been approved. Collect it in person within 30 days.", deadline: "12 May 2026", action: "Book collection appointment" },
      { type: "Appointment Letter", auth: "Biometric Services", date: "Issued 03 April 2026", translation: "You have been scheduled for a biometric appointment. Attendance is mandatory.", deadline: "28 April 2026", action: "Attend in person" },
      { type: "Appeal Decision", auth: "Administrative Court", date: "Issued 21 March 2026", translation: "Your appeal is under review. A written decision will be issued within 60 days.", deadline: "20 May 2026", action: "Await written notice" },
      { type: "Additional Documentation", auth: "Immigration Authority", date: "Issued 08 April 2026", translation: "Further documents are required. Submit the listed items within 14 days or your case is suspended.", deadline: "22 April 2026", action: "Submit 3 documents" }
    ],
    how_label: "Process",
    how_h: "How it works",
    how_sub: "Three steps, no jargon.",
    steps: [
      { n: "01", t: "Upload your document", d: "Any official letter or notice from an immigration authority." },
      { n: "02", t: "We explain it", d: "Plain language summary, dates, and what is being asked of you." },
      { n: "03", t: "You know what to do", d: "Clear next steps and deadlines, in the correct order." }
    ],
    who_label: "Who it's for",
    who_h: "Built for people inside the system.",
    who_sub: "Individual immigrants, the NGOs supporting them, and lawyers advising them.",
    personas: [
      { t: "Asylum seekers", d: "Understand every letter from the migration authority without needing a translator." },
      { t: "International students", d: "Never miss a permit renewal, appointment, or deadline in an unfamiliar system." },
      { t: "Workers & families", d: "Keep a household's immigration documents organised in one place." }
    ],
    privacy_label: "Data handling",
    privacy_h: "Your documents never leave processing.",
    privacy_sub: "migraDOCS is designed around a strict minimum-retention principle.",
    privacy_points: [
      { t: "No file storage", d: "Original documents are processed in memory and discarded. Only the structured summary is retained." },
      { t: "Extracted fields only", d: "Dates, required actions, and categories — never the raw letter, never photographs of pages." },
      { t: "Auditable deletion", d: "Every summary can be permanently erased from your account at any time." }
    ],
    waitlist_h: "Be the first to know.",
    waitlist_sub: "Leave your email. We'll reach out when you can use it.",
    waitlist_placeholder: "you@email.com",
    waitlist_cta: "Join the waitlist",
    waitlist_joining: "Joining…",
    waitlist_ok_t: "You're on the list.",
    waitlist_ok_d: "We'll be in touch.",
    waitlist_err: "Please enter a valid email address.",
    footer_copy: "© 2026 migraDOCS",
    footer_disclaimer: "Structured information only. Not legal advice."
  },
  DE: {
    dir: "ltr",
    nav_cta: "Warteliste beitreten",
    lang_label: "Sprache",
    hero_kicker: "STRUKTURIERTE INFORMATION · KEINE RECHTSBERATUNG",
    hero_h1_1: "Das Einwanderungssystem,",
    hero_h1_2: "übersetzt.",
    hero_sub: "Dokument hochladen. Inhalt verstehen. Wissen, was zu tun ist — und wann.",
    hero_cta: "Warteliste beitreten",
    hero_meta: "Keine Datei wird gespeichert. Verarbeitet und verworfen.",
    doc_plain: "Einfache Sprache",
    doc_deadline: "Frist",
    doc_action: "Erforderlich",
    docs: [
      { type: "Genehmigungsbescheid", auth: "Ausländerbehörde", date: "Ausgestellt 12. April 2026", translation: "Ihre Arbeitserlaubnis wurde genehmigt. Abholung persönlich innerhalb von 30 Tagen.", deadline: "12. Mai 2026", action: "Abholtermin buchen" },
      { type: "Terminanordnung", auth: "Biometrieerfassung", date: "Ausgestellt 03. April 2026", translation: "Ein biometrischer Termin wurde angesetzt. Erscheinen ist verpflichtend.", deadline: "28. April 2026", action: "Persönlich erscheinen" },
      { type: "Widerspruchsbescheid", auth: "Verwaltungsgericht", date: "Ausgestellt 21. März 2026", translation: "Ihr Widerspruch wird geprüft. Eine schriftliche Entscheidung ergeht binnen 60 Tagen.", deadline: "20. Mai 2026", action: "Schriftliche Mitteilung abwarten" },
      { type: "Nachforderung", auth: "Ausländerbehörde", date: "Ausgestellt 08. April 2026", translation: "Weitere Unterlagen sind erforderlich. Einreichung innerhalb von 14 Tagen, sonst Verfahrensaussetzung.", deadline: "22. April 2026", action: "3 Unterlagen einreichen" }
    ],
    how_label: "Ablauf",
    how_h: "So funktioniert es",
    how_sub: "Drei Schritte, ohne Fachjargon.",
    steps: [
      { n: "01", t: "Dokument hochladen", d: "Jede offizielle Mitteilung oder jeder Bescheid einer Ausländerbehörde." },
      { n: "02", t: "Wir erklären es", d: "Zusammenfassung in einfacher Sprache, Termine und Handlungsaufforderungen." },
      { n: "03", t: "Sie wissen, was zu tun ist", d: "Klare nächste Schritte und Fristen, in der richtigen Reihenfolge." }
    ],
    who_label: "Für wen",
    who_h: "Gemacht für Menschen im System.",
    who_sub: "Einwandernde, unterstützende Organisationen und beratende Anwältinnen.",
    personas: [
      { t: "Asylsuchende", d: "Jeden Behördenbrief verstehen — ohne Übersetzer." },
      { t: "Internationale Studierende", d: "Keine Verlängerung, kein Termin, keine Frist mehr verpassen." },
      { t: "Arbeitnehmer & Familien", d: "Alle Einwanderungsdokumente des Haushalts an einem Ort." }
    ],
    privacy_label: "Datenverarbeitung",
    privacy_h: "Ihre Dokumente verlassen die Verarbeitung nicht.",
    privacy_sub: "migraDOCS folgt einem strikten Prinzip der minimalen Datenaufbewahrung.",
    privacy_points: [
      { t: "Keine Dateispeicherung", d: "Originale werden im Arbeitsspeicher verarbeitet und verworfen. Nur die strukturierte Zusammenfassung bleibt." },
      { t: "Nur extrahierte Felder", d: "Termine, Pflichten, Kategorien — nie der Originaltext, nie Seitenfotos." },
      { t: "Prüfbare Löschung", d: "Jede Zusammenfassung kann jederzeit dauerhaft aus Ihrem Konto entfernt werden." }
    ],
    waitlist_h: "Erfahren Sie es zuerst.",
    waitlist_sub: "Hinterlassen Sie Ihre E-Mail-Adresse. Wir melden uns, sobald es losgeht.",
    waitlist_placeholder: "sie@email.de",
    waitlist_cta: "Warteliste beitreten",
    waitlist_joining: "Wird hinzugefügt…",
    waitlist_ok_t: "Sie stehen auf der Liste.",
    waitlist_ok_d: "Wir melden uns.",
    waitlist_err: "Bitte eine gültige E-Mail-Adresse eingeben.",
    footer_copy: "© 2026 migraDOCS",
    footer_disclaimer: "Nur strukturierte Information. Keine Rechtsberatung."
  },
  SV: {
    dir: "ltr",
    nav_cta: "Gå med i väntelistan",
    lang_label: "Språk",
    hero_kicker: "STRUKTURERAD INFORMATION · INTE JURIDISK RÅDGIVNING",
    hero_h1_1: "Migrationssystemet,",
    hero_h1_2: "översatt.",
    hero_sub: "Ladda upp ett dokument. Förstå vad det betyder. Vet vad du ska göra — och när.",
    hero_cta: "Gå med i väntelistan",
    hero_meta: "Ingen fil lagras. Behandlas och raderas.",
    doc_plain: "Klarspråk",
    doc_deadline: "Sista dag",
    doc_action: "Krav",
    docs: [
      { type: "Tillståndsbesked", auth: "Migrationsverket", date: "Utfärdat 12 april 2026", translation: "Ditt arbetstillstånd har beviljats. Hämta personligen inom 30 dagar.", deadline: "12 maj 2026", action: "Boka hämtningstid" },
      { type: "Kallelse", auth: "Biometri", date: "Utfärdad 3 april 2026", translation: "Du har kallats till biometri. Närvaro är obligatorisk.", deadline: "28 april 2026", action: "Inställ dig personligen" },
      { type: "Överklagandebesked", auth: "Förvaltningsrätten", date: "Utfärdat 21 mars 2026", translation: "Ditt överklagande prövas. Skriftligt beslut inom 60 dagar.", deadline: "20 maj 2026", action: "Invänta skriftligt besked" },
      { type: "Komplettering", auth: "Migrationsverket", date: "Utfärdat 8 april 2026", translation: "Ytterligare handlingar krävs. Inlämning inom 14 dagar, annars vilar ärendet.", deadline: "22 april 2026", action: "Lämna in 3 handlingar" }
    ],
    how_label: "Process",
    how_h: "Så fungerar det",
    how_sub: "Tre steg, utan jargong.",
    steps: [
      { n: "01", t: "Ladda upp dokumentet", d: "Vilken officiell skrivelse eller vilket beslut som helst från en migrationsmyndighet." },
      { n: "02", t: "Vi förklarar det", d: "Sammanfattning i klarspråk, datum och vad som krävs av dig." },
      { n: "03", t: "Du vet vad du ska göra", d: "Tydliga nästa steg och frister, i rätt ordning." }
    ],
    who_label: "För vem",
    who_h: "Byggt för människor inuti systemet.",
    who_sub: "Enskilda migranter, organisationer som stödjer dem och jurister som rådger.",
    personas: [
      { t: "Asylsökande", d: "Förstå varje brev från myndigheten — utan tolk." },
      { t: "Internationella studenter", d: "Missa aldrig en förlängning, tid eller frist i ett obekant system." },
      { t: "Arbetstagare & familjer", d: "Hela hushållets migrationsdokument på ett ställe." }
    ],
    privacy_label: "Datahantering",
    privacy_h: "Dina dokument lämnar aldrig behandlingen.",
    privacy_sub: "migraDOCS är byggt kring strikt minimal datalagring.",
    privacy_points: [
      { t: "Ingen fillagring", d: "Original behandlas i minnet och raderas. Endast den strukturerade sammanfattningen sparas." },
      { t: "Endast extraherade fält", d: "Datum, åtgärder och kategorier — aldrig originalbrev, aldrig sidfoton." },
      { t: "Spårbar radering", d: "Varje sammanfattning kan raderas permanent från ditt konto när som helst." }
    ],
    waitlist_h: "Bli först med att få veta.",
    waitlist_sub: "Lämna din e-post. Vi hör av oss när det är din tur.",
    waitlist_placeholder: "du@email.se",
    waitlist_cta: "Gå med i väntelistan",
    waitlist_joining: "Lägger till…",
    waitlist_ok_t: "Du är med på listan.",
    waitlist_ok_d: "Vi hör av oss.",
    waitlist_err: "Ange en giltig e-postadress.",
    footer_copy: "© 2026 migraDOCS",
    footer_disclaimer: "Endast strukturerad information. Inte juridisk rådgivning."
  },
  AR: {
    dir: "rtl",
    nav_cta: "الانضمام إلى قائمة الانتظار",
    lang_label: "اللغة",
    hero_kicker: "معلومات منظَّمة · ليست استشارة قانونية",
    hero_h1_1: "نظام الهجرة،",
    hero_h1_2: "مُترجَمًا.",
    hero_sub: "ارفع المستند. افهم مضمونه. اعرف ما يجب فعله ومتى.",
    hero_cta: "الانضمام إلى قائمة الانتظار",
    hero_meta: "لا يُخزَّن أي ملف. يُعالَج ثم يُتلَف.",
    doc_plain: "لغة مبسّطة",
    doc_deadline: "الموعد النهائي",
    doc_action: "الإجراء المطلوب",
    docs: [
      { type: "إشعار تصريح", auth: "سلطة الهجرة", date: "صدر في ١٢ أبريل ٢٠٢٦", translation: "تمت الموافقة على تصريح عملك. استلمه شخصيًا خلال ٣٠ يومًا.", deadline: "١٢ مايو ٢٠٢٦", action: "حجز موعد الاستلام" },
      { type: "رسالة موعد", auth: "القياسات الحيوية", date: "صدر في ٣ أبريل ٢٠٢٦", translation: "تم تحديد موعد لقياساتك الحيوية. الحضور إلزامي.", deadline: "٢٨ أبريل ٢٠٢٦", action: "الحضور شخصيًا" },
      { type: "قرار استئناف", auth: "المحكمة الإدارية", date: "صدر في ٢١ مارس ٢٠٢٦", translation: "استئنافك قيد المراجعة. سيصدر قرار كتابي خلال ٦٠ يومًا.", deadline: "٢٠ مايو ٢٠٢٦", action: "انتظار الإشعار الكتابي" },
      { type: "طلب مستندات", auth: "سلطة الهجرة", date: "صدر في ٨ أبريل ٢٠٢٦", translation: "مطلوب مستندات إضافية. قدّمها خلال ١٤ يومًا وإلا عُلّقت قضيتك.", deadline: "٢٢ أبريل ٢٠٢٦", action: "تقديم ٣ مستندات" }
    ],
    how_label: "العملية",
    how_h: "كيف تعمل",
    how_sub: "ثلاث خطوات، دون تعقيد.",
    steps: [
      { n: "٠١", t: "ارفع مستندك", d: "أي رسالة رسمية أو إشعار من سلطة الهجرة." },
      { n: "٠٢", t: "نشرحه لك", d: "ملخّص بلغة واضحة، وتواريخ، وما هو مطلوب منك." },
      { n: "٠٣", t: "تعرف ما تفعل", d: "خطوات تالية واضحة ومواعيد، بالترتيب الصحيح." }
    ],
    who_label: "لمن",
    who_h: "مُصمَّم لمن هم داخل النظام.",
    who_sub: "المهاجرون الأفراد، المنظمات التي تدعمهم، والمحامون الذين يستشيرونهم.",
    personas: [
      { t: "طالبو اللجوء", d: "افهم كل رسالة من سلطة الهجرة دون الحاجة إلى مترجم." },
      { t: "الطلاب الدوليون", d: "لا تفوّت تجديدًا أو موعدًا أو موعدًا نهائيًا في نظام غير مألوف." },
      { t: "العاملون والعائلات", d: "احفظ مستندات هجرة الأسرة كاملة في مكان واحد." }
    ],
    privacy_label: "معالجة البيانات",
    privacy_h: "مستنداتك لا تغادر مرحلة المعالجة.",
    privacy_sub: "migraDOCS مبني حول مبدأ صارم لأقل قدر من الاحتفاظ بالبيانات.",
    privacy_points: [
      { t: "لا تخزين للملفات", d: "تُعالَج المستندات الأصلية في الذاكرة ثم تُتلَف. يُحتفظ فقط بالملخّص المنظَّم." },
      { t: "حقول مستخرجة فقط", d: "تواريخ وإجراءات وتصنيفات — ولا شيء من النص الأصلي أو صور الصفحات." },
      { t: "حذف قابل للتدقيق", d: "يمكن محو أي ملخّص نهائيًا من حسابك في أي وقت." }
    ],
    waitlist_h: "كن أول من يعرف.",
    waitlist_sub: "اترك بريدك الإلكتروني. سنتواصل معك عند إتاحة الخدمة.",
    waitlist_placeholder: "you@email.com",
    waitlist_cta: "الانضمام إلى قائمة الانتظار",
    waitlist_joining: "جاري الإضافة…",
    waitlist_ok_t: "أنت على القائمة.",
    waitlist_ok_d: "سنتواصل معك.",
    waitlist_err: "يرجى إدخال بريد إلكتروني صالح.",
    footer_copy: "© ٢٠٢٦ migraDOCS",
    footer_disclaimer: "معلومات منظَّمة فقط. ليست استشارة قانونية."
  }
};

window.CONTENT = CONTENT;
