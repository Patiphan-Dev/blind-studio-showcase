"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function signOut() {
    setPending(true);
    await createClient().auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={pending}
      className="font-[family-name:var(--font-display)] text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] disabled:opacity-50"
    >
      {pending ? "กำลังออก…" : "ออกจากระบบ"}
    </button>
  );
}
