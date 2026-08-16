"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { deleteRequest } from "@/app/admin/actions";

export function DeleteRequestButton({ id, redirectOnDelete }: { id: string; redirectOnDelete?: string }) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteRequest(id);
        toast.success("Request deleted.");
        setConfirming(false);
        if (redirectOnDelete) router.push(redirectOnDelete);
      } catch {
        toast.error("Failed to delete request.");
      }
    });
  }

  if (confirming) {
    return (
      <div className="inline-flex items-center gap-2 rounded-lg bg-error/10 px-2 py-1">
        <span className="text-xs font-medium text-error">Delete permanently?</span>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="text-xs font-semibold text-error hover:underline disabled:opacity-60"
        >
          {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Confirm"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Cancel delete"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="inline-flex items-center gap-1 text-sm font-semibold text-error hover:underline"
      aria-label="Delete request"
    >
      <Trash2 className="h-3.5 w-3.5" />
    </button>
  );
}
