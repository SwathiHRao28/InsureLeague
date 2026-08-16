"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { addRequestNote } from "@/app/admin/actions";

export function NotesForm({ id, initialNote }: { id: string; initialNote: string | null }) {
  const [note, setNote] = useState(initialNote || "");
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      try {
        await addRequestNote(id, note);
        toast.success("Note saved.");
      } catch {
        toast.error("Failed to save note.");
      }
    });
  }

  return (
    <div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={5}
        placeholder="Add internal notes about this request..."
        className="w-full rounded-xl border border-input bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <button
        type="button"
        onClick={handleSave}
        disabled={isPending}
        className="mt-3 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Save notes
      </button>
    </div>
  );
}
