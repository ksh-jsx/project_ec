import { useEffect, useRef } from "react";
import "../assets/css/surveyresultview.css";
import Card from "../components/surveyresultview/Card";

const TEMP_NAME = "홍길동동";
const TEMP_TAG = "3";
const colorList = ["#FFECAB", "#E6CDFF", "#ADE9BA"];

const SurveyResultView = () => {
  const tmpData = ["민영주택", "국민주택", "하이용"];

  return (
    <div className="SurveyResultViewWrapper">
      <div className="title">
        {TEMP_NAME}님,
        <br /> zip과 함께 할 준비가 됐어요!
      </div>
      <div className="article">
        <div className="tagText">
          {TEMP_NAME}님이 획득한
          <br /> <span>{TEMP_TAG}개</span>의 태그입니다{" "}
          <img src={require("../assets/img/emoji_tag.png")} />
        </div>
        <div className="cardContainer">
          {tmpData.map((text, i) => (
            <Card key={i} text={text} color={colorList[i]} />
          ))}
        </div>
        <div className="submit">
          <button>.zip 시작하기</button>
        </div>
      </div>
    </div>
  );
};

export default SurveyResultView;
