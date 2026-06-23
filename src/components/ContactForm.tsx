"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    console.log("축제바라 문의", data);
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={submit} className="soft-card mt-6 grid gap-4 rounded-xl p-5">
      <input name="name" required placeholder="이름" className="h-12 rounded-lg border border-bara-line px-4" />
      <input name="email" required type="email" placeholder="이메일" className="h-12 rounded-lg border border-bara-line px-4" />
      <textarea name="message" required placeholder="문의 내용" rows={6} className="rounded-lg border border-bara-line p-4" />
      <button className="h-12 rounded-lg bg-bara-blue font-black text-white">문의 내용 확인</button>
      {sent ? <p className="text-sm font-bold text-bara-blue">작성한 내용을 확인했습니다. 답변이 필요한 문의는 contact@baraissue.com 으로 보내주세요.</p> : null}
    </form>
  );
}
