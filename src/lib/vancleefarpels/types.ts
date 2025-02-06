export interface Boutiques {
	boutiqueId: string;
	name: string;
	availabilities: Availability[];
}

export interface Availability {
	date: string; // 例: 2025-02-24
}
