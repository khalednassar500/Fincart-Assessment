import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { Courier, FetchStatus, Quote, QuoteStep } from "../types/courier";
import { fetchCouriers } from "../api/mockCouriers";
import { QuoteContext, type QuoteContextType } from "./quoteContextDef";

export { QuoteContext } from "./quoteContextDef";

const INITIAL_QUOTE: Partial<Quote> = {};

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [quoteData, setQuoteData] = useState<Partial<Quote>>(INITIAL_QUOTE);
  const [activeStep, setActiveStep] = useState<QuoteStep>("origin");
  const [couriers, setCouriers] = useState<Courier[]>([]);
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateQuoteData = useCallback((data: Partial<Quote>) => {
    setQuoteData((prev) => ({ ...prev, ...data }));
  }, []);

  const resetQuoteData = useCallback(() => {
    setQuoteData(INITIAL_QUOTE);
    setCouriers([]);
    setFetchStatus("idle");
    setErrorMessage(null);
    setActiveStep("origin");
  }, []);

  const searchCouriers = useCallback(
    async (overrideData?: Partial<Quote>) => {
      setFetchStatus("loading");
      setErrorMessage(null);
      setCouriers([]);

      // Merge override data into quoteData so the search uses the latest values
      const merged = { ...quoteData, ...overrideData } as Quote;
      if (overrideData) {
        setQuoteData(merged);
      }

      try {
        const results = await fetchCouriers(merged);
        if (results.length === 0) {
          setFetchStatus("empty");
        } else {
          setCouriers(results);
          setFetchStatus("success");
        }
      } catch (err) {
        setErrorMessage(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        setFetchStatus("error");
      }
    },
    [quoteData]
  );

  const cheapestId = useMemo(() => {
    if (couriers.length === 0) return null;
    return couriers.reduce(
      (min, c) => (c.totalPrice < min.totalPrice ? c : min),
      couriers[0]
    ).id;
  }, [couriers]);

  const fastestId = useMemo(() => {
    if (couriers.length === 0) return null;
    return couriers.reduce(
      (min, c) => (c.estimatedDays < min.estimatedDays ? c : min),
      couriers[0]
    ).id;
  }, [couriers]);

  const isInternational = useMemo(() => {
    return !!(
      quoteData.originCountry &&
      quoteData.destinationCountry &&
      quoteData.originCountry !== quoteData.destinationCountry
    );
  }, [quoteData.originCountry, quoteData.destinationCountry]);

  const value = useMemo<QuoteContextType>(
    () => ({
      quoteData,
      updateQuoteData,
      resetQuoteData,
      activeStep,
      setActiveStep,
      couriers,
      fetchStatus,
      errorMessage,
      searchCouriers,
      cheapestId,
      fastestId,
      isInternational,
    }),
    [
      quoteData,
      updateQuoteData,
      resetQuoteData,
      activeStep,
      couriers,
      fetchStatus,
      errorMessage,
      searchCouriers,
      cheapestId,
      fastestId,
      isInternational,
    ]
  );

  return (
    <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
  );
}
