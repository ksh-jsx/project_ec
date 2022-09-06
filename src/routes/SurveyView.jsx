import React, { useState, useEffect } from "react";
import "../assets/css/surveyview.css";
import "slick-carousel/slick/slick.css";
import Survey from "../components/signview/Survey";
import Slider from "react-slick";
import { data } from "../lib/data/personalized_recommendation_data";

let tmp_percentage = 0;

function SurveyView() {
  const sliderSetting = {
    dots: false,
    infinite: false,

    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setGauge(current + 1),
    prevArrow: (
      <div>
        <img src={require("../assets/img/prev.png")} alt="" />
      </div>
    ),
    nextArrow: (
      <div>
        <img src={require("../assets/img/next.png")} alt="" />
      </div>
    ),
  };

  const [selectedValues, setSelectedValues] = useState({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
    q6: null,
  });
  const [gauge, setGauge] = useState(1);
  const [cooltime, setCooltime] = useState(false);

  const sleep = (ms) => {
    //sleep 함수
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const setProgressBar = async () => {
    setCooltime(true);
    const currentWidth = (gauge * 100) / 6;
    //console.log(tmp_percentage + " / " + currentWidth);
    if (tmp_percentage <= currentWidth) {
      for (let i = tmp_percentage; i < currentWidth; i++) {
        document.getElementsByClassName("innerProgressBar")[0].style.width =
          i + "%";
        await sleep(10);
      }
    } else {
      for (let i = tmp_percentage; i > currentWidth; i--) {
        document.getElementsByClassName("innerProgressBar")[0].style.width =
          i + "%";
        await sleep(10);
      }
    }
    tmp_percentage = currentWidth;
    await sleep(330);
    setCooltime(false);
  };

  useEffect(() => {
    setProgressBar();
    //console.log(gauge);
  }, [gauge]);

  return (
    <div className="SurveyViewWrapper">
      <div className="header">
        맞춤 추천을 위해, 간단한 질문에 답변해주세요 📝
      </div>
      <div className="progressBar">
        <div className="innerProgressBar" />
      </div>
      <Slider {...sliderSetting}>
        {data.map((data, i) => (
          <div className="content" key={"key" + i}>
            <Survey
              Q={data}
              input={data.input}
              i={i}
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SurveyView;
