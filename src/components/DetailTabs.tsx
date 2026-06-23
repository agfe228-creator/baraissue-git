"use client";

import { EventCard } from "@/components/EventCard";
import { EventItem } from "@/lib/events";
import { Check } from "lucide-react";
import { useState } from "react";

const tabs = ["행사 소개", "교통 안내", "주차 정보", "FAQ", "관련 행사"];

const categoryGuides: Record<EventItem["category"], string[]> = {
  축제: ["현장 체험 프로그램과 공연 시간표를 먼저 확인하면 이동 동선을 줄일 수 있습니다.", "야외 축제는 날씨에 따라 운영 구역과 프로그램이 바뀔 수 있어 방문 당일 공지를 확인하는 것이 좋습니다."],
  박람회: ["사전 등록 여부, 입장 마감 시간, 참가 기업 목록을 미리 확인하면 관람 시간을 효율적으로 쓸 수 있습니다.", "상담이나 체험 부스가 많은 박람회는 관심 분야를 정하고 방문하면 대기 시간을 줄일 수 있습니다."],
  전시회: ["전시 관람은 회차별 입장, 사진 촬영 가능 구역, 도슨트 운영 여부를 함께 확인하는 것이 좋습니다.", "주말에는 인기 전시의 현장 대기가 길 수 있어 예매 가능 여부와 관람 소요 시간을 미리 살펴보세요."],
  공연: ["공연은 좌석 배치, 입장 가능 시간, 지연 입장 규정을 확인해야 관람 불편을 줄일 수 있습니다.", "예매처와 현장 수령 방식, 주차 할인 여부를 함께 확인하면 공연 당일 이동이 수월합니다."]
};

const categoryNouns: Record<EventItem["category"], string> = {
  축제: "축제 행사",
  박람회: "박람회",
  전시회: "전시회",
  공연: "공연"
};

export function DetailTabs({ event, related }: { event: EventItem; related: EventItem[] }) {
  const [active, setActive] = useState(tabs[0]);
  const guideItems = categoryGuides[event.category];
  const categoryName = categoryNouns[event.category];

  return (
    <section className="soft-card rounded-xl p-5">
      <div className="flex overflow-x-auto border-b border-bara-line">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`min-w-fit px-5 py-3 text-sm font-black ${active === tab ? "border-b-2 border-bara-blue text-bara-blue" : "text-slate-600"}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="py-6">
        {active === "행사 소개" ? (
          <div>
            <div>
              <p className="leading-7 text-slate-700">{event.description}</p>
              <p className="mt-4 leading-7 text-slate-700">
                {event.title}은 {event.region} {event.city} 권역에서 확인할 수 있는 {categoryName}입니다. 방문 전에는 행사 기간과 장소,
                참가비, 문의처를 함께 확인하고, 동행 인원과 이동 수단에 맞춰 관람 시간을 넉넉하게 잡는 것을 권장합니다.
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                축제바라는 행사명, 기간, 장소, 참가비, 문의 정보를 사용자가 빠르게 비교할 수 있도록 정리합니다.
                가족 나들이, 주말 여행, 지역 문화 탐방을 계획할 때 일정과 접근성을 함께 확인해 보세요.
              </p>
              <div className="mt-5 rounded-xl border border-bara-line bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                <p className="font-black text-bara-text">방문 전 확인하면 좋은 사항</p>
                <p className="mt-2">
                  행사 운영 시간, 우천 시 진행 여부, 현장 접수 가능 여부, 주차 혼잡도는 행사마다 달라질 수 있습니다.
                  특히 주말과 공휴일에는 주변 도로와 대중교통이 혼잡할 수 있으니 이동 시간을 여유 있게 잡는 것을 권장합니다.
                </p>
                <ul className="mt-3 list-disc pl-5">
                  {guideItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-5 rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm leading-7 text-slate-700">
                <p className="font-black text-bara-text">현장 이용 팁</p>
                <p className="mt-2">
                  같은 행사라도 평일과 주말의 혼잡도, 체험 프로그램 대기 시간, 주변 식당과 편의시설 이용 가능 시간이 다를 수 있습니다.
                  아이와 함께 방문한다면 화장실 위치와 휴식 공간을 먼저 확인하고, 사진 촬영이나 반려동물 동반처럼 현장 규정이 필요한 사항은 공식 안내를 확인해 주세요.
                </p>
              </div>
              <ul className="mt-5 space-y-3 text-sm font-semibold text-slate-700">
                {["공식 일정과 장소 확인", "요금 및 예약 조건 확인", "대중교통과 주차 동선 확인", "동행자 유형에 맞는 관람 계획"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check size={17} className="text-bara-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
        {active === "교통 안내" ? (
          <div className="space-y-4 leading-7 text-slate-700">
            <p>{event.transportInfo}</p>
            <p>행사장 주변은 시작 전후로 혼잡할 수 있으니 가까운 역, 버스 정류장, 도보 이동 시간을 함께 확인하는 것이 좋습니다.</p>
          </div>
        ) : null}
        {active === "주차 정보" ? (
          <div className="space-y-4 leading-7 text-slate-700">
            <p>{event.parkingInfo}</p>
            <p>주차 공간이 제한될 수 있으므로 임시 주차장 운영 여부와 요금, 출차 혼잡 시간을 방문 전에 확인해 주세요.</p>
          </div>
        ) : null}
        {active === "FAQ" ? (
          <div className="space-y-4 leading-7 text-slate-700">
            <p>{event.faq}</p>
            <p>정보 수정이 필요하면 문의 페이지로 행사명과 공식 안내 링크를 보내주시면 확인 후 반영합니다.</p>
          </div>
        ) : null}
        {active === "관련 행사" ? (
          related.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {related.map((item) => (
                <EventCard key={item.slug} event={item} />
              ))}
            </div>
          ) : (
            <p className="leading-7 text-slate-700">공식 출처가 확인된 관련 행사를 순서대로 정리하고 있습니다.</p>
          )
        ) : null}
      </div>
    </section>
  );
}
