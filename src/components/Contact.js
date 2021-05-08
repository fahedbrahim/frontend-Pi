import { useState, useEffect } from "react";
import axios from "axios";
//import "../styles/Contact.css";
import styled from 'styled-components'



export default function Contact(props) {
  
  const [contact, setContact] = useState({
    email: "wecodeesprit@gmail.com",
    emailsend: "",
    subject: "",
    message: "",
  });

  useEffect(()=>{
    const leaflet = window.L;
    
    leaflet.mapquest.key = 'UwYfiIYH4iLLIAGTJVTgZOuOd7Ndn61H';
    const baseLayer = leaflet.mapquest.tileLayer('map');

    const mapInstance = leaflet.mapquest.map('map', {
      center: [36.8978418,10.1876042],
      layers: baseLayer,
      zoom: 14,
  });

  
  leaflet.mapquest.textMarker([36.8992004,10.1875098], {
    text: 'Esprit',
    subtext: "ecole d'ingénieurs",
    position: 'right',
    type: 'marker',
    icon: {
      primaryColor: '#333333',
      secondaryColor: '#333333',
      size: 'sm'
    }
  }).addTo(leaflet.mapquest.Map.getMap('map'));
},[])

  const handleContact = async () => {
    axios
      .post("/mail", contact, { withCredentials: true })
      .then((res) => {
        console.log(res.status);
        console.log(res);
        if (res.status === 203) {
          alert(res.data);
        }
        if (res.status === 200) {
          props.history.push("/");
        }
      });

    setContact({
      email: "wecodeesprit@gmail.com",
      emailsend: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (e) => {
    
    setContact({ ...contact, [e.target.name]: e.target.value });
    
    console.log(contact);
  };

  
  return (
      <>
    <section className="Form my-4 mx-5" style={{padding: 0, margin: 0, boxSizing: "border-box"}}>
      <div className="container">
        <div className="row no-gutters" style={{backgroundColor: "#ced1d3", borderRadius: "30px", boxShadow: "12px 12px 22px grey"}}>
          <div className="col-lg-5">
            <div style={{width:"90%", height:"535px", margin:"23px", boxShadow : "12px 12px 22px grey"}}>
            
            <div id="map" style={{height:'100%',width:'100%'}}>
                <p style={{ textAlign: 'center' }}>Map loading...</p>
            </div>
            </div>
          
          </div>
          <div className="col-lg-7 px-5 py-5">
            <h1 className="font-weight-bold py-3">WeCode</h1>
            <h4>Contact Form</h4>
            <form>
              <div className="form-row">
                <div className="col-lg-7">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control my-3 p-4"
                    name="emailsend"
                    value={contact.emailsend}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-7">
                  <input
                    type="text"
                    placeholder="Subject"
                    className="form-control my-3 p-4"
                    name="subject"
                    value={contact.subject}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-7">
                  <textarea
                    className="form-control my-3 p-4"
                    placeholder="Your Message"
                    name="message"
                    value={contact.message}
                    rows="3"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-7">
                  
                  <Btncss
                    type="button"
                    className="btn1"
                    id="btncontact"
                    onClick={handleContact}
                  >
                    Send
                  </Btncss>
                  
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

const Btncss = styled.button`
border:none;
outline: none;
height: 50px;
width: 100%;
background-color: black;
color: white;
border-radius: 10px;
font-weight: bold;
&:hover{
    background: white;
    border: 1px solid;
    color: black;
}
`;
