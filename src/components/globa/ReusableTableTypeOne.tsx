import React from "react";

interface Column {
  label: string;
  field: string;
}

interface ReusableTableTypeOneProps {
  columns: Column[];
  data: { [key: string]: React.ReactNode }[];
}

const ReusableTableTypeOne: React.FC<ReusableTableTypeOneProps> = ({
  columns,
  data,
}) => {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-t border-[#333] text-center">
            <tr className="text-left">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="p-2 font-medium text-gray-400"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-[#333]">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="p-2 text-gray-300">
                    {row[column.field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReusableTableTypeOne;