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
      className="border border-[rgba(58,58,56,0.2)] bg-[#f7f7f5]"
    >
      <ul className="grid grid-cols-5 gap-px bg-[rgba(58,58,56,0.2)]">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <li key={href} className="bg-[#f7f7f5]">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`group flex h-full flex-col items-center justify-center gap-1 px-1 py-2 transition ${
                  active ? "bg-[#1f4d93] text-white" : "hover:bg-[#eef3f9]"
                }`}
              >
                <span
                  className={`grid h-8 w-8 place-items-center transition ${
                    active
                      ? "text-white"
                      : "text-[#5d6f8d] group-hover:text-[#18386e]"
                  }`}
                >
                  <Icon
                    className="h-4 w-4"
                    strokeWidth={active ? 2 : 1.6}
                  />
                </span>
                <span
                  className={`font-mono text-[0.58rem] uppercase tracking-[0.12em] transition ${
                    active ? "text-white" : "text-[#5d6f8d] group-hover:text-[#18386e]"
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
