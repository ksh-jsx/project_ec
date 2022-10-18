import React, { useState, useEffect } from "react";
import $ from "jquery";

const Article = ({ type, progress }) => {
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

  const fill_recommend = () => {
    return (
      <div className="fillRecommendContainer">
        <div className="left">
          <div>
            <span>추가 정보</span>를 입력하고
          </div>
          <div>
            더 <span>자세한 맞춤 정보</span>를 받아보세요
            <img src={require("../../assets/img/emoji_gift.png")} alt="img" />
          </div>
        </div>
        <div className="right">
          <div className="waveBox">
            <div>{progress}%</div>
            <span class="wave"></span>
          </div>
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

  const sleep = (ms) => {
    //sleep 함수
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const fillAnimation = async (fill) => {
    if (fill >= 80) fill -= 13;
    else if (fill >= 70) fill -= 8;
    else if (fill >= 60) fill -= 5;
    for (let i = 108; i >= 150 - fill - (100 - fill) / 2 + 3; i--) {
      $(".wave").css("bottom", `-${i}px`);
      await sleep(20);
    }
  };

  useEffect(() => {
    if (progress) fillAnimation(progress);
  }, []);

  return (
    <>
      {type === "calculator"
        ? calculator()
        : type === "chungyakInfo"
        ? chungyakInfo()
        : fill_recommend()}
    </>
  );
};

export default Article;
