import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  HeartPulse,
  MessageSquareText,
  Quote,
  Star,
} from "lucide-react";

const HERO_IMAGE =
  "url(\"data:image/svg+xml,%3Csvg width='520' height='520' viewBox='0 0 520 520' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='520' height='520' fill='%23DDE7F8'/%3E%3Cg stroke='%231F4D93' stroke-opacity='0.48' stroke-width='1'%3E%3Crect x='54' y='64' width='184' height='132'/%3E%3Crect x='280' y='96' width='140' height='88'/%3E%3Crect x='106' y='244' width='238' height='164'/%3E%3Cpath d='M54 130H420'/%3E%3Cpath d='M172 64V408'/%3E%3Cpath d='M280 96V408'/%3E%3Cpath d='M106 326H420'/%3E%3Ccircle cx='366' cy='314' r='78' stroke-dasharray='8 8'/%3E%3Cpath d='M366 236V96'/%3E%3Cpath d='M420 314H460'/%3E%3C/g%3E%3Ccircle cx='366' cy='314' r='9' fill='%231F4D93'/%3E%3Ccircle cx='366' cy='236' r='6' fill='%237FA8EA'/%3E%3Ccircle cx='444' cy='314' r='6' fill='%23F4D35E'/%3E%3C/svg%3E\")";

const FEATURES = [
  {
    label: "Start privately when you do not know where to begin",
    kicker: "01 / ENTRY POINT",
    accent: "#FF8C69",
    icon: HeartPulse,
    body: "You should not have to choose between staying silent and explaining everything to someone immediately. SanctuaryMind gives you a confidential first step when you need support and want a gentler way to begin.",
  },
  {
    label: "Find support between Sundays, sessions, and difficult moments",
    kicker: "04 / AVAILABILITY",
    accent: "#7FA8EA",
    icon: MessageSquareText,
    body: "If you need support at night, after church, or while waiting to hear back from someone, the AI Companion gives you a calm next step instead of an empty gap.",
  },
] as const;

const TRUST_POINTS = [
  "You do not need to have the right words before you begin.",
  "You can move toward spiritual support and clinical care without feeling forced to choose one over the other.",
  "If you are in crisis, the urgent path stays visible instead of buried.",
] as const;

const PERSONAS = [
  {
    label: "For members who want a quiet first step",
    body: "Start with a confidential check-in, understand what kind of support makes sense, and move forward without having to carry the whole conversation by yourself all at once.",
    cta: "Open member login",
    href: "/login",
    image: "/landing/bible-hope.jpeg",
    alt: "Open Bible resting in soft natural light",
    meta: "private reflection / grounded beginning",
    accent: "#9EFFBF",
  },
  {
    label: "For members who need care right now",
    body: "Go directly into prayer, schedule time with a pastor, or use the Companion when you need support right away.",
    cta: "Create account",
    href: "/signup",
    image: "/landing/pastoral-care.jpeg",
    alt: "A hand resting on someone's shoulder in a moment of care",
    meta: "pastoral response / human support",
    accent: "#FF8C69",
  },
] as const;

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[rgba(58,58,56,0.2)] bg-[#f7f7f5]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="SanctuaryMind home">
            <span className="grid h-8 w-8 place-items-center border border-[#1f4d93] bg-[#1f4d93] text-[0.82rem] leading-none text-white">
              ✣
            </span>
            <div>
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#5d6f8d]">
                SanctuaryMind
              </p>
              <p className="font-sans text-[0.88rem] font-medium tracking-[-0.03em] text-[#18386e]">
                Member support landing page
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            {[
              ["01", "How it helps", "#features"],
              ["02", "Choose your path", "#personas"],
              ["03", "Why it feels safe", "#trust"],
            ].map(([index, label, href]) => (
              <a
                key={href}
                href={href}
                className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#5d6f8d] transition hover:text-[#18386e]"
              >
                {index}. {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="btn-ghost px-4 py-2.5">
              Sign in
            </Link>
            <Link href="/signup" className="btn-primary px-4 py-2.5">
              Create account
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-14 pt-24 sm:px-6 lg:px-8">
        <section className="grid border-b border-[rgba(58,58,56,0.2)] pb-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:gap-10">
          <div className="reveal-up reveal-up-1 border-b border-[rgba(58,58,56,0.2)] pb-10 lg:border-b-0 lg:pb-0">
            <span className="status-badge">Member care system</span>

            <div className="mt-8 max-w-5xl">
              <p className="border-l border-[rgba(58,58,56,0.2)] pl-4 font-mono text-[0.78rem] uppercase tracking-[0.14em] text-[#5d6f8d]">
                A private first step for support, prayer, pastoral care, and mental health guidance
              </p>

              <h1 className="mt-8 max-w-5xl font-display text-[4.1rem] font-semibold text-[#18386e] sm:text-[5.3rem] lg:text-[5.9rem]">
                A place for hope, healing, and the next right step.
              </h1>

              <p className="mt-8 max-w-3xl text-[1.02rem] leading-8 text-[#5d6f8d]">
                SanctuaryMind is a faith-integrated mental health platform for church members who want a calmer and clearer first step. You can check in privately, understand what kind of help fits today, and move toward prayer, pastoral support, licensed care, or guided reflection through one confidential experience designed to bring clarity and care.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/signup" className="btn-primary px-5 py-3">
                Create your account
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/login" className="btn-ghost px-5 py-3">
                Sign in now
              </Link>
            </div>

            <div className="mt-10 grid gap-px bg-[rgba(58,58,56,0.2)] sm:grid-cols-3">
              {[
                ["03 min", "Confidential mental-health snapshot"],
                ["24 / 7", "Companion support between appointments"],
                ["1 place", "Prayer, referrals, and pastoral care together"],
              ].map(([value, detail]) => (
                <div key={value} className="bg-[#f7f7f5] px-4 py-4">
                  <p className="font-display text-[1.4rem] font-semibold text-[#18386e]">{value}</p>
                  <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[#5d6f8d]">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-up reveal-up-2 pt-10 lg:pt-0">
            <div className="monolith-plate aspect-square p-6">
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="eyebrow">Interface preview</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[#18386e]">
                      What the care flow looks like
                    </h2>
                  </div>
                  <span className="technical-chip">BETA / MEMBER FLOW</span>
                </div>

                <div className="relative mt-6 flex-1 border border-[rgba(58,58,56,0.2)] bg-[#edf3fb]">
                  <svg
                    viewBox="0 0 420 420"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden
                  >
                    <rect x="0.5" y="0.5" width="419" height="419" fill="none" stroke="rgba(58,58,56,0.2)" />
                    <circle cx="210" cy="210" r="94" fill="none" stroke="rgba(31,77,147,0.3)" strokeDasharray="8 8" />
                    <circle cx="210" cy="210" r="132" fill="none" stroke="rgba(58,58,56,0.2)" />
                    <line x1="210" y1="210" x2="210" y2="62" stroke="rgba(58,58,56,0.2)" />
                    <line x1="210" y1="210" x2="338" y2="210" stroke="rgba(58,58,56,0.2)" />
                    <line x1="210" y1="210" x2="110" y2="296" stroke="rgba(58,58,56,0.2)" />
                    <circle cx="210" cy="210" r="8" fill="#1F4D93" />
                    <g className="orbit-spin">
                      <circle cx="210" cy="116" r="7" fill="#F4D35E" />
                      <circle cx="304" cy="210" r="7" fill="#9EFFBF" />
                      <circle cx="126" cy="288" r="7" fill="#FF8C69" />
                    </g>
                  </svg>
                  <div className="absolute inset-8 overflow-hidden border border-[rgba(58,58,56,0.2)]">
                    <div
                      className="mix-luminosity absolute inset-0 bg-center bg-cover"
                      style={{ backgroundImage: HERO_IMAGE }}
                    />
                    <Image
                      src="/landing/worship-community.jpeg"
                      alt="Members gathered in worship with a raised hand in warm light"
                      fill
                      className="object-cover opacity-70 mix-blend-luminosity transition duration-300 hover:mix-blend-normal hover:opacity-100"
                    />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[rgba(58,58,56,0.2)] pt-4">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[#5d6f8d]">
                    snapshot / prayer / pastor / companion
                  </p>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[#18386e]">
                    built for low-pressure support
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="personas" className="border-b border-[rgba(58,58,56,0.2)] py-12">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">Choose your path</p>
              <h2 className="mt-2 text-[2.4rem] font-semibold tracking-[-0.05em] text-[#18386e] sm:text-[3rem]">
                Built for different moments of need, not just one kind of member.
              </h2>
            </div>
          </div>

          <div className="grid gap-px bg-[rgba(58,58,56,0.2)] md:grid-cols-2">
            {PERSONAS.map((persona, index) => (
              <article
                key={persona.label}
                className="grid bg-[#f7f7f5] lg:grid-cols-[minmax(0,0.95fr)_minmax(220px,0.85fr)]"
              >
                <div className="p-8">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[#5d6f8d]">
                    0{index + 1} / Persona
                  </p>
                  <h3 className="mt-4 text-[1.8rem] font-semibold tracking-[-0.05em] text-[#18386e]">
                    {persona.label}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-[#5d6f8d]">
                    {persona.body}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <span
                      className="border-l pl-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[#5d6f8d]"
                      style={{ borderColor: persona.accent }}
                    >
                      {persona.meta}
                    </span>
                    <Link href={persona.href} className="inline-flex btn-ghost px-4 py-3">
                      {persona.cta}
                    </Link>
                  </div>
                </div>

                <div className="border-t border-[rgba(58,58,56,0.2)] lg:border-l lg:border-t-0">
                  <div className="relative h-full min-h-[260px] overflow-hidden bg-[#dfe9f8]">
                    <Image
                      src={persona.image}
                      alt={persona.alt}
                      fill
                      className="object-cover transition duration-300 hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,247,245,0.08),rgba(24,56,110,0.26))]" />
                    <div className="absolute inset-x-4 bottom-4 border border-[rgba(247,247,245,0.5)] bg-[rgba(247,247,245,0.78)] px-3 py-3 backdrop-blur-[2px]">
                      <p className="font-mono text-[0.64rem] uppercase tracking-[0.12em] text-[#18386e]">
                        {persona.meta}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="trust" className="border-b border-[rgba(58,58,56,0.2)] py-12">
          <div className="grid gap-px bg-[rgba(58,58,56,0.2)] lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)]">
            <div className="bg-[#f7f7f5] p-8">
              <p className="eyebrow">Why this is believable</p>
              <h2 className="mt-2 text-[2.2rem] font-semibold tracking-[-0.05em] text-[#18386e]">
                Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.
              </h2>
              <div className="mt-6 space-y-px bg-[rgba(58,58,56,0.2)]">
                {TRUST_POINTS.map((point) => (
                  <div key={point} className="bg-[#f7f7f5] px-4 py-4 text-sm leading-7 text-[#18386e]">
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#f7f7f5] p-8">
              <p className="eyebrow">Common objections handled</p>
              <div className="mt-4 space-y-4">
                {[
                  "“I am not sure whether I need prayer, a pastor, or something else.” That is exactly the problem SanctuaryMind helps solve. You start with a private step and get a clearer next move.",
                  "“I do not want to overreact.” You are not forced into a dramatic escalation. You can begin quietly, understand your options, and choose what genuinely fits.",
                  "“I do not want to tell my whole story immediately.” You do not have to. The system is designed to let you start with less pressure, less stigma, and more clarity.",
                ].map((item) => (
                  <div key={item} className="code-mock">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="border-b border-[rgba(58,58,56,0.2)] py-12">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">How it helps</p>
              <h2 className="mt-2 text-[2.4rem] font-semibold tracking-[-0.05em] text-[#18386e] sm:text-[3rem]">
                Every feature exists to make getting help feel clearer, safer, and more hopeful.
              </h2>
            </div>
          </div>

          <div className="mb-px grid gap-px bg-[rgba(58,58,56,0.2)] lg:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.98fr)]">
            <div className="relative min-h-[340px] overflow-hidden bg-[#e6eef9]">
              <Image
                src="/landing/worship-community.jpeg"
                alt="Worship gathering with warm orange light and a raised hand"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(24,56,110,0.2),rgba(24,56,110,0.68))]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,247,245,0.05),rgba(247,247,245,0))]" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[#dfe9f8]">
                  05 / COMMUNITY CONTEXT
                </p>
                <h3 className="mt-3 max-w-xl text-[2rem] font-semibold tracking-[-0.05em] text-[#f7f7f5] sm:text-[2.4rem]">
                  Support that still feels rooted in church life, not detached from it.
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#dfe9f8]">
                  SanctuaryMind is practical in the moment, but it also keeps members connected to prayer, pastoral support, and a faith-aware way of processing what they are carrying.
                </p>
              </div>
            </div>

            <div className="grid gap-px bg-[rgba(58,58,56,0.2)]">
              {[
                [
                  "Practical first move",
                  "Members do not need to guess whether they should stay quiet, ask for prayer, or seek more structured care.",
                ],
                [
                  "Faith-aware escalation",
                  "When more support is needed, the handoff can move toward pastors, prayer teams, or licensed care without losing context.",
                ],
                [
                  "Less delay, less stigma",
                  "A lower-pressure beginning makes it easier to take action before confusion or shame turns into more isolation.",
                ],
              ].map(([label, body], index) => (
                <div key={label} className="bg-[#f7f7f5] px-6 py-5">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[#5d6f8d]">
                    0{index + 1} / Benefit
                  </p>
                  <h3 className="mt-3 text-[1.2rem] font-semibold tracking-[-0.04em] text-[#18386e]">
                    {label}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#5d6f8d]">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-px bg-[rgba(58,58,56,0.2)] sm:grid-cols-2">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.label} className="bg-[#f7f7f5] p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p
                        className="border-l pl-3 font-mono text-[0.68rem] uppercase tracking-[0.12em]"
                        style={{ borderColor: feature.accent, color: "#5d6f8d" }}
                      >
                        {feature.kicker}
                      </p>
                      <h3 className="mt-4 text-[1.75rem] font-semibold tracking-[-0.05em] text-[#18386e]">
                        {feature.label}
                      </h3>
                    </div>
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center border border-[rgba(58,58,56,0.2)]"
                      style={{ color: feature.accent }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                  </div>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-[#5d6f8d]">
                    {feature.body}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="technical-chip">clear benefit</span>
                    <span className="technical-chip">low confusion</span>
                    <span className="technical-chip">specific promise</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="border-b border-[rgba(58,58,56,0.2)] py-12">
          <div className="grid gap-px bg-[rgba(58,58,56,0.2)] lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            <div className="bg-[#f7f7f5] p-8">
              <p className="eyebrow">The alternative</p>
              <h2 className="mt-2 text-[2.2rem] font-semibold tracking-[-0.05em] text-[#18386e]">
                The alternative is returning, not carrying everything alone.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#5d6f8d]">
                When someone feels far from peace, the next step does not need to be confusion, shame, or more delay. SanctuaryMind is designed to help members come back toward care, truth, and connection through a practical first step that honors both spiritual restoration and wise support.
              </p>
              <div className="mt-8 grid gap-px bg-[rgba(58,58,56,0.2)]">
                <div className="relative min-h-[420px] overflow-hidden bg-[#dfe9f8]">
                  <Image
                    src="/landing/return-to-kingdom.jpeg"
                    alt="A welcoming figure reaching toward a child beneath a bright sky"
                    fill
                    className="object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,34,68,0.08),rgba(18,34,68,0.62))]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <div className="max-w-2xl border border-[rgba(247,247,245,0.32)] bg-[rgba(24,56,110,0.72)] p-5 backdrop-blur-[1px]">
                      <p className="font-mono text-[0.64rem] uppercase tracking-[0.18em] text-[#d9e7fb]">
                        Joel 2:13b
                      </p>
                      <p className="mt-3 text-lg leading-8 text-[#f7f7f5] sm:text-[1.35rem] sm:leading-9">
                        “Return to the Lord your God, for he is gracious and compassionate,
                        slow to anger and abounding in love, and he relents from sending
                        calamity.”
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-px bg-[rgba(58,58,56,0.2)]">
              <div className="bg-[#f7f7f5] p-8">
                <p className="eyebrow">Monospaced testimonial card</p>
                <div className="mt-4 border border-[rgba(58,58,56,0.2)] bg-[#f7f7f5]">
                  <div className="flex items-center justify-between border-b border-[rgba(58,58,56,0.2)] px-4 py-3">
                    <Quote className="h-4 w-4 text-[#18386e]" />
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="h-[10px] w-[10px] fill-[#F4D35E] text-[#F4D35E]" />
                      ))}
                    </div>
                  </div>
                  <div className="px-4 py-5 font-mono text-[0.74rem] leading-7 text-[#18386e]">
                    &ldquo;The strongest part of this product is that it feels safe to begin. It does not pressure people to open up all at once, but it still helps them move toward real spiritual and mental-health support with hope.&rdquo;
                  </div>
                  <div className="flex items-center gap-3 border-t border-[rgba(58,58,56,0.2)] px-4 py-3">
                    <div className="grid h-10 w-10 place-items-center bg-[#1f4d93] font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white">
                      CL
                    </div>
                    <div className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[#5d6f8d]">
                      <div className="text-[#18386e]">Member perspective</div>
                      <div>landing-page copy direction</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#f7f7f5] p-8">
                <p className="eyebrow">Repeat the call to action</p>
                <div className="mt-4 border border-[rgba(58,58,56,0.2)] px-4 py-5">
                  <p className="text-[1.35rem] font-semibold tracking-[-0.04em] text-[#18386e]">
                    If you want a hopeful first step that still feels practical, this is where to start.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link href="/signup" className="btn-primary px-4 py-3">
                      Create account
                    </Link>
                    <Link href="/login" className="btn-ghost px-4 py-3">
                      Sign in
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-[640px]">
            <div className="relative border border-[rgba(58,58,56,0.2)] bg-[#f7f7f5] px-6 py-8 sm:px-8">
              <span className="absolute left-[-1px] top-[-1px] h-[10px] w-[10px] border-l border-t border-[#1f4d93]" />
              <span className="absolute right-[-1px] top-[-1px] h-[10px] w-[10px] border-r border-t border-[#1f4d93]" />
              <span className="absolute bottom-[-1px] left-[-1px] h-[10px] w-[10px] border-b border-l border-[#1f4d93]" />
              <span className="absolute bottom-[-1px] right-[-1px] h-[10px] w-[10px] border-b border-r border-[#1f4d93]" />

              <div className="text-center">
                <p className="eyebrow">Technical form CTA</p>
                <h2 className="mt-3 text-[2.6rem] font-semibold tracking-[-0.05em] text-[#18386e] sm:text-[3.4rem]">
                  Begin with clarity, move forward with hope.
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#5d6f8d]">
                  Create an account, sign in, and move toward prayer, pastoral care, licensed support, or guided reflection without having to work out the whole path by yourself first.
                </p>
              </div>

              <form className="mt-8 space-y-4">
                <div>
                  <label className="mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[#18386e]">
                    Full name
                  </label>
                  <input className="auth-input" placeholder="Your name" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[#18386e]">
                      Email address
                    </label>
                    <input className="auth-input" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[#18386e]">
                      What you need most
                    </label>
                    <input className="auth-input" placeholder="prayer, pastor, reflection" />
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[rgba(58,58,56,0.2)] pt-4">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[#5d6f8d]">
                    simple start / low pressure
                  </p>
                  <div className="flex gap-3">
                    <Link href="/login" className="btn-ghost px-4 py-3">
                      Sign in
                    </Link>
                    <Link href="/signup" className="btn-primary px-4 py-3">
                      Create account
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
