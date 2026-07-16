"use client";

import { Printer } from "lucide-react";

export default function PrintButton({ label = "Download PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden group flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-neutral-800 transition-all hover:border-black/30 hover:text-neutral-900"
    >
      <Printer size={15} />
      {label}
    </button>
  );
}
