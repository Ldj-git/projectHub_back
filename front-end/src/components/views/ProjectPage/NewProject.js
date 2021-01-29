import React, {useState} from 'react'
import {  useDispatch } from 'react-redux';
import { projectUpload } from "../../../_actions/projectAction";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import './Button.css';


function NewProject(props) {                     // 글 작성
    const dispatch = useDispatch();

    const[Name, setName]= useState("")
    const[Members, setMembers]= useState("")
    const[Title, setTitle]= useState("")
    const[Info, setInfo]= useState("")
    const[Team_idx, setTeam_idx]= useState("")      // 팀 인덱스 값 임의로 지정

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

            dispatch(projectUpload(formData)).then((res) => {
                if (res) {
                  props.history.push("/");
                } else {
                  alert("업로드에 실패했습니다!!");
                }
              });
        }
    }
    
    return (
      <div><br/>
        <Link to="/project/" className="back">
          <IoMdArrowRoundBack/>
        </Link>
        <br/><br/>
        <div align="center">
          <h5>| Project Upload |</h5><br/>

          <div>
            <span>● Team Name</span><br/>
            <input
              value={Name} onChange={onNameHandler}
            />
          </div><br/>

          <div>
            <span>● Team Member</span><br/>
            <input
              placeholder="Pick a team member through the button"
              value={Members} onChange={onMembersHandler} 
            />
            <button className="chooseBtn">Choose team</button>
          </div><br/>

          <div>
            <span>● Project Title</span><br/>
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
          </div><br/><br/>

          <button className="uploadBtn" onClick={onUpload}>Upload</button>
        </div>
      </div>
    )
}

export default NewProject