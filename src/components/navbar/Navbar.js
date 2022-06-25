import React, { useState, useCallback, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "@mui/material/Link";
import Swal from "sweetalert2";
import EmailCsv from "../../images/email.csv";
import "./styles.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const open = Boolean(anchorEl);

  const presigned = useRef();
  const baseURl = "https://n4dmctglka.execute-api.us-east-2.amazonaws.com/api";

  const handlefetchRecord = useCallback(async (path) => {
    const apiPath = path === "emr" ? "emr" : "optum";
    await fetch(`${baseURl}/upload/${apiPath}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`HTTP error ${response.status}`);
      })
      .then((res) => {
        if (res) {
          let data = res?.presigned_url;
          presigned.current = data;
          return res;
        }
      })
      .catch((error) => {
        console.error("error", error);
      })
      .finally(() => {
        // setLoading(false);
      });
  }, []);

  const uploadFileToS3 = async (file) => {
    // create a form obj
    const formData = new FormData();
    // append the fields in presignedPostData in formData
    Object.keys(presigned?.current?.fields).forEach((key) => {
      formData.append(key, presigned?.current?.fields[key]);
    });
    formData.append("file", new Blob([file], { type: "text/csv" }));

    const requestOptions = {
      mode: "no-cors",
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: formData,
    };
    // post the data on the s3 url
    await fetch(presigned?.current?.url, requestOptions)
      .then(function (response) {
        // setDropdown(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handle = (path) => {
    handlefetchRecord(path);
    Swal.fire({
      title: "Choose a file...",
      html: `<input type="file" id="file" accept=".csv"   class="swal2-input">`,
      preConfirm: () => {
        const file = Swal.getPopup().querySelector("#file").files[0].name;
        const fileObject = Swal.getPopup().querySelector("#file").files[0]
        console.log('Helloworld', typeof file)
        let checkCsvExtension = file.split(".")[1] == ".csv";
        // setDropdown(false);
        if (checkCsvExtension) {
          Swal.showValidationMessage(`Please select csv file !`);
        }
        if (!checkCsvExtension) {
          uploadFileToS3(fileObject);
        }
        if (!file) {
          Swal.showValidationMessage(`Please be sure to choose a file !`);
        }
      },
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Select",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("File added!", "Your file was successfully added", "success");
      }
    });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => handle("optum")}>Optum</MenuItem>
      <MenuItem onClick={() => handle("emr")}>EMR</MenuItem>
    </Menu>
  );
  const styles = {
    "& .MuiToolbar-root": {
      padding: "1rem",
      minHeight: "90px !important",
    },
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ minHeight: "80px", p: 0 }}>
        <Container>
          <Toolbar sx={styles}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { sm: "block", fontSize: "1.5rem" } }}
            >
              <Link href="#" underline="none" sx={{ color: "#fff" }}>
                ParaDocs Health
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Typography variant="body1">Upload</Typography>
              <>
                <KeyboardArrowDownIcon
                  onClick={handleClick}
                  color="inherit"
                  sx={{ mx: 1 }}
                />
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "right",
                    horizontal: "bottom",
                  }}
                >
                  <MenuItem onClick={() => handle("optum")}>Optum</MenuItem>
                  <MenuItem onClick={() => handle("emr")}>EMR</MenuItem>
                </Menu>
              </>
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography variant="body1">
                {" "}
                <Link href="#" underline="none" sx={{ color: "#fff" }}>
                  Welcome Muhammad !
                </Link>
              </Typography>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
