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

export const getHtml = async (data) => {
  try {
    const res = await axios.get(
      `/google/search?q=아이유&source=lmns&bih=970&biw=1920&hl=ko&sa=X&ved=2ahUKEwjS24DYhNj6AhVH8JQKHc4dDJQQ_AUoAHoECAEQAA`
    );
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
