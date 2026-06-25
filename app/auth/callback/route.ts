import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/dashboard";

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/login?error=auth_failed`);
  }

  // Password reset flow — redirect to the reset-password page
  if (type === "recovery") {
    return NextResponse.redirect(`${origin}/reset-password`);
  }

  // Check if this user has completed onboarding (profile + T&C)
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", data.user.id)
    .single();

  if (!profile) {
    // New OAuth user — needs profile + T&C
    return NextResponse.redirect(`${origin}/signup?step=2`);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
