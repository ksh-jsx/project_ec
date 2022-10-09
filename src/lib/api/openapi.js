import axios from "axios";

const Address = "https://api.odcloud.kr/api";

const today = new Date();
const year = today.getFullYear() * 1;
const month = ("0" + (today.getMonth() + 1)).slice(-2) * 1;
const day = ("0" + today.getDate()).slice(-2) * 1;

export const getAPTLttotPblancDetail = async () => {
  try {
    const res = await axios.get(
      `${Address}/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancDetail?page=1&perPage=1000&cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=2022-07-01&serviceKey=${process.env.REACT_APP_OPEN_API_KEY}`
    );
    var new_res = res.data.data.filter(
      (x) =>
        x.RCEPT_ENDDE.split("-")[0] * 1 >= year &&
        x.RCEPT_ENDDE.split("-")[1] * 1 >= month &&
        x.RCEPT_ENDDE.split("-")[2] * 1 >= day
    );
    new_res = new_res.sort((a, b) => {
      const y1 = a.RCEPT_ENDDE.split("-")[0] * 1;
      const y2 = b.RCEPT_ENDDE.split("-")[0] * 1;
      const m1 = a.RCEPT_ENDDE.split("-")[1] * 1;
      const m2 = b.RCEPT_ENDDE.split("-")[1] * 1;
      const d1 = a.RCEPT_ENDDE.split("-")[2] * 1;
      const d2 = b.RCEPT_ENDDE.split("-")[2] * 1;

      if (y1 < y2) return -1;
      if (y1 > y2) return 1;
      if (m1 < m2) return -1;
      if (m1 > m2) return 1;
      if (d1 < d2) return -1;
      if (d1 > d2) return 1;
      return 0;
    });
    new_res = new_res.map((x) => (x = { ...x, like: false }));
    //console.log(new_res);
    return new_res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAPTLttotPblancMdl = async (data) => {
  try {
    const res = await axios.get(
      `${Address}/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancMdl?page=1&perPage=100&serviceKey=${process.env.REACT_APP_OPEN_API_KEY}`
    );
    return res.data.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

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
