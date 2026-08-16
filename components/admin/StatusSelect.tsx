"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { updateRequestStatus } from "@/app/admin/actions";
import { callbackStatusValues, type CallbackStatus } from "@/lib/validations/callback";

export function StatusSelect({ id, initialStatus }: { id: string; initialStatus: CallbackStatus }) {
  const [status, setStatus] = useState<CallbackStatus>(initialStatus);
  const [isPending, startTransition] = useTransition();

  function handleChange(next: CallbackStatus) {
    const previous = status;
    setStatus(next);
    startTransition(async () => {
      try {
        await updateRequestStatus(id, next);
        toast.success(`Status updated to "${next}".`);
      } catch {
        setStatus(previous);
        toast.error("Failed to update status.");
      }
    });
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        disabled={isPending}
        onChange={(e) => handleChange(e.target.value as CallbackStatus)}
        className="rounded-xl border border-input bg-white px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60"
      >
        {callbackStatusValues.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      {isPending && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
    </div>
  );
}
