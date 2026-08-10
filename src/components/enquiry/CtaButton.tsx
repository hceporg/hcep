"use client";

import { useEnquiry } from "@/components/enquiry/EnquiryContext";
import { Button } from "@/components/ui/Button";

type Props = {
  text?: string;
  variant?: "primary" | "white" | "outline";
  className?: string;
  source?: string;
  venueId?: string;
  showArrow?: boolean;
};

export function CtaButton({
  text = "Start my wedding planning",
  variant = "primary",
  className,
  source = "cta",
  venueId,
  showArrow = true,
}: Props) {
  const { openEnquiry } = useEnquiry();

  return (
    <Button
      variant={variant}
      className={className}
      showArrow={showArrow}
      onClick={() => openEnquiry({ source, venueId })}
    >
      {text}
    </Button>
  );
}
