import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const CustomData = () => {
  const datas = useSelector((state) => {
    return state.mapCounter.house_data;
  });

  const [likeStatus, setLikeStatus] = useState(datas.map((x) => x.like));

  const card = (x, i) => {
    return (
      <div className="card" key={i}>
        <div className="data_img">
          <div className="like_count">
            <span />
            <span>254</span>
          </div>
        </div>
        <div className="data_type">
          {" "}
          {x.HSSPLY_ADRES.split(" ")[0].substr(0, 2)}{" "}
          {x.HSSPLY_ADRES.split(" ")[1]} | 국민
        </div>
        <div>
          <div className="left">
            <div className="data_name">{x.HOUSE_NM}</div>
            <div className="data_price">
              {" "}
              <img
                src={require(`../../assets/img/emoji_price.png`)}
                alt="img"
                style={{ width: "14px" }}
              />
              5억 2천-12억 8천
            </div>
          </div>
          <div className="right">
            <div
              className={likeStatus[i] ? "like on" : "like off"}
              onClick={() => {
                let temp = likeStatus;
                temp[i] = !temp[i];
                setLikeStatus([...temp]);
              }}
            />
          </div>
        </div>
        <div className="data_period">
          <img
            src={require(`../../assets/img/emoji_apt.png`)}
            alt="img"
            style={{ width: "16px" }}
          />
          {x.RCEPT_BGNDE.replace(/-/g, ".")} -{" "}
          {x.RCEPT_ENDDE.replace(/-/g, ".").substr(5)}
        </div>
      </div>
    );
  };

  return (
    <div className="dataContainer">
      <div className="line1">
        {datas
          .filter((_, i) => i % 2 === 0)
          .map((x, i) => {
            return card(x, i * 2);
          })}
      </div>
      <div className="line2">
        {datas
          .filter((_, i) => i % 2 === 1)
          .map((x, i) => {
            return card(x, i * 2 + 1);
          })}
      </div>
    </div>
  );
};

export default CustomData;
