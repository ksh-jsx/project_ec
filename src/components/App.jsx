import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(true);

  useEffect(() => {
    const obj = JSON.parse(sessionStorage.getItem("user"));
    if (obj) dispatch({ type: "SET_TOKEN", token: obj.data.accessToken });

    setInit(true);
  }, []);

  return <>{init ? <AppRouter userObj={userObj} /> : "Initializing..."}</>;
}

export default App;
