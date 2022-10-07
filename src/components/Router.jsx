import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomeView from "../routes/HomeView";
import MapView from "../routes/MapView";
import SigninView from "../routes/SigninView";
import SignupView from "../routes/SignupView";
import SurveyView from "../routes/SurveyView";
import Header from "./Header";
import Footer from "./Footer";

import { useSelector } from "react-redux";

const AppRouter = () => {
  const authenticated = useSelector((state) => {
    return state.tokenCounter.authenticated;
  });

  return (
    <Router>
      {!authenticated || window.location.pathname === "/survey" ? (
        <></>
      ) : (
        <Header />
      )}
      <div className="main">
        <Routes>
          {authenticated ? (
            <>
              <Route exact path="/" element={<HomeView />} />
              <Route exact path="/map" element={<MapView />} />
              <Route exact path="/survey" element={<SurveyView />} />
            </>
          ) : (
            <>
              <Route exact path="/" element={<SigninView />} />
              <Route exact path="/signup" element={<SignupView />} />
            </>
          )}
        </Routes>
      </div>
      {!authenticated || window.location.pathname === "/survey" ? (
        <></>
      ) : (
        <Footer />
      )}
    </Router>
  );
};
export default AppRouter;
