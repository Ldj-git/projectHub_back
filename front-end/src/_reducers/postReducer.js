import {UPLOAD_SUCCESS,UPLOAD_FAILURE,MODIFY_SUCCESS,MODIFY_FAILURE,POST_DELETE,GET_POST_DETAIL,GET_ALL_POST } from "../_actions/types";

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
       
  
      case POST_DELETE:
        return { ...state, postDelete: true };
       

      case GET_POST_DETAIL:
        return { ...state, postDetail: action.payload };
      

      case GET_ALL_POST:
        return { ...state, allPost: action.payload };
      

      default:
        return state;
    }
}