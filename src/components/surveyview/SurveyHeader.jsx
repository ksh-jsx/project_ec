import React, { useEffect } from "react";

let tmp_percentage = 0;

const SurveyHeader = ({ gauge }) => {
  const sleep = (ms) => {
    //sleep 함수
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const setProgressBar = async () => {
    const currentWidth = (gauge * 100) / 7;
    //console.log(tmp_percentage + " / " + currentWidth);
    if (tmp_percentage <= currentWidth) {
      for (let i = tmp_percentage; i < currentWidth; i++) {
        document.getElementsByClassName("innerProgressBar")[0].style.width = i + "%";
        await sleep(10);
      }
    } else {
      for (let i = tmp_percentage; i > currentWidth; i--) {
        document.getElementsByClassName("innerProgressBar")[0].style.width = i + "%";
        await sleep(10);
      }
    }
    tmp_percentage = currentWidth;
    await sleep(330);
  };

  useEffect(() => {
    setProgressBar();
  }, [gauge]);
  return (
    <>
      <div className="header">
        <span>
          맞춤 추천을 위해, 간단한 질문에 답변해주세요&nbsp;
          <img src={require("../../assets/img/surveyPencil.png")} alt="pencil" />
        </span>
      </div>
      <div className="progressBar">
        <div className="innerProgressBar" />
      </div>
    </>
  );
};

export default SurveyHeader;
