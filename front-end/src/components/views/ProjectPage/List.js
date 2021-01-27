import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { getAllPost } from "../../../_actions/postAction";
import { Link } from 'react-router-dom'
import { MdAdd } from "react-icons/md";
import './List.css';
import Post from "./Post";
import MainNavBar from "../../Parts/NavBar/MainNavBar";


function List() {               // 프로젝트 카테고리 눌렀을 때 나오는 화면
    const dispatch = useDispatch();

    const [Posts, setPosts] = useState([]);

    useEffect(() => {
        dispatch(getAllPost()).then((res) => {
            setPosts(res.payload);
        });
    }, []);


    return (
        <main>
        <MainNavBar />
        <div>
            <h2 align="center">Posts</h2>
            <Link to="/project/write" className="write">
                <MdAdd/>
            </Link>
        </div>
        <div>
            <div>
                <table border="1" className="mainTable">
                    <tbody align="center">
                        <tr align="center">
                            <td width="50px">ID</td>
                            <td width="200px">Title</td>
                            <td width="100px">Name</td>
                            <td width="150px">Members</td>
                            <td width="210px">Upload Date</td>
                        </tr>
                        {Posts.map(post => (
                        <Post key={post.idx} idx={post.idx} title={post.title} name={post.name} members={post.members} addDate={post.addDate} />
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
        </main>
    )
}

export default List