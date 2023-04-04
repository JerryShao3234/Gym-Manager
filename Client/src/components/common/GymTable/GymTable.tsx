import { ReactElement, useEffect, useState } from "react";
import { TrashFill } from "react-bootstrap-icons";

import { TableEntry } from "../../../util/rest";

import "./GymTable.scss";

interface GymTableProps {
  tableData: TableEntry[];
  deleteCallback: (entry: TableEntry) => void;
  className?: string;
  haveDelete?: boolean;
}

export function GymTable({
  tableData,
  deleteCallback,
  className,
  haveDelete = true,
}: GymTableProps) {
  const [tableRows, setTableRows] = useState<ReactElement[]>();
  const [tableHeaders, setTableHeaders] = useState<ReactElement[]>();

  useEffect(() => {
    let headers: ReactElement[] = [];
    let rows: ReactElement[] = [];

    if (tableData && tableData[0]) {
      const headerNames = Object.keys(tableData[0]);
      headers = headerNames.map((headerName) => (
        <th scope="col" key={headerName}>
          {headerName}
        </th>
      ));
      if (haveDelete) headers.push(<th key={"header-delete"}></th>);

      rows = Object.values(tableData).map((entry, rowIndex) => {
        const rowData = headerNames.map((headerName, colIndex) => (
          <td key={`entry-${rowIndex}-${colIndex}`}>{entry[headerName]}</td>
        ));

        //only render delete button if haveDelete is true
        if (haveDelete) {
          rowData.push(
            <td
              key={`entry-${rowIndex}-delete`}
              className="delete"
              onClick={() => deleteCallback(entry)}
            >
              <TrashFill />
            </td>
          );
        }
        return <tr key={`row-${rowIndex}`}>{rowData}</tr>;
      });
    }

    setTableHeaders(headers);
    setTableRows(rows);
  }, [deleteCallback, haveDelete, tableData]);

  return (
    <div className={`gym-table ${className}`}>
      {tableHeaders?.length ? (
        <table className="table table-dark">
          <thead>
            <tr>{tableHeaders}</tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      ) : (
        <p>No matching entries found.</p>
      )}
    </div>
  );
}
