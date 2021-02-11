/** @format */

import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Detail from "./components/Detail"
import Home from "./components/Home";

function App() {
  return (
    
    <BrowserRouter>
      <Route path="/" exact render={(props) => <Home {...props} />} />
      <Route path="/song/:id" exact render={(props) => <Detail {...props} />} />
    </BrowserRouter>
  );
}

export default App;
