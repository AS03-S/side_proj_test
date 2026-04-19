import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import { ensureUserSetup } from "@/lib/setup";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { Sidebar } from "@/components/layout/Sidebar";
import type { Session } from "next-auth";

const DEV_SESSION: Session = {
  user: { id: "dev", name: "Dev", email: "dev@local", image: null },
  expires: new Date(Date.now() + 86_400_000).toISOString(),
  accessToken: "",
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Dev-password bypass — set by middleware when visiting /passwordOKLE
  // Must match the DEV_PASSWORD constant in src/middleware.ts
  const cookieStore = await cookies();
  const devCookie = cookieStore.get("_dev_access");
  const hasDevAccess = devCookie?.value === "OKLE";

  if (!session && !hasDevAccess) {
    redirect("/login");
  }

  const activeSession = session ?? DEV_SESSION;

  if (session && session.user?.id !== "demo") {
    await ensureUserSetup(session);
  }

  return (
    <SessionProvider session={activeSession}>
      <div className="flex min-h-screen bg-neutral-50">
        <Sidebar />
        <div className="flex flex-1 flex-col pl-56">
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
