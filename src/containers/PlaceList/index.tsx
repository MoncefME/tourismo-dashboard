import Container, {
  ContainerBody,
  ContainerHeader,
} from "@/components/Container";
import DataTable from "@/components/DataTable";
import Header from "@/components/PageHeader";
import { ROUTES } from "@/constants/routes";
import { LoggedInUserInfoResponseData } from "@/services/auth.service";
import { getPlacesResponseBody } from "@/services/places.service";
import { usePlaces } from "@/store/places.store";
import { notify } from "@/utils/notify";
import { Button } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { TableColumn } from "react-data-table-component";

const COLUMNS: TableColumn<getPlacesResponseBody[number]>[] = [
  {
    name: "Name",
    selector: (row) => row.name,
  },
  {
    name: "Category",
    selector: (row) => row.category,
  },
  {
    name: "Wilaya",
    selector: (row) => row.wilaya,
  },
  {
    name: "Ville",
    selector: (row) => row.ville,
  },
];

const PlaceListContainer = () => {
  const router = useRouter();
  const { getPlaces, places, isLoading } = usePlaces();
  useEffect(() => {
    getPlaces().catch((e) =>
      notify({
        message: "Erreur lors de la récupération des places",
        type: "error",
      })
    );
  }, []);

  return (
    <div>
      <Header
        currentTitle={ROUTES.CREATE_PLACES.title}
        title={ROUTES.PLACES.title}
      />
      <Container>
        <ContainerHeader title={ROUTES.PLACES.title}>
          <Button leftIcon={<ROUTES.CREATE_ADMINS.Icon />}>
            <Link href={ROUTES.CREATE_PLACES.pathname}>
              {ROUTES.CREATE_PLACES.title}
            </Link>
          </Button>
        </ContainerHeader>
        <ContainerBody loading={isLoading}>
          <DataTable
            data={places}
            columns={COLUMNS}
            onRowClick={(row) =>
              router.push(ROUTES.PLACE_BY_ID.pathname.replace("[id]", row.id))
            }
          />
        </ContainerBody>
      </Container>
    </div>
  );
};

export default PlaceListContainer;
