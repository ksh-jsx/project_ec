import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  const current_page = useSelector((state) => {
    return state.stateCounter.current_page;
  });
  return (
    <div className="footer">
      <Link to="/">
        <img
          src={
            current_page === "HOME"
              ? require("../assets/img/home_on.png")
              : require("../assets/img/home.png")
          }
          alt="img"
        />
      </Link>
      <Link to="/map">
        <img
          src={
            current_page === "MAP"
              ? require("../assets/img/map_on.png")
              : require("../assets/img/map.png")
          }
          alt="img"
        />
      </Link>
      <Link to="/">
        <img src={require("../assets/img/mypage.png")} alt="img" />
      </Link>
    </div>
  );
};

export default Footer;
