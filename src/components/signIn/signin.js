import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import RedeemIcon from "@mui/icons-material/Redeem";
import InputLabel from "@mui/material/InputLabel";
import bgLogin from "../../images/bgLogin.PNG";
import { useNavigate } from "react-router-dom";
import { styles } from "./styles";
import "./signin.css";

const Signin = () => {
  const navigate = useNavigate();

  const paperStyle = {
    height: "100%",
    width: "100%",
    margin: "0 auto",
    boxShadow: "-11px 29px 42px -3px rgba(0,0,0,0.10)",
  };
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { username, password } = formData;

  const validation = () => {
    // const regex =
    //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const errorEmail = regex.test(username);

    if (username === "" && password === "") {
      setError(true);
      return setErrorMessage("All fields requireds");
    }
    // else if (!errorEmail) {
    //   setError(true);
    //   return setErrorMessage("Please enter valid email address");
    // }
    else if (password.length < 8) {
      setError(true);
      return setErrorMessage("Password must be atleast 8 characters");
    } else {
      return true;
    }
  };

  const HandleSubmit = async () => {
    let token = "Basic " + window.btoa(`${username}:${password}`);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", token);

    if (validation()) {
      fetch(
        `https://n4dmctglka.execute-api.us-east-2.amazonaws.com/api/login`,
        {
          method: "GET",
          headers: myHeaders,
        }
      )
        .then((response) => {
          if (!response.ok) {
            setErrorMessage("Failed to login.");
            setError(true);
            throw new Error(`HTTP error ${response.status}`);
          }
          return response.json();
        })
        .then((res) => {
          if (res.statusCode === 200) {
            setLoading(false);
            setIsLogin(true);
            setMessage("success");
            setError(false);
            navigate("/table");
            setTimeout(() => {
              setMessage("");
            }, 3000);
          }
        });
    }
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box sx={{ overflow: "hidden", backgroundColor: "#B1DFFB", p: 2 }}>
      {!isLogin && (
        <Paper style={paperStyle}>
          <Grid container spacing={0}>
            <Grid style={{ my: 8 }} item xs={12} sm={12} md={6} lg={4}>
              <Box
                sx={{
                  background: "#fff",
                  // height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: "10%",
                  borderRadius: " 10px 0 0 10px ",
                  padding: "2.5rem",
                }}
              >
                <Typography
                  variant="h4"
                  style={{ fontWeight: 800, margin: "2rem 0" }}
                >
                  Login.
                </Typography>
                <Box className="login-form" sx={styles}>
                  <Typography
                    sx={{
                      fontSize: styles.font.xlarge,
                    }}
                  >
                    Login with your data that you entered during your registration
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: styles.font.medium,
                    }}
                  >
                    
                  </Typography>
                  {error && (
                    <Alert severity="error" sx={{ my: 2 }}>
                      {errorMessage}
                    </Alert>
                  )}
                  {message === "success" && (
                    <Alert severity="success">successfully login</Alert>
                  )}
                  <Box component="form" sx={{ my: 4 }}>
                    <>
                      <InputLabel htmlFor="my-input">
                        Enter your email address
                      </InputLabel>
                      <TextField
                        id="outlined-required"
                        defaultValue=""
                        placeholder="username"
                        name="username"
                        onChange={handleInput}
                        type="text"
                      />
                    </>
                    <>
                      <InputLabel htmlFor="my-input">
                        Enter your password
                      </InputLabel>
                      <TextField
                        id="outlined-required"
                        defaultValue=""
                        placeholder="atleast 8 character"
                        name="password"
                        type="password"
                        onChange={handleInput}
                      />
                    </>
                    <Box sx={styles}>
                      <Button
                        variant="contained"
                        size="large"
                        fullWidth={true}
                        onClick={HandleSubmit}
                      >
                        login
                      </Button>
                      <Link href="#" className="forget-pass">
                        Forget password?
                      </Link>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="outlined"
                    style={{
                      borderRadius: "1.5rem",
                      color: "#3C76D2",
                      padding: " 0.4rem 1.5rem",
                    }}
                  >
                    Signup
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={8}>
              <Box
                sx={{
                  background: "#FAF6FD",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  paddingTop: "10%",
                  borderRadius: "0 10px 10px 0",
                }}
              >
                <Typography
                  variant="h5"
                  noWrap
                  component="div"
                  style={{ margin: "1rem 0" }}
                >
                  Nice to see you again
                </Typography>
                <Typography
                  variant="h3"
                  noWrap
                  component="div"
                  style={{
                    color: "#3C76D2",
                    fontWeight: 700,
                    marginBottom: "1rem",
                  }}
                >
                  Welcome back
                </Typography>
                {/* <Box sx={{ width: "70%", overflow: "hidden" }}>
                  <img src={bgLogin} alt={bgLogin} className="bg-img" />
                </Box> */}
              </Box>
            </Grid>
            {/* </Grid>*/}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default Signin;
