import {useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import {useDispatch ,useSelector } from "react-redux";
import {loginUserfind, selectConnectuser, } from "../../redux/slices/userSlice";
import ReactNotifications from 'react-notifications-component';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home (props){

    const [connectUser, error] = useSelector(selectConnectuser);
    const dispatch = useDispatch();

    useEffect( async()=>{
        if(Cookies.get('connect.sid') ){

        }else{
          await axios
         .get("/auth/logout", { withCredentials: true })
         .then((res) => {
               console.log(res)
               localStorage.removeItem("userInfo");
               dispatch(loginUserfind(res.data));
               props.history.push('/');
          } ) }
      
    },[Cookies.get()], 
    
  
    );

    useEffect(() => {
        axios.post(`/provider/verif/`,{
            idUser: connectUser.id ,
        }).then((response) => {
            console.log("zzzzzzzzzzzz",response)
       if (response.data.msg === true) {
           console.log("aaa");
           return (toast("you are accepted at the delivery service!"));
       }
     
     });
         
     }, [] );


   
    return (
        <div style={{height:"700px"}}>
        <h1>Home</h1>
        <ToastContainer />
        </div>
    )
}

