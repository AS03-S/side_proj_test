import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function daysUntil(dateString: string): number {
  const now = new Date();
  const target = new Date(dateString);
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function categoryLabel(category: string): string {
  const labels: Record<string, string> = {
    residence_permit: "Residence Permit",
    travel_document: "Travel Document",
    work_authorization: "Work Authorization",
    asylum: "Asylum Documentation",
    appeal: "Appeal Notice",
    request_documentation: "Request for Documentation",
    appointment_notice: "Appointment Notice",
    tax_registration: "Tax Registration",
    other: "Other",
  };
  return labels[category] ?? category;
}

export function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending_review: "Pending Review",
    reviewed: "Reviewed",
    action_required: "Action Required",
    expired: "Expired",
    completed: "Completed",
  };
  return labels[status] ?? status;
}
