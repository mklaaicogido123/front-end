import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Input } from "@chakra-ui/react";

import "./message.css";

const Message = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [listChat, setListChat] = useState([]);
  const [listMessage, setListMessage] = useState([]);

  const getUserChats = async () => {
    try {
      const res = await axios.get(`/chat/${user._id}`);
      setListChat(res.data);
      // console.log(listChat[0].members[0].name);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getMessages = async (chatId) => {
    try {
      const res = await axios.get(`/message/${chatId}`);
      setListMessage(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserChats();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="message">
      <div className="listChat">
        {listChat?.map((chat) => {
          if (chat.members[0]._id === user._id) {
            return (
              <div className="chat" onClick={() => getMessages(chat._id)}>
                <img
                  src={chat.members[1].image}
                  alt="avatar"
                  className="friend_avatar"
                />
                <div className="friend_name" style={{ margin: "0px 20px" }}>
                  {chat.members[1].name}
                </div>
              </div>
            );
          } else {
            return (
              <div className="chat" onClick={() => getMessages(chat._id)}>
                <img
                  src={chat.members[0].image}
                  alt="avatar"
                  className="friend_avatar"
                />
                <div className="friend_name"> {chat.members[0].name} </div>
              </div>
            );
          }
        })}
      </div>
      <div className="box-chat">
        <div className="box-chat_message">
          {listMessage?.map((message) => {
            return (
              <div>
                <p
                  className={
                    message.senderId === user._id
                      ? "your-message"
                      : "other-people"
                  }
                >
                  {message.text}
                </p>
              </div>
            );
          })}
          {/* <div>
            <p className="your-message">Hello</p>
          </div>
          <div>
            <p className="other-people">Hii</p>
          </div> */}
        </div>

        <div className="send-box">
          {/* <textarea placeholder="Nhập tin nhắn ..." /> */}
          <Input placeholder="Nhập tin nhắn ..." className="textarea" />
          <Button colorScheme="green">Send</Button>
        </div>
      </div>
    </div>
  );
};

export default Message;
