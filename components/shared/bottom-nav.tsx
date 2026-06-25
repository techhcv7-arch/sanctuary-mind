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
      className="border-t border-[#92b6f0]/25 bg-[#c2d6f6]/90 backdrop-blur-md"
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
                className="group flex flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 transition"
              >
                <span
                  className={`grid h-8 w-8 place-items-center rounded-lg transition ${
                    active
                      ? "bg-[#3D5A87] text-white shadow-[0_4px_12px_rgba(61,90,135,0.35)]"
                      : "text-[#3D5A87]/50 group-hover:bg-[#92b6f0]/25 group-hover:text-[#3D5A87]"
                  }`}
                >
                  <Icon
                    className="h-[17px] w-[17px]"
                    strokeWidth={active ? 2.2 : 1.6}
                  />
                </span>
                <span
                  className={`font-sans text-[0.58rem] font-semibold tracking-wide transition ${
                    active ? "text-[#1E293B]" : "text-[#3D5A87]/40 group-hover:text-[#3D5A87]"
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
