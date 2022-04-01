import React, { useState } from "react";
import { HashRouter as Router, Route,Routes  } from "react-router-dom";
import Home from "../routes/Home";
import MapView from "../routes/MapView";


const AppRouter = () => {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/view" element={<MapView/>}/>
      </Routes>
  </Router>
  );
};
export default AppRouter;