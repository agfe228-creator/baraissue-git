import { ContactForm } from "@/components/ContactForm";

export const metadata = { title: "문의", description: "축제바라 문의 페이지", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <main className="container-shell py-10">
      <section>
        <h1 className="text-3xl font-black">문의</h1>
        <p className="mt-3 text-bara-muted">행사 제보, 정보 수정 요청, 광고 문의를 남겨주세요.</p>
        <div className="soft-card mt-6 rounded-xl p-5 leading-7 text-slate-700">
          <p>
            축제바라는 전국 축제, 박람회, 전시회, 공연 정보를 정리하는 행사 정보 포털입니다. 행사 일정 변경, 장소 오류, 참가비 수정,
            공식 홈페이지 추가, 주최기관 연락처 정정이 필요한 경우 확인 가능한 자료와 함께 알려주시면 검토 후 반영합니다.
          </p>
          <p className="mt-3">
            운영 문의 이메일: <a className="font-bold text-bara-blue" href="mailto:contact@baraissue.com">contact@baraissue.com</a>
          </p>
          <p className="mt-3">
            행사 제보는 행사명, 지역, 개최 기간, 장소, 공식 안내 링크를 포함해 보내주세요. 광고와 제휴 문의는 캠페인 목적, 희망 노출 위치,
            진행 기간을 함께 남겨주시면 검토가 쉽습니다.
          </p>
          <p className="mt-3">
            접수된 내용은 사실 확인이 필요한 순서대로 검토합니다. 공개 정보와 주최 측 안내가 서로 다를 때는 공식 홈페이지, 지자체 공지,
            공공데이터 제공 정보를 우선 기준으로 삼습니다.
          </p>
          <p className="mt-3">
            단순 오탈자나 폐쇄된 링크는 확인 후 가능한 빠르게 수정하고, 일정 변경처럼 공식 확인이 필요한 내용은 출처 확인 뒤 반영합니다.
            보내주신 문의는 사이트 품질 개선과 행사 정보 정확도 향상을 위한 목적으로만 사용합니다.
          </p>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
