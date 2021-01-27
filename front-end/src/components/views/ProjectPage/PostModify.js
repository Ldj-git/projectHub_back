import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import NavBar from "../../Parts/NavBar/MainNavBar"
import { postModify, getPostDetail } from "../../../_actions/postAction";


function PostModify(props) {              // 게시물 수정
    const dispatch = useDispatch();
    const param = useParams();
    const idx = param.idx;

    const[Name, setName]= useState("")
    const[Members, setMembers]= useState("")
    const[Title, setTitle]= useState("")
    const[Info, setInfo]= useState("")
    const[Team_idx, setTeam_idx]= useState("")      // 팀 인덱스 값 임의로 지정


    useEffect(() => {
        dispatch(getPostDetail(idx)).then((res) => {
          setName(res.payload.name);
          setMembers(res.payload.members);
          setTitle(res.payload.title);
          setInfo(res.payload.info);
        },[]);
      }, []);


    const onNameHandler=(event)=>{
        setName(event.currentTarget.value)
    }

    const onMembersHandler=(event)=>{
        setMembers(event.currentTarget.value)
    }

    const onTitleHandler=(event)=>{
        setTitle(event.currentTarget.value)
    }

    const onInfoHandler=(event)=>{
        setInfo(event.currentTarget.value)
    }


    const onUpload=(e)=>{
        e.preventDefault();

        if(!Name){
            alert("팀 이름을 적어주세요!");
        } else if(!Members){
            alert("팀원을 적어주세요!");
        } else if(!Title){
            alert("제목을 적어주세요!");
        } else if(!Info){
            alert("세부사항을 적어주세요!");
        } else{
            const formData = new FormData();
            formData.append("name", Name);
            formData.append("members", Members);
            formData.append("title", Title);
            formData.append("info", Info);
            formData.append("team_idx", Team_idx);            // 팀 인덱스 요청

            dispatch(postModify({formData, idx })).then((res) => {
                console.log(res);
                if (res) {
                  props.history.push(`/src/components/views/Section/PostDetail.js${idx}`);
                } else {
                  alert("게시물 수정에 실패했습니다.");
                }
              });
        }
    }


    return (
      <span>
        <NavBar />
        <div align="center">
        <div>
        <Link to="/">
          <IoMdArrowRoundBack />
        </Link>
        </div>

        <b>| Project Modify |</b><br/><br/>
        <div>
        <span>Team Name</span><br/>
        <input
          value={Name} onChange={onNameHandler} 
          />
      </div><br/>

      <div>
        <span>Team Member</span><br/>
        <input
          placeholder="Pick a team member through the button"
          value={Members} onChange={onMembersHandler} 
          />
        <button>Choose team</button>
      </div><br/>

      <div>
        <span>Project Title</span><br/>
        <input
          value={Title} onChange={onTitleHandler} 
          />
      </div><br/>

      <div>
        <span>● Project Information</span><br/>
        <textarea 
          value={Info} onChange={onInfoHandler}
          cols="40" rows="5" 
          />
      </div><br/>

      <button onClick={onUpload}>Modify</button>
        </div>
          </span>
    )
}

export default PostModify
