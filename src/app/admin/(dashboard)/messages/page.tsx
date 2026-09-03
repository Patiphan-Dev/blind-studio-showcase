import { ConfirmSubmit } from "@/components/admin/confirm-submit";
import { AdminPageHeader } from "@/components/admin/page-header";
import { Badge } from "@/components/ui/badge";
import { getMessages } from "@/lib/queries/messages";

import { deleteMessage, setHandled } from "./actions";

export const dynamic = "force-dynamic";

const dateFormat = new Intl.DateTimeFormat("th-TH", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default async function AdminMessagesPage() {
  const messages = await getMessages();

  return (
    <div>
      <AdminPageHeader
        title="ข้อความติดต่อ"
        description={`ทั้งหมด ${messages.length} ข้อความ`}
      />

      {messages.length === 0 ? (
        <p className="text-sm text-[var(--color-ink-soft)]">ยังไม่มีข้อความ</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {messages.map((message) => (
            <li
              key={message.id}
              className="border border-[var(--color-line)] p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{message.name}</p>
                  <p className="text-sm text-[var(--color-ink-soft)]">
                    {message.phone}
                    {message.email && ` · ${message.email}`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge tone={message.is_handled ? "muted" : "accent"}>
                    {message.is_handled ? "จัดการแล้ว" : "ใหม่"}
                  </Badge>
                  <span className="text-xs text-[var(--color-ink-faint)]">
                    {dateFormat.format(new Date(message.created_at))}
                  </span>
                </div>
              </div>

              <p className="mt-3 whitespace-pre-line text-sm">
                {message.message}
              </p>

              <div className="mt-4 flex items-center gap-4 border-t border-[var(--color-line)] pt-3">
                <form action={setHandled}>
                  <input type="hidden" name="id" value={message.id} />
                  <input
                    type="hidden"
                    name="handled"
                    value={(!message.is_handled).toString()}
                  />
                  <button
                    type="submit"
                    className="font-[family-name:var(--font-display)] text-sm link-underline"
                  >
                    {message.is_handled ? "ทำเป็นยังไม่จัดการ" : "ทำเครื่องหมายว่าจัดการแล้ว"}
                  </button>
                </form>
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={message.id} />
                  <ConfirmSubmit
                    label="ลบ"
                    pendingLabel="กำลังลบ…"
                    confirmText="ลบข้อความนี้ถาวร?"
                  />
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
