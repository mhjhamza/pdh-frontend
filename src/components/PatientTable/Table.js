import React, { useEffect, useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";

const DataTable = ({
  columns,
  rows,
  onRowClick,
  loading,
  setPerPage,
  setTotalPages,
  handlefetchRecord,
  setIsRowLabelActive,
  setOptum_hcc_id,
  searchValue,
}) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pagination, setPagination] = useState(false);
  const [labelCheckBox, setLabelCheckBox] = useState({});
  // const perPage = useRef(1);
  // const totalPerPage = useRef(10);

  const handleCheckbox = (event) => {
    const isChecked = event.target.checked;
    const name = event.target.name;
    setOptum_hcc_id(name);
    setLabelCheckBox({
      [name]: isChecked,
    });
    setIsRowLabelActive(event.target.checked);
  };

  const handleChangePage = (event, newPage) => {
    setPagination(true);
    if (newPage <= 0) {
      setPage(1);
      setPerPage(1);
    } else {
      setPage(newPage);
      setPerPage(newPage);
    }
    setRowsPerPage(rowsPerPage);
    let search = searchValue !== "" ? searchValue : "";
    handlefetchRecord(search, page, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination(true);
    setRowsPerPage(+event.target.value);
    setTotalPages(+event.target.value);
    let search = searchValue !== "" ? searchValue : "";
    handlefetchRecord(search, +event.target.value, rowsPerPage);
  };

  useEffect(() => {
    setPagination(false);
    let search = searchValue !== "" ? searchValue : "";
    if (!pagination) {
      return () => {
        handlefetchRecord(search, page, rowsPerPage);
      };
    }
  }, [page, rowsPerPage, handlefetchRecord]);

  const styles = {
    "& .MuiTablePagination-root": {
      marginTop: "1rem",
      boxShadow: "rgb(221 220 220) 0px 1px 8px",
    },
    "& .MuiTablePagination-spacer": {
      flex: "unset",
    },
    "&.MuiPaper-root": {
      boxShadow: "unset",
    },
    "& .MuiTablePagination-selectLabel,.MuiTablePagination-displayedRows": {
      margin: "0",
    },
    "& .MuiTablePagination-displayedRows": {
      display: "none",
    },
  };
  return (
    <Paper
      sx={({ width: "100%", overflow: "hidden", boxShadow: "unset" }, styles)}
    >
      <TableContainer
        sx={{ maxHeight: 440, boxShadow: "rgb(221 220 220) 0px 1px 8px" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  backgroundColor: "#EDF3FF",
                }}
              ></TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#EDF3FF",
                    fontWeight: 600,
                  }}
                >
                  {column.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {loading && <Box sx={{ p: 4 }}>loading...</Box>}
          <TableBody>
            {rows?.slice(page * 1).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  <TableCell sx={{ width: "20px" }}>
                    <Checkbox
                      checked={labelCheckBox?.row?.optum_hcc_id}
                      onChange={handleCheckbox}
                      name={row.optum_hcc_id}
                    />
                  </TableCell>
                  {columns.map((column, i) => {
                    const value =
                      column.field === "optum_hcc_id" ? " " : row[column.field];
                    return (
                      <TableCell
                        key={column.field}
                        align={column.align}
                        onClick={() => onRowClick(row)}
                        sx={{ cursor: "pointer" }}
                      >
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        // count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        checkboxSelection
      />
    </Paper>
  );
};
export default DataTable;
