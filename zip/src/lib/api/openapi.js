import { Alert } from "@mui/material";
import axios from "axios";

const Address = "https://api.odcloud.kr/api";

const today = new Date();
const year = today.getFullYear()*1;
const month = ('0' + (today.getMonth() + 1)).slice(-2)*1;
const day = ('0' + today.getDate()).slice(-2)*1;

export const getAPTLttotPblancDetail = async(data) => {
   try {     
      const res = await axios.get(`${Address}/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancDetail?page=1&perPage=1000&cond%5BRCRIT_PBLANC_DE%3A%3AGTE%5D=2022-07-01&serviceKey=${process.env.REACT_APP_OPEN_API_KEY}`)           
      var new_res = res.data.data.filter((x) => (
         (x.RCEPT_ENDDE.split('-')[0]*1 >= year) &&
         (x.RCEPT_ENDDE.split('-')[1]*1 >= month) &&
         (x.RCEPT_ENDDE.split('-')[2]*1 >= day) 
      ))
      new_res = new_res.map((x) => (
         x = {...x,like:false}
      ))
      return new_res;
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

export const signup = async(data) => {
   try {     
      axios.post('http://localhost:3000/axios',{
            name : data.name,
            id : data.id,
            pwd : data.pwd,
      }).then((res)=>{
         console.log('로그인 성공')
      }).catch(error => {
         console.log(error.message);            
      });
        
      //return
   } catch (err) {
     
   }
}

export const signin = async(id,pwd) => {
   try {     
      console.log(id,pwd)
      
      const res = await axios.get(``)
      
      console.log(res)

      //return res
   } catch (err) {
      console.log(err);
      throw err;
   }
}


