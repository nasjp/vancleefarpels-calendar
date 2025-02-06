import type {
	VancleefArpelsBoutiques,
	VancleefArpelsBoutiqueAvailabilities,
} from "./api-client-type";

export const getBoutiques = async (): Promise<VancleefArpelsBoutiques> => {
	const response = await fetch(
		"https://api-canvas.rdv.richemont.com/api/v1?apiMethod=getBoutiquesId&maisonId=VCA&countryCode=JP&language=ja",
		{
			headers: {
				accept: "*/*",
				"accept-language": "ja,en-US;q=0.9,en;q=0.8",
				"content-type": "application/json",
				priority: "u=1, i",
				"rdv-origin-fullurl":
					"https://www.vancleefarpels.com/jp/ja/in-store-appointment.html",
				"rdv-widget-version": "1.35.0",
				"sec-ch-ua":
					'"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": '"macOS"',
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "cross-site",
			},
			referrer: "https://www.vancleefarpels.com/",
			referrerPolicy: "strict-origin-when-cross-origin",
			body: null,
			method: "GET",
			mode: "cors",
			credentials: "omit",
		},
	);

	if (!response.ok) {
		throw new Error(`getBoutiques API エラー: ${response.status}`);
	}

	const data: VancleefArpelsBoutiques = await response.json();
	return data;
};

export const getBoutiqueAvailabilities = async ({
	boutiqueId,
}: { boutiqueId: string }): Promise<VancleefArpelsBoutiqueAvailabilities> => {
	const response = await fetch(
		`https://api-canvas.rdv.richemont.com/api/v1?apiMethod=getBoutiqueAvailabilities&boutiqueId=${boutiqueId}&language=ja`,
		{
			headers: {
				accept: "*/*",
				"accept-language": "ja,en-US;q=0.9,en;q=0.8",
				"content-type": "application/json",
				priority: "u=1, i",
				"rdv-origin-fullurl":
					"https://www.vancleefarpels.com/jp/ja/in-store-appointment.html",
				"rdv-widget-version": "1.35.0",
				"sec-ch-ua":
					'"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": '"macOS"',
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "cross-site",
				Referer: "https://www.vancleefarpels.com/",
				"Referrer-Policy": "strict-origin-when-cross-origin",
			},
			body: null,
			method: "GET",
		},
	);

	if (!response.ok) {
		throw new Error(`getBoutiqueAvailabilities API エラー: ${response.status}`);
	}

	const data: VancleefArpelsBoutiqueAvailabilities = await response.json();
	return data;
};
