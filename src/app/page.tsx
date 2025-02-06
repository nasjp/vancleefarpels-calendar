import { BoutiqueCalendar } from "@/components/boutique-calendar";
import { getTokyoBoutiqueAvailabilities } from "@/lib/vancleefarpels/core";

export const dynamic = "force-dynamic";

export default async function Home() {
  const boutiques = await getTokyoBoutiqueAvailabilities();

  return (
    <main className="container p-4">
      <h1 className="text-2xl font-bold mb-4">
        Vancleef & Arpels 東京店舗予約可能日程
      </h1>

      <BoutiqueCalendar boutiques={boutiques} />

      <p className="mt-4">
        ご予約はこちら:&nbsp;
        <a
          className="text-blue-500 underline"
          href="https://www.vancleefarpels.com/jp/ja/in-store-appointment.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.vancleefarpels.com/jp/ja/in-store-appointment.html
        </a>
      </p>
    </main>
  );
}
