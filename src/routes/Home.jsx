import React, { useState, useEffect } from "react";
import Main from "../components/Main";
import { useDispatch } from 'react-redux';

const Home = ({  }) => {

  const dispatch = useDispatch();  
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    
    setLoading(true)
    dispatch({type:'HOME'})
    
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