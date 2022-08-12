import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import MapView from "../routes/MapView";
import LoginView from "../routes/LoginView";
import Footer from "./Footer";

const AppRouter = () => {

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/map" element={<MapView/>}/>
          <Route exact path="/login" element={<LoginView/>}/>
        </Routes>
      </div>
      <Footer/>
  </Router>
  );
};
export default AppRouter;