import {useEffect,useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import {useDispatch ,useSelector } from "react-redux";
import {loginUserfind, selectConnectuser, } from "../../redux/slices/userSlice";
import { selectSelectedUser, updateUser, unselectUser } from '../../redux/slices/admin/usersSlice';

export default function UpdateCompany (props){
    const [connectUser, error] = useSelector(selectConnectuser);
    const dispatch = useDispatch();

    const slectedUser = useSelector(selectSelectedUser)
    const [user, setUser] = useState({ username: slectedUser.username, email: slectedUser.email, adresse: slectedUser.adresse, phone: slectedUser.phone })
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
        if(!slectedUser){
            props.history.push("/homeuser/admin/company")
        }
    },[slectedUser])

    const handleupdate = ()=>{
         axios.put(`/users/${slectedUser._id}`,user,{ withCredentials: true }).then((res,err)=>{
            if(res.status === 203){
                alert(res.data)
                setUser({ username: slectedUser.username, email: slectedUser.email, adresse: slectedUser.adresse, phone: slectedUser.phone })
           } 
           if(res.status === 200){
                props.history.push("/homeuser/admin/users")
                dispatch(updateUser(res))
                dispatch(unselectUser())
                
            }
        })
    }
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };

    return (
        <>
            <div className="row my-5"  style={{display:'flex', justifyContent:'center'}}>
                <div className="col-lg-7" style={{display:'flex', justifyContent:'center', boxShadow : "12px 12px 22px grey",borderRadius:"15px"}}>
                    <h3>Update Company</h3>
                </div>
            </div>
            <div className="row" style={{display:'flex', justifyContent:'center'}}>
                <div className="col-5" style={{display:'flex', justifyContent:'left'}}> 
                    <strong><label>Username :</label></strong>
                </div>
                <div className="col-5" style={{display:'flex', justifyContent:'left'}}>
                    <strong><label>Email :</label></strong>
                </div>
            </div>
            <div className="row mb-5" style={{display:'flex', justifyContent:'center', boxShadow : "12px 12px 22px grey",borderRadius:"15px"}}>
                <div className="col-5" style={{display:'flex', justifyContent:'center'}}> 
                    <input type="text" placeholder="Username" className="form-control my-4" name="username" value={user.username} onChange={handleChange}/>
                </div>
                <div className="col-5" style={{display:'flex', justifyContent:'center'}}>
                <input type="email" placeholder="Email" className="form-control my-4" name="email" value={user.email} onChange={handleChange} />
                </div>
            </div>

            <div className="row" style={{display:'flex', justifyContent:'center'}}>
                <div className="col-5" style={{display:'flex', justifyContent:'left'}}> 
                    <strong><label>Adresse :</label></strong>
                </div>
                <div className="col-5" style={{display:'flex', justifyContent:'left'}}>
                    <strong><label>Phone :</label></strong>
                </div>
            </div>
            <div className="row mb-5" style={{display:'flex', justifyContent:'center', boxShadow : "12px 12px 22px grey",borderRadius:"15px"}}>
                <div className="col-5" style={{display:'flex', justifyContent:'center'}}> 
                    <input type="text" placeholder="Adresse" className="form-control my-4" name="adresse" value={user.adresse} onChange={handleChange}/>
                </div>
                <div className="col-5" style={{display:'flex', justifyContent:'center'}}>
                <input type="text" placeholder="Phone" className="form-control my-4" name="phone" value={user.phone} onChange={handleChange} />
                </div>
            </div>
            <div className="row mb-5" style={{display:'flex', justifyContent:'center'}}>
                <button type="button" className="btn btn-success" style={{width:"150px", color:"black"}} onClick={handleupdate}><i className="fa fa-pencil" style={{color : "black"}}></i>  Update</button>
            </div>
        </>
    )
}