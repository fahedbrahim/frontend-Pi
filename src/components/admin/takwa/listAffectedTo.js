
import {useDispatch ,useSelector } from "react-redux";
import {loginUserfind, selectConnectuser } from "../../../redux/slices/userSlice";
import "../../../styles/admin/Users.css";
import React, { useEffect ,useState} from 'react'
import addDelivery from "../../../assets/addDelivery.jpg";
import axios from "axios";

import { useLocation } from "react-router-dom";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

export default function ListAffectedTo(props) {
  
  const [deliveries,setDeliveries]= useState([]);
  const [clients,setClients]= useState([]);


  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.state.idDel); // result: 'some_value'
    const idDel=location.state.idDel;

    axios.get('/freeDelivery/affectedTo/'+idDel).then(response => {
      setClients(response.data)
        console.log(response.data)
  })
 }, [location]);

  
 /* useEffect(() => {
    const idDel=props.match.params.idDel;
    console.log("hhhhhhhhhhhhh")

    console.log(idDel);
    axios.get('/freeDelivery/affectedTo/'+idDel).then(response => {
     //   setData(response.data)
        console.log(response.data)
    })
}, []);*/

  return (

    <div>
      




<section style={{height:"1100px"}}>

<div className="row" >

<div className="col-sm-8 col-md-11 " id="tableUsers">
<div className=" table-responsive-sm">
<table className="table">
<thead>
  <tr >
    <th scope="col">#</th>
    <th scope="col">customer</th>

    <th scope="col">Action</th>
  </tr>
  
</thead>
<tbody>

      <th  scope="row"></th>
      {clients.data == null
                  ? "wait"
                  : clients.data.map((el, index) => (
                    <tr>
      <th  scope="row">{index}</th>

                    <td>{el}</td>
                   

       

      <td >
        <span className="icon mr-3">

          <i class="fa fa-check-circle" style={{color : "green"}}></i>
        </span>
        <span className="icon mr-3">

        <i class="fa fa-ban"  style={{color : "red"}} ></i>
        </span>
        <span className="icon mr-3" >

        </span>
      </td>
      </tr>
     
     ))}

</tbody>

</table>

</div>

</div>

</div>
</section>
</div>
    );
}
