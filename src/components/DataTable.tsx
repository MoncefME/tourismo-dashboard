import React from "react";
import ReactDataTable from "react-data-table-component";
import Loading from "./Loading";
import { TableColumn } from "react-data-table-component";

type Props = {
  columns: TableColumn<any>[];
  data: any[];
  loading?: boolean;
};

const DataTable: React.FC<Props> = ({ columns, data, loading }) => {
  return (
    <ReactDataTable
      columns={columns}
      data={data}
      progressPending={loading}
      highlightOnHover
      pagination
      progressComponent={
        <div className="flex items-center justify-center h-72">
          <Loading />
        </div>
      }
    />
  );
};

export default DataTable;
