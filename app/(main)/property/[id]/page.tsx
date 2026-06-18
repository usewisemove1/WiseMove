import PropertyDetailClient from "@/components/property/PropertyDetailClient";
import { getMockPropertyDetail } from "@/lib/mockPropertyDetail";

export default function PropertyPage({
  params,
}: {
  params: { id: string };
}) {
  // TODO: fetch by id when backend is ready
  const { property, agent, similarProperties } = getMockPropertyDetail(params.id);

  return (
    <PropertyDetailClient
      property={property}
      agent={agent}
      similarProperties={similarProperties}
    />
  );
}
