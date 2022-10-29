import React, { useState, useEffect } from "react";
import Toast from "../Toast";
import { useNavigate } from "react-router";
import { getIds, signup } from "../../lib/api/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pwd: "",
    pwd_confrim: "",
  });
  const [pwdVisible, setPwdVisible] = useState({
    pwd_visible1: false,
    pwd_type1: "password",
    pwd_visible2: false,
    pwd_type2: "password",
  });
  const [invalids, setInvalids] = useState({
    name: null,
    nameErrorWord: "",
    email: null,
    emailErrorWord: "",
    pwd: null,
    pwdErrorWord: "",
    pwdSecurity: "",
    pwd_confrim: null,
    pwd_confrimErrorWord: "",
  });

  const [ToastStatus, setToastStatus] = useState(false);
  const [timer, setTimer] = useState(0);

  const onChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });

    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(async () => {
      try {
        await validation(prop, e.target.value);
      } catch (e) {
        console.error("error", e);
      }
    }, 300);

    setTimer(newTimer);
  };

  const validation = async (prop, value) => {
    const Eng = /[a-zA-Z]/;
    const Kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const Num = /[0-9]/;
    const Speical = /[~!@#$%^&*()_+|<>?:{}]/;
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
      if (Kor.test(value) || value.length < 6) {
        setInvalids({
          ...invalids,
          [prop]: true,
          emailErrorWord: "영문 대소문자 포함 6자 이상 입력해 주세요",
        });
      } else if (!(await getIds(value))) {
        setInvalids({
          ...invalids,
          [prop]: true,
          emailErrorWord: "이미 사용중인 아이디예요",
        });
      } else {
        setInvalids({ ...invalids, [prop]: false });
      }
    }
    if (prop === "pwd") {
      if (Kor.test(value) || value.length < 8) {
        setInvalids({
          ...invalids,
          [prop]: true,
          pwdErrorWord: "영문 대소문자 포함 8자 이상 입력해 주세요",
        });
      } else {
        setInvalids({ ...invalids });
        //보안 등급 설정
        if (Eng.test(value) && Num.test(value) && Speical.test(value)) {
          setInvalids({ ...invalids, [prop]: false, pwdSecurity: "high" });
        } else if (Eng.test(value) && Num.test(value)) {
          setInvalids({ ...invalids, [prop]: false, pwdSecurity: "mid" });
        } else if (Eng.test(value)) {
          setInvalids({ ...invalids, [prop]: false, pwdSecurity: "low" });
        }
      }
    }
    if (prop === "pwd_confrim") {
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
    setPwdVisible(() => {
      if (num === 1) {
        if (!pwdVisible.pwd_visible1) {
          return { ...pwdVisible, pwd_type1: "text", pwd_visible1: true };
        } else {
          return { ...pwdVisible, pwd_type1: "password", pwd_visible1: false };
        }
      } else {
        if (!pwdVisible.pwd_visible2) {
          return { ...pwdVisible, pwd_type2: "text", pwd_visible2: true };
        } else {
          return { ...pwdVisible, pwd_type2: "password", pwd_visible2: false };
        }
      }
    });
  };

  const validationComponents = (prop, suc, err) => {
    return invalids[prop] && values[prop] ? (
      <div className="validation" id="err">
        <span>{err}</span>
      </div>
    ) : values[prop] && suc ? (
      <div className="validation" id="suc">
        <span>{suc}</span>
      </div>
    ) : (
      <></>
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //console.log(invalids);
    if (
      invalids.name === false &&
      invalids.email === false &&
      invalids.pwd === false &&
      invalids.pwd_confrim === false
    ) {
      if (window.confirm("이대로 회원가입 하시겠습니까?")) {
        const res = await signup(values);
        //console.log(res);
        if (res === 201) {
          return navigate("/");
        }
      }
    } else {
      console.log("문제있음");
      setToastStatus(true);
    }
  };

  useEffect(() => {
    if (ToastStatus) {
      setTimeout(() => setToastStatus(false), 1000);
    }
  }, [ToastStatus]);

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
        {validationComponents("name", "", invalids.nameErrorWord)}
        <input
          type="text"
          name="email"
          value={values.email}
          onChange={onChange("email")}
          placeholder="아이디"
          autoComplete="off"
          maxLength={16}
        />
        {validationComponents(
          "email",
          "사용할 수 있는 아이디예요",
          invalids.emailErrorWord
        )}
        <div className="passwordForm">
          <input
            type={pwdVisible.pwd_type1}
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
                pwdVisible.pwd_visible1
                  ? require("../../assets/img/password_visibility_on.png")
                  : require("../../assets/img/password_visibility_off.png")
              }
              alt="visibility"
            />
          </div>
        </div>
        <div>
          {validationComponents(
            "pwd",
            "사용할 수 있는 비밀번호예요",
            invalids.pwdErrorWord
          )}
          {!invalids.pwd && values.pwd ? (
            <div className="securityGrade">
              {invalids.pwdSecurity === "high" ? (
                <>
                  <span id="high" />
                  <span id="high" />
                  <span id="high" />
                </>
              ) : invalids.pwdSecurity === "mid" ? (
                <>
                  <span id="gray" />
                  <span id="mid" />
                  <span id="mid" />
                </>
              ) : (
                <>
                  <span id="gray" />
                  <span id="gray" />
                  <span id="low" />
                </>
              )}

              <span id={invalids.pwdSecurity}>보안</span>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="passwordForm">
          <input
            type={pwdVisible.pwd_type2}
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
                pwdVisible.pwd_visible2
                  ? require("../../assets/img/password_visibility_on.png")
                  : require("../../assets/img/password_visibility_off.png")
              }
              alt="visibility"
            />
          </div>
        </div>
        {validationComponents(
          "pwd_confrim",
          "비밀번호가 일치합니다",
          invalids.pwd_confrimErrorWord
        )}
        <input type="submit" value="회원가입" style={{ marginTop: "50px" }} />
      </div>
    </form>
  );
};

export default Signup;
