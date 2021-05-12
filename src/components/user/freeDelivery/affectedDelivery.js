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



function AffectedDelivery(props) {
  const [deliveries,setDeliveries]= useState([]);
  const [search,setSearch]= useState("");
  const [SearchTerms,setSearchTerms] = useState("");
  const [connectUser, error] = useSelector(selectConnectuser);
  const affectedTo=connectUser.email;
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get('/freeDelivery/findByAffectedUser/'+affectedTo).then(response => {
        setDeliveries(response.data)
        console.log(response.data)
    })
}, [deliveries]);

function update (id) {
    console.log(id)
   props.history.push("/homeuser/user/editDelivery/"+id)

}
function remove(id){

    axios.delete('/freeDelivery/'+id).then(response => {
        props.history.push("/homeuser/user/listDeliveries")
        console.log(response.data);
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
                        <h2>My delivery history</h2>
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
        placeholder="Search here by governorate.."
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
    <th>from date</th>
    <th data-th="Driver details"><span>to date</span></th>
    <th>governorate</th>
    <th>ville</th>
    <th>constraint</th>
  </tr>
  {deliveries == null
                  ? "wait"
                  : deliveries.filter(el => {
                      if (search=="") {
                          return el
                      }
                      else if (el.governorate.toLowerCase().includes(search.toLowerCase())) {
                          return el
                      }
                  }).
                  map((el, index) => (
  
  <tr>
    <td>{el.fromDate}</td>
    <td>{el.toDate}</td>
    <td>{el.governorate}</td>
    <td>{el.ville}</td>
    <td>{el.constraint}</td>
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

export default AffectedDelivery;