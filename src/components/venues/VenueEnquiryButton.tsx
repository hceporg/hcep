"use client";

import { useEnquiry } from "@/components/enquiry/EnquiryContext";
import { Button } from "@/components/ui/Button";

export function VenueEnquiryButton({
  venueId,
  venueName,
}: {
  venueId: string;
  venueName: string;
}) {
  const { openEnquiry } = useEnquiry();

  return (
    <Button
      className="w-full mt-6"
      showArrow
      onClick={() => openEnquiry({ source: `venue:${venueName}`, venueId })}
    >
      Check availability
    </Button>
  );
}
