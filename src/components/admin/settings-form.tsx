"use client";

import { useActionState } from "react";

import {
  saveSettings,
  type SettingsActionState,
} from "@/app/admin/(dashboard)/settings/actions";
import { Button } from "@/components/ui/button";
import { FieldShell, TextArea, TextInput } from "@/components/ui/field";
import { SETTING_FIELDS } from "@/lib/constants";
import type { SiteSettings } from "@/types/domain";

interface SettingsFormProps {
  values: SiteSettings;
}

export function SettingsForm({ values }: SettingsFormProps) {
  const [state, formAction, pending] = useActionState<
    SettingsActionState,
    FormData
  >(saveSettings, {});

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      {SETTING_FIELDS.map((field) => (
        <FieldShell
          key={field.key}
          label={field.label}
          htmlFor={field.key}
          hint={field.helper}
        >
          {field.multiline ? (
            <TextArea
              id={field.key}
              name={field.key}
              rows={3}
              defaultValue={values[field.key] ?? ""}
            />
          ) : (
            <TextInput
              id={field.key}
              name={field.key}
              defaultValue={values[field.key] ?? ""}
            />
          )}
        </FieldShell>
      ))}

      {state.error && (
        <p className="text-sm text-[var(--color-accent-dark)]">{state.error}</p>
      )}
      {state.ok && (
        <p className="text-sm text-[var(--color-ink)]">บันทึกเรียบร้อยแล้ว</p>
      )}

      <div>
        <Button type="submit" disabled={pending}>
          {pending ? "กำลังบันทึก…" : "บันทึกข้อความบนเว็บ"}
        </Button>
      </div>
    </form>
  );
}
