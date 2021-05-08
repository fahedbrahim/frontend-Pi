import { useState} from "react";
import "../styles/ResetPassword.css";
import axios from "axios";

export default function ResetPassword(props){
    const [user, setUser] = useState({email:""});

     const handleResetPassword = async()=> {
         axios
          .post("/auth/reset-password", user, { withCredentials: true })
          .then((res) => {
            if(res.status === 203){
                alert(res.data)   
           } 
           if(res.status === 200){
                alert(res.data)
                props.history.push('/'); 
           }
          });
          setUser({email:""});
      }

      const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };

    return(
        <section className="Form my-4 mx-5" style={{padding: 0,
                                                    margin: 0,
                                                    boxSizing : "border-box"}}>
            <div className="container" style={{display : "flex", justifyContent : "center"}}>
                <div className="row no-gutters" style={{backgroundColor : "#ced1d3",
                                                         borderRadius : "30px",
                                                        boxShadow : "12px 12px 22px grey"}} >
                    <div className="px-5 py-5">
                        <h2 className="font-weight-bold py-3">Please enter your e-mail address</h2>
                        <form>
                            <div className="form-row" style={{display : "flex", justifyContent : "center"}}>
                                <div className="col-lg-7" >
                                    <input type="email" placeholder="Email" className="form-control my-3 p-4" name="email" value={user.email} onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="form-row" style={{display : "flex", justifyContent : "center"}}>
                                <div className="col-lg-7">
                                    <button type="button" className="btn1"  id="btnResetPassword"  onClick={handleResetPassword}>Reset Password</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}