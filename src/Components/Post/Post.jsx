import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostUser, getAllPost } from "../../redux/apiRequest";
import { useEffect, useState } from "react";
import "./post.css";
import Share from "../Share/Share";
import axios from "axios";

const Post = ({ username }) => {
  const [post, SetPost] = useState([]);
  const postList = useSelector((state) => state.post?.posts.allPost);
  const dispatch = useDispatch();
  const handleGetPosts = () => {
    username ? getPostUser(username, dispatch) : getAllPost(dispatch);
    // SetPost(
    //   postList.sort((p1, p2) => {
    //     return new Date(p2.createAt) - new Date(p1.createAt);
    //   })
    // );
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete("/post/" + id);
      console.log("id:" + id);
      alert("deleted");
      handleGetPosts();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetPosts();
  }, [username]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Share handleGetPosts={handleGetPosts} />
        <h1>{username}</h1>
        {postList?.map((post) => {
          return (
            <div className="post" key={post._id}>
              <div className="postInfor">
                <img
                  src={post.userId.image}
                  alt="avatar"
                  className="postInfor_avatar"
                  style={{ margin: "0px" }}
                />
                <p style={{ margin: "0px 10px" }}>{post.userId.name}</p>
                <button onClick={() => handleDeletePost(post._id)}></button>
              </div>
              <div className="post_description">{post.description}</div>
              <div className="postImage">
                {post.image ? (
                  <img
                    src={post.image}
                    alt="postImage"
                    style={{ width: "98%" }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Post;
