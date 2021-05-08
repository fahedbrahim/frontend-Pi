import { useState } from "react";
import "../styles/Register.css";
import login from "../assets/login.jpg";
import logogoogle from "../assets/logogoogle.png";
import axios from "axios";
import { GoogleLogin } from 'react-google-login';

export default function Register(props) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    adresse: "",
    phone: "",
    role: "user"
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    
    console.log(user);
  };

  function handleRegister() {
    axios.post("/auth/register", user, { withCredentials: true })
    .then((res) => {
      console.log(res.status)
      console.log(res)
      if(res.status === 203){
          alert(res.data)
     } 
     if(res.status === 200){
      props.history.push('/login');
      alert(res.data)
     
 }
  })
  setUser({ username: "", email: "", password: "", adresse: "", phone: "",role: "user"});
}

const responseGoogle=(res)=>{
  console.log(res)
    setUser({ ...user, username: res.profileObj.familyName+" "+res.profileObj.givenName, email: res.profileObj.email  })
}

  return (
    <section className="Form my-4 mx-5" style={{padding: 0,
                                                margin: 0,
                                                boxSizing : "border-box"}}>
      <div className="container">
        <div className="row no-gutters" style={{backgroundColor : "#ced1d3",
                                                borderRadius : "30px",
                                                boxShadow : "12px 12px 22px grey"}}>
          <div className="col-lg-5">
            <img
              src={login}
              className="img-fluid"
              alt="logimg"
              style={{borderTopLeftRadius : "30px", borderBottomLeftRadius : "30px"}}
            />
          </div>
          <div className="col-lg-7 px-5 py-2">
            <h1 className="font-weight-bold py-3">WeCode</h1>
            <h4>Let's get you on board</h4>
            <form>
              <div className="form-row">
                <div className="col-lg-7">
                  <input
                    type="text"
                    placeholder="Username"
                    className="form-control my-3 p-4"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-7">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control my-3 p-4"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-7">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control my-3 p-4"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-7">
                  <input
                    type="text"
                    placeholder="Adresse"
                    className="form-control my-3 p-4"
                    name="adresse"
                    value={user.adresse}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-7">
                  <input
                    type="text"
                    placeholder="Phone"
                    className="form-control my-3 p-4"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="col-lg-7">
                  <select className="custom-select custom-select-lg my-3" name="role" value={user.role} onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="company">Company</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-4">
                  <button
                    type="button"
                    className="btn1"
                    id="btnregister"
                    onClick={handleRegister}
                  >
                    Sign Up
                  </button>
                </div>
                <div className="col-lg-3">
                                    
                  <GoogleLogin 
                  clientId="971874584120-fa39pgif9p2tk3rqhmue4glhk02as2tf.apps.googleusercontent.com"
                  render={renderProps => (
                    <button onClick={renderProps.onClick} style={{
                      border:"none",
                      outline: "none",
                      height: "50px",
                      width: "100%",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      backgroundColor:"white"
                    }}><img
                    src={logogoogle}
                    className="img-fluid"
                    alt="logogoogle"
                    style={{height:"20px", width:"20px",marginRight:"5px",marginLeft:"0"}}
                  />Sign Up</button>
                  )}
                  buttonText="Sign up"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  
                  />
                  
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
