import Container, {
  ContainerBody,
  ContainerHeader,
} from "@/components/Container";
import Header from "@/components/PageHeader";
import { ROUTES } from "@/constants/routes";
import {
  CommentsResponseData,
  commentService,
} from "@/services/comments.service";
import { useComment } from "@/store/comments.store";
import { notify } from "@/utils/notify";
import React, { useEffect } from "react";
import { TableColumn } from "react-data-table-component";
import DataTable from "@/components/DataTable";
import { Button, Group, HoverCard, Text } from "@mantine/core";
import { TokenService } from "@/services/token.service";

const COLUMNS: TableColumn<CommentsResponseData[number]>[] = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    reorder: true,
    grow: 2,
  },
  {
    name: "Content",
    selector: (row) => row.content,
    sortable: true,
    reorder: true,
    cell: (row) => (
      <Group position="center">
        <HoverCard width={280} shadow="md">
          <HoverCard.Target>
            <Text>{row.content.substring(0, 10)}...</Text>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">{row.content}</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>
    ),
  },
  {
    name: "Rating",
    selector: (row) => row.rating,
    sortable: true,
    reorder: true,
  },
  {
    name: "Place ID",
    selector: (row) => row.touristicPlace,
    sortable: true,
    reorder: true,
  },
  {
    name: "Etat",
    selector: (row) => (row.approved ? "Oui" : "Non"),
    cell: (row) => (
      <p
        className={`whitespace-nowrap ${
          row.approved ? "bg-green-400" : "bg-orange-400"
        } text-white py-1 px-4 rounded-full text-xs`}
      >
        {row.approved ? "Approved" : "pending"}
      </p>
    ),
  },
  {
    name: "Actions",
    cell: (row) => {
      const { getComments } = useComment();
      return !row.approved ? (
        <div className="flex items-center gap-x-2">
          <Button
            onClick={async () => {
              try {
                await commentService.approveComment(
                  TokenService.getAccessToken() || "",
                  row.id
                );

                await getComments();
              } catch (e) {
                notify({
                  message: "Erreur while getting the comments",
                  type: "error",
                });
              }
            }}
            size="xs"
            color={"green"}
          >
            Approve
          </Button>
        </div>
      ) : null;
    },
    grow: 2,
  },
];

const CommentListContainer = () => {
  const { getComments, comments, isLoading } = useComment();
  useEffect(() => {
    getComments().catch((e) =>
      notify({
        message: "Erreur lors de la récupération des admins",
        type: "error",
      })
    );
  }, []);

  return (
    <div>
      <Header
        currentTitle={ROUTES.COMMENTS.title}
        title={ROUTES.COMMENTS.title}
      />
      <Container>
        <ContainerHeader title={ROUTES.COMMENTS.title}></ContainerHeader>
        <ContainerBody loading={isLoading}>
          <DataTable data={comments} columns={COLUMNS} />
        </ContainerBody>
      </Container>
    </div>
  );
};

export default CommentListContainer;
