"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAppStore } from "@/lib/store/app-store";
import { ClientOnly } from "./client-only";
import { signOut } from "@/lib/actions/auth";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Home", index: "01" },
  { href: "/snapshot", label: "Snapshot", index: "02" },
  { href: "/pastor", label: "Pastor", index: "03" },
  { href: "/chat", label: "Companion", index: "04" },
  { href: "/prayer", label: "Prayer", index: "05" },
] as const;

function TopBarInner() {
  const user = useAppStore((s) => s.user);
  const storeSignOut = useAppStore((s) => s.signOut);
  const router = useRouter();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const initials = user
    ? user.fullName.split(" ").map((p) => p[0]).slice(0, 2).join("")
    : "";
  const firstName = user?.fullName.split(" ")[0] ?? "Member";

  async function handleSignOut() {
    await storeSignOut();
    await signOut();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(58,58,56,0.2)] bg-[#f7f7f5]/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            href={user ? "/dashboard" : "/"}
            className="flex min-w-0 items-center gap-3"
            aria-label="SanctuaryMind home"
          >
            <span
              aria-hidden
              className="grid h-8 w-8 shrink-0 place-items-center border border-[#1f4d93] bg-[#1f4d93] text-[0.82rem] leading-none text-white"
            >
              ✣
            </span>
            <div className="min-w-0">
              <p className="truncate font-mono text-[0.62rem] font-medium uppercase tracking-[0.14em] text-[#5d6f8d]">
                SanctuaryMind
              </p>
              <p className="truncate font-sans text-[0.88rem] font-medium tracking-[-0.03em] text-[#18386e]">
                {user ? `${firstName} dashboard` : "Faith-based care"}
              </p>
            </div>
          </Link>
          <nav className="hidden items-center gap-5 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#5d6f8d] transition hover:text-[#18386e]"
              >
                {item.index}. {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {user && (
          <div className="flex items-center gap-2">
            <div className="hidden text-right md:block">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#5d6f8d]">
                SYSTEM STATUS
              </p>
              <p className="mt-1 text-sm font-medium text-[#18386e]">{today}</p>
            </div>
            <span className="status-badge hidden md:inline-flex">Member live</span>
            <span
              aria-hidden
              className="grid h-8 w-8 place-items-center border border-[rgba(58,58,56,0.2)] bg-[#f7f7f5] font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[#18386e]"
              title={user.fullName}
            >
              {initials}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              aria-label="Sign out"
              className="btn-ghost h-8 px-3"
            >
              <LogOut className="h-3.5 w-3.5" />
              Exit
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
        <header className="sticky top-0 z-40 border-b border-[rgba(58,58,56,0.2)] bg-[#f7f7f5]/95">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="grid h-8 w-8 place-items-center border border-[#1f4d93] bg-[#1f4d93] text-[0.82rem] leading-none text-white"
              >
                ✣
              </span>
              <div>
                <p className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.14em] text-[#5d6f8d]">
                  SanctuaryMind
                </p>
                <p className="font-sans text-[0.88rem] font-medium tracking-[-0.03em] text-[#18386e]">
                  Faith-based care
                </p>
              </div>
            </div>
          </div>
        </header>
      }
    >
      <TopBarInner />
    </ClientOnly>
  );
}
