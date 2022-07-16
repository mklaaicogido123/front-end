import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostUser, getAllPost } from "../../redux/apiRequest";
import { useEffect } from "react";
import "./post.css";
import Share from "../Share/Share";
import axios from "axios";
import { FcDeleteDatabase } from "react-icons/fc";

const Post = ({ username }) => {
  const postList = useSelector((state) => state.post?.posts.allPost);
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();

  const handleGetPosts = () => {
    username ? getPostUser(username, dispatch) : getAllPost(dispatch);
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
    // eslint-disable-next-line
  }, [username]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {user.name === username ? (
          <Share handleGetPosts={handleGetPosts} />
        ) : (
          <></>
        )}

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
                <button
                  style={{
                    background: "#ffff",
                    margin: "0px 10px",
                  }}
                  onClick={() => handleDeletePost(post._id)}
                >
                  <FcDeleteDatabase size={20} />
                </button>
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
