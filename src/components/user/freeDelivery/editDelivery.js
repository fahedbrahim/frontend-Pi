import React, { useEffect ,useState} from 'react'

import "../../../styles/user/editDelivery.css";
import addDelivery from "../../../assets/addDelivery.jpg";
import axios from "axios";
//import { useDispatch, useSelector } from "react-redux";
/*import {
  loginUserfind,
} from "../../redux/slices/freeDeliverySlice"; */



export default function EditDelivery(props)  {

  const [deliveries,setDeliveries]= useState([]);
  const [data,setData]=useState({
    user: "",
      fromDate: "",
      toDate: "",
      governorate: "",
      ville: "",
      vehicle: "",
      state: "valid",
      constraint: "",
      packageSize: "",

  })

  useEffect(() => {
    const id=props.match.params.id
    axios.get('/freeDelivery/'+id).then(response => {
        setData(response.data)
        console.log(response.data)
    })
}, []);

function handle(e) {
 /* const newdata={...data}
  newdata[e.target.id] =e.target.value
   setData(newdata)*/
   setData({ [e.target.name]: e.target.value });

};



function submit (e) {
  e.preventDefault()
  const id=props.match.params.id
  axios.put('/freeDelivery/update/'+id,data).then(response => {
      console.log(response.data)
      props.history.push("/homeuser/user/listDeliveries")
  }).catch(err=>console.error(err))
}

  
  return(

  



    <div>
<section className="breadcrumb_part">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="breadcrumb_iner">
                        <h2>Update delivery</h2>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="Form my-4 mx-5" id="secregister">
      <div className="container">
        <div className="row no-gutters" id="rowregister">
        
          <div className="col-lg-7 px-5 py-5">
            <h1 className="font-weight-bold py-3">Update your personal delivery</h1>
            <h4></h4>
            
            <form >
            <div className="text-center">
            <div className="form-row">
                <div className="col-lg-7">
                  <input
                    type="text"
                    className="form-control my-3 p-4"
                    name="user"
                    value={data.user}
                    onChange={(e)=>handle(e)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-7">
                  <input
                    type="date"
                    className="form-control my-3 p-4"
                    name="fromDate"
                    value={data.fromDate}
                    onChange={(e)=>handle(e)}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-7">
                  <input
                    type="date"
                    className="form-control my-3 p-4"
                    name="toDate"
                    value={data.toDate}
                    onChange={(e)=>handle(e)}
                  />
                </div>
              </div>
        
              <div className="form-row">
                <div className="col-lg-7">
                  <select className="custom-select custom-select-lg mb-3" name="governorate" value={data.governorate} onChange={(e)=>handle(e)}>
                    <option > Delivering to </option>
                    <option value="Tunis">Tunis</option>
                    <option value="Ariana">Ariana</option>
                    <option value="Sousse">Sousse</option>
                    <option value="Monastir">Monastir</option>
                    <option value="Mahdia">Mahdia</option>
                    <option value="Sfax">Sfax</option>
                    <option value="Gafsa">Gafsa</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-7">
                  <input
                    type="text"
                    placeholder="ville"
                    className="form-control my-3 p-4"
                    name="ville"
                    value={data.ville}
                    onChange={(e)=>handle(e)}
                  />
                </div>
              </div>
             
              <div className="form-row">
                <div className="col-lg-7">
                  <select className="custom-select custom-select-lg mb-3" name="vehicle" value={data.vehicle} onChange={(e)=>handle(e)}>
                    <option > vehicle </option>
                    <option value="van">van</option>
                    <option value="car">car</option>
                    <option value="bicycle">bicycle</option>
                  </select>
                </div>
              </div>
             
              <div className="form-row">
                <div className="col-lg-7">
                  <input
                    type="text"
                    placeholder="constraint"
                    className="form-control my-3 p-4"
                    name="constraint"
                    value={data.constraint}
                    onChange={(e)=>handle(e)}
                  />
                </div>
              </div>
             
              <div className="form-row">
                <div className="col-lg-7">
                  <select className="custom-select custom-select-lg mb-3" name="packageSize" value={data.packageSize} onChange={(e)=>handle(e)}>
                    <option > package size </option>
                    <option value="big">big</option>
                    <option value="meduim">meduim</option>
                    <option value="small">small</option>
                  </select>
                </div>
              </div>

       
              <div className="form-row">
                <div className="col-lg-7">
                  <button
                    type="button"
                    className="btn1"
                    id="btnregister"
                    onClick={(e)=>submit(e)}

                  > Update
                  </button>
                </div>
              </div>
              </div>

            </form>

          </div>
        </div>
      </div>
    </section>
    </div>
  
  );
}
