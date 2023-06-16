import Container, {
  ContainerBody,
  ContainerFooter,
  ContainerHeader,
} from "@/components/Container";
import Header from "@/components/PageHeader";
import { ROUTES } from "@/constants/routes";
import { geoService } from "@/services/geo.service";
import { CreatePlaceRequestBody } from "@/services/places.service";
import { useAuth } from "@/store/auth.store";
import { usePlaces } from "@/store/places.store";
import { notify } from "@/utils/notify";
import { Button, FileInput, Select, TextInput, Textarea } from "@mantine/core";
import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Dropzone } from "@mantine/dropzone";
const MapPicker = dynamic(() => import("./components/MapPicker"), {
  ssr: false,
});
const CATEGORIES = ["beach", "museum", "monumant"];

const CreatePlaceContainer = () => {
  const router = useRouter();
  const { createPlace, isLoading } = usePlaces();
  const { currentUser } = useAuth();

  const [formValue, setFormValue] = useState<CreatePlaceRequestBody>({
    category: "",
    created_by: 0,
    description: "",
    lat: 0,
    long: 0,
    name: "",
    nb_visitors: 0,
    region: "",
    ville: "",
    wilaya: "",
  });

  const [images, setImages] = useState<File[]>([]);

  const wilayas = useMemo(() => geoService.getWilayas(), []);

  const onFormValueChange = <
    T extends CreatePlaceRequestBody,
    Q extends keyof T
  >(
    key: Q,
    value: T[Q]
  ) => {
    setFormValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await createPlace(formValue, images);
      router.push(ROUTES.PLACES.pathname);
    } catch (e) {
      notify({
        message: "Erreur lors de la création",
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (currentUser) {
      setFormValue((prev) => ({
        ...prev,
        created_by: currentUser?.id,
      }));
    }
  }, [currentUser]);

  return (
    <div>
      <Header
        title={ROUTES.PLACES.title}
        currentTitle={ROUTES.CREATE_PLACES.title}
      />
      <form onSubmit={onFormSubmit}>
        <Container>
          <ContainerHeader title={ROUTES.CREATE_PLACES.title} />
          <ContainerBody grid>
            <TextInput
              label="Name"
              placeholder="Name"
              withAsterisk
              value={formValue.name}
              onChange={(e) => onFormValueChange("name", e.target.value)}
            />
            <Select
              label="Category"
              placeholder="Category"
              withAsterisk
              data={CATEGORIES}
              searchable
              onChange={(value) => {
                onFormValueChange("category", value || "");
              }}
            />
            <Select
              label="Wilaya"
              placeholder="Wilaya"
              withAsterisk
              data={wilayas}
              searchable
              onChange={(value) => {
                onFormValueChange("region", value || "");
                onFormValueChange("wilaya", value || "");
              }}
            />
            <TextInput
              label="City"
              placeholder="City"
              withAsterisk
              value={formValue.ville}
              onChange={(e) => onFormValueChange("ville", e.target.value)}
            />
            <div className="col-span-2">
              <MapPicker
                onMarkerChange={(lat, long) => {
                  onFormValueChange("lat", lat);
                  onFormValueChange("long", long);
                }}
              />
            </div>
            <div className="col-span-2">
              <Textarea
                label="Description"
                placeholder="Description"
                withAsterisk
                value={formValue.description}
                onChange={(e) =>
                  onFormValueChange("description", e.target.value)
                }
              />
            </div>
            <div className="col-span-2">
              <FileInput
                accept="image/png,image/jpeg"
                label="Upload images"
                placeholder="Upload images"
                multiple
                onChange={(files) => setImages(files)}
              />
            </div>
          </ContainerBody>
          <ContainerFooter>
            <Button onClick={() => router.replace(ROUTES.PLACES.pathname)}>
              Retour
            </Button>
            <Button
              leftIcon={<ROUTES.CREATE_PLACES.Icon />}
              loading={isLoading}
              type="submit"
            >
              Submit
            </Button>
          </ContainerFooter>{" "}
        </Container>
      </form>
    </div>
  );
};

export default CreatePlaceContainer;
