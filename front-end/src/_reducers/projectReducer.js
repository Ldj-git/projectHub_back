import {UPLOAD_SUCCESS,UPLOAD_FAILURE,MODIFY_SUCCESS,MODIFY_FAILURE,PROJECT_DELETE,GET_PROJECT_DETAIL,GET_ALL_PROJECT } from "../_actions/types";

export default function (state = {}, action) {
    switch (action.type) {
      case UPLOAD_SUCCESS:
        return { ...state, uploadSuccess: true };
      
  
      case UPLOAD_FAILURE:
        return { ...state, uploadSuccess: false, err: action.payload };
    
  
      case MODIFY_SUCCESS:
        return { ...state, modifySuccess: true };
       
  
      case MODIFY_FAILURE:
        return { ...state, modifySuccess: false, err: action.payload };
       
  
      case PROJECT_DELETE:
        return { ...state, projectDelete: true };
       

      case GET_PROJECT_DETAIL:
        return { ...state, projectDetail: action.payload };
      

      case GET_ALL_PROJECT:
        return { ...state, allProject: action.payload };
      

      default:
        return state;
    }
}