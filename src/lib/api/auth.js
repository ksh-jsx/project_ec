import axios from "axios";

export const signup = async (data) => {
  try {
    const res = await axios.post(`http://127.0.0.1:8080/auth/signup`, {
      name: "kim", //data.name,
      email: data.email,
      password: data.pwd,
    });
    return res.status;
  } catch (err) {
    throw err;
  }
};

export const signin = async (id, pwd) => {
  try {
    const res = await axios.post(`http://127.0.0.1:8080/auth/login`, {
      email: id,
      password: pwd,
    });
    return res;
  } catch (err) {
    console.log("존재하지 않는 아이디");
    throw err;
  }
};

export const getIds = async (value) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8080/auth/validate?email=${value}`
    );
    return res.data.success;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const social = async (t) => {
  try {
    const res = await axios.post(
      `http://localhost:8080/oauth2/authorization/${t}`
    );
    window.location.href =
      "https://accounts.kakao.com/login?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fscope%3Dprofile_nickname%2520account_email%26response_type%3Dcode%26state%3DYMnmUS9kWtprQbmVw2uktwM6W2DvDamjfj9kdfgPOp4%253D%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A8080%252Flogin%252Foauth2%252Fcode%252Fkakao%26through_account%3Dtrue%26client_id%3D07d51c68d2546ddfb6946a15ece3f0fd";
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }

  /*
    try {
      const res = await axios.post(
        `http://localhost:8080/oauth2/authorization/${t}`
      );
      return res;
    } catch (err) {
      console.log(err);
      throw err;
    }

    try {
    const res = await axios({
      method:'post',
      url:`http://localhost:8080/oauth2/authorization/${t}`,
      
    });
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
  */
};
