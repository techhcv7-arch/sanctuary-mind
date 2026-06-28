"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { TopBar } from "./top-bar";
import { BottomNav } from "./bottom-nav";
import { useAppStore } from "@/lib/store/app-store";
import { ClientOnly } from "./client-only";
import { createClient } from "@/lib/supabase/client";
import type { UserProfile } from "@/lib/types";

function AuthGate({ children }: { children: ReactNode }) {
  const hydrated = useAppStore((s) => s.hydrated);
  const user = useAppStore((s) => s.user);
  const setUser = useAppStore((s) => s.setUser);
  const setHydrated = useAppStore((s) => s.setHydrated);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const supabase = createClient();

    async function loadSession() {
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (!authUser) {
        setUser(null);
        setHydrated();
        if (pathname !== "/") router.replace("/login");
        return;
      }

      // Fetch profile from Supabase
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (!profile) {
        // Incomplete onboarding — redirect to finish sign-up
        setHydrated();
        router.replace("/signup?step=2");
        return;
      }

      const userProfile: UserProfile = {
        id: authUser.id,
        fullName: profile.full_name,
        email: profile.email ?? authUser.email ?? null,
        phone: profile.phone ?? null,
        churchName: profile.church_name ?? null,
        denomination: profile.denomination ?? null,
        timezone: profile.timezone,
        termsAcceptedAt: profile.terms_accepted_at,
      };

      setUser(userProfile);
      setHydrated();
    }

    loadSession();

    // Keep session in sync across tabs
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === "SIGNED_OUT") {
          setUser(null);
          router.replace("/login");
        }
      },
    );

    return () => subscription.unsubscribe();
  }, [pathname, router, setUser, setHydrated]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center text-[#0d1f3c]/60">
        Loading…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-[#0d1f3c]/60">
        Loading…
      </div>
    );
  }

  return <>{children}</>;
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <ClientOnly
      fallback={
        <div className="flex min-h-screen items-center justify-center text-[#18386e]/60">
          Loading…
        </div>
      }
    >
      <AuthGate>
        <div className="relative flex min-h-screen flex-col overflow-x-clip">
          <TopBar />
          <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pt-10">
            {children}
          </main>
          <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] sm:px-6 lg:hidden">
            <div className="pointer-events-auto mx-auto max-w-7xl">
              <BottomNav />
            </div>
          </div>
        </div>
      </AuthGate>
    </ClientOnly>
  );
}
