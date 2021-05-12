import React, { Component ,useState} from 'react'
import ChatBot from 'react-simple-chatbot';
import {loginUserfind, selectConnectuser } from "../../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux"; 
import axios from "axios";
import { isDate } from 'moment';
import { ThemeProvider } from 'styled-components';
import * as moment from 'moment'
import dateFormat from 'dateformat';
import { format } from 'date-fns';



export default function Chatbot (){
  const [connectUser, error] = useSelector(selectConnectuser);
const user=connectUser.email;
const userId=connectUser.id;





  const [date, setDate] = useState("");
  
  //const [dateClaim, setDateClaim] = useState(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Date.now()));
  const [dateClaim, setDateClaim] = useState(format(new Date(), 'yyyy/MM/dd kk:mm:ss'));

  const [QRcode, setQRcode] = useState("");
  const [type, setType] = useState("");
  const [etat, setEtat] = useState("pending");
// all available props
const theme = {
  background: '#f5f8fb',
 // fontFamily: 'Helvetica Neue',
  headerBgColor: '#EF6C00',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#EF6C00',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
  
};
 function handleEnd({ steps, values }) {
     console.log(steps);
     console.log(values);
     console.log(values[2])
     var date=values[1];
     var QRcode=values[2];
     var type=values[3];
     var description ="nothing";
     if(type=="other") {
        description = values[4];
     }

     

   //  setDate( values[1]) ;
     //setQRcode(values[2]);
    // setType(values[3]);

     console.log(date);

   const claim = {
     date,
     dateClaim,
     QRcode,
      type,
      etat,
      user,
      userId,

      description
    
    
        // author: this.state.author 
    };
    console.log(claim);

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios.post(`/claim/add`, claim,config)
        .then(async res => {
          //  console.log(res.data.data._id)
            if (res.status === 200 || res.status === 201 ) {
                console.log("create succefully")
            } else {
                
                console.log(' none ')
            }
        })

  }



 
return  (
  <div>
    <section className="breadcrumb_part">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="breadcrumb_iner">
                        <h2>make a complaint</h2>
                    </div>
                </div>
            </div>
        </div>
        
    </section>
    <div className="col-lg-4 col-md-6 col-sm-8 col-10 m-auto">
    <ThemeProvider theme={theme}>
    <ChatBot
                            headerTitle="Smart delivery Bot"
                            speechSynthesis={{ enable: true, lang: 'en' }}
                            handleEnd={handleEnd}
                            steps={[
                              {
                                id: '0',
                                message: 'hi,' + connectUser.username + ', if you want to make a complaint about your delivery, i can help you ',
                                trigger: 'Q',
                              
                              },
                              {
                                id: 'Q',
                                options: [
                                    { value: 'Yes', label: 'yes,i want', trigger: 'Yes' },
                                    { value: 'No', label: 'no, thanks', trigger: 'bye' },
                                ],
                            },
                            {
                              id: 'Yes',
                              message: ' enter the delivery date to claim , respect the format (dd/mm/yyyy) please ! ',
                              trigger: 'date',
                          },
                          {
                            id: 'date',
                            user: true,
                            trigger: 'Q2',
                            validator: (value) => {
                              var parts = value.split("/");
                              var day = parseInt(parts[0], 10);
                              var month = parseInt(parts[1], 10);
                              var year = parseInt(parts[2], 10);
                              if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value))
                                { // Parse the date parts to integers
                                 
                                  return'Please enter a valid date.';

                                 
                                }
                              else  if(year < 1000 || year > 2022 || month == 0 || month > 12) 
                                // Check the ranges of month and year
                               {
                                return'Please enter a valid date.';
                              }
                               else {
                                  return true;
                               }
                              
                           },
                        },
                          {
                            id: 'Q2',
                            message: ' now enter the QR package code to claim ',
                            trigger: 'QRcode',
                        },
                        {
                          id: 'QRcode',
                          user: true,
                          trigger: 'Q3',
                      },
                      {
                        id: 'Q3',
                        message: 'choose your type of claim to passed',
                        trigger: 'claim',
                      
                      },
                      {
                        id: 'claim',
                        options: [
                            { value: 'delivery delay', label: 'delivery delay', trigger: 'submit' },
                            { value: 'delivery not received', label: 'delivery not received', trigger: 'submit' },
                            { value: 'package in bad state', label: 'package in bad state', trigger: 'submit' },
                            { value: 'other', label: 'other', trigger: 'other' },


                        ],
                    },
                    {
                      id: 'other',
                      message: ' describe your claim ',
                      trigger: 'description',
                  },
                    {
                      id: 'description',
                      user: true,
                      trigger: 'submit',
                  },

                              {
                                id: 'submit',
                                message: 'Thanks! Your claim was submitted successfully!',
                                end:true,
                               },
                               {
                                id: 'bye',
                                message: 'Thanks! bye!',
                               // end:true,
                               },
                              

                            ]}

                        />
                        </ThemeProvider>
                        </div>
  </div>


)


}