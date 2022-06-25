import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import NextTable from "../Modals/TabsModal";
// import MaterialTable from "@material-table/core";
import PatientTable from "../Table/Table";
import Search from "../Search/Search";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
import LabelModal from "../Modals/LabelModal";
import "../table.css";
// import DataTable from "../PatientTable/Table";

function SimpleDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "1380px",
          },
        },
      }}
    >
      <DialogTitle sx={{ backgroundColor: "#8905ff ", color: "#fff", py: 3 }}>
        Patient Number: {window.id}
      </DialogTitle>
      <NextTable idPat={window.id} />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function SimpleDialogDemo() {
  function createData(patient) {
    return {
      // optum_hcc_id: patient.optum_hcc_id,
      // pdppin: patient.pdppin,
      // condition: patient.condition,
      // icd10: patient.icd10,
      // icd_10_cm_description: patient.icd_10_cm_description,
      // birth_sex: patient.birth_sex,
      optum_hcc_id: patient.optum_hcc_id,
      pdppin: patient.pdppin,
      condition: patient.condition,
      icd10: patient.icd10,
      icd_10_cm_description: patient.icd_10_cm_description,
      birth_sex: patient.birth_sex,
      cms_hcc_model_category_v24: patient.cms_hcc_model_category_v24,
      updated_hcc_code: patient.updated_hcc_code,
      label: patient.label,
      remarks: patient.remarks,
    };
  }
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openLabelModal, setOpenLabelModal] = useState(false);
  const [page, setPerPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [isRowLabelActive, setIsRowLabelActive] = useState(false);
  const [optum_hcc_id, setOptum_hcc_id] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const handleOpenLabelModal = () => {
    if (isRowLabelActive) {
      setOpenLabelModal(true);
    }
  };
  const handleCloseLabelModal = () => {
    setOpenLabelModal(false);
  };

  const baseURl = "https://n4dmctglka.execute-api.us-east-2.amazonaws.com/api/";
  const handlefetchRecord = useCallback(async (search, page, totalPages) => {
    await fetch(
      search !== undefined && search !== 0 && search !== ""
        ? `${baseURl}patients?page=${page}&per_page=${totalPages}&filter_hcc=${search}`
        : `${baseURl}patients?page=${page}&per_page=${totalPages}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`HTTP error ${response.status}`);
      })
      .then((res) => {
        setData();
        if (res.length > 0) {
          setSearchValue("");
          const result = res.map((item) => createData(item));
          setData(result);
        }
      })
      .catch((error) => {
        console.error("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "",
      field: "optum_hcc_id",
      minWidth: 0,
    },
    { title: "PDPPIN", field: "pdppin", minWidth: 170, align: "center" },

    { title: "ICD10 Code", field: "icd10", minWidth: 170, align: "center" },
    {
      title: "HCC Code",
      field: "cms_hcc_model_category_v24",
      minWidth: 170,
      align: "center",
    },
    {
      title: "Updated HCC Code",
      field: "updated_hcc_code",
      minWidth: 170,
      align: "center",
    },
    { title: "Label", field: "label", minWidth: 170, align: "center" },
    { title: "Remarks", field: "remarks", minWidth: 170, align: "center" },
    { title: "Condition", field: "condition", minWidth: 170, align: "" },
    {
      title: "ICD10 Description",
      field: "icd_10_cm_description",
      minWidth: 170,
      align: "",
    },
    { title: "Birth sex", field: "birth_sex", minWidth: 170, align: "center" },
    // {
    //   title: "",
    //   field: "optum_hcc_id",
    //   minWidth: 0,
    // },
    // { title: "PDPPIN", field: "pdppin", minWidth: 170, align: "center" },
    // { title: "Condition", field: "condition", minWidth: 170, align: "" },
    // { title: "ICD10 Code", field: "icd10", minWidth: 170, align: "center" },
    // {
    //   title: "ICD10 Description",
    //   field: "icd_10_cm_description",
    //   minWidth: 170,
    //   align: "",
    // },
    // { title: "Birth sex", field: "birth_sex", minWidth: 170, align: "center" },
  ];

  const [open, setOpen] = React.useState(false);

  function handleClickOpen(a) {
    setOpen(true);
    setOptum_hcc_id(a.optum_hcc_id);
    window.id = a.pdppin;
  }
  const handleClose = (value) => {
    setOpen(false);
  };
  const handleSearchInput = (e) => {
    const value = Number(e.target.value);
    setSearchValue(value);
  };

  return (
    <>
      <div>
        <SimpleDialog open={open} onClose={handleClose} />
      </div>
      <Box sx={{ backgroundColor: "#f7f8f9", height: "100%" }}>
        <Container sx={{ px: { xs: 1, lg: 4 }, py: 0 }}>
          <Grid container spacing={2} sx={{ py: 6 }}>
            <Grid item xs={12} sm={8}>
              <Search
                handleSearch={() =>
                  handlefetchRecord(searchValue, page, totalPages)
                }
                handleSearchInput={handleSearchInput}
                setSearchValue={setSearchValue}
              />
            </Grid>
            <LabelModal
              handleClickOpen={handleOpenLabelModal}
              handleClose={handleCloseLabelModal}
              open={openLabelModal}
              optum_hcc_id={optum_hcc_id}
            />
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                size="large"
                onClick={handleOpenLabelModal}
                sx={{ width: "100%", textTransform: "capitalize" }}
              >
                Label Record
              </Button>
            </Grid>
            <Grid item xs={12} sm={12}>
              <PatientTable
                loading={loading}
                columns={columns}
                rows={data}
                handlefetchRecord={handlefetchRecord}
                setPerPage={setPerPage}
                setTotalPages={setTotalPages}
                onRowClick={(row) => handleClickOpen(row)}
                setIsRowLabelActive={setIsRowLabelActive}
                setOptum_hcc_id={setOptum_hcc_id}
                searchValue={searchValue}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
