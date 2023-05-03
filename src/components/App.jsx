import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { useDispatch } from "react-redux";
import { SET_TOKEN } from "../stores/tokenSlice";

function App() {
  const dispatch = useDispatch();
  const [init, setInit] = useState(false);

  useEffect(() => {
    const session = JSON.parse(sessionStorage.getItem("user"));
    const local = JSON.parse(localStorage.getItem("user"));
    const obj = local ? local : session;

    if (obj) dispatch(SET_TOKEN(obj.data.accessToken));

    setInit(true);
  }, [dispatch]);

  return <>{init ? <AppRouter /> : "Initializing..."}</>;
}

export default App;
