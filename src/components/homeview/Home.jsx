import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Main = ({}) => {
  useEffect(() => {
    sessionStorage.setItem("tmp", "김성현");
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <div>메인임</div>
    </div>
  );
};

export default Main;
