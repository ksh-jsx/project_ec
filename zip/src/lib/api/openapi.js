import axios from "axios";

const Address = "http://api.odcloud.kr/api";

export const getData_apt = async (data) => {
  try {     
     const res = await axios.get(`${Address}/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancDetail?page=1&perPage=10&serviceKey=${process.env.REACT_APP_OPEN_API_KEY}`)         
     return res.data.data;
  } catch (err) {
     console.log(err);
     throw err;
  }
};
