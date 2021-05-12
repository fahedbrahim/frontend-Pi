import "./messenger.css";
import Conversation from "./conversations/Conversation";
import Message from "./message/Message";
import ChatOnline from "./chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
//import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import {useDispatch ,useSelector } from "react-redux";
import {loginUserfind, selectConnectuser, } from "../../../../redux/slices/userSlice";
//import user from "../../../../../../backend/models/user";

export default function Messenger() {

  const [connectUser, error] = useSelector(selectConnectuser);
  const [conversations, setConversations]=useState([]);
  const [currentChat, setCurrentChat]=useState(null);
  const [messages, setMessages]=useState([]);
  const [arrivalMessage, setArrivalMessage]=useState(null);
  const [onlineUsers, setOnlineUsers]=useState([]);

 // const [socket, setSocket]=useState(null);
 // const socket = useRef();
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();
/*
useEffect(()=> {
  socket.current=io("ws://localhost:8900") ; 
  socket.current.on("getMessage",(data)=> {
     setArrivalMessage({
       sender:data.senderId,
       text:data.text,
       createdAt:Date.now(),
     })
  })
},[]); 
*/
useEffect(()=> {
 arrivalMessage &&
  currentChat?.members.includes(arrivalMessage.sender) &&
  setMessages((prev)=>[...prev,arrivalMessage]);
},[arrivalMessage,currentChat]) ;


/*
 useEffect(() => {
     socket.current.emit("addUser",connectUser.id);
     socket.current.on("getUsers",users=>{
       setOnlineUsers(users);
       console.log(users)
     }) 
  }, [connectUser]);
  */

 /* useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);*/

  /*useEffect(() => {
    socket.current.emit("addUser", connectUser.id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        connectUser.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [connectUser]);*/

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + connectUser.id);
       // console.log(res);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [connectUser.id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
 // console.log(messages);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: connectUser.id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== connectUser.id
    );
/*
    socket.current.emit("sendMessage", {
      senderId: connectUser.id,
      receiverId,
      text: newMessage,
    }); 
*/
    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper"> 
            <input placeholder="Search for Users" className="chatMenuInput" />
            {conversations.map((c)=> (
               <div onClick={() => setCurrentChat(c)}>
             <Conversation conversation={c}/>
             </div>
             ))}
          </div>
        </div>
        <div className="chatBox"> 
          <div className="chatBoxWrapper"> 
          {currentChat ? (
              <>
            <div className="chatBoxTop">
{messages.map((m)=> (     
        <div ref={scrollRef}>
        <Message message={m} own={m.sender==connectUser.id}/>
        </div>
        ))} 
               
            </div>
            <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                  
                </div>
                </>
                ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}

          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper"> 
              <ChatOnline  
              currentId={connectUser.id}
              setCurrentChat={setCurrentChat}
              />
          </div>
        </div>
      </div>
    </>
  );
}