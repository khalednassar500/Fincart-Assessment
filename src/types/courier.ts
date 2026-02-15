export interface Courier {
  id: string;
  name: string;
  logo: string;
  basePrice: number;
  tax: number;
  totalPrice: number;
  estimatedDays: number;
  deliveryDate: string;
  rating: number;
  features: string[];
}

export interface Quote {
  originCountry: string;
  originCity: string;
  originPostalCode: string;
  destinationCountry: string;
  destinationCity: string;
  destinationPostalCode: string;
  weight: number;
  length: number;
  width: number;
  height: number;
}

export type QuoteStep = "origin" | "destination" | "package";

export type FetchStatus = "idle" | "loading" | "success" | "error" | "empty";
