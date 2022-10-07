import React, { useState, useEffect } from "react";
import "../assets/css/home.css";
import Home from "../components/homeview/Home";
import { useDispatch } from "react-redux";
import { SET_STATE } from "../stores/stateSlice";

const HomeView = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(SET_STATE({ mode: "INIT_HOME", page: "HOME" }));
  }, []);

  return (
    <div className="mapViewWrapper">
      {loading ? (
        <div>
          <Home />
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};
export default HomeView;
