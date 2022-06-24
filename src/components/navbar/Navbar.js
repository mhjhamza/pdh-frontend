import React, { useState, useCallback, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { NavLink } from "react-bootstrap";
import Swal from "sweetalert2";
import EmailCsv from "../../images/email.csv";
import { CleaningServices } from "@mui/icons-material";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [click, setClick] = React.useState(false);
  const [dropdown, setDropdown] = useState(false);
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
        setDropdown(false);
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
        setDropdown(false);
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

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  const clickDrop = () => setDropdown(!dropdown);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

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
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const styles = {
    "& .MuiToolbar-root": {
      padding: "1rem",
      minHeight: "90px !important",
    },
  };
  return (
    <Box sx={{ flexGrow: 1 }} onClick={() => Close()}>
      <AppBar position="static" sx={{ minHeight: "80px", p: 0 }}>
        <Container>
          <Toolbar sx={styles}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block", fontSize: "1.5rem" } }}
            >
              {/* <NavLink exact to="/"  > */}
              ParaDocs Health
              {/* </NavLink> */}
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Typography variant="body1" sx={{ mx: 2 }}>
                <a
                  class="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink"
                  onClick={clickDrop}
                  href="#"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Upload
                </a>
                <div
                  class={dropdown ? "dropdown-menu " : "dropMenu"}
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a
                    class="dropdown-item"
                    href="#"
                    onClick={() => handle("optum")}
                  >
                    Optum
                  </a>
                  <a
                    class="dropdown-item"
                    href="#"
                    onClick={() => handle("emr")}
                  >
                    EMR
                  </a>
                </div>
              </Typography>
              <Typography variant="body1">
                {" "}
                <NavLink
                  exact
                  activeClassName="active"
                  className="nav-links"
                  onClick={click ? handleClick : null}
                >
                  Welcome Muhammad !
                </NavLink>
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
      {renderMenu}
    </Box>
  );
}
