import React from "react";

const TEMP_NAME = "아무무";

const titles = [
  {
    type: 1,
    text1: "반가워요,",
    text2: `${TEMP_NAME} 님!`,
    view_more: "circle",
    size: "24px",
  },
  {
    type: 1,
    text1: `${TEMP_NAME}님께 추천하는`,
    text2: `오늘의 맞춤 청약`,
    view_more: true,
    color: "#6297FF",
  },
  {
    type: 2,
    text1: `<strong>청약 정보</strong> 모두보기 `,
    emoji: "search",
    view_more: false,
  },
  {
    type: 2,
    text1: `청약 소식통 `,
    emoji: "speaker",
    view_more: true,
  },
];

const Title = ({ sequence }) => {
  const title = ({
    type,
    text1,
    text2,
    emoji,
    view_more,
    color = "#000000",
    size = "20px",
  }) => {
    return (
      <div className="title">
        <div className="left" style={{ fontSize: size }}>
          {type === 1 ? (
            <>
              <span>{text1}</span>
              <br />
              <span style={{ color: color, fontWeight: "bold" }}>{text2}</span>
            </>
          ) : (
            <>
              <span dangerouslySetInnerHTML={{ __html: text1 }} />
              <img
                className="imgInText1"
                src={require(`../../assets/img/emoji_${emoji}.png`)}
                alt="img"
              />
            </>
          )}
        </div>
        <div className="right">
          {view_more === true ? (
            <div className="viewMore">더보기 ▶</div>
          ) : view_more === "circle" ? (
            <div className="progressCircle">
              <img src={require("../../assets/img/persona.png")} alt="img" />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  return title(titles[sequence]);
};

export default Title;
