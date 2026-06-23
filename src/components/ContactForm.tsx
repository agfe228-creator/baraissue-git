"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const message = String(data.message || "").trim();
    const subject = encodeURIComponent(`[축제바라 문의] ${name}`);
    const body = encodeURIComponent(`이름: ${name}\n이메일: ${email}\n\n문의 내용:\n${message}`);
    window.location.href = `mailto:contact@baraissue.com?subject=${subject}&body=${body}`;
    setSent(true);
    form.reset();
  }

  return (
    <form onSubmit={submit} className="soft-card mt-6 grid gap-4 rounded-xl p-5">
      <input name="name" required placeholder="이름" className="h-12 rounded-lg border border-bara-line px-4" />
      <input name="email" required type="email" placeholder="이메일" className="h-12 rounded-lg border border-bara-line px-4" />
      <textarea name="message" required placeholder="문의 내용" rows={6} className="rounded-lg border border-bara-line p-4" />
      <button className="h-12 rounded-lg bg-bara-blue font-black text-white">이메일로 문의 보내기</button>
      {sent ? <p className="text-sm font-bold text-bara-blue">메일 작성 창이 열렸습니다. 내용을 확인한 뒤 전송해 주세요.</p> : null}
    </form>
  );
}