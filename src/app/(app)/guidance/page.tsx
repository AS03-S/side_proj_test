"use client";

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { GUIDANCE_MODULES, LOCAL_SYSTEM_CARDS } from "@/lib/data/guidance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  CalendarClock,
  AlertCircle,
  ClipboardList,
  MapPin,
  ChevronDown,
  ChevronRight,
  Home,
  Heart,
  GraduationCap,
  Briefcase,
  CreditCard,
  Bus,
} from "lucide-react";
import type { GuidanceCategory } from "@/types";

const CATEGORY_CONFIG: Record<GuidanceCategory, { label: string; icon: React.ElementType; color: string }> = {
  documentation: { label: "Documentation", icon: FileText, color: "text-neutral-700" },
  appointments: { label: "Appointments", icon: CalendarClock, color: "text-sky-600" },
  deadlines: { label: "Deadlines", icon: AlertCircle, color: "text-red-500" },
  administrative: { label: "Administrative", icon: ClipboardList, color: "text-amber-600" },
  local_navigation: { label: "Local Navigation", icon: MapPin, color: "text-emerald-600" },
};

const LOCAL_SYSTEM_ICONS: Record<string, React.ElementType> = {
  Housing: Home,
  Healthcare: Heart,
  Education: GraduationCap,
  Employment: Briefcase,
  Finance: CreditCard,
  Transport: Bus,
};

const ALL_CATEGORIES = ["All", "Documentation", "Appointments", "Deadlines", "Administrative", "Local Navigation"];

export default function GuidancePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [expandedLocalCard, setExpandedLocalCard] = useState<string | null>(null);

  const filteredModules = GUIDANCE_MODULES.filter((mod) => {
    if (selectedCategory === "All") return true;
    const cfg = CATEGORY_CONFIG[mod.category];
    return cfg.label === selectedCategory;
  });

  return (
    <>
      <TopBar title="What to do next" subtitle="Structured procedural guidance" />
      <main className="flex-1 p-6 space-y-8">

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded border px-3 py-1 text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Guidance modules */}
        <section>
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-neutral-900">Procedural guidance modules</h2>
            <p className="mt-0.5 text-xs text-neutral-500">
              Step-by-step guidance for common immigration and administrative procedures.
            </p>
          </div>
          <div className="space-y-3">
            {filteredModules.map((mod) => {
              const cfg = CATEGORY_CONFIG[mod.category];
              const Icon = cfg.icon;
              const isExpanded = expandedModule === mod.id;
              return (
                <Card key={mod.id} className={isExpanded ? "border-neutral-300" : ""}>
                  <button
                    onClick={() => setExpandedModule(isExpanded ? null : mod.id)}
                    className="w-full text-left"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded border border-neutral-200 bg-neutral-50">
                          <Icon className={`h-4 w-4 ${cfg.color}`} strokeWidth={1.75} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-semibold text-neutral-900">{mod.title}</h3>
                            <Badge variant="muted" className="text-[10px]">{cfg.label}</Badge>
                            {mod.priority === "urgent" && <Badge variant="urgent">Urgent</Badge>}
                            {mod.priority === "high" && <Badge variant="high">High priority</Badge>}
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-neutral-500 line-clamp-2">{mod.description}</p>
                          {mod.estimatedTime && (
                            <p className="mt-1.5 text-[10px] text-neutral-400">Est. time: {mod.estimatedTime}</p>
                          )}
                        </div>
                        <div className="shrink-0 ml-2">
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-neutral-400" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-neutral-400" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </button>

                  {isExpanded && (
                    <>
                      <Separator />
                      <CardContent className="p-4 pt-4">
                        <ol className="space-y-4">
                          {mod.steps.map((step) => (
                            <li key={step.id} className="flex gap-3">
                              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-neutral-50 mt-0.5">
                                <span className="text-[10px] font-medium text-neutral-500">{step.order}</span>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-neutral-900">{step.title}</p>
                                <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">{step.description}</p>
                                {step.notes && (
                                  <p className="mt-1.5 text-[10px] leading-relaxed text-amber-700 bg-amber-50 border border-amber-100 rounded px-2 py-1">
                                    Note: {step.notes}
                                  </p>
                                )}
                              </div>
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    </>
                  )}
                </Card>
              );
            })}
          </div>
        </section>

        {/* Local system navigation */}
        {(selectedCategory === "All" || selectedCategory === "Local Navigation") && (
          <section>
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600" strokeWidth={1.75} />
                <h2 className="text-sm font-semibold text-neutral-900">Local system navigation</h2>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-neutral-500 max-w-2xl">
                Practical administrative guidance for settling into local systems. This section covers core
                administrative registrations and services that are typically required upon arrival.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {LOCAL_SYSTEM_CARDS.map((card) => {
                const Icon = LOCAL_SYSTEM_ICONS[card.category] ?? MapPin;
                const isExpanded = expandedLocalCard === card.id;
                return (
                  <Card key={card.id} className={isExpanded ? "border-emerald-200 sm:col-span-2 lg:col-span-1" : ""}>
                    <button
                      className="w-full text-left"
                      onClick={() => setExpandedLocalCard(isExpanded ? null : card.id)}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-7 w-7 items-center justify-center rounded border border-emerald-100 bg-emerald-50">
                              <Icon className="h-3.5 w-3.5 text-emerald-600" strokeWidth={1.75} />
                            </div>
                            <CardTitle className="text-xs">{card.title}</CardTitle>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                          ) : (
                            <ChevronRight className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-[10px] text-neutral-500 leading-relaxed mt-1">{card.description}</p>
                      </CardHeader>
                    </button>

                    {isExpanded && (
                      <>
                        <Separator />
                        <CardContent className="pt-3 pb-4">
                          <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-neutral-400">Steps</p>
                          <ol className="space-y-2">
                            {card.steps.map((step, i) => (
                              <li key={i} className="flex gap-2 text-xs text-neutral-600">
                                <span className="shrink-0 font-medium text-neutral-400">{i + 1}.</span>
                                <span className="leading-relaxed">{step}</span>
                              </li>
                            ))}
                          </ol>
                          {card.officialNote && (
                            <div className="mt-3 rounded border border-sky-100 bg-sky-50 px-3 py-2">
                              <p className="text-[10px] leading-relaxed text-sky-700">{card.officialNote}</p>
                            </div>
                          )}
                        </CardContent>
                      </>
                    )}
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Disclaimer */}
        <div className="flex items-start gap-3 rounded-r-lg border-l-[3px] border-[#57e4d7] px-4 py-3" style={{ background: "rgba(87,228,215,0.1)" }}>
          <p className="text-xs leading-relaxed" style={{ color: "#020086" }}>
            <strong className="font-semibold">Informational guidance only.</strong>{" "}
            DOX provides structured document guidance and procedural information only. This is not legal advice. For legal questions, consult a qualified immigration lawyer. Administrative requirements vary by municipality and individual circumstance — always verify with the relevant authority.
          </p>
        </div>
      </main>
    </>
  );
}
