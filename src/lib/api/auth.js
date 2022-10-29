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

export const social = async (code) => {
  console.log(code)
  console.log(`http://127.0.0.1:8080/oauth2/login/kakao?code=${code}`)
  try {
    const res = await axios.get(`http://127.0.0.1:8080/oauth2/login/kakao?code=${code}`);
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
