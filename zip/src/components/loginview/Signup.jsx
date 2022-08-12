import React, { useState } from "react";
import { signup } from '../../lib/api/openapi'

const Signup = () => {

    const [values, setValues] = useState({
        name:'',
        id: '',
        pwd:'',
        pwd_confrim:'',
        pwd_visible:false,
        pwd_type:'password'
      })

    const onChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    };

    const handlePasswordType = e => {
        console.log(values.pwd_visible)
        setValues(() => {
            if (!values.pwd_visible) {
                return { ...values, pwd_type: 'text', pwd_visible: true };
            }
            else
                return { ...values, pwd_type: 'password', pwd_visible: false };
        })
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        if(values.pwd !== values.pwd_confrim){
            alert('비밀번호를 확인해주세요')
        }
        else{
            
            if(window.confirm('이대로 회원가입 하시겠습니까?'))
                console.log('문제없음')
                //signup(values)
        }
        
    }

    return (
        <form onSubmit={onSubmit} className="signupForm">
            <div>
                <input type="email" required name="email" value={values.name} onChange={onChange('name')} placeholder="이름" autoComplete="off"/>
                <input type="text" required name="name" value={values.id} onChange={onChange('id')} placeholder="아이디" autoComplete="off"/>
                <input type={values.pwd_type} required name="pwd" value={values.pwd} onChange={onChange('pwd')} placeholder="비밀번호"/>
                <a onClick={()=>handlePasswordType()}>
                    {values.pwd_visible ? (
                        '눈모양 아이콘이라 치셈(on)'
                    ) :(
                        '눈모양 아이콘이라 치셈(off)'
                    )}
                </a>
                <input type={values.pwd_type} required name="pwd_confirm" value={values.pwd_confrim} onChange={onChange('pwd_confrim')} placeholder="비밀번호 확인"/>
                <input type="submit" value="회원가입"/>
            </div>
        </form>
    );
};

export default Signup;