import React, { useState } from "react";

const Signup = () => {

    const [values, setValues] = useState({
        name:'',
        id: '',
        pwd:'',
      })

    const onChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    };

    const onSubmit = (e) =>{
        e.preventDefault();
        console.log(values)
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" name="id" value={values.name} onChange={onChange('name')} placeholder="이름" autoComplete="off"/>
            <input type="text" name="name" value={values.id} onChange={onChange('id')} placeholder="아이디" autoComplete="off"/>
            <input type="text" name="pwd" value={values.pwd} onChange={onChange('pwd')} placeholder="비밀번호"/>
            <input type="submit" value="제출"/>
        </form>
    );
};

export default Signup;