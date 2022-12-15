import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import DaumPostcode from "react-daum-postcode";

const Survey = ({ Q, i, selectedValues, setSelectedValues }) => {
  const [openPostcode, setOpenPostcode] = useState(false);
  const [address, setAddress] = useState("도로명 주소 검색하기");
  const [isClicked, setIsClicked] = useState({
    q1: Array(2).fill(false),
    q2: Array(1).fill(false),
    q3: Array(2).fill(false),
    q4: Array(4).fill(false),
    q5: Array(1).fill(false),
    q6: Array(4).fill(false),
    q7: Array(2).fill(false),
  });

  const checkInvalid = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    e.target.value = Number(val).toLocaleString("ko-KR") + "원";
  };

  const onChange = (prop, i) => (e) => {
    if (prop === "q5") {
      checkInvalid(e);
    }
    setSelectedValues({
      ...selectedValues,
      [prop]: e.target.value.replace(/[, 원]/gi, ""),
    });

    let tmpArr = Array(isClicked[prop].length).fill(false);
    tmpArr[i] = true;

    setIsClicked({ ...isClicked, [prop]: tmpArr });
    //console.log(selectedValues);
  };

  const adressHandle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((prev) => !prev);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      setOpenPostcode(false);
      setAddress(data.address);
      setSelectedValues({
        ...selectedValues,
        q2: data.address,
      });
    },
  };

  const setArticle = () => {
    switch (i) {
      case 0:
        return (
          <>
            <button
              className={isClicked.q1[0] ? "on" : ""}
              onClick={onChange("q1", 0)}
              value="true"
            >
              예
            </button>
            <button
              className={isClicked.q1[1] ? "on" : ""}
              onClick={onChange("q1", 1)}
              value="false"
            >
              아니오
            </button>
          </>
        );
      case 1:
        return (
          <>
            <div
              onClick={adressHandle.clickButton}
              className={openPostcode ? "display_off" : "display_on"}
            >
              <SearchIcon />
              <span>{address}</span>
            </div>
            {openPostcode && (
              <DaumPostcode
                onComplete={adressHandle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
                autoClose={true} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
              />
            )}
          </>
        );
      case 2:
        return (
          <>
            <button
              className={isClicked.q3[0] ? "on" : ""}
              onClick={onChange("q3", 0)}
              value="true"
            >
              예
            </button>
            <button
              className={isClicked.q3[1] ? "on" : ""}
              onClick={onChange("q3", 1)}
              value="false"
            >
              아니오
            </button>
          </>
        );
      case 3:
        return (
          <>
            <button
              className={isClicked.q4[0] ? "on" : ""}
              onClick={onChange("q4", 0)}
              value="1개월"
            >
              1개월
            </button>
            <button
              className={isClicked.q4[1] ? "on" : ""}
              onClick={onChange("q4", 1)}
              value="6개월"
            >
              6개월
            </button>
            <button
              className={isClicked.q4[2] ? "on" : ""}
              onClick={onChange("q4", 2)}
              value="12개월"
            >
              12개월
            </button>
            <button
              className={isClicked.q4[3] ? "on" : ""}
              onClick={onChange("q4", 3)}
              value="24개월 초과"
            >
              24개월 초과
            </button>
          </>
        );
      case 4:
        return (
          <>
            <input
              onChange={onChange("q5", 0)}
              onClick={(e) => {
                setSelectedValues({
                  ...selectedValues,
                  q5: "",
                });
                e.target.value = "";
              }}
              placeholder="금액을 입력해 주세요."
              maxLength={13}
            />
          </>
        );
      case 5:
        return (
          <>
            <button
              className={isClicked.q6[0] ? "on" : ""}
              onClick={onChange("q6", 0)}
              value="1회 이상"
            >
              1회 이상
            </button>
            <button
              className={isClicked.q6[1] ? "on" : ""}
              onClick={onChange("q6", 1)}
              value="6회 이상"
            >
              6회 이상
            </button>
            <button
              className={isClicked.q6[2] ? "on" : ""}
              onClick={onChange("q6", 2)}
              value="12회 이상"
            >
              12회 이상
            </button>
            <button
              className={isClicked.q6[3] ? "on" : ""}
              onClick={onChange("q6", 3)}
              value="24회 이상"
            >
              24회 이상
            </button>
          </>
        );
      case 6:
        return (
          <>
            <button
              className={isClicked.q7[0] ? "on" : ""}
              onClick={onChange("q7", 0)}
              value="true"
            >
              예
            </button>
            <button
              className={isClicked.q7[1] ? "on" : ""}
              onClick={onChange("q7", 1)}
              value="false"
            >
              아니오
            </button>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <div className="title" dangerouslySetInnerHTML={{ __html: Q }} />
      <div className="article">{setArticle()}</div>
      {i === 6 ? (
        <div className="submit">
          <button
            onClick={() =>
              alert(`
          1: ${selectedValues.q1}
          2: ${selectedValues.q2}
          3: ${selectedValues.q3}
          4: ${selectedValues.q4}
          5: ${selectedValues.q5}
          6: ${selectedValues.q6}
          7: ${selectedValues.q6}
          `)
            }
          >
            제출하기
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Survey;
