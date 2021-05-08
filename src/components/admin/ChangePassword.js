import {useEffect, useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import {useDispatch ,useSelector } from "react-redux";
import {loginUserfind, selectConnectuser, } from "../../redux/slices/userSlice";

export default function ChangePassword (props){
    
    const [connectUser, error] = useSelector(selectConnectuser);
    const dispatch = useDispatch();
    const[password, setPassword] = useState({passcurrent:'', passnew:''})

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

    const handleChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
      };

      const handleupdate = ()=>{
        axios.put(`/users/updatepassword/${connectUser.id}`,password,{ withCredentials: true }).then((res,err)=>{
            if(res.status === 203){
                alert(res.data)
                
                setPassword({passcurrent:'', passnew:''})
        
           } 
           if(res.status === 200){
            props.history.push('/homeuser/admin/profile')
           }
           
       })
   }

    return (
        <>
        <div style={{height:'550px'}}>
            <div className="row my-5"  style={{display:'flex', justifyContent:'center'}}>
                <div className="col-lg-7" style={{display:'flex', justifyContent:'center', boxShadow : "12px 12px 22px grey",borderRadius:"15px"}}>
                    <h3>Change Password</h3>
                </div>
            </div>
            <div className="row" style={{display:'flex', justifyContent:'flex-start'}}>
                <div className="col-5" style={{display:'flex', justifyContent:'left'}}> 
                    <strong><label>Your Password :</label></strong>
                </div>
            </div>
            <div className='row'>
            <div className="mb-4 col-lg-5" style={{display:'flex', justifyContent:'center', boxShadow : "12px 12px 22px grey",borderRadius:"15px"}}>
                <div  style={{display:'flex', justifyContent:'center'}}> 
                    <input type="password" placeholder="Your Password" className="form-control my-4" name="passcurrent" value={password.passcurrent} onChange={handleChange}/>
                </div>
            </div>
            <div className='col-7'></div>
            </div>

            <div className="row" style={{display:'flex', justifyContent:'flex-start'}}>
                <div className='col-7'></div>
                <div className="col-lg-5" style={{display:'flex', justifyContent:'left'}}> 
                    <strong><label>New Password :</label></strong>
                </div>
            </div>

            <div className='row'>
                <div className='col-7'></div>
            <div className="mb-4 col-lg-5" style={{display:'flex', justifyContent:'center', boxShadow : "12px 12px 22px grey",borderRadius:"15px"}}>
                <div  style={{display:'flex', justifyContent:'center'}}> 
                    <input type="password" placeholder="New Password" className="form-control my-4" name="passnew" value={password.passnew} onChange={handleChange}/>
                </div>
            </div>
            </div>
            <div className="row mt-5" style={{display:'flex', justifyContent:'center'}}>
                <button type="button" className="btn btn-success" style={{width:"150px", color:"black"}} onClick={handleupdate}><i className="fa fa-pencil" style={{color : "black"}}></i>  Update</button>
            </div>
        </div>
        </>
    )
}