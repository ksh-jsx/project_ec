import React, { useState, useEffect } from "react";
import Toast from "../Toast";

const IDLIST = ["aaa", "sss", "shkim787"];

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    pwd: "",
    pwd_confrim: "",
  });
  const [pwdVible, setPwdVible] = useState({
    pwd_visible1: false,
    pwd_type1: "password",
    pwd_visible2: false,
    pwd_type3: "password",
  });
  const [invalids, setInvalids] = useState({
    name: null,
    nameErrorWord: "",
    email: null,
    emailErrorWord: "",
    pwd: null,
    pwdErrorWord: "",
    pwd_confrim: null,
    pwd_confrimErrorWord: "",
  });

  const [ToastStatus, setToastStatus] = useState(false);

  useEffect(() => {
    if (ToastStatus) {
      setTimeout(() => setToastStatus(false), 800);
    }
  }, [ToastStatus]);

  let timer;
  const onChange = (prop) => (e) => {
    /*
    if (prop !== "name")
      e.target.value = e.target.value.replace(/[^A-Za-z0-9]/gi, "");
    else e.target.value = e.target.value.replace(/[^ㄱ-ㅎ가-힣]/gi, "");*/
    setValues({ ...values, [prop]: e.target.value });
    clearTimeout(timer);
    timer = setTimeout(() => {
      validation(prop, e.target.value);
    }, 500);
  };

  const validation = (prop, value) => {
    const Eng = /[a-zA-Z]/;
    const Kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const Num = /[0-9]/;
    if (prop === "name") {
      if (Eng.test(value) || Num.test(value)) {
        setInvalids({
          ...invalids,
          [prop]: true,
          nameErrorWord: "한글만 입력해주세요",
        });
      } else {
        setInvalids({ ...invalids, [prop]: false });
      }
    }
    if (prop === "email") {
      if (Kor.test(value)) {
        setInvalids({
          ...invalids,
          [prop]: true,
          emailErrorWord: "영어만 입력해주세요",
        });
      } else if (IDLIST.indexOf(value) !== -1) {
        setInvalids({
          ...invalids,
          [prop]: true,
          emailErrorWord: "이미 사용중인 아이디예요",
        });
      } else if (value.length < 4) {
        setInvalids({
          ...invalids,
          [prop]: true,
          emailErrorWord: "영문 대소문자 포함 4자 이상 입력해 주세요",
        });
      } else {
        setInvalids({ ...invalids, [prop]: false });
      }
    }
    if (prop === "pwd") {
      if (Kor.test(value)) {
        setInvalids({
          ...invalids,
          [prop]: true,
          pwdErrorWord: "영어만 입력해주세요",
        });
      } else if (value.length < 8) {
        setInvalids({
          ...invalids,
          [prop]: true,
          pwdErrorWord: "영문 대소문자 포함 8자 이상 입력해 주세요",
        });
      } else {
        setInvalids({ ...invalids, [prop]: false });
      }
    }
    if (prop === "pwd_confrim") {
      console.log(values.pwd);
      console.log(values.pwd_confrim);
      if (Kor.test(value)) {
        setInvalids({
          ...invalids,
          [prop]: true,
          pwdErrorWord: "영어만 입력해주세요",
        });
      } else if (values.pwd !== value) {
        setInvalids({
          ...invalids,
          [prop]: true,
          pwd_confrimErrorWord: "비밀번호가 일치하지 않습니다",
        });
      } else {
        setInvalids({ ...invalids, [prop]: false });
      }
    }
  };

  const handlePasswordType = (num) => {
    setPwdVible(() => {
      if (num === 1) {
        if (!pwdVible.pwd_visible1) {
          return { ...pwdVible, pwd_type1: "text", pwd_visible1: true };
        } else {
          return { ...pwdVible, pwd_type1: "password", pwd_visible1: false };
        }
      } else {
        if (!pwdVible.pwd_visible2) {
          return { ...pwdVible, pwd_type2: "text", pwd_visible2: true };
        } else {
          return { ...pwdVible, pwd_type2: "password", pwd_visible2: false };
        }
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      invalids.email === false &&
      invalids.pwd === false &&
      invalids.pwd_confrim === false
    ) {
      if (window.confirm("이대로 회원가입 하시겠습니까?"))
        console.log("문제없음");
      //signup(values)
    } else {
      setToastStatus(true);
    }
  };

  return (
    <form onSubmit={onSubmit} className="signupForm">
      {ToastStatus && <Toast msg="양식을 모두 알맞게 채워주세요" />}
      <div>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={onChange("name")}
          placeholder="이름"
          autoComplete="off"
          minLength={2}
          maxLength={8}
        />
        {invalids.name ? (
          <div className="validation" id="err">
            <span>{invalids.nameErrorWord}</span>
          </div>
        ) : (
          <></>
        )}
        <input
          type="text"
          name="email"
          value={values.email}
          onChange={onChange("email")}
          placeholder="아이디"
          autoComplete="off"
          maxLength={16}
        />
        {invalids.email && values.email ? (
          <div className="validation" id="err">
            <span>{invalids.emailErrorWord}</span>
          </div>
        ) : values.email ? (
          <div className="validation" id="suc">
            <span>사용할 수 있는 아이디예요</span>
          </div>
        ) : (
          <></>
        )}
        <div className="passwordForm">
          <input
            type={pwdVible.pwd_type1}
            name="pwd"
            className="pwd1"
            value={values.pwd}
            onChange={onChange("pwd")}
            placeholder="비밀번호"
          />

          <div
            onClick={() => handlePasswordType(1)}
            className="passwordVisibiliyBtn"
          >
            <img
              src={
                pwdVible.pwd_visible1
                  ? require("../../assets/img/password_visibility_on.png")
                  : require("../../assets/img/password_visibility_off.png")
              }
              alt="visibility"
            />
          </div>
        </div>
        {invalids.pwd && values.pwd ? (
          <div className="validation" id="err">
            <span>{invalids.pwdErrorWord}</span>
          </div>
        ) : values.pwd ? (
          <div className="validation" id="suc">
            <span>사용할 수 있는 비밀번호예요</span>
          </div>
        ) : (
          <></>
        )}
        <div className="passwordForm">
          <input
            type={pwdVible.pwd_type2}
            name="pwd_confirm"
            className="pwd2"
            value={values.pwd_confrim}
            onChange={onChange("pwd_confrim")}
            placeholder="비밀번호 확인"
          />
          <div
            onClick={() => handlePasswordType(2)}
            className="passwordVisibiliyBtn"
          >
            <img
              src={
                pwdVible.pwd_visible2
                  ? require("../../assets/img/password_visibility_on.png")
                  : require("../../assets/img/password_visibility_off.png")
              }
              alt="visibility"
            />
          </div>
        </div>
        {invalids.pwd_confrim && values.pwd_confrim ? (
          <div className="validation" id="err">
            <span>{invalids.pwd_confrimErrorWord}</span>
          </div>
        ) : values.pwd_confrim ? (
          <div className="validation" id="suc">
            <span>비밀번호가 일치합니다</span>
          </div>
        ) : (
          <></>
        )}
        <input type="submit" value="회원가입" style={{ marginTop: "50px" }} />
      </div>
    </form>
  );
};

export default Signup;
