import {UPLOAD_SUCCESS,UPLOAD_FAILURE,MODIFY_SUCCESS,MODIFY_FAILURE,POST_DELETE,GET_POST_DETAIL,GET_ALL_POST } from "./types";
import axios from "axios";
import { SERVER_API } from "./config";


// 게시물(포스트) 업로드(생성)
export const postUpload = (formData) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  return axios
    .post(`${SERVER_API}/project/upload`, formData, config)
    .then((res) => {
      dispatch({ type: UPLOAD_SUCCESS, payload: res.data });
      return true;
    })
    .catch((err) => {
      dispatch({ type: UPLOAD_FAILURE, payload: err });
      return false;
    });
};


// 게시물 수정
export const postModify = ({ formData, idx }) => (dispatch) => {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  return axios
    .post(`${SERVER_API}/project/update/${idx}`, formData, config)
    .then((res) => {
      dispatch({ type: MODIFY_SUCCESS, payload: res.data });
      return true;
    })
    .catch((err) => {
      dispatch({ type: MODIFY_FAILURE, payload: err });
      return false;
    });
};


// 게시물 삭제
export const postDelete = (idx) => {
  const request = axios
    .get(`${SERVER_API}/project/delete/${idx}`)
    .then((res) => res.data);

  return {
    type: POST_DELETE,
    payload: request,
  };
};


//해당 포스트의 디테일 정보받기
export function getPostDetail(idx) {
  const request = axios
    .get(`${SERVER_API}/project/${idx}`)
    .then((res) => res.data);

  return {
    type: GET_POST_DETAIL,
    payload: request,
  };
}


//모든 포스트의 정보받기
export function getAllPost() {
  const request = axios
    .get(`${SERVER_API}/project`)
    .then((res) => res.data);

  return {
    type: GET_ALL_POST,
    payload: request,
  };
}