import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Article = ({ type }) => {
  const calculator = () => {
    const imgs = ["home", "castle", "building", "tent"];

    return (
      <div className="calculatorContainer">
        <div className="mainTitle">청약 가점 계산해드릴게요</div>
        <div className="subTitle">간편하게 내 자격을 확인해 보세요!</div>
        <div className="circles">
          {imgs.map((x, i) => {
            return (
              <div className="circle" key={i}>
                <img
                  src={require(`../../assets/img/emoji_${x}.png`)}
                  alt="img"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const chungyakInfo = () => {
    const imgs = [
      { src: "apt", text: "아파트" },
      { src: "officetel", text: "오피스텔 / 도시형 / 민간임대" },
      { src: "civilian", text: "민간사전청약" },
      { src: "public_support", text: "공공지원 민간임대" },
    ];

    return (
      <div className="chungyakInfoContainer">
        {imgs.map((x, i) => {
          return (
            <div className="infoOption" key={i}>
              <img
                src={require(`../../assets/img/emoji_${x.src}.png`)}
                alt="img"
              />
              <span>{x.text}</span>
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {}, []);

  return <>{type === "calculator" ? calculator() : chungyakInfo()}</>;
};

export default Article;
