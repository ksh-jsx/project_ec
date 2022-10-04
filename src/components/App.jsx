import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { useDispatch } from "react-redux";
import { SET_TOKEN } from "../stores/tokenSlice";

function App() {
  const dispatch = useDispatch();
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(true);

  useEffect(() => {
    const obj = JSON.parse(sessionStorage.getItem("user"));

    if (obj) dispatch(SET_TOKEN(obj.data.accessToken));

    setInit(true);
  }, []);

  return <>{init ? <AppRouter userObj={userObj} /> : "Initializing..."}</>;
}

export default App;
