import type { SupabaseClient } from "@supabase/supabase-js";
import type { Booking, SnapshotResult } from "@/lib/types";

type SnapshotRow = {
  id: string;
  user_id: string;
  raw_total: number;
  scaled_total: number;
  tier: SnapshotResult["tier"];
  crisis_override: boolean;
  primary_archetype: SnapshotResult["primaryArchetype"];
  secondary_archetype: SnapshotResult["secondaryArchetype"];
  taken_at: string;
};

type BookingRow = {
  id: string;
  user_id: string;
  pastor_id: string;
  scheduled_for: string;
  slot: string;
  confirmed_at: string;
  status: Booking["status"];
  completed_at: string | null;
  cancelled_at: string | null;
};

function toSnapshotResult(row: SnapshotRow): SnapshotResult {
  return {
    rawTotal: row.raw_total,
    total: row.scaled_total,
    tier: row.tier,
    crisisOverride: row.crisis_override,
    primaryArchetype: row.primary_archetype,
    secondaryArchetype: row.secondary_archetype,
    takenAt: row.taken_at,
  };
}

function toBooking(row: BookingRow): Booking {
  return {
    id: row.id,
    pastorId: row.pastor_id,
    scheduledFor: row.scheduled_for,
    slot: row.slot,
    confirmedAt: row.confirmed_at,
    status: row.status,
    completedAt: row.completed_at,
    cancelledAt: row.cancelled_at,
  };
}

export async function loadMemberData(
  supabase: SupabaseClient,
  userId: string,
): Promise<{ snapshotResult: SnapshotResult | null; bookings: Booking[] }> {
  const [snapshotRes, bookingsRes] = await Promise.all([
    supabase
      .from("snapshot_results")
      .select(
        "id,user_id,raw_total,scaled_total,tier,crisis_override,primary_archetype,secondary_archetype,taken_at",
      )
      .eq("user_id", userId)
      .order("taken_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("pastor_bookings")
      .select(
        "id,user_id,pastor_id,scheduled_for,slot,confirmed_at,status,completed_at,cancelled_at",
      )
      .eq("user_id", userId)
      .order("scheduled_for", { ascending: true }),
  ]);

  if (snapshotRes.error) {
    console.error("Failed to load snapshot results:", snapshotRes.error.message);
  }
  if (bookingsRes.error) {
    console.error("Failed to load pastor bookings:", bookingsRes.error.message);
  }

  return {
    snapshotResult: snapshotRes.data ? toSnapshotResult(snapshotRes.data as SnapshotRow) : null,
    bookings: (bookingsRes.data ?? []).map((row) => toBooking(row as BookingRow)),
  };
}

export async function saveSnapshotResult(
  supabase: SupabaseClient,
  userId: string,
  result: SnapshotResult,
): Promise<void> {
  const { error } = await supabase.from("snapshot_results").insert({
    user_id: userId,
    raw_total: result.rawTotal,
    scaled_total: result.total,
    tier: result.tier,
    crisis_override: result.crisisOverride,
    primary_archetype: result.primaryArchetype,
    secondary_archetype: result.secondaryArchetype,
    taken_at: result.takenAt,
  });

  if (error) {
    console.error("Failed to save snapshot result:", error.message);
    throw error;
  }
}

export async function createPastorBooking(
  supabase: SupabaseClient,
  userId: string,
  booking: Booking,
): Promise<void> {
  const { error } = await supabase.from("pastor_bookings").insert({
    id: booking.id,
    user_id: userId,
    pastor_id: booking.pastorId,
    scheduled_for: booking.scheduledFor,
    slot: booking.slot,
    confirmed_at: booking.confirmedAt,
    status: booking.status,
    completed_at: booking.completedAt ?? null,
    cancelled_at: booking.cancelledAt ?? null,
  });

  if (error) {
    console.error("Failed to save booking:", error.message);
    throw error;
  }
}

export async function updatePastorBookingStatus(
  supabase: SupabaseClient,
  bookingId: string,
  status: Booking["status"],
  timestamp: string,
): Promise<void> {
  const patch =
    status === "completed"
      ? { status, completed_at: timestamp }
      : status === "cancelled"
        ? { status, cancelled_at: timestamp }
        : { status };

  const { error } = await supabase
    .from("pastor_bookings")
    .update(patch)
    .eq("id", bookingId);

  if (error) {
    console.error("Failed to update booking status:", error.message);
    throw error;
  }
}
