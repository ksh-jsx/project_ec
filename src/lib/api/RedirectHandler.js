import React, { useEffect } from "react";

const RedirectHandler = () => {
  useEffect(() => {
    let code = null;
    const type = window.location.pathname.split("/")[3];
    if (type === "kakao") {
      let params = new URL(document.location.toString()).searchParams;
      code = params.get("code"); // 인가코드 받는 부분
    } else if (type === "naver") {
      code = window.location.hash.split("=")[1].split("&")[0];
    }
    console.log(code);
  }, []);

  return <></>;
};

export default RedirectHandler;
