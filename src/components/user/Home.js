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
        <div >
        <div style={{marginBottom:'100px', marginTop:'100px'}}>
        
        <div className="row" style={{marginTop:'30px', marginBottom:'50px'}}>
            <div className="col-lg-5 col-sm-12 text-center" style={{borderRadius:'10px', boxShadow:'12px 12px 22px grey'}} id="chartDashboard1"><i><h4>VEHICLE TOUR</h4></i><h5>Determine the rounds in order to carry out intervention or visit rounds</h5></div>
            <div className="col-lg-1"></div>
            <div className="col-lg-5 col-sm-12 text-center" style={{borderRadius:'10px', boxShadow:'12px 12px 22px grey'}}><i><h4>IMPROVE THE PERFORMANCE OF YOUR WORK</h4></i><h5>Each evening, prepare the tours to be carried out the next day</h5></div>
        </div>
        <div className="row" style={{marginTop:'30px', marginBottom:'170px'}}>
            <div className="col-lg-5 col-sm-12 text-center" style={{borderRadius:'10px', boxShadow:'12px 12px 22px grey'}} id="chartDashboard2"><i><h4>EARN MONEY</h4></i><h5>You will soon be making a private or business trip with a vehicle and there is still some room in your trunk. Why not take the opportunity to try and earn some money by delivering parcels to individuals.</h5></div>
            <div className="col-lg-1"></div>
            <div className="col-lg-5 col-sm-12 text-center" style={{borderRadius:'10px', boxShadow:'12px 12px 22px grey'}}><i><h4>TRACK YOUR PACKAGE</h4></i><h5>Sending parcels is always meant to be simple and secure. You have the possibility to follow the shipment of your package at any time.</h5></div>
        </div>
   
    </div>
        <ToastContainer />
        </div>
    )
}

