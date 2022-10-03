import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "../routes/Home";
import MapView from "../routes/MapView";
import SigninView from "../routes/SigninView";
import SignupView from "../routes/SignupView";
import SurveyView from "../routes/SurveyView";
import Footer from "./Footer";

import { useSelector } from "react-redux";

const AppRouter = () => {
  const authenticated = useSelector((state) => state.authenticated);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            exact
            path="/"
            element={authenticated ? <Home /> : <SigninView />}
          />
          {authenticated ? (
            <>
              <Route exact path="/map" element={<MapView />} />
              <Route exact path="/survey" element={<SurveyView />} />
            </>
          ) : (
            <Route exact path="/signup" element={<SignupView />} />
          )}
          {/*<Route exact path="/signin" element={<SigninView />} />*/}
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
