import React, { useState, useEffect } from "react";
import "../assets/css/home.css";
import Home from "../components/homeview/Home";
import { useDispatch } from "react-redux";
import { SET_STATE } from "../stores/stateSlice";

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

const navs = [
  ["국민주택", "민영주택", "신혼부부"],
  ["접수 시작일", "접수 종료일", "신규 공고 순"],
];

const HomeView = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isClick, setIsClick] = useState(new Array(3).fill("off"));

  useEffect(() => {
    setLoading(true);
    dispatch(SET_STATE({ mode: "INIT_HOME", page: "HOME" }));
  }, []);

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
                src={require(`../assets/img/emoji_${emoji}.png`)}
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
              <img src={require("../assets/img/persona.png")} alt="img" />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  const nav = (data, type) => {
    const tags = data.map((x, i) => {
      return (
        <div key={i} className="tag type1">
          {x.indexOf("주택") !== -1 ? (
            <>
              <img src={require("../assets/img/emoji_medal.png")} alt="img" />
              &nbsp;
              {x}&nbsp;
              <span>1분위</span>
            </>
          ) : (
            <>
              <img src={require("../assets/img/emoji_ring.png")} alt="img" />
              &nbsp;
              {x}&nbsp;
            </>
          )}
        </div>
      );
    });

    const tags2 = data.map((x, i) => {
      return (
        <div
          key={i}
          onClick={() => {
            let tmp_arr = new Array(3).fill(0).map((x, n) => {
              if (n === i) return (x = "on");
              else return (x = "off");
            });
            console.log(tmp_arr);
            setIsClick(tmp_arr);
          }}
          className={"tag type2 " + isClick[i]}
        >
          {x}
        </div>
      );
    });

    return (
      <div className="nav">
        <div>{type === 1 ? tags : tags2}</div>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <div className="homeViewWrapper">
          {title(titles[0])}
          <br />
          {nav(navs[0], 1)}
          {title(titles[1])}
          {nav(navs[1], 2)}
          {title(titles[2])}
          {title(titles[3])}
        </div>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};
export default HomeView;
