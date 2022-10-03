import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { signin } from "../../lib/api/openapi";
import { Link } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "id") {
      setId(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    let res;
    event.preventDefault();
    try {
      res = await signin(id, password);

      if (res.status === 200) {
        dispatch({ type: "SET_TOKEN", token: res.data.accessToken });
        return navigate("/");
      }
    } catch (e) {
      alert("존재하지 않는 아이디 입니다.");
    } finally {
      if (autoLogin) sessionStorage.setItem("user", JSON.stringify(res));
    }
  };

  return (
    <form onSubmit={onSubmit} className="signinForm">
      <div>
        <input
          name="id"
          type="id"
          placeholder="아이디"
          required
          value={id}
          onChange={onChange}
          autoComplete="off"
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          value={password}
          onChange={onChange}
        />
      </div>
      <div className="radioContainer">
        <label htmlFor="radioForAutoSignin">자동으로 로그인하기</label>
        <input
          type="radio"
          id="radioForAutoSignin"
          name="rr"
          className="signinRadio"
          onClick={() => setAutoLogin((prev) => !prev)}
        />
      </div>
      <input type="submit" value="로그인" className="SigninBtn" />
      <Link to="/signup">
        <input type="button" value="회원가입 하기" className="SigninBtn" />
      </Link>
    </form>
  );
};
export default Signin;
