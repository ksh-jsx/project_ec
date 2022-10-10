/*global kakao*/
import React, { useState, useEffect } from "react";
import Toast from "../Toast";
import { useDispatch, useSelector } from "react-redux";
import { CLICK_HOUSE_DATA } from "../../stores/mapSlice";

function BasicCard({ data, i }) {
  const [likeStatus, setLikeStatus] = useState(data.like);
  const [ToastStatus, setToastStatus] = useState(false);

  const dispatch = useDispatch();
  const mapSlice = useSelector((state) => {
    return state.mapCounter;
  });

  const select = (i) => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(
      mapSlice.searched_data[i].HSSPLY_ADRES,
      function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(
            result[0].y - 0.001,
            result[0].x
          );

          mapSlice.kakaoMap.setLevel(3);
          setTimeout(() => mapSlice.kakaoMap.panTo(coords), 100);
        } else {
          setToastStatus(true);
        }
      }
    );
    dispatch(CLICK_HOUSE_DATA(data.HOUSE_MANAGE_NO));
  };

  const onClickLike = () => {};

  useEffect(() => {
    if (ToastStatus) {
      setTimeout(() => setToastStatus(false), 1000);
    }
  }, [ToastStatus]);

  return (
    <div onClick={() => select(i)}>
      {ToastStatus && <Toast msg="등록된 위치 없음" />}
      <div className="cardInner">
        <div className="cardLeft">
          <div className="apt_place">
            {data.HOUSE_SECD_NM}&nbsp;|&nbsp;
            {data.HSSPLY_ADRES.split(" ")[0].substr(0, 2)}{" "}
            {data.HSSPLY_ADRES.split(" ")[1]}
          </div>
          <div className="apt_name">
            <img src={require(`../../assets/img/emoji_apt.png`)} alt="img" />
            <div className="HOUSE_NM">{data.HOUSE_NM}</div>
          </div>
          <div className="apt_period">
            <div>
              <img src={require(`../../assets/img/date.png`)} alt="img" />
              기간&nbsp;&nbsp;|&nbsp;&nbsp;
              {data.RCEPT_BGNDE.replace(/-/g, ".").substr(2)} -{" "}
              {data.RCEPT_ENDDE.replace(/-/g, ".").substr(2)}
            </div>
            <div>
              <img src={require(`../../assets/img/inform.png`)} alt="img" />
              발표&nbsp;&nbsp;|&nbsp;&nbsp;
              {data.PRZWNER_PRESNATN_DE.replace(/-/g, ".").substr(2)}
            </div>
          </div>
        </div>
        <div className="cardRight">
          <div className="likeContainer">
            <div className="like_count">
              <span />
              <span>254</span>
            </div>
            <div
              className={likeStatus ? "like on" : "like off"}
              onClick={(e) => {
                e.stopPropagation();
                setLikeStatus((prev) => !prev);
              }}
            />
          </div>
          <div className="apt_img" />
        </div>
      </div>
    </div>
  );
}
export default BasicCard;
