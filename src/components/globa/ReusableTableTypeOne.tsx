import React from "react";

interface Column {
  label: string;
  field: string;
}

interface ReusableTableTypeOneProps {
  columns: Column[];
  data: { [key: string]: React.ReactNode }[];
  leftPadding?: number;
}

const ReusableTableTypeOne: React.FC<ReusableTableTypeOneProps> = ({
  columns,
  data,
  leftPadding = 52
}) => {
  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-t border-[#333]">
            <tr className="text-left">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="p-2 font-medium text-gray-400"
                  style={{
                    paddingLeft: index === 0 ? leftPadding : undefined,
                  }}
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
                  <td key={colIndex} className="p-2 text-gray-300"
                   style={{
                        paddingLeft:
                          colIndex === 0 ? leftPadding : undefined,
                      }}
                  >
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