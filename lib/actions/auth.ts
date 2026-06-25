"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export interface ProfileData {
  fullName: string;
  phone: string;
  churchName: string;
  denomination: string;
  timezone: string;
}

function getOrigin(headersList: Awaited<ReturnType<typeof headers>>) {
  return (
    headersList.get("origin") ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000"
  );
}

// Called at Step 3 for email/password sign-up — creates auth user + profile atomically
export async function signUpWithEmail(
  email: string,
  password: string,
  profile: ProfileData,
) {
  const supabase = await createClient();
  const termsAcceptedAt = new Date().toISOString();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: profile.fullName,
        phone: profile.phone,
        church_name: profile.churchName,
        denomination: profile.denomination,
        timezone: profile.timezone,
        terms_accepted_at: termsAcceptedAt,
      },
    },
  });

  if (error) {
    if (error.code === "user_already_exists") {
      return { error: "An account with this email already exists. Please sign in instead." };
    }
    return { error: error.message };
  }
  if (!data.user) return { error: "Sign up failed. Please try again." };

  const { error: profileError } = await supabase.from("profiles").insert({
    id: data.user.id,
    full_name: profile.fullName,
    email,
    phone: profile.phone || null,
    church_name: profile.churchName || null,
    denomination: profile.denomination || null,
    timezone: profile.timezone,
    terms_accepted_at: termsAcceptedAt,
  });

  if (profileError) {
    return { error: "Account created but profile save failed. Please sign in and try again." };
  }

  redirect("/dashboard");
}

// Called at Step 3 for Google OAuth users — already authenticated, just needs profile
export async function completeOAuthProfile(profile: ProfileData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "Not authenticated." };

  const termsAcceptedAt = new Date().toISOString();
  const { error } = await supabase.from("profiles").insert({
    id: user.id,
    full_name: profile.fullName,
    email: user.email,
    phone: profile.phone || null,
    church_name: profile.churchName || null,
    denomination: profile.denomination || null,
    timezone: profile.timezone,
    terms_accepted_at: termsAcceptedAt,
  });

  if (error) return { error: error.message };
  redirect("/dashboard");
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Invalid email or password. Please try again." };
  redirect("/dashboard");
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  const headersList = await headers();
  const origin = getOrigin(headersList);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${origin}/auth/callback` },
  });

  if (error) redirect("/login?error=google_failed");
  if (data.url) redirect(data.url);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut({ scope: "global" });
  redirect("/");
}

export async function sendPasswordReset(email: string) {
  const supabase = await createClient();
  const headersList = await headers();
  const origin = getOrigin(headersList);

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?type=recovery`,
  });

  // Always return success to prevent email enumeration
  if (error) console.error("Password reset error:", error.message);
  return { success: true };
}

export async function updatePassword(password: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: error.message };
  redirect("/dashboard");
}
