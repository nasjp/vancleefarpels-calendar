import { expect, test } from "bun:test";

// JSON モックデータのインポート（Bun の場合、JSON インポートが有効であればこれでOKです）
import boutiquesMock from "./mock-boutiques.json";
import availabilitiesMock from "./mock-boutique-availabilities.json";

/**
 * グローバルな fetch をモックとして上書きします。
 * URL に応じて、getBoutiques API の場合は boutiquesMock、
 * getBoutiqueAvailabilities API の場合は availabilitiesMock を返します。
 */
globalThis.fetch = async (input: RequestInfo | URL, _init?: RequestInit) => {
	// URLオブジェクトに変換して文字列取得
	const url = new URL(input.toString());

	if (url.toString().includes("getBoutiquesId")) {
		return {
			ok: true,
			json: async () => boutiquesMock,
		} as Response; // Response型にキャスト
	}
	if (url.toString().includes("getBoutiqueAvailabilities")) {
		return {
			ok: true,
			json: async () => availabilitiesMock,
		} as Response; // Response型にキャスト
	}

	return {
		ok: false,
		status: 404,
		json: async () => ({ error: "Not Found" }),
	} as Response;
};

import { getTokyoBoutiqueAvailabilities } from "./core";

test("getTokyoBoutiqueAvailabilities はモックからデータを正しく返す", async () => {
	const availabilities = await getTokyoBoutiqueAvailabilities();
	expect(availabilities).toBeDefined();
	console.log(JSON.stringify(availabilities, null, 2));
	// ※必要に応じて、返り値の各要素に対するさらなるアサーションを追加してください。
});
