import React, {useState} from 'react'
import { withRouter } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/userAction";

function RegisterPage(props) {

    const[Name, setName]= useState("")
    const[Id, setId]= useState("")
    const[Password, setPassword]= useState("")
    const[PasswordChecked, setPasswordChecked]= useState("")
    const dispatch = useDispatch();
    const [idAccept, setIdAccept] = useState(0);

    const onNameHandler=(event)=>{
        setName(event.currentTarget.value)
    }

    const onIdHandler=(event)=>{
        setId(event.currentTarget.value)
    }

    const onPasswordHandler=(event)=>{
        setPassword(event.currentTarget.value)
    }

    const onPasswordCheckedHandler=(event)=>{
        setPasswordChecked(event.currentTarget.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(idAccept === false){
          alert("아이디 중복확인을 해주세요");
        }
        else if (Password === PasswordChecked) {
            let body = {
              id :  Id,
              name: Name,
              pwd : Password,
            };
            dispatch(registerUser(body)).then((res) => {
              if(res.payload.registerSuccess){
                alert("가입이 정상적으로 완료되었습니다");
                props.history.push("/login");
              }
            });
          } else {
            alert("비밀번호가 일치하지 않습니다");
          }
      };


      const checkID=(e)=>{      
        e.preventDefault();
        const data = {
            id: Id   
        }

        fetch('/register/checkid',{ 
            method:"post",
            headers: { "Content-Type":  "application/json" }, 
            body: JSON.stringify(data),   
        })
        .then(res => res.json())
        .then(json => {
            if(json.IdExist === false){   
                alert("사용가능한 ID입니다"); 
                setIdAccept(true);
            }
            else{
                alert("다른 ID를 입력해주세요!!");
            }
        });
    };


    return (
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center'
            , width:'100%', height:'100vh'
        }}>
        <form onSubmit={onSubmitHandler}>
        <b>|회원가입|</b><br/><br/>
        <div>
        <span>이름</span><br/>
        <input
          placeholder="이름을 입력하세요"
          value={Name} onChange={onNameHandler}
        />
      </div><br/>

      <div>
        <span>아이디</span><br/>
        <input
          placeholder="이메일을 입력하세요"
          value={Id} onChange={onIdHandler}
        />
        <button onClick={checkID}>중복확인</button>
      </div><br/>

      <div>
        <span>비밀번호</span><br/>
        <input  type="password"
          placeholder="8~16자 대/소문자,숫자,특수문자 중 2가지"
          value={Password} onChange={onPasswordHandler}
        />
      </div><br/>

      <div>
        <span>비밀번호 확인</span><br/>
        <input  type="password"
          placeholder="비밀번호 확인"
          value={PasswordChecked} onChange={onPasswordCheckedHandler}
        />
      </div><br/>

      <button type="submit">회원 가입</button>
    </form>
    </div>
    )
}

export default withRouter(RegisterPage);