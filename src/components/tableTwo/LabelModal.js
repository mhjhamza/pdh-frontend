import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function LabelModal({
  handleClickOpen,
  handleClose,
  open,
  optum_hcc_id,
}) {
  const [formData, setFormData] = useState({
    label: "",
    remarks: "",
    hcc_code: "",
  });
  const [errorMessage, setErrorMessage] = useState(false);
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState(true);
  const { label, remarks, hcc_code } = formData;
  const addLabel = async () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
    };
    if (label !== "" && remarks !== "" && hcc_code !== "") {
      fetch(
        `https://n4dmctglka.execute-api.us-east-2.amazonaws.com/api/label/${optum_hcc_id}`,
        requestOptions
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }
          return response.json();
        })
        .then((res) => {
          if (res.statusCode === 200) {
            setLoading(false);
            setMessage("success");
            setErrorMessage(false);
            setTimeout(() => {
              setMessage("");
              handleClose();
            }, 3000);
          }
        });
    } else {
      setErrorMessage(true);
    }
    setTimeout(() => {
      setErrorMessage(false);
    }, 3000);
  };
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          sx={{ backgroundColor: "#3366C0", color: "#fff" }}
        >
          Add Label Record
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {message === "success" && (
            <Alert severity="success">successfully updated</Alert>
          )}
          {errorMessage && <Alert severity="error">All fields required</Alert>}
          <Box sx={{ m: 1.5 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Label</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={label}
                label="label"
                name="label"
                onChange={handleInput}
              >
                <MenuItem value="good">Good</MenuItem>
                <MenuItem value="bad">Bad</MenuItem>
                <MenuItem value="moderate">Moderate</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ m: 1.5 }}>
            <TextField
              id="outlined-basic"
              label="remarks"
              variant="outlined"
              onChange={handleInput}
              name="remarks"
            />
          </Box>
          <Box sx={{ m: 1.5 }}>
            <TextField
              id="outlined-basic"
              label="hcc_code"
              variant="outlined"
              onChange={handleInput}
              name="hcc_code"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button autoFocus onClick={handleClose} variant="contained">
            back
          </Button>
          <Button
            autoFocus
            onClick={addLabel}
            variant="contained"
            disabled={!loading}
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
