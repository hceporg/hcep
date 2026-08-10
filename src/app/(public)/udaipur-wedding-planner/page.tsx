import type { Metadata } from "next";
import { CityWeddingPlannerPage } from "@/components/seo/CityWeddingPlannerPage";
import { CITY_PAGES } from "@/lib/seo/cities";
import { buildMetadata } from "@/lib/seo/site";

const city = CITY_PAGES.udaipur;

export const metadata: Metadata = buildMetadata({
  title: city.title,
  description: city.description,
  path: city.path,
  keywords: [city.primaryKeyword, ...city.supportingKeywords],
});

export default function UdaipurWeddingPlannerPage() {
  return <CityWeddingPlannerPage city={city} />;
}
