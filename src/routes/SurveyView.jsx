import React, { useState } from "react";
import "../assets/css/surveyview.css";
import "slick-carousel/slick/slick.css";
import SurveyBtns from "../components/surveyview/SurveyBtns";
import SurveyHeader from "../components/surveyview/SurveyHeader";
import Slider from "react-slick";

const NAME = "홍길동";

const data = [
  `<span>성인</span>이거나,<br/> 자녀 양육, 또는 형제자매를 부양하는<br/><span>세대주인 미성년자</span> 입니까?`,
  `현재 ${NAME}님이<br/><span>거주하고 있는 주소</span>를 알려주세요.`,
  `현재<br/><span>청약 통장을 보유</span>하고 계신가요?`,
  `청약 통장을 <span>만든 후 기간</span>이<br/>얼마나 지나셨나요?`,
  `현재 청약 통장에<br/><span>납입하고 있는 금액</span>이 얼마인지<br/>입력해 주세요.`,
  `예치금 <span>납입 횟수</span>를<br/>선택해주세요.`,
  `<span>혼인 여부</span>를 선택해주세요`,
];

function SurveyView() {
  const [selectedValues, setSelectedValues] = useState({
    q1: null,
    q2: null,
    q3: null,
    q4: null,
    q5: null,
    q6: null,
    q7: null,
  });
  const [gauge, setGauge] = useState(1);

  const sliderSetting = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setGauge(current + 1),
    prevArrow: (
      <div>
        <img src={require("../assets/img/prev.png")} alt="prev" />
      </div>
    ),
    nextArrow: (
      <div>
        <img src={require("../assets/img/next.png")} alt="next" />
      </div>
    ),
  };

  return (
    <div className="SurveyViewWrapper">
      <SurveyHeader gauge={gauge} />
      <Slider {...sliderSetting}>
        {data.map((data, i) => (
          <div className="content" key={"key" + i}>
            <SurveyBtns
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
