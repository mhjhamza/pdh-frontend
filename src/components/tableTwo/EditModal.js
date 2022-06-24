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
  phid,
}) {
  const [snomed, setSnomed] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [message, setMessage] = useState({});
  const [loading, setLoading] = useState(true);
  const updateProblemHistory = async () => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(snomed),
    };
    if (snomed !== null) {
      fetch(
        `https://n4dmctglka.execute-api.us-east-2.amazonaws.com/api/edit/${phid}`,
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
            setErrorMessage(false);
            setLoading(false);
            setMessage("success");
            setTimeout(() => {
              setMessage("");
              handleClose();
            }, 4000);
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
    setSnomed({ [name]: value });
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
          Edit Problem History
        </BootstrapDialogTitle>
        {message === "success" && (
          <Alert severity="success">successfully updated</Alert>
        )}
        {errorMessage && <Alert severity="error">Snomed required</Alert>}
        <DialogContent dividers>
          <Box>
            <TextField
              id="outlined-basic"
              label="Snomed"
              variant="outlined"
              placeholder="Enter Snomed"
              onChange={handleInput}
              name="snomed"
              sx={{ m: 1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "end" }}>
          <Button autoFocus onClick={handleClose} variant="contained">
            back
          </Button>
          <Button autoFocus onClick={updateProblemHistory} variant="contained">
            Update
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
