"use client";

import { EventCard } from "@/components/EventCard";
import { EventItem } from "@/lib/events";
import { Check } from "lucide-react";
import { useState } from "react";

const tabs = ["행사 소개", "교통 안내", "주차 정보", "FAQ", "관련 행사"];

export function DetailTabs({ event, related }: { event: EventItem; related: EventItem[] }) {
  const [active, setActive] = useState(tabs[0]);

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
                축제바라는 행사명, 기간, 장소, 참가비, 문의 정보를 사용자가 빠르게 비교할 수 있도록 정리합니다.
                가족 나들이, 주말 여행, 지역 문화 탐방을 계획할 때 일정과 접근성을 함께 확인해 보세요.
              </p>
              <div className="mt-5 rounded-xl border border-bara-line bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                <p className="font-black text-bara-text">방문 전 확인하면 좋은 사항</p>
                <p className="mt-2">
                  행사 운영 시간, 우천 시 진행 여부, 현장 접수 가능 여부, 주차 혼잡도는 행사마다 달라질 수 있습니다.
                  특히 주말과 공휴일에는 주변 도로와 대중교통이 혼잡할 수 있으니 이동 시간을 여유 있게 잡는 것을 권장합니다.
                </p>
              </div>
              <ul className="mt-5 space-y-3 text-sm font-semibold text-slate-700">
                {["다채로운 공연과 이벤트", "체험 프로그램 운영", "푸드트럭 및 편의시설 운영", "가족 방문객 추천 코스"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check size={17} className="text-bara-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
        {active === "교통 안내" ? <p className="leading-7 text-slate-700">{event.transportInfo}</p> : null}
        {active === "주차 정보" ? <p className="leading-7 text-slate-700">{event.parkingInfo}</p> : null}
        {active === "FAQ" ? <p className="leading-7 text-slate-700">{event.faq}</p> : null}
        {active === "관련 행사" ? (
          <div className="grid gap-4 md:grid-cols-2">
            {related.map((item) => (
              <EventCard key={item.slug} event={item} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
