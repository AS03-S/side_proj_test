import { TopBar } from "@/components/layout/TopBar";
import { DEMO_DOCUMENTS } from "@/lib/data/documents";
import { GUIDANCE_MODULES } from "@/lib/data/guidance";
import { DEMO_ACTIVITY } from "@/lib/data/activity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FileText,
  CalendarClock,
  ChevronRight,
  ArrowUpRight,
  CheckCircle2,
  Circle,
  AlertTriangle,
  BookOpen,
  Clock,
  Upload,
  Eye,
} from "lucide-react";
import { categoryLabel, formatDateShort } from "@/lib/utils";

function daysUntilSync(dateString: string): number {
  const now = new Date("2026-04-04");
  const target = new Date(dateString);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

const activityIcons: Record<string, React.ElementType> = {
  upload: Upload,
  review: Eye,
  deadline_alert: AlertTriangle,
  action_completed: CheckCircle2,
  guidance_viewed: BookOpen,
};

function relativeTime(ts: string): string {
  const now = new Date("2026-04-04T12:00:00Z");
  const diff = Math.floor((now.getTime() - new Date(ts).getTime()) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function DashboardPage() {
  const urgentDocs = DEMO_DOCUMENTS.filter((d) => d.status === "action_required");
  const upcomingDeadlines = DEMO_DOCUMENTS
    .filter((d) => d.extractedDeadline)
    .sort((a, b) => new Date(a.extractedDeadline!).getTime() - new Date(b.extractedDeadline!).getTime())
    .slice(0, 4);

  const pendingActions = DEMO_DOCUMENTS.flatMap((d) =>
    d.requiredActions
      .filter((a) => !a.completed)
      .map((a) => ({ ...a, docTitle: d.title, docId: d.id }))
  )
    .sort((a, b) => {
      const p = { urgent: 0, high: 1, normal: 2 };
      return p[a.priority] - p[b.priority];
    })
    .slice(0, 5);

  return (
    <>
      <TopBar title="Dashboard" subtitle="Overview of your immigration process" />
      <main className="flex-1 space-y-6 p-6">

        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Documents", value: DEMO_DOCUMENTS.length, icon: FileText, color: "text-neutral-700" },
            { label: "Action required", value: urgentDocs.length, icon: AlertTriangle, color: "text-red-500" },
            {
              label: "Upcoming deadlines",
              value: upcomingDeadlines.length,
              icon: CalendarClock,
              color: "text-amber-500",
            },
            {
              label: "Pending actions",
              value: pendingActions.length,
              icon: Circle,
              color: "text-neutral-500",
            },
          ].map(({ label, value, icon: Icon, color }) => (
            <Card key={label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-neutral-500">{label}</p>
                  <Icon className={`h-4 w-4 ${color}`} strokeWidth={1.75} />
                </div>
                <p className="mt-2 text-2xl font-semibold text-neutral-900">{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column — 2/3 */}
          <div className="space-y-6 lg:col-span-2">

            {/* Urgent documents */}
            {urgentDocs.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Action required</CardTitle>
                    <Badge variant="urgent">{urgentDocs.length} documents</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {urgentDocs.map((doc) => (
                    <Link key={doc.id} href={`/documents/${doc.id}`}>
                      <div className="flex items-center justify-between rounded border border-red-100 bg-red-50 px-3 py-2.5 transition-colors hover:border-red-200">
                        <div className="flex items-center gap-3">
                          <div className="flex h-7 w-7 items-center justify-center rounded border border-red-200 bg-white">
                            <FileText className="h-3.5 w-3.5 text-red-500" strokeWidth={1.75} />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-neutral-900">{doc.title}</p>
                            <p className="text-[10px] text-neutral-500">{doc.issuingAuthority}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {doc.extractedDeadline && (
                            <span className="text-[10px] font-medium text-red-600">
                              {daysUntilSync(doc.extractedDeadline)}d remaining
                            </span>
                          )}
                          <ChevronRight className="h-3.5 w-3.5 text-neutral-400" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Upcoming deadlines */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Upcoming deadlines</CardTitle>
                  <Link href="/documents">
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                      All documents <ArrowUpRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-0 divide-y divide-neutral-100">
                {upcomingDeadlines.map((doc) => {
                  const days = daysUntilSync(doc.extractedDeadline!);
                  const urgent = days <= 14;
                  return (
                    <Link key={doc.id} href={`/documents/${doc.id}`}>
                      <div className="flex items-center justify-between py-2.5 transition-colors hover:bg-neutral-50 px-1 -mx-1 rounded">
                        <div>
                          <p className="text-xs font-medium text-neutral-900">{doc.title}</p>
                          <p className="text-[10px] text-neutral-500">{categoryLabel(doc.category)}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-xs font-medium ${urgent ? "text-red-600" : "text-neutral-700"}`}>
                            {formatDateShort(doc.extractedDeadline!)}
                          </p>
                          <p className={`text-[10px] ${urgent ? "text-red-500" : "text-neutral-400"}`}>
                            {days > 0 ? `${days} days` : "Overdue"}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </CardContent>
            </Card>

            {/* Pending actions */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended next steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {pendingActions.map((action) => (
                  <Link key={action.id} href={`/documents/${action.docId}`}>
                    <div className="flex items-start gap-3 rounded border border-neutral-100 px-3 py-2.5 transition-colors hover:border-neutral-200 hover:bg-neutral-50">
                      <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${
                        action.priority === "urgent" ? "bg-red-400" :
                        action.priority === "high" ? "bg-amber-400" : "bg-neutral-300"
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-neutral-900 truncate">{action.description}</p>
                        <p className="text-[10px] text-neutral-400 truncate">{action.docTitle}</p>
                      </div>
                      <Badge variant={action.priority === "urgent" ? "urgent" : action.priority === "high" ? "high" : "default"}>
                        {action.priority}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right column — 1/3 */}
          <div className="space-y-6">

            {/* Recent documents */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent documents</CardTitle>
                  <Link href="/documents">
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                      All <ChevronRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {DEMO_DOCUMENTS.slice(0, 4).map((doc) => (
                  <Link key={doc.id} href={`/documents/${doc.id}`}>
                    <div className="flex items-center gap-2.5 rounded py-2 px-1 transition-colors hover:bg-neutral-50 -mx-1">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-neutral-200 bg-neutral-50">
                        <FileText className="h-3.5 w-3.5 text-neutral-500" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-xs font-medium text-neutral-800">{doc.title}</p>
                        <p className="text-[10px] text-neutral-400">{formatDateShort(doc.dateReceived)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Guidance modules */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Guidance modules</CardTitle>
                  <Link href="/guidance">
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                      All <ChevronRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {GUIDANCE_MODULES.slice(0, 4).map((mod) => (
                  <Link key={mod.id} href="/guidance">
                    <div className="flex items-start gap-2.5 rounded py-2 px-1 transition-colors hover:bg-neutral-50 -mx-1">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-neutral-200 bg-neutral-50 mt-0.5">
                        <BookOpen className="h-3.5 w-3.5 text-neutral-500" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-neutral-800 leading-snug">{mod.title}</p>
                        {mod.priority === "urgent" && (
                          <Badge variant="urgent" className="mt-1">Urgent</Badge>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Recent activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {DEMO_ACTIVITY.slice(0, 5).map((item) => {
                  const Icon = activityIcons[item.type] ?? Clock;
                  return (
                    <div key={item.id} className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border border-neutral-200 bg-neutral-50">
                        <Icon className="h-3 w-3 text-neutral-500" strokeWidth={1.75} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-neutral-800 leading-snug">{item.title}</p>
                        <p className="text-[10px] text-neutral-400">{relativeTime(item.timestamp)}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />
        <p className="text-[11px] text-neutral-400">
          Certa provides structured information and document guidance only. It does not provide legal advice or legal representation.
        </p>
      </main>
    </>
  );
}
