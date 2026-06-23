"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: document.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  return (
    <button onClick={share} className="focus-ring inline-flex h-9 items-center gap-2 rounded-lg border border-bara-line bg-white px-3 text-sm font-semibold text-slate-700">
      <Share2 size={16} />
      {copied ? "복사됨" : "공유하기"}
    </button>
  );
}
