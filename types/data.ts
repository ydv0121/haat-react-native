export interface LocalizedString {
  ar: string | null;
  "en-US": string | null;
  he: string | null;
  fr?: string | null;
}

export interface Image {
  id: number;
  priority: number;
  serverImageUrl: string;
  smallImageUrl: string;
  blurhash: string;
  group: number;
}

export interface ProductDynamicWeightData {
  supportDynamicPricing: boolean;
  maxWeightPercentage: number;
}

export interface ProductDeal {
  id: number;
  quantity: number;
  price: number;
  limitPerOrder: number;
}

export interface ProductBranchSettings {
  overridePrice: boolean;
  overrideAvailability: boolean;
  overrideVisibility: boolean;
}

export interface UnitDetails {
  stepSize: number;
  unitType: string;
}

export interface Discount {
  discountId: number;
  priceAfterDiscount: number;
  originalPrice: number;
  priceAfterDiscountToPresent: number;
  originalPriceToPresent: number;
  type: number;
  value: number;
  valueToPresent: number;
}

export interface Product {
  type: string;
  id: number;
  name: LocalizedString;
  description: LocalizedString;
  categoryId: number;
  subCategoryId: number;
  unitType: number;
  minUnit: number;
  maxUnit: number;
  unitStep: number;
  productColors: any[];
  productSizes: any[];
  productFeatures: any[];
  marketCategoryId: number;
  marketSubCategoryId: number;
  noVat: boolean;
  quantityType: string;
  unitDetails: UnitDetails | null;
  barcode: string | null;
  productCode: string | null;
  discount: Discount | null;
  discountsHistories: any | null;
  availability: any[];
  productDynamicWeightData: ProductDynamicWeightData;
  productDeal: ProductDeal | null;
  brandId: number | null;
  brandName: string | null;
  isCocaColaBrand: boolean;
  productBranchSettings: ProductBranchSettings;
  baseId: number | null;
  storageSection: string;
  redeemableOptions: any | null;
  isRedeemable: boolean;
  priority: number;
  basePrice: number;
  hide: boolean;
  notAvailable: boolean;
  discountPercentage: number;
  discountPrice: number;
  productImages: Image[];
  supportDynamicPricing: boolean;
  pricePerWeight: number | null;
  avgWeightPerItem: number | null;
  weightToPresent: string | null;
  isBigItem: boolean;
}

export interface MarketSubcategory {
  id: number;
  name: LocalizedString;
  serverImageUrl: string | null;
  smallImageUrl: string | null;
  priority: number;
  hide: boolean;
  products: Product[];
  productsCount: number;
  hasDiscount: boolean;
  supportDynamicPricing: boolean;
  discountsHistories: any | null;
  gameName: string | null;
}

export interface MarketCategory {
  marketSubcategories: MarketSubcategory[];
  id: number;
  name: LocalizedString;
  serverImageUrl: string;
  smallImageUrl: string;
  priority: number;
  hide: boolean;
  productsCount: number;
  hasDiscount: boolean;
  supportDynamicPricing: boolean;
  products: Product[];
}

export interface MarketBanner {
  id: number;
  serverImageUrl: string;
  smallImageUrl: string;
  priority: number;
}

export interface WorkingHours {
  dayOfWeek: number;
  fromHour: number;
  toHour: number;
  isActive: boolean;
  utcOffset: number;
  countryId: number;
  specialWorkingHours: any | null;
  type: number;
  fromHourDate: string;
  toHourDate: string;
}

export interface ShareMarketData {
  url: string;
  message: string;
}

export interface BusinessNotice {
  noticeTitle: LocalizedString;
  noticeMessage: LocalizedString;
}

export interface BusinessStatusInMainPage {
  status: number;
  closestWorkingHour: any | null;
  is24Hour: boolean;
}

export interface WorkingHourRange {
  fromHour: number;
  toHour: number;
  type: number;
  dayOfWeek: number;
}

export interface MarketData {
  id: number;
  name: LocalizedString;
  address: LocalizedString;
  description: LocalizedString;
  iconServerImageUrl: string;
  iconSmallImageUrl: string;
  priority: number;
  status: number;
  discount: number;
  longitude: number;
  latitude: number;
  phoneNumber: string;
  isReady: boolean;
  noDelivery: boolean;
  noPick: boolean;
  noSeat: boolean;
  autoRefreshEnabled: boolean;
  busyExpirationDate: any | null;
  marketCategories: MarketCategory[];
  marketBanners: MarketBanner[];
  marketWorkingHours: WorkingHours[];
  deliveryFeeLabel: any | null;
  shareMarketData: ShareMarketData;
  isMarketPreferredForUser: boolean;
  dealsAndDiscountsCategory: MarketCategory;
  businessNotice: BusinessNotice;
  popUpList: any[];
  areaId: number;
  currentWorkingHourRange: WorkingHourRange;
  businessStatusInMainPage: BusinessStatusInMainPage;
  marketSubcategories: MarketSubcategory[];
  
}
