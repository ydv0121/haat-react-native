import React, { useRef } from "react";
import { Animated, Platform } from "react-native";

export const IMAGE_BASE_URL = "https://im-staging.haat.delivery/";
export const MARKET_ID = 4532;
export const BlurHash = `'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['`
export const headerHeight = 150;
export const MainHeader = Platform.select({
  ios: 44,
  android: 56,
  default: 56,
});
