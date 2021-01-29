import React from 'react'
import { Link } from 'react-router-dom';
import './Project.css';


function Project({idx, title, name, members, addDate}) {       // List에 출력되는 게시물
    
    var URL= "/project/read/"+idx;
    return (
        <tr border="1" className="table" align="center">   
            <td width="50px">
                <Link to={URL}>{idx}</Link>
            </td>
            <td width="200px">
                <Link to={URL}>{title}</Link>
            </td>
            <td width="100px">
                <Link to={URL}>{name}</Link>
            </td>
            <td>
                <Link to={URL}>{members}</Link>
            </td>
            <td width="210px">{addDate}</td>
        </tr>
    )
}

export default Project