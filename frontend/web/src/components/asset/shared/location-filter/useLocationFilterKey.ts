import { useCurrentAsset } from "@navtrack/shared/hooks/assets/useCurrentAsset";
import { useMemo } from "react";

export type LocationFilterPage = "trips" | "log";

export const useLocationFilterKey = (page: LocationFilterPage) => {
  const currentAsset = useCurrentAsset();

  const key = useMemo(() => `${page}:${currentAsset}`, [currentAsset, page]);

  return key;
};
