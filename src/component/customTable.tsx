import React from "react";

interface Columns {
  header: string;
  accessor: string;
  headerClassName?: string;
}

interface DataRow {
  [key: string]: React.ReactNode;
}

interface CustomTableProps {
  columns: Columns[];
  data: DataRow[];
  className?: string;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  className,
}) => {
  return (
    <table className={className}>
      <tr className="bg-gray-200 ">
        {columns.map((item) => (
          <th key={item.accessor} className="p-5 text-md border">
            {item.header}
          </th>
        ))}
      </tr>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {columns.map((col) => (
            <td key={col.accessor} className="p-5 text-md border">
              {row[col.accessor]}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
};

export default CustomTable;
