export const metadata = { title: "개인정보처리방침", description: "축제바라 개인정보처리방침", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <main className="container-shell py-10">
      <article className="soft-card rounded-xl p-6 leading-8">
        <h1 className="text-3xl font-black">개인정보처리방침</h1>
        <p className="mt-5">축제바라는 서비스 운영과 문의 응대를 위해 필요한 최소한의 개인정보만 처리합니다.</p>
        <h2 className="mt-6 text-xl font-black">수집 항목</h2>
        <p>문의 페이지 이용 시 이름, 이메일, 문의 내용이 처리될 수 있습니다.</p>
        <h2 className="mt-6 text-xl font-black">쿠키와 광고</h2>
        <p>
          향후 Google AdSense 등 광고 서비스를 사용할 수 있으며, 광고 제공자는 맞춤 광고와 트래픽 분석을 위해 쿠키를 사용할 수 있습니다.
          사용자는 브라우저 설정에서 쿠키 저장을 거부할 수 있습니다.
        </p>
        <p className="mt-3">
          Google을 포함한 제3자 광고 사업자는 쿠키를 사용하여 사용자의 이전 방문 기록을 바탕으로 광고를 게재할 수 있습니다.
          사용자는 Google 광고 설정 페이지에서 개인 맞춤 광고를 관리하거나 거부할 수 있으며, 브라우저의 쿠키 차단 기능을 사용할 수 있습니다.
        </p>
        <ul className="mt-3 list-disc pl-5 text-sm leading-7 text-slate-700">
          <li>
            Google 광고 설정: <a className="font-bold text-bara-blue" href="https://adssettings.google.com/" target="_blank" rel="noreferrer">https://adssettings.google.com/</a>
          </li>
          <li>
            Google 광고 개인정보 안내: <a className="font-bold text-bara-blue" href="https://policies.google.com/technologies/ads?hl=ko" target="_blank" rel="noreferrer">https://policies.google.com/technologies/ads</a>
          </li>
        </ul>
        <h2 className="mt-6 text-xl font-black">외부 서비스</h2>
        <p>
          사이트는 행사 정보 제공을 위해 공공데이터 API, 검색엔진, 분석 도구 등 외부 서비스를 활용할 수 있습니다.
          외부 링크로 이동한 뒤의 개인정보 처리는 해당 서비스의 정책을 따릅니다.
        </p>
        <h2 className="mt-6 text-xl font-black">보유 기간</h2>
        <p>문의 정보는 처리 목적 달성 후 지체 없이 파기하며, 법령상 보관이 필요한 경우 해당 기간 동안 보관합니다.</p>
        <h2 className="mt-6 text-xl font-black">문의</h2>
        <p>개인정보 관련 문의는 사이트의 문의 페이지를 통해 접수할 수 있습니다.</p>
      </article>
    </main>
  );
}
