import type { Metadata } from "next";
import { CityWeddingPlannerPage } from "@/components/seo/CityWeddingPlannerPage";
import { CITY_PAGES } from "@/lib/seo/cities";
import { buildMetadata } from "@/lib/seo/site";

const city = CITY_PAGES.agra;

export const metadata: Metadata = buildMetadata({
  title: city.title,
  description: city.description,
  path: city.path,
  keywords: [city.primaryKeyword, ...city.supportingKeywords],
});

export default function AgraWeddingPlannerPage() {
  return <CityWeddingPlannerPage city={city} />;
}
