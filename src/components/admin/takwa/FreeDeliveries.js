import React, { useEffect, useState } from "react";
import axios from 'axios'
import Cookies from 'js-cookie';
import {useDispatch ,useSelector } from "react-redux";
import {loginUserfind, selectConnectuser } from "../../../redux/slices/userSlice";
import "../../../styles/admin/Users.css";
import { Link } from "react-router-dom";
import { selectUsers } from "../../../redux/slices/admin/usersSlice";
import ReactPaginate from 'react-paginate'
import { NavLink } from "react-router-dom";
import listAffectedTo from "./listAffectedTo"
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ListAffectedTo from "./listAffectedTo"
import { useHistory } from "react-router-dom";

import moment from "moment" ;


export default function FreeDeliveries(props) {
  
  const [connectUser, error] = useSelector(selectConnectuser);
  const dispatch = useDispatch();
  const [users, err] = useSelector(selectUsers);
  const [pageNumber, setPageNumber]= useState(0);
  const [deliveries,setDeliveries]= useState([]);
  const [affectedTo,setAffectedTo]= useState([]);


  //console.log(users);
  var color ="0";
  useEffect(() => {
    axios.get('/freeDelivery').then(response => {

        setDeliveries(response.data)
        console.log(response.data)


    })
}, []);

function deliveriesAffectedTo(idDel) {
/*  console.log(idDel)
  props.history.push("/homeuser/admin/listAffectedTo/",{idDel:idDel}) */

  props.history.push({
    pathname: '/homeuser/admin/listAffectedTo',
    state: { idDel: idDel }
});
};




  const usersPerPage = 20;
  const pagesVisited = pageNumber * usersPerPage;
 

  const displayDeliveries = deliveries.slice(pagesVisited, pagesVisited + usersPerPage).map((delivery, index)=>
  (
     
   
    <tr  {...delivery.state == "valid" ? color="#80c1ff": color ="#ff8080"  }   style={{ background: color  }}  key={delivery._id}>
      <th  style={{ background: color  }} scope="row">{index}</th>
      {delivery !== null && delivery.user !== undefined ?
                                                                   
     <td  style={{ background: color  }}>{delivery.user.email}</td>
      : null
}
      <td  style={{ background: color  }}>{ moment(delivery.fromDate).format("DD/MM/YY")}</td>
      <td  style={{ background: color  }}>{ moment(delivery.toDate).format("DD/MM/YY")}</td>
      <td  style={{ background: color  }}>{delivery.governorate}</td>
      <td  style={{ background: color  }}>{delivery.ville}</td>
      <td  style={{ background: color  }}>{delivery.destination}</td>
      <td  style={{ background: color  }}>{delivery.vehicle}</td>
      <td  style={{ background: color  }}>{delivery.quantite}</td>
      <td  style={{ background: color  }}>{delivery.packageSize}</td>
      <td  style={{ background: color  }}>{delivery.state}</td>
      <td  style={{ background: color  }}>{delivery.constraint}</td>
      <td  style={{ background: color  }}>
      <button className="btn btn-dark"  onClick={()=>deliveriesAffectedTo(delivery._id)} >view list <i className="fa fa-angle-right" /> </button> 


     </td>
      <td  style={{ background: color  }}>
        <span className="icon mr-3">
          <Link to={`/homeuser/admin/update/${delivery._id}`}>
          <i className="fa fa-pencil" style={{color : "green"}}></i>
          </Link>
        </span>
        <span className="icon">
          <i className="fa fa-trash" style={{color : "red"}}></i>
        </span>
      </td>
    </tr>
      )
  )
  
const usersArray = []
const  affectedToArray = []
users.map(delivery =>(usersArray.push(delivery)))
  
const pageCount = Math.ceil(usersArray.length / usersPerPage);
console.log(pageCount)

const changePage = ({selected})=>{
  setPageNumber(selected)
}

  return (
    <section style={{height:"1300px"}}>
      <div className="row" >
        
        <div className="col-sm-8 col-md-11 ">
          <div className=" table-responsive-sm">
          <table className="table">
            <thead>
              <tr >
                <th scope="col">#</th>
                <th scope="col">author</th>

                <th scope="col">fromDate</th>
                <th scope="col">toDate</th>
                <th scope="col">governorate</th>
                <th scope="col">ville</th>
                <th scope="col">destination</th>
                <th scope="col">vehicle</th>
                <th scope="col">quantite</th>
               
                <th scope="col">package size</th>
                <th scope="col">state</th>
                <th scope="col">constraint</th>
                <th scope="col">customer</th>

                <th scope="col">Action</th>
              </tr>
              
            </thead>
            <tbody>
                {displayDeliveries}
                
            </tbody>
            
          </table>
          
          </div>
          <div style={{marginTop:"20px", display:"flex", justifyContent:"center"}} >
          <ReactPaginate 
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={"previousBttn"}
                  nextLinkClassName={"nextBttn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
            />
            </div>
        </div>
        
      </div>
    </section>
  );
}
