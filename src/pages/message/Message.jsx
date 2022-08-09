import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Button, Input } from "@chakra-ui/react";
import socketIOClient from "socket.io-client";

import "./message.css";

const host = "http://localhost:8000";

const Message = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [listChat, setListChat] = useState([]);
  const [listMessage, setListMessage] = useState([]);
  const [chatId, setChatId] = useState("");
  const [message, setMessage] = useState("");
  const socketRef = useRef();

  const getUserChats = async () => {
    try {
      const res = await axios.get(`/chat/${user._id}`);
      setListChat(res.data);
      // console.log(listChat[0].members[0].name);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getMessages = async (Id) => {
    try {
      const res = await axios.get(`/message/${Id}`);
      setListMessage(res.data);
      setChatId(Id);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSendMessage = async () => {
    if (message.trim() === "") return;
    try {
      await axios.post(`/message`, {
        chatId: chatId,
        senderId: user._id,
        text: message,
      });
      await socketRef.current.emit("sendDataClient", chatId);
      setMessage("");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserChats();
    socketRef.current = socketIOClient.connect(host);
    socketRef.current.emit("sendDataClient", "Avs");

    socketRef.current.on("sendDataServer", (dataGot) => {
      const json = JSON.parse(dataGot);
      // console.log("datagot" + dataGot);
      // console.log(json);
      setListMessage(json);
    });
    // socketRef.current.emit("baby", "what is going on");
    // socketRef.current.on("sendDataServer", (data) => {
    //   setListMessage(data);
    // });

    return () => {
      socketRef.current.disconnect();
    };
    //eslint-disable-next-line
  }, []);

  // const sendMessageSocket = () => {
  //   socketRef.current.emit("sendDataClient", {
  //     chatId: chatId,
  //     senderId: user._id,
  //     text: message,
  //   });
  // };
  return (
    <div className="message">
      <div className="listChat">
        {listChat?.map((chat) => {
          if (chat.members[0]._id === user._id) {
            return (
              <div
                className="chat"
                onClick={() => {
                  getMessages(chat._id);
                }}
              >
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
              <div
                className="chat"
                onClick={() => {
                  getMessages(chat._id);
                }}
              >
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
          {listMessage?.map((message, key) => {
            return (
              <div key={key}>
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
          <Input
            placeholder="Nhập tin nhắn ..."
            className="textarea"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <Button colorScheme="green" onClick={() => handleSendMessage()}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Message;
