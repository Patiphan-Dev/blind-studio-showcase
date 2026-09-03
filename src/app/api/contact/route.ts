import { NextResponse, type NextRequest } from "next/server";

import { rateLimit } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase/server";
import { contactSchema } from "@/lib/validation/contact";

export const runtime = "nodejs";

function clientKey(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: NextRequest) {
  const limit = rateLimit(`contact:${clientKey(request)}`, 5, 60 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "ส่งข้อความบ่อยเกินไป กรุณาลองใหม่ภายหลัง" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "รูปแบบข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "ข้อมูลไม่ถูกต้อง" },
      { status: 422 },
    );
  }

  // Honeypot tripped — pretend success, drop the submission.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email ?? "",
      message: parsed.data.message,
    });
    if (error) throw error;
  } catch (err) {
    console.error("[contact] insert failed:", (err as Error).message);
    return NextResponse.json(
      { error: "ระบบบันทึกข้อความไม่สำเร็จ กรุณาติดต่อทางโทรศัพท์" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
