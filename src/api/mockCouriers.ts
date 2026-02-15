import type { Courier, Quote } from "../types/courier";

const COURIER_DATABASE: Omit<Courier, "totalPrice" | "deliveryDate">[] = [
  {
    id: "dhl",
    name: "DHL Express",
    logo: "🟡",
    basePrice: 24.99,
    tax: 4.5,
    estimatedDays: 3,
    rating: 4.8,
    features: ["Real-time Tracking", "Insurance Included", "Express Delivery"],
  },
  {
    id: "fedex",
    name: "FedEx International",
    logo: "🟣",
    basePrice: 29.99,
    tax: 5.4,
    estimatedDays: 2,
    rating: 4.7,
    features: [
      "Priority Handling",
      "Signature Required",
      "Money-Back Guarantee",
    ],
  },
  {
    id: "ups",
    name: "UPS Worldwide",
    logo: "🟤",
    basePrice: 22.5,
    tax: 4.05,
    estimatedDays: 4,
    rating: 4.5,
    features: ["Carbon Neutral", "Flexible Delivery", "Access Point Network"],
  },
  {
    id: "aramex",
    name: "Aramex",
    logo: "🔴",
    basePrice: 18.99,
    tax: 3.42,
    estimatedDays: 5,
    rating: 4.3,
    features: ["Competitive Rates", "Regional Expertise", "Cash on Delivery"],
  },
  {
    id: "maersk",
    name: "Maersk Freight",
    logo: "🔵",
    basePrice: 12.0,
    tax: 2.16,
    estimatedDays: 14,
    rating: 4.6,
    features: ["Bulk Shipping", "Sea Freight", "Eco-Friendly"],
  },
  {
    id: "tnt",
    name: "TNT Express",
    logo: "🟠",
    basePrice: 26.0,
    tax: 4.68,
    estimatedDays: 3,
    rating: 4.4,
    features: ["Door-to-Door", "Economy Option", "Proof of Delivery"],
  },
];

function calculatePrice(
  base: number,
  weight: number,
  isInternational: boolean
): number {
  const weightMultiplier = weight <= 1 ? 1 : 1 + (weight - 1) * 0.15;
  const internationalSurcharge = isInternational ? 1.35 : 1.0;
  return +(base * weightMultiplier * internationalSurcharge).toFixed(2);
}

function getDeliveryDate(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// Routes that are NOT served (to simulate empty state)
const UNSUPPORTED_ROUTES = [
  { from: "NG", to: "KR" },
  { from: "KE", to: "JP" },
];

export const fetchCouriers = async (quote: Quote): Promise<Courier[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate API error randomly (5% chance)
      if (Math.random() < 0.05) {
        reject(
          new Error(
            "DHL rate service is temporarily unavailable. Please try again."
          )
        );
        return;
      }

      // Check unsupported routes → empty state
      const isUnsupported = UNSUPPORTED_ROUTES.some(
        (r) =>
          r.from === quote.originCountry && r.to === quote.destinationCountry
      );

      if (isUnsupported) {
        resolve([]);
        return;
      }

      const isInternational = quote.originCountry !== quote.destinationCountry;

      const results: Courier[] = COURIER_DATABASE.map((courier) => {
        const adjustedBase = calculatePrice(
          courier.basePrice,
          quote.weight,
          isInternational
        );
        const adjustedTax = +(adjustedBase * 0.18).toFixed(2);
        const total = +(adjustedBase + adjustedTax).toFixed(2);

        // Volume factor: if volume > 10000 cm³, add surcharge
        const volume = quote.length * quote.width * quote.height;
        const volumeSurcharge = volume > 10000 ? +(total * 0.1).toFixed(2) : 0;

        return {
          ...courier,
          basePrice: adjustedBase,
          tax: adjustedTax + volumeSurcharge,
          totalPrice: +(total + volumeSurcharge).toFixed(2),
          deliveryDate: getDeliveryDate(courier.estimatedDays),
        };
      });

      // Filter: Maersk only for international
      const filtered = results.filter((c) => {
        if (c.id === "maersk" && !isInternational) return false;
        return true;
      });

      resolve(filtered);
    }, 1800);
  });
};
