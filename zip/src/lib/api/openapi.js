import axios from "axios";

const Address = "https://api.odcloud.kr/api";

export const getAPTLttotPblancDetail = async(data) => {
   try {     
      const res = await axios.get(`${Address}/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancDetail?page=1&perPage=100&serviceKey=${process.env.REACT_APP_OPEN_API_KEY}`)           
      return res.data.data;
   } catch (err) {
      console.log(err);
      throw err;
   }
};

export const getAPTLttotPblancMdl = async(data) => {
   try {     
      const res = await axios.get(`${Address}/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancMdl?page=1&perPage=100&serviceKey=${process.env.REACT_APP_OPEN_API_KEY}`)           
      return res.data.data;
   } catch (err) {
      console.log(err);
      throw err;
   }
}
