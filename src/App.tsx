/** @format */

import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/Home";

function App() {
  return (
    
    <BrowserRouter>
      <Route path="/" exact render={(props) => <Home {...props} />} />
    </BrowserRouter>
  );
}

export default App;
