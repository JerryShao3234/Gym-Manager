import { ReactElement, useEffect, useState } from "react";

import { TableEntry } from "../../../util/rest";

import "./GymTable.scss";

interface GymTableProps {
  tableData: TableEntry[];
  className?: string;
}

export function GymTable({ tableData, className }: GymTableProps) {
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
      rows = Object.values(tableData).map((entry, rowIndex) => {
        const rowData = headerNames.map((headerName, colIndex) => (
          <td key={`entry-${rowIndex}-${colIndex}`}>{entry[headerName]}</td>
        ));
        return <tr key={`row-${rowIndex}`}>{rowData}</tr>;
      });
    }

    setTableHeaders(headers);
    setTableRows(rows);
  }, [tableData]);

  return (
    <div className={`gym-table ${className}`}>
      <table className="table table-dark">
        <thead>
          <tr>{tableHeaders}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      <p>{tableHeaders?.length ? "" : "No matching entries found."}</p>
    </div>
  );
}
