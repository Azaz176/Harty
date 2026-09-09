"use client";

import {
  useQueryStates,
  parseAsArrayOf,
  parseAsString,
  parseAsInteger,
} from "nuqs";

export function usePlpParams() {
  return useQueryStates({
    brand: parseAsArrayOf(parseAsString, ","),
    size: parseAsArrayOf(parseAsString, ","),
    color: parseAsArrayOf(parseAsString, ","),
    priceMin: parseAsInteger,
    priceMax: parseAsInteger,
    sort: parseAsString.withDefault("relevance"),
    page: parseAsInteger.withDefault(1),
    density: parseAsString.withDefault("comfort"),
  });
}

export type PlpParams = ReturnType<typeof usePlpParams>[0];
export type SetPlpParams = ReturnType<typeof usePlpParams>[1];
