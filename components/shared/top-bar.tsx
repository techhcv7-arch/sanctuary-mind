"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAppStore } from "@/lib/store/app-store";
import { ClientOnly } from "./client-only";
import { signOut } from "@/lib/actions/auth";

function TopBarInner() {
  const user = useAppStore((s) => s.user);
  const storeSignOut = useAppStore((s) => s.signOut);
  const router = useRouter();

  const initials = user
    ? user.fullName.split(" ").map((p) => p[0]).slice(0, 2).join("")
    : "";

  async function handleSignOut() {
    await storeSignOut();
    await signOut();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#92b6f0]">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-5">
        <Link
          href={user ? "/dashboard" : "/"}
          className="flex items-center gap-2.5"
          aria-label="SanctuaryMind home"
        >
          <span
            aria-hidden
            className="grid h-7 w-7 place-items-center rounded-lg bg-[var(--brand-gold)] text-[#0d1f3c] font-display text-[0.85rem] leading-none"
          >
            ✣
          </span>
          <span className="heading-engraved font-display text-[1rem] font-medium tracking-tight text-[#0d1f3c]">
            SanctuaryMind
          </span>
        </Link>

        {user && (
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="grid h-8 w-8 place-items-center bg-[#0d1f3c] border border-[#D4AF37]/60 font-sans text-[0.65rem] font-semibold tracking-wider text-[#D4AF37]"
              title={user.fullName}
            >
              {initials}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              aria-label="Sign out"
              className="p-1 text-[#0d1f3c]/60 transition hover:bg-white/10 hover:text-[#D4AF37]"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export function TopBar() {
  return (
    <ClientOnly
      fallback={
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#92b6f0]">
          <div className="mx-auto flex h-14 w-full max-w-3xl items-center px-5">
            <span
              aria-hidden
              className="grid h-7 w-7 place-items-center rounded-lg bg-[var(--brand-gold)] text-[#0d1f3c] font-display text-[0.85rem] leading-none"
            >
              ✣
            </span>
            <span className="heading-engraved ml-2.5 font-display text-[1rem] font-medium tracking-tight text-[#0d1f3c]">
              SanctuaryMind
            </span>
          </div>
        </header>
      }
    >
      <TopBarInner />
    </ClientOnly>
  );
}
