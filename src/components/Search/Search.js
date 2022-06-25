import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#8905ff",
  color: "#fff",
  marginLeft: 0,
  padding: "0.1rem",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(1),
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
  color: "#fff",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
  },
}));

export default function SearchAppBar({ handleSearch, handleSearchInput }) {
  const keyPress = (e) => {
    const value = Number(e.target.value);
    if (e.keyCode == 13) {
      handleSearch(value);
    }
  };
  const styles = {
    "&.MuiInputBase-input": {
      cursor: "pointer",
    },
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon sx={styles} />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Keyword Search (Filter Records via API)"
          inputProps={{ "aria-label": "search" }}
          name="search"
          type="number"
          onChange={handleSearchInput}
          onKeyDown={keyPress}
        />
      </Search>
    </Box>
  );
}
