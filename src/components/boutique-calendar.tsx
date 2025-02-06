"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import type { Boutiques } from "@/lib/vancleefarpels/types";

type BoutiqueCalendarProps = {
  boutiques: Boutiques[];
};

export function BoutiqueCalendar({ boutiques }: BoutiqueCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const availableDates = boutiques.flatMap((boutique) =>
    boutique.availabilities.map((a) => new Date(a.date)),
  );

  // 選択日に予約可能な店舗をフィルタリング
  const availableBoutiques = boutiques.filter((boutique) => {
    if (!date) return false;
    return boutique.availabilities.some(
      (a) => new Date(a.date).toDateString() === date.toDateString(),
    );
  });

  return (
    <div>
      <div className="flex justify-start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border w-fit"
          modifiers={{ available: availableDates }}
          modifiersStyles={{
            available: { backgroundColor: "rgba(0, 255, 0, 0.1)" },
          }}
        />
      </div>
      {date && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">
            {date.toLocaleDateString("ja-JP", {
              weekday: "short",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            予約可能店舗:
          </h2>
          {availableBoutiques.length > 0 ? (
            <ul>
              {availableBoutiques.map((boutique) => (
                <li key={boutique.boutiqueId}>{boutique.name}</li>
              ))}
            </ul>
          ) : (
            <p>予約可能な店舗はありません。</p>
          )}
        </div>
      )}
    </div>
  );
}
