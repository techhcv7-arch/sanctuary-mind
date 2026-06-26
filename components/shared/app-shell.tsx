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
        <div className="flex min-h-screen items-center justify-center text-[#0d1f3c]/60">
          Loading…
        </div>
      }
    >
      <AuthGate>
        <div className="flex min-h-screen flex-col">
          <TopBar />
          <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 pb-24">
            {children}
          </main>
          <div className="fixed inset-x-0 bottom-0 z-30">
            <BottomNav />
          </div>
        </div>
      </AuthGate>
    </ClientOnly>
  );
}
