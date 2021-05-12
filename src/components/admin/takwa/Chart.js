import { Pie, defaults } from 'react-chartjs-2'
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
import "../../../styles/user/style.css";
defaults.global.tooltips.enabled = false
defaults.global.legend.position = 'bottom'


function Chart(props) {
    const [deliveries,setDeliveries]= useState([]);
    const [countDelay,setCountDelay]= useState(0);
    const [countNR,setCountNR] = useState("");
    const [countPBS,setCountPBK] = useState("");
    const [countOther,setCountOther] = useState("");
    var delay ;
    const [connectUser, error] = useSelector(selectConnectuser);
    const user=connectUser.id;
    const dispatch = useDispatch();

      

    useEffect(() => {
      axios.get('/claim/countDelay').then(response => {
          setCountDelay( response.data)

      })

      axios.get('/claim/countNR').then(response => {
        setCountNR( response.data)

    })
    axios.get('/claim/countPBS').then(response => {
        setCountPBK( response.data)

    })
    axios.get('/claim/countOther').then(response => {
        setCountOther( response.data)

    })
  }, []);
  
  console.log(countDelay)

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
                      <h2>Delivery complaint statistics organized by type</h2>
                  </div>
              </div>
          </div>
      </div>
      
  </section>

        <div>

          
      <Pie
        data={{
            labels: ['delivery delay', 'delivery not received', 'package in bad state', 'other'],
            datasets: [
            {
              label: '# of votes',
              data: [countDelay, countNR, countPBS, countOther],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
            // {
            //   label: 'Quantity',
            //   data: [47, 52, 67, 58, 9, 50],
            //   backgroundColor: 'orange',
            //   borderColor: 'red',
            // },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },

        }}
      />
    </div>
    </div>
  
  );
  }
  
  const details = styled.h2`
    text-transform: uppercase;
    color: #7A7B7B;
  `;
export default Chart