/**
 * Generated by orval v6.14.4 🍺
 * Do not edit manually.
 * Navtrack.Api, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
 * OpenAPI spec version: 1.0
 */

export interface LocationModel {
  id?: string | null;
  latitude: number;
  longitude: number;
  coordinates: number[];
  readonly validCoordinates: boolean;
  dateTime: string;
  speed?: number | null;
  heading?: number | null;
  altitude?: number | null;
  satellites?: number | null;
  hdop?: number | null;
  valid?: boolean | null;
  gsmSignal?: number | null;
  odometer?: number | null;
}
