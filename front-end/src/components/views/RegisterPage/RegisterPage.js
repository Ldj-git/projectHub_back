import React, {useState} from 'react'
import { withRouter } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/userAction";
import NavBar from "../../Parts/NavBar/MainNavBar"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

function RegisterPage(props) {

    const[Name, setName]= useState("")
    const[Id, setId]= useState("")
    const[Password, setPassword]= useState("")
    const[PasswordChecked, setPasswordChecked]= useState("")
    const dispatch = useDispatch();
    const [idAccept, setIdAccept] = useState(0);

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
                alert("이미 사용중인 아이디입니다. 다른 아이디를 입력해주세요.");
                setIdAccept(false);
            }
        });
    };


    return (
      <span>
        <NavBar />

        <div style={{
          display:'flex', justifyContent:'center', alignItems:'center'
          , width:'100%', height:'100vh'
        }}>
        <Form onSubmit={onSubmitHandler}>
        <Form.Group size="lg" controlId="name">
            <Form.Label>이름</Form.Label>
            <Form.Control
              autoFocus
              type=""
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="id">
            <Form.Label>ID</Form.Label>
            <Form.Control
              autoFocus
              type="id"
              value={Id}
              onChange={(e) => setId(e.target.value)}
            />
            <br />
            <Button onClick={checkID} ml="30">중복확인</Button>
          </Form.Group>

          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group size="lg" controlId="password">
            <Form.Label>Password Recheck</Form.Label>
            <Form.Control
              type="password"
              value={PasswordChecked}
              onChange={(e) => setPasswordChecked(e.target.value)}
            />
          </Form.Group>

      <Button type="submit">회원 가입</Button >
    </Form>
    </div>
    </span>
    )
}

export default withRouter(RegisterPage);