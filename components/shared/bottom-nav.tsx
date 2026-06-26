"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  HeartPulse,
  CalendarClock,
  MessageSquareText,
  HandHeart,
} from "lucide-react";

const TABS = [
  { href: "/dashboard", label: "Today", icon: Home },
  { href: "/snapshot", label: "Snapshot", icon: HeartPulse },
  { href: "/pastor", label: "Pastor", icon: CalendarClock },
  { href: "/chat", label: "Chat", icon: MessageSquareText },
  { href: "/prayer", label: "Prayer", icon: HandHeart },
] as const;

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary"
      className="border-t border-white/10 bg-[#92b6f0]"
    >
      <ul className="mx-auto flex w-full max-w-3xl items-stretch justify-between px-2 py-1.5">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className="group flex flex-col items-center justify-center gap-1 px-1 py-2 transition"
              >
                <span
                  className={`grid h-8 w-8 place-items-center transition ${
                    active
                      ? "bg-[#0d1f3c] text-white shadow-[0_4px_12px_rgba(13,31,60,0.35)]"
                      : "text-[#0d1f3c]/50 group-hover:bg-[#92b6f0]/25 group-hover:text-[#0d1f3c]"
                  }`}
                >
                  <Icon
                    className="h-[17px] w-[17px]"
                    strokeWidth={active ? 2.2 : 1.6}
                  />
                </span>
                <span
                  className={`font-sans text-[0.58rem] font-semibold tracking-wide transition ${
                    active ? "font-bold text-[#0d1f3c]" : "text-[#0d1f3c]/40 group-hover:text-[#0d1f3c]"
                  }`}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
