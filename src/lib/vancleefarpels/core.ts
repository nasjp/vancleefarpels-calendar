import { getBoutiques } from "./api-client";
import { getBoutiqueAvailabilities } from "./api-client";

export const getTokyoBoutiqueAvailabilities = async () => {
	const boutiques = await getBoutiques();
	const boutiquesInTokyo = boutiques
		.flatMap((boutique) => boutique.boutiques)
		.filter((boutique) => boutique.shippingState === "Tokyo")
		.map((boutique) => {
			const japaneseName = boutique.translations.find(
				(translation) => translation.language === "ja",
			)?.commercialBoutiqueName;

			return {
				boutiqueId: boutique.id,
				name: japaneseName ?? boutique.name,
			};
		});

	// 'recordDate' が今週内かどうかをチェックするヘルパー関数を定義（週の初めは月曜日、終わりは日曜日）
	const isThisWeek = (dateStr: string) => {
		const date = new Date(dateStr);
		const today = new Date();

		// 現在の日付から今週の月曜日を取得（getDay() は日曜日が 0 のため、月曜日を 0 にする調整）
		const dayOfWeek = today.getDay(); // 0 (日) ~ 6 (土)
		const diffToMonday = (dayOfWeek + 6) % 7; // 月曜日の場合は 0、それ以外はその差分
		const monday = new Date(today);
		monday.setHours(0, 0, 0, 0);
		monday.setDate(today.getDate() - diffToMonday);

		// 今週の日曜日を取得
		const sunday = new Date(monday);
		sunday.setDate(monday.getDate() + 6);
		sunday.setHours(23, 59, 59, 999);

		return date >= monday && date <= sunday;
	};

	const boutiquesWithAvailability = await Promise.all(
		boutiquesInTokyo.map(async (boutique) => {
			const availability = await getBoutiqueAvailabilities({
				boutiqueId: boutique.boutiqueId,
			});
			return {
				boutiqueId: boutique.boutiqueId,
				name: boutique.name,
				availabilities: availability
					.filter(
						(availability) =>
							// 利用可能なスロットがあるかつ、今週ではない場合のみ採用
							availability.salesSlotsCount > 0 &&
							availability.serviceSlotsCount > 0 &&
							!isThisWeek(availability.recordDate),
					)
					.map((availability) => {
						console.log(
							JSON.stringify(
								{
									name: boutique.name,
									availability,
								},
								null,
								2,
							),
						);
						return availability;
					})
					.map((availability) => ({
						date: availability.recordDate,
					})),
			};
		}),
	);

	return boutiquesWithAvailability;
};
