"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type EnquiryContext = {
  isOpen: boolean;
  source: string;
  venueId: string | null;
  openEnquiry: (opts?: { source?: string; venueId?: string }) => void;
  closeEnquiry: () => void;
};

const Ctx = createContext<EnquiryContext | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("cta");
  const [venueId, setVenueId] = useState<string | null>(null);

  const openEnquiry = useCallback(
    (opts?: { source?: string; venueId?: string }) => {
      setSource(opts?.source ?? "cta");
      setVenueId(opts?.venueId ?? null);
      setIsOpen(true);
    },
    []
  );

  const closeEnquiry = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, source, venueId, openEnquiry, closeEnquiry }),
    [isOpen, source, venueId, openEnquiry, closeEnquiry]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useEnquiry() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useEnquiry must be used within EnquiryProvider");
  return ctx;
}
