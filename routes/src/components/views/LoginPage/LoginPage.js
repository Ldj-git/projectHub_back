import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/userAction";


function LoginPage(props) {

    const[Id, setId]= useState("")
    const[Password, setPassword]= useState("")
    const dispatch = useDispatch();

    
    const onIdHandler=(event)=>{
        setId(event.currentTarget.value)
    }

    const onPasswordHandler=(event)=>{
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler=(event)=>{
        event.preventDefault();  //페이지 고정 느낌

        const body = {
            id: Id,
            password: Password,
          };
          dispatch(loginUser(body))
            .then((res) => {
              console.log(res);
              if (res.payload.loginSuccess) {
                props.history.push("/");
              } else {
                alert(res.payload.message);
              }
            })
            .catch((err) => {
              console.log(err);
            });
    }



    return (
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center'
            , width:'100%', height:'100vh'
        }}>
            
            <form style={{display:'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}
            >
                <b>|로그인|</b> <br/>

                <label>아이디</label>
                <input type="email" value={Id} onChange={onIdHandler}/>
                <br/>
                <label>비밀번호</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br/>

                <button>로그인</button>
                <br/>
               <Link to="/register">
                <button>회원가입</button>
                </Link>
            
               
             
            </form>


        </div>
    )
}

export default withRouter(LoginPage);
