import { createContext } from "react";
import type { Courier, FetchStatus, Quote, QuoteStep } from "../types/courier";

export interface QuoteContextType {
  // Form data
  quoteData: Partial<Quote>;
  updateQuoteData: (data: Partial<Quote>) => void;
  resetQuoteData: () => void;

  // Stepper
  activeStep: QuoteStep;
  setActiveStep: (step: QuoteStep) => void;

  // Results
  couriers: Courier[];
  fetchStatus: FetchStatus;
  errorMessage: string | null;
  searchCouriers: (overrideData?: Partial<Quote>) => Promise<void>;

  // Computed
  cheapestId: string | null;
  fastestId: string | null;
  isInternational: boolean;
}

export const QuoteContext = createContext<QuoteContextType | null>(null);
