import Container, {
  ContainerBody,
  ContainerHeader,
} from "@/components/Container";
import DataTable from "@/components/DataTable";
import Header from "@/components/PageHeader";
import { ROUTES } from "@/constants/routes";
import { LoggedInUserInfoResponseData } from "@/services/auth.service";
import { useAdmin } from "@/store/admins.store";
import { notify } from "@/utils/notify";
import { Button } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { TableColumn } from "react-data-table-component";
const COLUMNS: TableColumn<LoggedInUserInfoResponseData>[] = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    reorder: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
    reorder: true,
    grow: 2,
  },
  {
    name: "Region",
    selector: (row) => row.region?.toUpperCase() || "N/A",
    sortable: true,
    reorder: true,
  },
  {
    name: "is Central Admin?",
    selector: (row) => (row.is_superuser ? "True" : "False"),
    cell: (row) => (
      <p
        className={`${
          row.is_superuser ? "bg-green-400" : "bg-red-400"
        } text-white py-1 px-4 rounded-full text-xs`}
      >
        {row.is_superuser ? "True" : "False"}
      </p>
    ),
    sortable: true,
    reorder: true,
  },
];

const AdminListContainer = () => {
  const { getAdmins, admins, isLoading } = useAdmin();

  useEffect(() => {
    getAdmins().catch((e) =>
      notify({
        message: "Erreur lors de la récupération des admins",
        type: "error",
      })
    );
  }, []);

  return (
    <div>
      <Header currentTitle={ROUTES.ADMINS.title} title={ROUTES.ADMINS.title} />
      <Container>
        <ContainerHeader title={ROUTES.ADMINS.title}>
          <Button leftIcon={<ROUTES.CREATE_ADMINS.Icon />}>
            <Link href={ROUTES.CREATE_ADMINS.pathname}>
              {ROUTES.CREATE_ADMINS.title}
            </Link>
          </Button>
        </ContainerHeader>
        <ContainerBody loading={isLoading}>
          <DataTable data={admins} columns={COLUMNS} />
        </ContainerBody>
      </Container>
    </div>
  );
};

export default AdminListContainer;
