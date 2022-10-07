import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const current_page = useSelector((state) => {
    return state.stateCounter.current_page;
  });
  return (
    <div className={current_page === "MAP" ? "header inMap" : "header"}>
      <div className="left">
        <div className="img_container home">
          {current_page === "HOME" ? (
            <img src={require("../assets/img/logo_home.png")} alt="img" />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="center">
        {current_page === "MAP" ? <span>청약 지도</span> : <></>}
      </div>
      <div className="right">
        <div className="img_container like">
          <img src={require("../assets/img/like_page.png")} alt="img" />
        </div>
        <div className="img_container alarm">
          <img src={require("../assets/img/alarm_off.png")} alt="img" />
        </div>
      </div>
    </div>
  );
};

export default Header;
