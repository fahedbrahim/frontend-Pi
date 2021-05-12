import {useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import {useDispatch ,useSelector } from "react-redux";
import {loginUserfind, selectConnectuser, } from "../../redux/slices/userSlice";

import { Link } from "react-router-dom";

import "../../styles/user/DeliveryUser.css";

export default function Delivery (props){

    const [connectUser, error] = useSelector(selectConnectuser);
     const id = connectUser.id ;
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
      
    },[Cookies.get()])

    return (
        <div style={{marginBottom:'40px', height:"900px"}}>
        
            <div className="row" style={{marginTop:'30px', marginBottom:'30px'}}>
                <div className="col-lg-5 col-sm-12 text-center" style={{borderRadius:'10px', boxShadow:'12px 12px 22px grey'}} id="PathListeDelivery1"><Link to="/homeuser/user/listDeliveries"><h4 style={{color:"black"}}>My deliveries</h4></Link></div>
                <div className="col-lg-1"></div>
                <div className="col-lg-5 col-sm-12 text-center" style={{borderRadius:'10px', boxShadow:'12px 12px 22px grey'}} ><Link to="/homeuser/user/post"><h4 style={{color:"black"}}>Post Delivery</h4></Link></div>
            </div>
           
            <div className="row" style={{marginTop:'30px', marginBottom:'30px'}}>
                <div className="col-lg-5 col-sm-12 text-center" style={{borderRadius:'10px', boxShadow:'12px 12px 22px grey'}} id="PathListeDelivery1"><Link to="/homeuser/user/AffectedDelivery"><h4 style={{color:"black"}}>My Delivery History</h4></Link></div>
                <div className="col-lg-1"></div>
                <div className="col-lg-5 col-sm-12 text-center" style={{borderRadius:'10px', boxShadow:'12px 12px 22px grey'}} ><Link to={`/homeuser/user/addDelivery/${id}`}><h4 style={{color:"black"}}>New Delivery</h4></Link></div>
            </div>
            <div className="row" style={{marginTop:'30px', marginBottom:'30px'}}>
                <div className="col-lg-5 col-sm-12 text-center" style={{borderRadius:'10px', boxShadow:'12px 12px 22px grey'}} id="PathListeDelivery1"><Link to="/homeuser/user/chatbot"><h4 style={{color:"black"}}>Chatbot </h4></Link></div>
                <div className="col-lg-1"></div>
                <div className="col-lg-5 col-sm-12 text-center" style={{borderRadius:'10px', boxShadow:'12px 12px 22px grey'}} ><Link to={`/homeuser/user/passedDelivery`}><h4 style={{color:"black"}}>Passed Delivery</h4></Link></div>
            </div>
       
        </div>
    )
}

