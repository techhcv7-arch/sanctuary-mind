"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Send, ShieldCheck } from "lucide-react";
import { CrisisBanner } from "@/components/shared/crisis-banner";
import { useAppStore } from "@/lib/store/app-store";
import { detectCrisisKeyword } from "@/lib/scoring/snapshot";
import { pickReply, ESCALATION_REPLY } from "@/lib/mock/chat-replies";
import type { ChatMessage } from "@/lib/types";

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  ts: 0,
  content:
    "Peace be with you. I'm here to listen — anything you share stays private. What's on your mind today?",
};

export default function ChatPage() {
  const messages = useAppStore((s) => s.chat);
  const append = useAppStore((s) => s.appendChatMessage);
  const reset = useAppStore((s) => s.resetChat);
  const hydrated = useAppStore((s) => s.hydrated);

  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [crisisActive, setCrisisActive] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({
      top: scroller.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length, thinking]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const now = Date.now();
    append({ id: `u-${now}`, role: "user", content: text, ts: now });
    setInput("");

    const isCrisis = detectCrisisKeyword(text);
    if (isCrisis) setCrisisActive(true);

    setThinking(true);
    const delay = 600 + Math.floor(Math.random() * 700);
    setTimeout(() => {
      const replyContent = isCrisis ? ESCALATION_REPLY : pickReply(text);
      append({
        id: `a-${now + 1}`,
        role: "assistant",
        content: replyContent,
        ts: now + 1,
        isCrisisEscalation: isCrisis,
      });
      setThinking(false);
    }, delay);
  };

  return (
    <div className="flex h-[calc(100vh-9rem)] flex-col">
      {/* Header */}
      <header className="space-y-3 pb-4">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" /> Today
          </Link>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={() => { reset(); setCrisisActive(false); }}
              className="font-sans text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground transition"
            >
              New conversation
            </button>
          )}
        </div>

        <div>
          <p className="eyebrow mb-1">Companion · 24/7</p>
          <h1 className="font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.025em] text-[#1E293B] sm:text-[2rem]">
            AI <span className="italic font-medium">Companion.</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 glass-card rounded-xl px-3.5 py-2.5 text-[0.8rem] text-muted-foreground">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
          Conversations stay on your device in this prototype.
        </div>
      </header>

      {/* Messages */}
      <div
        ref={scroller}
        className="-mx-4 flex-1 space-y-3 overflow-y-auto px-4"
      >
        {hydrated && messages.length === 0 && <Bubble msg={WELCOME} />}
        {messages.map((m) => (
          <Bubble key={m.id} msg={m} />
        ))}
        {thinking && <ThinkingBubble />}
        {crisisActive && (
          <div className="pt-2">
            <CrisisBanner variant="urgent" />
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => { e.preventDefault(); send(); }}
        className="mt-4 flex items-end gap-2"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          rows={1}
          placeholder="Share what's on your heart…"
          className="flex-1 resize-none rounded-2xl border border-[#92b6f0]/40 bg-white/50 px-4 py-3.5 text-[0.9rem] text-foreground placeholder:text-muted-foreground focus:border-[#3D5A87] focus:outline-none focus:ring-2 focus:ring-[#3D5A87]/15"
        />
        <button
          type="submit"
          disabled={!input.trim() || thinking}
          aria-label="Send"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#3D5A87] text-white transition hover:bg-[#2D4A70] disabled:opacity-35"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

function Bubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";
  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-[#3D5A87] px-4 py-3 text-[0.9rem] leading-relaxed text-white shadow-sm">
          <p className="whitespace-pre-wrap">{msg.content}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      <div
        className={`max-w-[88%] rounded-2xl rounded-bl-sm px-4 py-3.5 text-[0.9rem] leading-relaxed ${
          msg.isCrisisEscalation
            ? "border border-red-500/30 bg-red-50"
            : "glass-card"
        }`}
      >
        <p className="mb-1.5 font-sans text-[0.6rem] font-semibold uppercase tracking-wide text-[#3D5A87]">
          Companion
        </p>
        <p className="whitespace-pre-wrap text-foreground">{msg.content}</p>
      </div>
    </div>
  );
}

function ThinkingBubble() {
  return (
    <div className="flex justify-start">
      <div className="glass-card rounded-2xl rounded-bl-sm px-5 py-4">
        <span className="inline-flex items-end gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
        </span>
      </div>
    </div>
  );
}
