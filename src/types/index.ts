export type DocumentCategory =
  | "residence_permit"
  | "travel_document"
  | "work_authorization"
  | "asylum"
  | "appeal"
  | "request_documentation"
  | "appointment_notice"
  | "tax_registration"
  | "other";

export type DocumentStatus = "pending_review" | "reviewed" | "action_required" | "expired" | "completed";

export type ConfidenceLevel = "high" | "medium" | "low";

export interface RequiredAction {
  id: string;
  priority: "urgent" | "high" | "normal";
  description: string;
  dueDate?: string;
  completed: boolean;
  isLegalAction?: boolean;
}

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  dueDate?: string;
  isLegalAction?: boolean;
  documentId?: string;
  stepId?: string;
}

export interface DocumentVersion {
  id: string;
  uploadedAt: string;
  superseded: boolean;
  summary?: string;
}

export interface Document {
  id: string;
  title: string;
  issuingAuthority: string;
  dateReceived: string;
  extractedDeadline?: string;
  expiryDate?: string;
  category: DocumentCategory;
  status: DocumentStatus;
  confidence: ConfidenceLevel;
  confidenceScore: number;
  summary: string;
  requiredActions: RequiredAction[];
  preparationChecklist: ChecklistItem[];
  fileType: "pdf" | "image";
  pageCount?: number;
  referenceNumber?: string;
  tags: string[];
  versions?: DocumentVersion[];
  processIds?: string[];
  // Extended structured summary fields
  whatThisIs?: string;
  whatItRequires?: string[];
  deadlines?: Array<{ label: string; date: string }>;
  consequences?: string;
  nextSteps?: string[];
  authorityExplainer?: { name: string; role: string; contact?: string };
  whatItIsNotTelling?: string;
  referralCard?: { who: string; what: string; why: string };
}

export interface GuidanceModule {
  id: string;
  category: GuidanceCategory;
  title: string;
  description: string;
  steps: GuidanceStep[];
  estimatedTime?: string;
  priority?: "urgent" | "high" | "normal";
}

export type GuidanceCategory =
  | "documentation"
  | "appointments"
  | "deadlines"
  | "administrative"
  | "local_navigation";

export interface GuidanceStep {
  id: string;
  order: number;
  title: string;
  description: string;
  notes?: string;
}

export interface LocalSystemCard {
  id: string;
  title: string;
  description: string;
  category: string;
  steps: string[];
  officialNote?: string;
}

export interface ActivityItem {
  id: string;
  type: "upload" | "review" | "deadline_alert" | "action_completed" | "guidance_viewed";
  title: string;
  description: string;
  timestamp: string;
  documentId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  language: string;
  country: string;
}

// Process types
export type ProcessStatus = "active" | "on_hold" | "completed" | "abandoned";
export type ProcessStepStatus = "not_started" | "in_progress" | "completed" | "blocked";

export interface ProcessStep {
  id: string;
  order: number;
  title: string;
  description: string;
  status: ProcessStepStatus;
  deadline?: string;
  requiredDocuments?: string[];
  notes?: string;
  checklistItems?: ChecklistItem[];
}

export interface Process {
  id: string;
  name: string;
  country: string;
  currentStageIndex: number;
  status: ProcessStatus;
  steps: ProcessStep[];
  nextAction: string;
  nextDeadline?: string;
  startedAt: string;
  documentIds: string[];
  notes?: string;
}

// Document analysis result from Claude
export interface DocumentAnalysis {
  title: string;
  issuingAuthority: string;
  category: DocumentCategory;
  whatThisIs: string;
  whatItRequires: string[];
  deadlines: Array<{ label: string; date: string }>;
  consequences: string;
  nextSteps: string[];
  authorityExplainer: { name: string; role: string; contact?: string };
  whatItIsNotTelling: string;
  referralCard?: { who: string; what: string; why: string };
  summary: string;
  confidence: ConfidenceLevel;
  confidenceScore: number;
  tags: string[];
}
