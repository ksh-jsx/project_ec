import axios from "axios";

const Address = "/OpenAPI_ToolInstallPackage/service/rest/ApplyhomeInfoSvc";

export const getData_apt = async (data) => {
  try {
     console.log(data.startmonth+' ~ '+data.endmonth)
     const res = await axios.get(`${Address}/getLttotPblancList?serviceKey=${process.env.REACT_APP_OPEN_API_KEY}&startmonth=${data.startmonth}&endmonth=${data.endmonth}`)    
     return res.data.response;
  } catch (err) {
     console.log(err);
     throw err;
  }
};

export const getDetailData_apt = async (data) => {
   try {
      const res = await axios.get(`${Address}/getAPTLttotPblancDetail?serviceKey=${process.env.REACT_APP_OPEN_API_KEY}&houseManageNo=${data}&pblancNo=${data}`);            
      return res.data.response.body.items.item;
   } catch (err) {
      console.log(err);
      throw err;
   }
 };