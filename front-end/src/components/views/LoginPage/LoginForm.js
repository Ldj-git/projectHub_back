import React, {useState} from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import "./LoginForm.css"
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/userAction";
import Cookies from 'universal-cookie';
import "./LoginForm.css"
 
const cookies = new Cookies();

export default function LoginForm(props) {

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
            pwd: Password,
          };
          dispatch(loginUser(body))
            .then((res) => {
              if (res.payload.loginSuccess) {
                cookies.set("user", res.payload.token);
                props.onSuccess();
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
            
          <Form style={{display:'flex', flexDirection:'column'}}
              onSubmit={onSubmitHandler}
          >
            <Form.Group size="lg" controlId="id">
            <Form.Label>ID</Form.Label>
            <Form.Control
              autoFocus
              type="id"
              value={Id}
              onChange={(e) => setId(e.target.value)}
            />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </Form.Group>

              <Button type="submit" >로그인</Button>
              <br/>
            
          </Form>

      </div>
    )
}
