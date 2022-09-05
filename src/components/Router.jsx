import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import MapView from "../routes/MapView";
import SigninView from "../routes/SigninView";
import SignupView from "../routes/SignupView";
import SurveyView from "../routes/SurveyView";
import Footer from "./Footer";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/map" element={<MapView />} />
          <Route exact path="/signin" element={<SigninView />} />
          <Route exact path="/signup" element={<SignupView />} />
          <Route exact path="/survey" element={<SurveyView />} />
        </Routes>
      </div>
      {window.location.pathname === "/survey" ? <></> : <Footer />}
    </Router>
  );
};
export default AppRouter;
