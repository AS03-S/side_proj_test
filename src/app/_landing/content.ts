export interface DocEntry {
  type: string;
  auth: string;
  date: string;
  translation: string;
  deadline: string;
  action: string;
}

export interface StepEntry { n: string; t: string; d: string; }
export interface PersonaEntry { t: string; d: string; }
export interface PrivacyPoint { t: string; d: string; }

export interface LangContent {
  dir: "ltr" | "rtl";
  nav_cta: string;
  lang_label: string;
  hero_kicker: string;
  hero_h1_1: string;
  hero_h1_2: string;
  hero_sub: string;
  hero_cta: string;
  hero_meta: string;
  doc_plain: string;
  doc_deadline: string;
  doc_action: string;
  docs: DocEntry[];
  how_label: string;
  how_h: string;
  how_sub: string;
  steps: StepEntry[];
  who_label: string;
  who_h: string;
  who_sub: string;
  personas: PersonaEntry[];
  privacy_label: string;
  privacy_h: string;
  privacy_sub: string;
  privacy_points: PrivacyPoint[];
  waitlist_h: string;
  waitlist_sub: string;
  waitlist_placeholder: string;
  waitlist_cta: string;
  waitlist_joining: string;
  waitlist_ok_t: string;
  waitlist_ok_d: string;
  waitlist_err: string;
  footer_copy: string;
  footer_disclaimer: string;
}

export type Language = "EN" | "DE" | "FR" | "IT" | "SV" | "PL" | "UK" | "AR";
export type Direction = "A" | "B";

export interface TweakState {
  direction: Direction;
  language: Language;
  accent: boolean;
}

export const TWEAK_DEFAULTS: TweakState = {
  direction: "B",
  language: "EN",
  accent: true,
};

export const CONTENT: Record<Language, LangContent> = {
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
      { type: "Additional Documentation", auth: "Immigration Authority", date: "Issued 08 April 2026", translation: "Further documents are required. Submit the listed items within 14 days or your case is suspended.", deadline: "22 April 2026", action: "Submit 3 documents" },
    ],
    how_label: "Process",
    how_h: "How it works",
    how_sub: "Three steps, no jargon.",
    steps: [
      { n: "01", t: "Upload your document", d: "Any official letter or notice from an immigration authority." },
      { n: "02", t: "We explain it", d: "Plain language summary, dates, and what is being asked of you." },
      { n: "03", t: "You know what to do", d: "Clear next steps and deadlines, in the correct order." },
    ],
    who_label: "Who it's for",
    who_h: "Built for people inside the system.",
    who_sub: "Individual immigrants, the NGOs supporting them, and lawyers advising them.",
    personas: [
      { t: "Asylum seekers", d: "Understand every letter from the migration authority without needing a translator." },
      { t: "International students", d: "Never miss a permit renewal, appointment, or deadline in an unfamiliar system." },
      { t: "Workers & families", d: "Keep a household's immigration documents organised in one place." },
    ],
    privacy_label: "Data handling",
    privacy_h: "Your documents never leave processing.",
    privacy_sub: "migraDOCS is designed around a strict minimum-retention principle.",
    privacy_points: [
      { t: "No file storage", d: "Original documents are processed in memory and discarded. Only the structured summary is retained." },
      { t: "Extracted fields only", d: "Dates, required actions, and categories — never the raw letter, never photographs of pages." },
      { t: "Auditable deletion", d: "Every summary can be permanently erased from your account at any time." },
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
    footer_disclaimer: "Structured information only. Not legal advice.",
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
      { type: "Nachforderung", auth: "Ausländerbehörde", date: "Ausgestellt 08. April 2026", translation: "Weitere Unterlagen sind erforderlich. Einreichung innerhalb von 14 Tagen, sonst Verfahrensaussetzung.", deadline: "22. April 2026", action: "3 Unterlagen einreichen" },
    ],
    how_label: "Ablauf",
    how_h: "So funktioniert es",
    how_sub: "Drei Schritte, ohne Fachjargon.",
    steps: [
      { n: "01", t: "Dokument hochladen", d: "Jede offizielle Mitteilung oder jeder Bescheid einer Ausländerbehörde." },
      { n: "02", t: "Wir erklären es", d: "Zusammenfassung in einfacher Sprache, Termine und Handlungsaufforderungen." },
      { n: "03", t: "Sie wissen, was zu tun ist", d: "Klare nächste Schritte und Fristen, in der richtigen Reihenfolge." },
    ],
    who_label: "Für wen",
    who_h: "Gemacht für Menschen im System.",
    who_sub: "Einwandernde, unterstützende Organisationen und beratende Anwältinnen.",
    personas: [
      { t: "Asylsuchende", d: "Jeden Behördenbrief verstehen — ohne Übersetzer." },
      { t: "Internationale Studierende", d: "Keine Verlängerung, kein Termin, keine Frist mehr verpassen." },
      { t: "Arbeitnehmer & Familien", d: "Alle Einwanderungsdokumente des Haushalts an einem Ort." },
    ],
    privacy_label: "Datenverarbeitung",
    privacy_h: "Ihre Dokumente verlassen die Verarbeitung nicht.",
    privacy_sub: "migraDOCS folgt einem strikten Prinzip der minimalen Datenaufbewahrung.",
    privacy_points: [
      { t: "Keine Dateispeicherung", d: "Originale werden im Arbeitsspeicher verarbeitet und verworfen. Nur die strukturierte Zusammenfassung bleibt." },
      { t: "Nur extrahierte Felder", d: "Termine, Pflichten, Kategorien — nie der Originaltext, nie Seitenfotos." },
      { t: "Prüfbare Löschung", d: "Jede Zusammenfassung kann jederzeit dauerhaft aus Ihrem Konto entfernt werden." },
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
    footer_disclaimer: "Nur strukturierte Information. Keine Rechtsberatung.",
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
      { type: "Komplettering", auth: "Migrationsverket", date: "Utfärdat 8 april 2026", translation: "Ytterligare handlingar krävs. Inlämning inom 14 dagar, annars vilar ärendet.", deadline: "22 april 2026", action: "Lämna in 3 handlingar" },
    ],
    how_label: "Process",
    how_h: "Så fungerar det",
    how_sub: "Tre steg, utan jargong.",
    steps: [
      { n: "01", t: "Ladda upp dokumentet", d: "Vilken officiell skrivelse eller vilket beslut som helst från en migrationsmyndighet." },
      { n: "02", t: "Vi förklarar det", d: "Sammanfattning i klarspråk, datum och vad som krävs av dig." },
      { n: "03", t: "Du vet vad du ska göra", d: "Tydliga nästa steg och frister, i rätt ordning." },
    ],
    who_label: "För vem",
    who_h: "Byggt för människor inuti systemet.",
    who_sub: "Enskilda migranter, organisationer som stödjer dem och jurister som rådger.",
    personas: [
      { t: "Asylsökande", d: "Förstå varje brev från myndigheten — utan tolk." },
      { t: "Internationella studenter", d: "Missa aldrig en förlängning, tid eller frist i ett obekant system." },
      { t: "Arbetstagare & familjer", d: "Hela hushållets migrationsdokument på ett ställe." },
    ],
    privacy_label: "Datahantering",
    privacy_h: "Dina dokument lämnar aldrig behandlingen.",
    privacy_sub: "migraDOCS är byggt kring strikt minimal datalagring.",
    privacy_points: [
      { t: "Ingen fillagring", d: "Original behandlas i minnet och raderas. Endast den strukturerade sammanfattningen sparas." },
      { t: "Endast extraherade fält", d: "Datum, åtgärder och kategorier — aldrig originalbrev, aldrig sidfoton." },
      { t: "Spårbar radering", d: "Varje sammanfattning kan raderas permanent från ditt konto när som helst." },
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
    footer_disclaimer: "Endast strukturerad information. Inte juridisk rådgivning.",
  },
  FR: {
    dir: "ltr",
    nav_cta: "Rejoindre la liste d'attente",
    lang_label: "Langue",
    hero_kicker: "INFORMATION STRUCTURÉE · PAS DE CONSEIL JURIDIQUE",
    hero_h1_1: "Le système d'immigration,",
    hero_h1_2: "traduit.",
    hero_sub: "Téléchargez un document. Comprenez ce qu'il signifie. Sachez quoi faire et quand.",
    hero_cta: "Rejoindre la liste d'attente",
    hero_meta: "Aucun fichier n'est stocké. Traité et supprimé.",
    doc_plain: "Langage clair",
    doc_deadline: "Échéance",
    doc_action: "Action requise",
    docs: [
      { type: "Avis de permis", auth: "Autorité d'immigration", date: "Délivré le 12 avril 2026", translation: "Votre permis de travail a été approuvé. Récupérez-le en personne dans les 30 jours.", deadline: "12 mai 2026", action: "Prendre rendez-vous" },
      { type: "Convocation", auth: "Services biométriques", date: "Délivré le 03 avril 2026", translation: "Vous avez un rendez-vous biométrique programmé. La présence est obligatoire.", deadline: "28 avril 2026", action: "Se présenter en personne" },
      { type: "Décision d'appel", auth: "Tribunal administratif", date: "Délivré le 21 mars 2026", translation: "Votre appel est en cours d'examen. Une décision écrite sera rendue dans 60 jours.", deadline: "20 mai 2026", action: "Attendre la notification" },
      { type: "Documents supplémentaires", auth: "Autorité d'immigration", date: "Délivré le 08 avril 2026", translation: "Des documents supplémentaires sont requis. Soumettez les éléments listés dans 14 jours ou votre dossier est suspendu.", deadline: "22 avril 2026", action: "Soumettre 3 documents" },
    ],
    how_label: "Processus",
    how_h: "Comment ça marche",
    how_sub: "Trois étapes, sans jargon.",
    steps: [
      { n: "01", t: "Téléchargez votre document", d: "Toute lettre ou avis officiel d'une autorité d'immigration." },
      { n: "02", t: "Nous l'expliquons", d: "Résumé en langage clair, dates et ce qui vous est demandé." },
      { n: "03", t: "Vous savez quoi faire", d: "Prochaines étapes claires et délais, dans le bon ordre." },
    ],
    who_label: "Pour qui",
    who_h: "Conçu pour les personnes dans le système.",
    who_sub: "Immigrants individuels, ONG qui les soutiennent, et avocats qui les conseillent.",
    personas: [
      { t: "Demandeurs d'asile", d: "Comprenez chaque lettre des autorités sans avoir besoin d'un traducteur." },
      { t: "Étudiants internationaux", d: "Ne manquez jamais un renouvellement, un rendez-vous ou une échéance." },
      { t: "Travailleurs et familles", d: "Gardez les documents d'immigration du foyer organisés en un seul endroit." },
    ],
    privacy_label: "Gestion des données",
    privacy_h: "Vos documents ne quittent jamais le traitement.",
    privacy_sub: "migraDOCS est conçu autour d'un principe strict de rétention minimale.",
    privacy_points: [
      { t: "Aucun stockage de fichier", d: "Les documents originaux sont traités en mémoire et supprimés. Seul le résumé structuré est conservé." },
      { t: "Champs extraits uniquement", d: "Dates, actions requises et catégories — jamais la lettre brute, jamais les photos de pages." },
      { t: "Suppression vérifiable", d: "Chaque résumé peut être définitivement effacé de votre compte à tout moment." },
    ],
    waitlist_h: "Soyez le premier informé.",
    waitlist_sub: "Laissez votre email. Nous vous contacterons quand vous pourrez l'utiliser.",
    waitlist_placeholder: "vous@email.com",
    waitlist_cta: "Rejoindre la liste d'attente",
    waitlist_joining: "Inscription…",
    waitlist_ok_t: "Vous êtes sur la liste.",
    waitlist_ok_d: "Nous vous contacterons.",
    waitlist_err: "Veuillez saisir une adresse email valide.",
    footer_copy: "© 2026 migraDOCS",
    footer_disclaimer: "Information structurée uniquement. Pas de conseil juridique.",
  },
  IT: {
    dir: "ltr",
    nav_cta: "Unisciti alla lista d'attesa",
    lang_label: "Lingua",
    hero_kicker: "INFORMAZIONE STRUTTURATA · NON CONSULENZA LEGALE",
    hero_h1_1: "Il sistema d'immigrazione,",
    hero_h1_2: "tradotto.",
    hero_sub: "Carica un documento. Capisci cosa significa. Sai cosa fare e quando.",
    hero_cta: "Unisciti alla lista d'attesa",
    hero_meta: "Nessun file viene conservato. Elaborato e scartato.",
    doc_plain: "Linguaggio semplice",
    doc_deadline: "Scadenza",
    doc_action: "Azione richiesta",
    docs: [
      { type: "Avviso di permesso", auth: "Autorità immigrazione", date: "Rilasciato il 12 aprile 2026", translation: "Il tuo permesso di lavoro è stato approvato. Ritiralo di persona entro 30 giorni.", deadline: "12 maggio 2026", action: "Prenotare il ritiro" },
      { type: "Lettera di convocazione", auth: "Servizi biometrici", date: "Rilasciato il 03 aprile 2026", translation: "Hai un appuntamento biometrico programmato. La presenza è obbligatoria.", deadline: "28 aprile 2026", action: "Presentarsi di persona" },
      { type: "Decisione di appello", auth: "Tribunale amministrativo", date: "Rilasciato il 21 marzo 2026", translation: "Il tuo ricorso è in esame. Una decisione scritta sarà emessa entro 60 giorni.", deadline: "20 maggio 2026", action: "Attendere la notifica" },
      { type: "Documentazione aggiuntiva", auth: "Autorità immigrazione", date: "Rilasciato l'08 aprile 2026", translation: "Sono richiesti ulteriori documenti. Invia gli elementi elencati entro 14 giorni o il tuo caso sarà sospeso.", deadline: "22 aprile 2026", action: "Inviare 3 documenti" },
    ],
    how_label: "Processo",
    how_h: "Come funziona",
    how_sub: "Tre passaggi, senza gergo.",
    steps: [
      { n: "01", t: "Carica il tuo documento", d: "Qualsiasi lettera o avviso ufficiale da un'autorità di immigrazione." },
      { n: "02", t: "Lo spieghiamo", d: "Riepilogo in linguaggio semplice, date e cosa ti viene chiesto." },
      { n: "03", t: "Sai cosa fare", d: "Prossimi passi chiari e scadenze, nell'ordine corretto." },
    ],
    who_label: "Per chi",
    who_h: "Creato per le persone nel sistema.",
    who_sub: "Immigrati individuali, ONG che li supportano, e avvocati che li consigliano.",
    personas: [
      { t: "Richiedenti asilo", d: "Capisci ogni lettera dall'autorità senza bisogno di un traduttore." },
      { t: "Studenti internazionali", d: "Non perdere mai un rinnovo, un appuntamento o una scadenza." },
      { t: "Lavoratori e famiglie", d: "Tieni organizzati i documenti di immigrazione della famiglia in un unico posto." },
    ],
    privacy_label: "Gestione dati",
    privacy_h: "I tuoi documenti non lasciano mai l'elaborazione.",
    privacy_sub: "migraDOCS è progettato attorno a un rigoroso principio di conservazione minima.",
    privacy_points: [
      { t: "Nessuna archiviazione", d: "I documenti originali vengono elaborati in memoria e scartati. Viene conservato solo il riepilogo strutturato." },
      { t: "Solo campi estratti", d: "Date, azioni richieste e categorie — mai la lettera grezza, mai le foto delle pagine." },
      { t: "Eliminazione verificabile", d: "Ogni riepilogo può essere eliminato definitivamente dal tuo account in qualsiasi momento." },
    ],
    waitlist_h: "Sii il primo a saperlo.",
    waitlist_sub: "Lascia la tua email. Ti contatteremo quando potrai usarlo.",
    waitlist_placeholder: "tu@email.it",
    waitlist_cta: "Unisciti alla lista d'attesa",
    waitlist_joining: "Iscrizione…",
    waitlist_ok_t: "Sei nella lista.",
    waitlist_ok_d: "Ti contatteremo.",
    waitlist_err: "Inserisci un indirizzo email valido.",
    footer_copy: "© 2026 migraDOCS",
    footer_disclaimer: "Solo informazioni strutturate. Non consulenza legale.",
  },
  PL: {
    dir: "ltr",
    nav_cta: "Dołącz do listy oczekujących",
    lang_label: "Język",
    hero_kicker: "INFORMACJA STRUKTURALNA · NIE PORADA PRAWNA",
    hero_h1_1: "System imigracyjny,",
    hero_h1_2: "przetłumaczony.",
    hero_sub: "Prześlij dokument. Zrozum, co oznacza. Wiedz, co zrobić i kiedy.",
    hero_cta: "Dołącz do listy oczekujących",
    hero_meta: "Żaden plik nie jest przechowywany. Przetworzony i usunięty.",
    doc_plain: "Prosty język",
    doc_deadline: "Termin",
    doc_action: "Wymagane działanie",
    docs: [
      { type: "Zawiadomienie o zezwoleniu", auth: "Urząd ds. cudzoziemców", date: "Wydano 12 kwietnia 2026", translation: "Twoje zezwolenie na pracę zostało zatwierdzone. Odbierz je osobiście w ciągu 30 dni.", deadline: "12 maja 2026", action: "Umów wizytę odbiorczą" },
      { type: "Wezwanie na spotkanie", auth: "Usługi biometryczne", date: "Wydano 03 kwietnia 2026", translation: "Masz zaplanowane spotkanie biometryczne. Obecność jest obowiązkowa.", deadline: "28 kwietnia 2026", action: "Stawić się osobiście" },
      { type: "Decyzja odwoławcza", auth: "Sąd administracyjny", date: "Wydano 21 marca 2026", translation: "Twoje odwołanie jest rozpatrywane. Pisemna decyzja zostanie wydana w ciągu 60 dni.", deadline: "20 maja 2026", action: "Oczekiwać powiadomienia" },
      { type: "Dodatkowa dokumentacja", auth: "Urząd ds. cudzoziemców", date: "Wydano 08 kwietnia 2026", translation: "Wymagane są dodatkowe dokumenty. Prześlij wymienione elementy w ciągu 14 dni, w przeciwnym razie sprawa zostanie zawieszona.", deadline: "22 kwietnia 2026", action: "Przesłać 3 dokumenty" },
    ],
    how_label: "Proces",
    how_h: "Jak to działa",
    how_sub: "Trzy kroki, bez żargonu.",
    steps: [
      { n: "01", t: "Prześlij dokument", d: "Dowolny oficjalny list lub powiadomienie od organu imigracyjnego." },
      { n: "02", t: "Wyjaśniamy", d: "Podsumowanie w prostym języku, daty i czego się od ciebie wymaga." },
      { n: "03", t: "Wiesz, co robić", d: "Jasne kolejne kroki i terminy, w odpowiedniej kolejności." },
    ],
    who_label: "Dla kogo",
    who_h: "Stworzone dla ludzi w systemie.",
    who_sub: "Indywidualni imigranci, NGO które ich wspierają, i prawnicy którzy doradzają.",
    personas: [
      { t: "Osoby ubiegające się o azyl", d: "Rozumiej każdy list od urzędu imigracyjnego bez tłumacza." },
      { t: "Studenci zagraniczni", d: "Nigdy nie przegap odnowienia, wizyty ani terminu w nieznanym systemie." },
      { t: "Pracownicy i rodziny", d: "Trzymaj dokumenty imigracyjne całej rodziny w jednym miejscu." },
    ],
    privacy_label: "Przetwarzanie danych",
    privacy_h: "Twoje dokumenty nigdy nie opuszczają przetwarzania.",
    privacy_sub: "migraDOCS jest zbudowany wokół zasady minimalnego przechowywania danych.",
    privacy_points: [
      { t: "Brak przechowywania plików", d: "Oryginalne dokumenty są przetwarzane w pamięci i usuwane. Zachowywane jest tylko ustrukturyzowane podsumowanie." },
      { t: "Tylko wyodrębnione pola", d: "Daty, wymagane działania i kategorie — nigdy oryginalny list, nigdy zdjęcia stron." },
      { t: "Weryfikowalne usunięcie", d: "Każde podsumowanie można trwale usunąć z konta w dowolnym momencie." },
    ],
    waitlist_h: "Bądź pierwszym, który się dowie.",
    waitlist_sub: "Zostaw swój email. Skontaktujemy się z tobą.",
    waitlist_placeholder: "ty@email.pl",
    waitlist_cta: "Dołącz do listy oczekujących",
    waitlist_joining: "Dołączanie…",
    waitlist_ok_t: "Jesteś na liście.",
    waitlist_ok_d: "Skontaktujemy się z tobą.",
    waitlist_err: "Proszę podać prawidłowy adres email.",
    footer_copy: "© 2026 migraDOCS",
    footer_disclaimer: "Tylko informacje strukturalne. Nie porada prawna.",
  },
  UK: {
    dir: "ltr",
    nav_cta: "Приєднатися до списку очікування",
    lang_label: "Мова",
    hero_kicker: "СТРУКТУРОВАНА ІНФОРМАЦІЯ · НЕ ЮРИДИЧНА ПОРАДА",
    hero_h1_1: "Імміграційна система,",
    hero_h1_2: "пояснена.",
    hero_sub: "Завантажте документ. Зрозумійте його зміст. Знайте, що робити і коли.",
    hero_cta: "Приєднатися до списку очікування",
    hero_meta: "Жоден файл не зберігається. Обробляється і видаляється.",
    doc_plain: "Проста мова",
    doc_deadline: "Термін",
    doc_action: "Необхідна дія",
    docs: [
      { type: "Повідомлення про дозвіл", auth: "Імміграційний орган", date: "Видано 12 квітня 2026", translation: "Ваш дозвіл на роботу затверджено. Отримайте його особисто протягом 30 днів.", deadline: "12 травня 2026", action: "Записатися на отримання" },
      { type: "Запрошення на прийом", auth: "Служба біометрії", date: "Видано 03 квітня 2026", translation: "Вас записано на біометричний прийом. Відвідування обов'язкове.", deadline: "28 квітня 2026", action: "Прийти особисто" },
      { type: "Рішення з апеляції", auth: "Адміністративний суд", date: "Видано 21 березня 2026", translation: "Ваша апеляція розглядається. Письмове рішення буде видано протягом 60 днів.", deadline: "20 травня 2026", action: "Очікувати повідомлення" },
      { type: "Додаткові документи", auth: "Імміграційний орган", date: "Видано 08 квітня 2026", translation: "Необхідні додаткові документи. Подайте зазначені матеріали протягом 14 днів, інакше справу буде призупинено.", deadline: "22 квітня 2026", action: "Подати 3 документи" },
    ],
    how_label: "Процес",
    how_h: "Як це працює",
    how_sub: "Три кроки, без жаргону.",
    steps: [
      { n: "01", t: "Завантажте документ", d: "Будь-який офіційний лист або повідомлення від імміграційного органу." },
      { n: "02", t: "Ми пояснюємо", d: "Резюме простою мовою, дати та що від вас вимагається." },
      { n: "03", t: "Ви знаєте, що робити", d: "Чіткі наступні кроки та терміни, у правильному порядку." },
    ],
    who_label: "Для кого",
    who_h: "Створено для людей у системі.",
    who_sub: "Окремі мігранти, НКО що їх підтримують, та юристи що консультують.",
    personas: [
      { t: "Шукачі притулку", d: "Розумійте кожен лист від міграційного органу без перекладача." },
      { t: "Міжнародні студенти", d: "Ніколи не пропускайте поновлення, прийом або термін." },
      { t: "Працівники та сім'ї", d: "Зберігайте імміграційні документи сім'ї в одному місці." },
    ],
    privacy_label: "Обробка даних",
    privacy_h: "Ваші документи ніколи не залишають обробку.",
    privacy_sub: "migraDOCS побудований на принципі суворого мінімального зберігання даних.",
    privacy_points: [
      { t: "Без зберігання файлів", d: "Оригінальні документи обробляються в пам'яті та видаляються. Зберігається лише структуроване резюме." },
      { t: "Лише витягнуті поля", d: "Дати, необхідні дії та категорії — ніколи оригінальний текст, ніколи фотографії сторінок." },
      { t: "Перевірюване видалення", d: "Будь-яке резюме може бути назавжди видалено з вашого облікового запису будь-коли." },
    ],
    waitlist_h: "Дізнайтеся першими.",
    waitlist_sub: "Залиште свою електронну пошту. Ми зв'яжемося з вами.",
    waitlist_placeholder: "ви@email.com",
    waitlist_cta: "Приєднатися до списку очікування",
    waitlist_joining: "Додавання…",
    waitlist_ok_t: "Ви в списку.",
    waitlist_ok_d: "Ми зв'яжемося з вами.",
    waitlist_err: "Будь ласка, введіть дійсну адресу електронної пошти.",
    footer_copy: "© 2026 migraDOCS",
    footer_disclaimer: "Лише структурована інформація. Не юридична порада.",
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
      { type: "طلب مستندات", auth: "سلطة الهجرة", date: "صدر في ٨ أبريل ٢٠٢٦", translation: "مطلوب مستندات إضافية. قدّمها خلال ١٤ يومًا وإلا عُلّقت قضيتك.", deadline: "٢٢ أبريل ٢٠٢٦", action: "تقديم ٣ مستندات" },
    ],
    how_label: "العملية",
    how_h: "كيف تعمل",
    how_sub: "ثلاث خطوات، دون تعقيد.",
    steps: [
      { n: "٠١", t: "ارفع مستندك", d: "أي رسالة رسمية أو إشعار من سلطة الهجرة." },
      { n: "٠٢", t: "نشرحه لك", d: "ملخّص بلغة واضحة، وتواريخ، وما هو مطلوب منك." },
      { n: "٠٣", t: "تعرف ما تفعل", d: "خطوات تالية واضحة ومواعيد، بالترتيب الصحيح." },
    ],
    who_label: "لمن",
    who_h: "مُصمَّم لمن هم داخل النظام.",
    who_sub: "المهاجرون الأفراد، المنظمات التي تدعمهم، والمحامون الذين يستشيرونهم.",
    personas: [
      { t: "طالبو اللجوء", d: "افهم كل رسالة من سلطة الهجرة دون الحاجة إلى مترجم." },
      { t: "الطلاب الدوليون", d: "لا تفوّت تجديدًا أو موعدًا أو موعدًا نهائيًا في نظام غير مألوف." },
      { t: "العاملون والعائلات", d: "احفظ مستندات هجرة الأسرة كاملة في مكان واحد." },
    ],
    privacy_label: "معالجة البيانات",
    privacy_h: "مستنداتك لا تغادر مرحلة المعالجة.",
    privacy_sub: "migraDOCS مبني حول مبدأ صارم لأقل قدر من الاحتفاظ بالبيانات.",
    privacy_points: [
      { t: "لا تخزين للملفات", d: "تُعالَج المستندات الأصلية في الذاكرة ثم تُتلَف. يُحتفظ فقط بالملخّص المنظَّم." },
      { t: "حقول مستخرجة فقط", d: "تواريخ وإجراءات وتصنيفات — ولا شيء من النص الأصلي أو صور الصفحات." },
      { t: "حذف قابل للتدقيق", d: "يمكن محو أي ملخّص نهائيًا من حسابك في أي وقت." },
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
    footer_disclaimer: "معلومات منظَّمة فقط. ليست استشارة قانونية.",
  },
};
