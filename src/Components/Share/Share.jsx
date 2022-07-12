import "./share.css";
import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

const Share = ({ handleGetPosts }) => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const handleSharePost = (url) => {
    try {
      console.log("url:" + url);
      axios.post("/post", {
        userId: user._id,
        description: description,
        image: url,
      });
      alert("share success");
      setDescription("");
      handleGetPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = (e) => {
    e.preventDefault();
    if (image) {
      // Tạo một form data chứa dữ liệu gửi lên
      const formData = new FormData();
      // Hình ảnh cần upload
      formData.append("file", image);
      // Tên preset vừa tạo ở bước 1
      formData.append("upload_preset", "oi7qyalz");
      // Tải ảnh lên cloudinary
      // API: https://api.cloudinary.com/v1_1/{Cloudinary-Name}/image/upload
      axios
        .post(
          "https://api.cloudinary.com/v1_1/mklaaicogido123/image/upload",
          formData
        )
        .then((response) => {
          // setUrl(response.data.url);
          handleSharePost(response.data.url);
        })
        .catch((err) => console.error(err));
    } else {
      handleSharePost("");
      // alert("choice image to upload");
    }
  };

  return (
    <div className="share">
      <form style={{ margin: "0px", width: "90%" }} onSubmit={uploadImage}>
        <div className="share_description">
          <img src={user.image} className="share_avatar" alt="avatar" />
          <input
            type="text"
            placeholder="What's in your mind?"
            style={{ width: "90%", wordWrap: "break-word" }}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <hr width="90%" style={{ margin: "auto" }} />
        <div>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </div>
        <button type="submit" style={{ background: "green" }}>
          Share
        </button>
      </form>
      {/* <div>
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button onClick={uploadImage}>Upload</button>
      </div> */}
    </div>
  );
};

export default Share;
