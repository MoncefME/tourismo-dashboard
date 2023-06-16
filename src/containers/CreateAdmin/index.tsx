import Container, {
  ContainerBody,
  ContainerFooter,
  ContainerHeader,
} from "@/components/Container";
import Header from "@/components/PageHeader";
import { ROUTES } from "@/constants/routes";
import React, { useState, useMemo } from "react";
import { Button, PasswordInput, Select, TextInput } from "@mantine/core";
import { useRouter } from "next/router";
import { CreateUserRequestData } from "@/services/admins.service";
import { geoService } from "@/services/geo.service";
import { useAdmin } from "@/store/admins.store";
import { notify } from "@/utils/notify";

const CreateAdminContainer = () => {
  const router = useRouter();
  const { createAdmin, isLoading } = useAdmin();
  const [formValue, setFormValue] = useState<CreateUserRequestData>({
    email: "",
    name: "",
    password: "",
    re_password: "",
    region: "",
  });

  const wilayas = useMemo(() => geoService.getWilayas(), []);

  const onFormValueChange = <
    T extends CreateUserRequestData,
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
      await createAdmin(formValue);
      router.push(ROUTES.ADMINS.pathname);
    } catch (e) {
      notify({
        message: "Erreur lors de la création",
        type: "error",
      });
    }
  };

  return (
    <div>
      <Header
        title={ROUTES.ADMINS.title}
        currentTitle={ROUTES.CREATE_ADMINS.title}
      />
      <form onSubmit={onFormSubmit}>
        <Container>
          <ContainerHeader title={ROUTES.CREATE_ADMINS.title} />
          <ContainerBody grid>
            <TextInput
              label="Name"
              placeholder="Name"
              withAsterisk
              value={formValue.name}
              onChange={(e) => onFormValueChange("name", e.target.value)}
            />
            <TextInput
              label="Email"
              placeholder="Email"
              withAsterisk
              value={formValue.email}
              onChange={(e) => onFormValueChange("email", e.target.value)}
            />
            <PasswordInput
              label="Password"
              placeholder="Password"
              withAsterisk
              value={formValue.password}
              onChange={(e) => onFormValueChange("password", e.target.value)}
            />
            <PasswordInput
              label="Re-Password"
              placeholder="Re-Password"
              withAsterisk
              value={formValue.re_password}
              onChange={(e) => onFormValueChange("re_password", e.target.value)}
            />
            <Select
              label="Region"
              placeholder="Region"
              withAsterisk
              data={wilayas}
              searchable
              onChange={(value) => onFormValueChange("region", value || "")}
            />
          </ContainerBody>
          <ContainerFooter>
            <Button onClick={() => router.replace(ROUTES.ADMINS.pathname)}>
              Retour
            </Button>
            <Button
              leftIcon={<ROUTES.CREATE_ADMINS.Icon />}
              loading={isLoading}
              type="submit"
            >
              Submit
            </Button>
          </ContainerFooter>
        </Container>
      </form>
    </div>
  );
};

export default CreateAdminContainer;
