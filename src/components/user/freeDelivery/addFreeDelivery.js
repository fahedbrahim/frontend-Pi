import React, { Component ,useState} from 'react'
import "../../../styles/user/editDelivery.css";

import axios from "axios";
//import { useDispatch, useSelector } from "react-redux";
import {
  loginUserfind,
} from "../redux/slices/freeDeliverySlice";
import login from "../assets/login.jpg";



export class AddFreeDelivery extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: "",
      fromDate: "",
      toDate: "",
      governorate: "",
      ville: "",
      vehicle: "",
      state: "valid",
      constraint: "",
      packageSize: "",
    }

}


handleChange = event => {
  this.setState({ [event.target.name]: event.target.value });
};


    handleSubmit = event => {
        event.preventDefault();

        const { user, fromDate, toDate, governorate, ville, vehicle, state,constraint,packageSize} = this.state; //object disctructor

        const freeDelivery = {
          user: this.state.user,
          fromDate: this.state.fromDate,
          
          toDate: this.state.toDate,
          governorate: this.state.governorate,
          ville: this.state.ville,
          vehicle: this.state.vehicle,
          state: this.state.state,
          constraint: this.state.constraint,
          packageSize: this.state.packageSize,
            

            // author: this.state.author 
        };

        console.log(freeDelivery)

        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        axios.post(`/freeDelivery/add`, freeDelivery,config)
        .then(async res => {
          //  console.log(res.data.data._id)
            if (res.status === 200 || res.status === 201 ) {
                console.log("hhhhhhhhh")
                this.props.history.push("/listDeliveries2")


            } else {
                
                console.log(' none ')
            }
        })

       

    }



  render() {

  return (
<div>
<section className="breadcrumb_part">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="breadcrumb_iner">
                        <h2>Post delivery</h2>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="Form my-4 mx-5" id="secregister">
      <div className="container">
        <div className="row no-gutters" id="rowregister">
        <div className="col-lg-3">
                    </div>
          <div className="col-lg-7 px-5 py-5">
            <h1 className="font-weight-bold py-3"></h1>
            <h4></h4>
            
            <form >
            <div className="text-center">
            <div className="form-row">
                <div className="col-lg-7">
                
                  <input
                    type="text"
                    className="form-control my-3 p-4"
                    name="user"
                    value={this.state.user}
                    onChange={this.handleChange}
                  />
               
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-7">
                  <input
                    type="date"
                    className="form-control my-3 p-4"
                    name="fromDate"
                    value={this.state.fromDate}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="col-lg-7">
                  <input
                    type="date"
                    className="form-control my-3 p-4"
                    name="toDate"
                    value={this.state.toDate}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
        
              <div className="form-row">
                <div className="col-lg-7">
                  <select className="custom-select custom-select-lg mb-3" name="governorate" value={this.state.governorate} onChange={this.handleChange}>
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
                    value={this.state.ville}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
             
              <div className="form-row">
                <div className="col-lg-7">
                  <select className="custom-select custom-select-lg mb-3" name="vehicle" value={this.state.vehicle} onChange={this.handleChange}>
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
                    value={this.state.constraint}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
             
              <div className="form-row">
                <div className="col-lg-7">
                  <select className="custom-select custom-select-lg mb-3" name="packageSize" value={this.state.packageSize} onChange={this.handleChange}>
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
                    onClick={this.handleSubmit}
                  > Post
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
}

export default AddFreeDelivery