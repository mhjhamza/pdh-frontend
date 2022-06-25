import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar, MainTables, Login } from "./components";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/table"
            element={
              <>
                <Navbar /> <MainTables />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
