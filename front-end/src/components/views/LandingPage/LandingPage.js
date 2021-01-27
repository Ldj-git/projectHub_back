import SearchFrame from '../../Parts/SearchForm/SearchFrame';
import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../_actions/userAction";
import Cookies from 'universal-cookie';
import NavBar from '../../Parts/NavBar/MainNavBar';

 
const cookies = new Cookies()


function LandingPage(props) {
  const dispatch = useDispatch();
  const onLogoutHandler = () => {
    //useDispatch를 사용해서 로그아웃 액션을 실행한다
    //useDispatch와 logout 액션이 두가지 필요하다
    dispatch(logoutUser())
      .then((res) => {
        console.log(res);
        if (cookies.get("user") !== undefined) {
          cookies.remove("user");
          props.history.push("/login");
        } else {
          alert("로그아웃에 실패하였습니다");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <NavBar onLogout={onLogoutHandler}/>
      <SearchFrame />
      <br />
    </div>
  );
}

export default withRouter(LandingPage);
