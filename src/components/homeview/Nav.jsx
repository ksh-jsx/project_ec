import React, { useState } from "react";

const navs = [
  ["국민주택", "민영주택", "신혼부부"],
  ["접수 시작일", "접수 종료일", "신규 공고 순", "마감 임박 순"],
];

const Nav = ({ sequence, type }) => {
  const [isClick, setIsClick] = useState(new Array(navs[1].length).fill("off"));

  const nav = (data, type) => {
    const tags = data.map((x, i) => {
      return (
        <div key={i} className="tag type1">
          {x.indexOf("주택") !== -1 ? (
            <>
              <img
                src={require("../../assets/img/emoji_medal.png")}
                alt="img"
              />
              &nbsp;
              {x}&nbsp;
              <span>1분위</span>
            </>
          ) : (
            <>
              <img src={require("../../assets/img/emoji_ring.png")} alt="img" />
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
            let tmp_arr = new Array(navs[1].length).fill(0).map((x, n) => {
              if (n === i) return (x = "on");
              else return (x = "off");
            });
            setIsClick(tmp_arr);
          }}
          className={"tag type2 " + isClick[i]}
          style={{flexWrap:"no-wrap"}}
        >
          {x}
        </div>
      );
    });

    return (
      <div className="nav">
        {type === 1 ? <div style={{flexWrap:"wrap", height:"90px"}}>{tags}</div> : <div style={{flexWrap:"no-wrap"}}>{tags2}</div>}
      </div>
    );
  };

  return nav(navs[sequence], Number(type));
};

export default Nav;
