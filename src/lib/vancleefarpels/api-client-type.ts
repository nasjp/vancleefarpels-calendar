// Vancleef & Arpels のデータ構造に対する型定義

// Boutiques

// 各翻訳情報
export interface Translation {
  shippingStreet: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;
  shippingCity: string;
  language: string;
  isPrimary: boolean;
  commercialBoutiqueName: string;
  additionalHoursText: string | null;
}

// 各営業時間の情報
export interface OpeningHour {
  startT: string; // 例: "11:00:00.000Z" (ISO 8601 形式の文字列)
  recordDate: string; // 日付 (例: "2025-02-06")
  isClosed: boolean;
  endT: string; // 例: "19:00:00.000Z"
  dayInitials: string; // 曜日の略称 (例: "Th")
  day: string; // 曜日 (例: "木曜日")
}

// 各ブティック（店舗）の情報
export interface Boutique {
  wholesalerCustomerGroup: string | null;
  underLockdown: boolean;
  translations: Translation[];
  street: string;
  shippingState: string;
  shippingCountry: string;
  selfServiceEnabled: boolean | null;
  recordTypeId: string | null;
  queueManagementVersion: string | null;
  queueId: string | null;
  postalCode: string;
  phone: string;
  openingHours: OpeningHour[];
  name: string;
  maison: string;
  isVirtualEnabled: boolean;
  isDeployed: boolean;
  id: string;
  fastAppointmentsEnabled: boolean | null;
  externalId: string;
  displayedOnCanvas: boolean;
  defNotificationChannel: string | null;
  countryOfOrigin: string;
  // communicationChannels: any; // 必要に応じて適切な型に変更してください
  commercialName: string;
  city: string;
  boutiqueType: string;
  boutiqueLanguageLabel: string | null;
  boutiqueLanguage: string;
  additionalHoursText: string | null;
}

// 国ごとのブティック一覧の情報
export interface CountryBoutiques {
  country: string;
  boutiques: Boutique[];
}

export type VancleefArpelsBoutiques = CountryBoutiques[];

// Boutique の利用可能時間情報の型定義

export interface BoutiqueAvailability {
  startT: string; // 例: "10:30:00.000Z"
  serviceSlotsCount: number; // サービス用のスロット数
  salesSlotsCount: number; // 販売用のスロット数
  recordDate: string; // 日付 (例: "2025-08-04")
  isClosed: boolean; // クローズ状態
  endT: string; // 例: "20:30:00.000Z"
  day: string; // 曜日 (例: "Monday")
}

export type VancleefArpelsBoutiqueAvailabilities = BoutiqueAvailability[];
