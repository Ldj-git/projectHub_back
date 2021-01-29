import {UPLOAD_SUCCESS,UPLOAD_FAILURE,MODIFY_SUCCESS,MODIFY_FAILURE,PROJECT_DELETE,GET_PROJECT_DETAIL,GET_ALL_PROJECT } from "./types";
import axios from "axios";
import {request} from "../utils/axios"
import { SERVER_API } from "./config";


// 게시물(포스트) 업로드(생성)
export const projectUpload = (datas) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  console.log(datas)
  let result = axios
    .post(`/project/upload`, datas, config)
    .then((res) => {
      dispatch({ type: UPLOAD_SUCCESS, payload: res.data });
      return true;
    })
    .catch((err) => {
      dispatch({ type: UPLOAD_FAILURE, payload: err });
      return false;
    });
  return result;
};

export function projectModify(dataTosubmit, idx) {
  const data = request("post", "/project/update", dataTosubmit);

  return {
    type : MODIFY_FAILURE,
    payload : data
  }
}

// 게시물 수정
// export const projectModify = ({ formData, idx }) => (dispatch) => {
//   const config = {
//     headers: { "Content-Type": "multipart/json" },
//   };

//   return axios
//     .post(`${SERVER_API}/project/update`, {formData}, {headers:config.headers})
//     .then((res) => {
//       dispatch({ type: MODIFY_SUCCESS, payload: res.data });
//       return true;
//     })
//     .catch((err) => {
//       dispatch({ type: MODIFY_FAILURE, payload: err });
//       return false;
//     });
// };


// 게시물 삭제
export const projectDelete = (idx) => {
  const request = axios
    .get(`${SERVER_API}/project/delete/${idx}`)
    .then((res) => res.data);

  return {
    type: PROJECT_DELETE,
    payload: request,
  };
};


//해당 포스트의 디테일 정보받기
export function getProjectDetail(idx) {
  const request = axios
    .get(`${SERVER_API}/project/${idx}`)
    .then((res) => res.data);

  return {
    type: GET_PROJECT_DETAIL,
    payload: request,
  };
}


//모든 포스트의 정보받기
export function getAllProject() {
  const request = axios
    .get(`${SERVER_API}/project`)
    .then((res) => res.data);

  return {
    type: GET_ALL_PROJECT,
    payload: request,
  };
}