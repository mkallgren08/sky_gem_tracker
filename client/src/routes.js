import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
//import App from "./App.js";
import history from './history.js';

// =======================
// PAGES
// =======================
import Main from "./pages/Main";
import Test from "./pages/Test"

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <Routes>
        <Route exact path={"/"} element={<Main/>} />
        <Route exact path={"/test"} element={<Test/>} />
      </Routes>
    </Router> 
  );
};