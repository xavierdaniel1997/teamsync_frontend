import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";


interface Column {
  label: string;
  field: string; 
}

interface ReusableTableProps {
  columns: Column[];
  data: any[];
  page?: number;
  rowsPerPage?: number;
  totalCount?: number;
  onPageChange?: (event: React.ChangeEvent<unknown>, newPage: number) => void;
  isPagination?: boolean;
}

const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj) || "N/A";
};

const ReusableTable: React.FC<ReusableTableProps> = ({
  columns,
  data,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  isPagination = true,
}) => {
  const totalPage = Math.ceil(totalCount / rowsPerPage);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "5px",
          margin: "20px 0",
          backgroundColor: "#151515", 
          color: "#FFFFFF", 
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: "bold",
                    color: "#FFFFFF",
                    backgroundColor: "#101010", 
                    borderBottom: "1px solid #444",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  "&:hover": { backgroundColor: "#2E2E2E" },
                  borderBottom: "1px solid #444",
                }}
              >
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    sx={{ color: "#D1D5DB", borderBottom: "1px solid #444" }} 
                  >
                    {getNestedValue(row, column.field)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isPagination && (
        <Pagination
          count={totalPage}
          page={page}
          onChange={onPageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "#FFFFFF", 
              borderColor: "#444",
            },
            "& .Mui-selected": {
              backgroundColor: "#0052CC !important", 
              color: "#FFFFFF",
            },
            "& .MuiPagination-ul": {
              justifyContent: "center",
            },
            backgroundColor: "#252B2B",
            padding: "10px",
            borderRadius: "5px",
          }}
        />
      )}
    </>
  );
};

export default ReusableTable;