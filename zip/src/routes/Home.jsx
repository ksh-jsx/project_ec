import React, { useState, useEffect } from "react";
import Main from "../components/Main";

const Home = ({  }) => {
  
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    
    setLoading(true)
    
  }, []);
  

  return (
    <div className="container">
      {loading ? 
        <Main/> :
        <div>loading...</div>
      }
    </div>
  );
};
export default Home;