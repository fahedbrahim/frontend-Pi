import {useEffect, useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import {useDispatch , useSelector } from "react-redux";
import {loginUserfind,selectConnectuser, } from "../../redux/slices/userSlice";


export default function Profile (props){
    const [connectUser, error] = useSelector(selectConnectuser);
    const dispatch = useDispatch();

    const [profile, setProfile]= useState({username:'', email:'',adresse:'', phone :''})

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

    useEffect(()=>{
        axios.get(`/users/${connectUser.id}`,{ withCredentials: true }).then(res=>{
            setProfile({username:res.data.username, email:res.data.email, adresse:res.data.adresse, phone :res.data.phone})
        })
    },[])

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
      };

      const handleupdate = async()=>{
          const password = prompt("Your Password");
          axios.put(`/users/profile/${connectUser.id}`,{password,profile},{ withCredentials: true }).then(res=>{
            if(res.status === 203){
                alert(res.data)
                axios.get(`/users/${connectUser.id}`,{ withCredentials: true }).then(res=>{
                setProfile({username:res.data.username, email:res.data.email, adresse:res.data.adresse, phone :res.data.phone})
        })
           } 
           if(res.status === 200){
                alert(res.data)
           }
          })
           
      }
    return (
        <>
            <div className="row my-5"  style={{display:'flex', justifyContent:'center'}}>
                <div className="col-lg-7" style={{display:'flex', justifyContent:'center', boxShadow : "12px 12px 22px grey",borderRadius:"15px"}}>
                    <h3>Your Profile</h3>
                </div>
            </div>
            <div className="row">
            <button type="button" className="btn btn-primary my-2" onClick={()=>{props.history.push('/homeuser/admin/changepassword')}}>Change Password</button>
            </div>
            <div className="row" style={{display:'flex', justifyContent:'flex-start'}}>
                <div className="col-5" style={{display:'flex', justifyContent:'left'}}> 
                    <strong><label>Username :</label></strong>
                </div>
            </div>
            <div className='row'>
            <div className="mb-4 col-lg-5" style={{display:'flex', justifyContent:'center', boxShadow : "12px 12px 22px grey",borderRadius:"15px"}}>
                <div  style={{display:'flex', justifyContent:'center'}}> 
                    <input type="text" placeholder="Username" className="form-control my-4" name="username" value={profile.username} onChange={handleChange}/>
                </div>
            </div>
            <div className='col-7'></div>
            </div>

            <div className="row" style={{display:'flex', justifyContent:'flex-start'}}>
                <div className='col-7'></div>
                <div className="col-lg-5" style={{display:'flex', justifyContent:'left'}}> 
                    <strong><label>Email :</label></strong>
                </div>
            </div>

            <div className='row'>
                <div className='col-7'></div>
            <div className="mb-4 col-lg-5" style={{display:'flex', justifyContent:'center', boxShadow : "12px 12px 22px grey",borderRadius:"15px"}}>
                <div  style={{display:'flex', justifyContent:'center'}}> 
                    <input type="text" placeholder="Email" className="form-control my-4" name="email" value={profile.email} onChange={handleChange}/>
                </div>
            </div>
            </div>

            <div className="row" style={{display:'flex', justifyContent:'flex-start'}}>
                <div className="col-5" style={{display:'flex', justifyContent:'left'}}> 
                    <strong><label>Adresse :</label></strong>
                </div>
            </div>
            <div className='row'>
            <div className="mb-4 col-lg-5" style={{display:'flex', justifyContent:'center', boxShadow : "12px 12px 22px grey",borderRadius:"15px"}}>
                <div  style={{display:'flex', justifyContent:'center'}}> 
                    <input type="text" placeholder="Adresse" className="form-control my-4" name="username" name="adresse" value={profile.adresse} onChange={handleChange}/>
                </div>
            </div>
            <div className='col-7'></div>
            </div>

            <div className="row" style={{display:'flex', justifyContent:'flex-start'}}>
                <div className='col-7'></div>
                <div className="col-lg-5" style={{display:'flex', justifyContent:'left'}}> 
                    <strong><label>Phone :</label></strong>
                </div>
            </div>

            <div className='row'>
                <div className='col-7'></div>
            <div className="mb-5 col-lg-5" style={{display:'flex', justifyContent:'center', boxShadow : "12px 12px 22px grey",borderRadius:"15px"}}>
                <div  style={{display:'flex', justifyContent:'center'}}> 
                    <input type="text" placeholder="Phone" className="form-control my-4" name="phone" value={profile.phone} onChange={handleChange}/>
                </div>
            </div>
            </div>

            <div className="row mb-5" style={{display:'flex', justifyContent:'center'}}>
                <button type="button" className="btn btn-success" style={{width:"150px", color:"black"}} onClick={handleupdate}><i className="fa fa-pencil" style={{color : "black"}}></i>  Update</button>
            </div>
        </>
    )
}