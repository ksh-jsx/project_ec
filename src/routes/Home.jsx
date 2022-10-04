import React, { useState, useEffect } from "react";
import Main from "../components/Main";
import { useDispatch } from "react-redux";
import { SET_STATE } from "../stores/stateSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(SET_STATE({ mode: "INIT_HOME", page: "HOME" }));
  }, []);

  return (
    <div className="container">
      {loading ? <Main /> : <div>loading...</div>}
    </div>
  );
};
export default Home;
