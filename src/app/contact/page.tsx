import { ContactForm } from "@/components/ContactForm";

export const metadata = { title: "문의", description: "축제바라 문의 페이지", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <main className="container-shell py-10">
      <section>
        <h1 className="text-3xl font-black">문의</h1>
        <p className="mt-3 text-bara-muted">행사 제보, 정보 수정 요청, 광고 문의를 남겨주세요.</p>
        <div className="soft-card mt-6 rounded-xl p-5 leading-7 text-slate-700">
          <p>행사 일정 변경, 장소 오류, 참가비 수정, 공식 홈페이지 추가 요청을 보내주시면 확인 후 반영합니다.</p>
          <p className="mt-2">운영 문의 이메일: contact@baraissue.com</p>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
