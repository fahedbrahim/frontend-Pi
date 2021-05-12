import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.css";
import {useDispatch ,useSelector } from "react-redux";
import {loginUserfind, selectConnectuser, } from "../../../../../redux/slices/userSlice";
//import { use } from "../../../../../../../backend/routes";

export default function Conversation({conversation}) {
  const [user, setUser] = useState([]);
  const [connectUser, error] = useSelector(selectConnectuser);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== connectUser.id);

    const getUser = async () => {
      try {

        const res = await axios.get("/users/" + friendId,{ withCredentials: true });
        console.log(res)
       setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [connectUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src="https://www.forceplus.com/wp-content/uploads/2016/09/avatar.png"
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
  }