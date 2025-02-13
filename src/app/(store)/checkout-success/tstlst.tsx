"use client";
import type {
  ICountry,
  ICountryData,
  ILanguage,
  TContinentCode,
  TCountryCode,
  TLanguageCode,
} from "countries-list";

// Main data and utils
import { getCountryDataList } from "countries-list";
// Utils
import { getEmojiFlag } from "countries-list";
import countries2to3 from "countries-list/minimal/countries.2to3.min.json";

export default function TstLst() {
  // console.log("countries2to3", countries2to3);
  console.log("getCountryDataList", getCountryDataList());

  return null;
}
