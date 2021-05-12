import React, { useEffect, useState } from "react";
import { Table, Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment" ;
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import MessengerCustomerChat from 'react-messenger-customer-chat';
import {loginUserfind, selectConnectuser } from "../../../redux/slices/userSlice";
import "../../../styles/user/table.scss";

//import { getAllPrestataire } from "../JS/Actions";
//import "../styles/login.css";



function ListFreeDelivery2(props) {
  const [claims,setClaims]= useState([]);
  const [search,setSearch]= useState("");
  const [SearchTerms,setSearchTerms] = useState("");
  const [connectUser, error] = useSelector(selectConnectuser);
  const user=connectUser.email;
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get('/claim/findByUser/'+user).then(response => {
        setClaims(response.data)
      //  console.log(response.data)
        //console.log(new Date());
        
    })
}, []);

function update (id) {
    console.log(id)
   props.history.push("/homeuser/user/editDelivery/"+id)

}
function remove(id){

  axios.delete('/claim/'+id).then(response => {
     

    axios.get('/claim/findByUser/'+user).then(response => {
      setClaims(response.data)
    //  console.log(response.data)
      //console.log(new Date());
      
  })
  })

}

const onChangeSearch = (event) => {
   console.log(event.currentTarget.value)
}







  //   const Presta = useSelector(state => state.Presta)
  return (
<div>

    

<section className="breadcrumb_part">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="breadcrumb_iner">
                        <h2>My claims</h2>
                    </div>
                </div>
            </div>
        </div>
        
    </section>
    <br/>
    <div className="col-lg-4 col-md-6 col-sm-8 col-10 m-auto">
        <div  className="input-group rounded"  htmlFor="search-input">
        <input
        className="form-control"
        type="text"
        placeholder="Search here by QRcode.."
        name="searchTerm"
        onChange={e=>{setSearch(e.target.value)}}>
        </input>
        <span class="input-group-text border-0" id="search-addon">
        <i className="fa fa-search" aria-hidden="true"/>
        </span>
        </div>
       </div> 


<table class="responstable">
  
  <tr>
    <th>Date claim</th>
    <th>Date delivery</th>
    <th data-th="Driver details"><span>QR code</span></th>
    <th>Type</th>
    <th>State</th>
    <th>Description</th>
    <th>Action</th>
  </tr>
  {claims == null
                  ? "wait"
                  : claims.filter(el => {
                      if (search=="") {
                          return el
                      }
                      else if (el.QRcode.toLowerCase().includes(search.toLowerCase())) {
                          return el
                      }
                  }).
                  map((el, index) => (
  
  <tr>
    
    <td>{ moment(el.dateClaim).format("DD/MM/YYYY")}</td>

    <td>{el.date}</td>
    <td>{el.QRcode}</td>
    <td>{el.type}</td>
    <td>{el.etat}</td>
    <td>{el.description}</td>
    <td><button  onClick={()=>remove( el._id)}  className="btn btn-danger"  > <FontAwesomeIcon icon={faTrash} /> </button></td>
  </tr>
  
  ))}
  
</table>
</div>
);
}

const details = styled.h2`
  text-transform: uppercase;
  color: #7A7B7B;
`;

export default ListFreeDelivery2;