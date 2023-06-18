import Container, {
  ContainerBody,
  ContainerHeader,
} from "@/components/Container";
import JsonVisualiser from "@/components/JsonVisualiser";
import Header from "@/components/PageHeader";
import { ROUTES } from "@/constants/routes";
import { usePlaces } from "@/store/places.store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const PlaceByIdContainer = () => {
  const { getPlaceById, selectedPlace, isLoading, selectedPlaceStats } =
    usePlaces();

  const router = useRouter();

  const placeId = router.query.id as string;

  useEffect(() => {
    if (!placeId) return;
    getPlaceById(parseInt(placeId)).catch((e) =>
      router.replace(ROUTES.PLACES.pathname)
    );
  }, [placeId]);

  return (
    <div>
      <Header
        currentTitle={ROUTES.PLACE_BY_ID.title}
        title={ROUTES.PLACES.title}
      />
      <Container>
        <ContainerHeader title={"Statistics"}></ContainerHeader>
        <ContainerBody grid loading={isLoading}>
          <div className="border-t-4 flex flex-col gap-y-1 p-2 border shadow-sm border-t-orange-400">
            <p className="font-medium text-gray-600">Rating Average</p>
            <p>{selectedPlaceStats?.rating_average}</p>
          </div>
          <div className="border-t-4 flex flex-col gap-y-1 border p-2 shadow-sm border-t-orange-400">
            <p className="font-medium text-gray-600">Visitors number</p>
            <p>{selectedPlaceStats?.nb_visitors}</p>
          </div>
        </ContainerBody>
        <ContainerHeader title={ROUTES.PLACE_BY_ID.title}></ContainerHeader>
        <ContainerBody grid loading={isLoading}>
          {selectedPlace &&
            Object.entries(selectedPlace).map(([key, value], index) => (
              <div
                key={index}
                className="border-t-4 flex flex-col gap-y-1 border p-2 shadow-sm border-t-gray-900"
              >
                <p className="font-medium text-gray-600">{key}</p>
                <p>{JSON.stringify(value)}</p>
              </div>
            ))}
        </ContainerBody>
      </Container>
    </div>
  );
};

export default PlaceByIdContainer;
