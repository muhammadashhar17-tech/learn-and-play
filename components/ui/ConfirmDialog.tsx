"use client";

import { useEffect, useRef } from "react";

/** Accessible confirm box built on the native <dialog> (focus trap + Esc for free). */
export function ConfirmDialog({
  open,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        onCancel();
      }}
      onClick={(e) => e.target === ref.current && onCancel()}
      className="m-auto w-[min(92vw,26rem)] rounded-[1.75rem] border-2 border-white bg-surface dark:border-white/5 p-0 text-ink shadow-lift backdrop:bg-brand-950/50 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 text-center">
        <p className="text-lg font-semibold">{message}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            autoFocus
            className="rounded-2xl border border-line px-5 py-2.5 font-semibold transition hover:bg-surface-2 active:scale-95"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-2xl bg-rose-600 px-5 py-2.5 font-semibold text-white transition hover:bg-rose-700 active:scale-95"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
