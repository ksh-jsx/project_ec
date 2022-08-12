import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import Footer from "./Footer";
function App() {

  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(true);

  useEffect(() => {
    setInit(true);
  }, []);

  return (
    <>
      {init ? (
        <>
          <AppRouter
            userObj={userObj}
          />
          
        </>
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
