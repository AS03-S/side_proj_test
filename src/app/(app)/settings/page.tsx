"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Bell, Globe, User, Trash2, AlertTriangle, CheckCircle2 } from "lucide-react";

const LANGUAGES = ["English", "German", "French", "Arabic", "Turkish", "Farsi", "Ukrainian", "Spanish"];
const NOTIFICATION_OPTIONS = [
  { id: "deadline_alerts", label: "Deadline alerts", description: "Notify when a document deadline is approaching (7 days and 1 day before)." },
  { id: "action_reminders", label: "Action reminders", description: "Weekly summary of pending required actions." },
  { id: "new_guidance", label: "New guidance modules", description: "Notify when new guidance content is added relevant to your documents." },
  { id: "upload_processed", label: "Document processing complete", description: "Notify when an uploaded document has been processed and categorised." },
];

export default function SettingsPage() {
  const [name, setName] = useState("A. Meier");
  const [email, setEmail] = useState("a.meier@example.com");
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    deadline_alerts: true,
    action_reminders: true,
    new_guidance: false,
    upload_processed: true,
  });
  const [shareData, setShareData] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <>
      <TopBar title="Settings" subtitle="Account, privacy, and preferences" />
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-2xl space-y-6">

          {/* Profile */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-neutral-500" strokeWidth={1.75} />
                <CardTitle>Profile</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-neutral-700">Full name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-neutral-700">Email address</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          {/* Language */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-neutral-500" strokeWidth={1.75} />
                <CardTitle>Preferred language</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-xs text-neutral-500">
                migraDOCS interface language. Document guidance will be provided in this language where available.
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className="rounded border px-3 py-2 text-xs font-medium transition-colors"
                    className={
                      language === lang
                        ? "border-navy bg-navy text-white"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                    }
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[10px] text-neutral-400">
                Full multilingual support is in development. Additional languages will be added in future versions.
              </p>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-neutral-500" strokeWidth={1.75} />
                <CardTitle>Notification preferences</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {NOTIFICATION_OPTIONS.map(({ id, label, description }) => (
                <div
                  key={id}
                  className="flex items-start justify-between gap-4 rounded border border-neutral-200 p-3"
                >
                  <div>
                    <p className="text-xs font-medium text-neutral-900">{label}</p>
                    <p className="mt-0.5 text-[10px] leading-relaxed text-neutral-500">{description}</p>
                  </div>
                  <button
                    onClick={() => setNotifications((prev) => ({ ...prev, [id]: !prev[id] }))}
                    className="relative mt-0.5 h-5 w-9 rounded-full shrink-0 transition-colors"
                    style={{ backgroundColor: notifications[id] ? "#16A34A" : "#E4E4E7" }}
                  >
                    <span
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                        notifications[id] ? "left-4" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-neutral-500" strokeWidth={1.75} />
                <CardTitle>Privacy settings</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between gap-4 rounded border border-neutral-200 p-3">
                <div>
                  <p className="text-xs font-medium text-neutral-900">Anonymous product improvement data</p>
                  <p className="mt-0.5 text-[10px] leading-relaxed text-neutral-500">
                    Share anonymised, non-identifiable usage data to help improve migraDOCS. No document content or personal data is included.
                  </p>
                </div>
                <button
                  onClick={() => setShareData(!shareData)}
                  className="relative mt-0.5 h-5 w-9 rounded-full shrink-0 transition-colors"
                  style={{ backgroundColor: shareData ? "#16A34A" : "#E4E4E7" }}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                      shareData ? "left-4" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
              <div className="space-y-2">
                {[
                  { icon: Lock, label: "Documents encrypted at rest (AES-256)" },
                  { icon: Shield, label: "Encrypted in transit (TLS 1.3)" },
                  { icon: CheckCircle2, label: "No data shared with third parties" },
                  { icon: CheckCircle2, label: "No advertising or data brokerage" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5 text-xs text-neutral-600">
                    <Icon className="h-3.5 w-3.5 text-neutral-400 shrink-0" strokeWidth={1.75} />
                    {label}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Legal disclaimer */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" strokeWidth={1.75} />
                <CardTitle>Disclaimer and legal information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-r-lg border-l-[3px] border-navy-light bg-navy-light/40 p-4">
                <p className="text-xs leading-relaxed text-neutral-700">
                  <strong className="text-neutral-950">migraDOCS provides document organisation and information only.</strong>{" "}
                  It does not provide legal advice, legal representation, legal eligibility assessments, or
                  official immigration determinations. Information provided through migraDOCS is informational
                  in nature and should not be relied upon as legal advice.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-neutral-700">
                  For matters requiring legal advice, consult a qualified immigration attorney
                  or accredited legal representative. Always verify extracted information against your original documents.
                </p>
              </div>
              <div className="flex gap-3">
                <Badge variant="muted">Terms of Service</Badge>
                <Badge variant="muted">Privacy Policy</Badge>
                <Badge variant="muted">Cookie Policy</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Danger zone */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4 text-red-500" strokeWidth={1.75} />
                <CardTitle className="text-red-700">Account and data</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-neutral-500">
                You can delete your account and all associated data at any time. This action is irreversible.
                All extracted summaries and guidance records will be permanently deleted.
              </p>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-3.5 w-3.5" />
                Delete account and all data
              </Button>
            </CardContent>
          </Card>

          {/* Save */}
          <div className="flex items-center justify-end gap-3 py-2">
            {saved && (
              <span className="flex items-center gap-1.5 text-xs text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Settings saved
              </span>
            )}
            <Button onClick={handleSave}>Save changes</Button>
          </div>
        </div>
      </main>
    </>
  );
}
