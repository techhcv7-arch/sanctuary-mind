"use client";

/**
 * CrisisBanner — DO NOT REMOVE OR REPLACE THE 988 NUMBER.
 *
 * 988 is the real US Suicide & Crisis Lifeline. This component is the
 * platform's hard-coded safety escalation pattern, even in demo builds.
 * The proposal calls crisis safety a "first-class feature, not an afterthought."
 * A future developer cleaning up demo data MUST NOT swap this for a placeholder
 * or reduce its visual prominence. The crisis-pulse animation MUST stay.
 *
 * Reference: https://988lifeline.org
 */

import { Phone, MessageCircle, X } from "lucide-react";
import { useAppStore } from "@/lib/store/app-store";

export function CrisisBanner({
  variant = "default",
  dismissible = false,
}: {
  variant?: "default" | "urgent";
  dismissible?: boolean;
}) {
  const dismissed = useAppStore((s) => s.crisisBannerDismissed);
  const dismiss = useAppStore((s) => s.dismissCrisisBanner);

  if (dismissible && dismissed) return null;

  const isUrgent = variant === "urgent";

  return (
    <aside
      role="region"
      aria-label="Crisis support resources"
      className={`overflow-hidden rounded-2xl ${
        isUrgent
          ? "bg-red-600 shadow-lg shadow-red-600/25"
          : "border border-red-400/30 bg-red-50 backdrop-blur-sm"
      }`}
    >
      <div className="px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <p
              className={`font-sans text-[0.65rem] font-semibold uppercase tracking-widest mb-2 ${
                isUrgent ? "text-white/60" : "text-red-600"
              }`}
            >
              {isUrgent ? "If you are in crisis" : "Help when you need it"}
            </p>
            <p
              className={`font-display text-[1.15rem] font-semibold leading-snug sm:text-[1.3rem] ${
                isUrgent ? "text-white" : "text-red-800"
              }`}
            >
              {isUrgent
                ? "Please reach out now. You are not alone."
                : "If you ever feel in crisis, this line is always open."}
            </p>
            <p
              className={`mt-2 text-[0.85rem] leading-relaxed ${
                isUrgent ? "text-white/75" : "text-red-700/80"
              }`}
            >
              The 988 Suicide &amp; Crisis Lifeline is free, confidential, and
              available 24/7 — by call or text.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href="tel:988"
                className={`crisis-pulse inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition ${
                  isUrgent
                    ? "bg-white text-red-600 hover:bg-white/90"
                    : "bg-red-600 text-white hover:bg-red-500"
                }`}
              >
                <Phone className="h-4 w-4" />
                Call 988
              </a>
              <a
                href="sms:988"
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                  isUrgent
                    ? "border-white/40 text-white hover:bg-white/10"
                    : "border-red-500/40 text-red-700 hover:bg-red-100"
                }`}
              >
                <MessageCircle className="h-4 w-4" />
                Text 988
              </a>
              <a
                href="https://988lifeline.org"
                target="_blank"
                rel="noreferrer"
                className={`text-[0.75rem] underline-offset-4 hover:underline ${
                  isUrgent ? "text-white/60" : "text-red-500/80"
                }`}
              >
                988lifeline.org →
              </a>
            </div>
          </div>

          {dismissible && !isUrgent && (
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss crisis banner"
              className="rounded-lg p-1 text-red-400/60 transition hover:bg-red-100 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
