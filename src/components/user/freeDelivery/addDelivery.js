import React, { Component ,useState} from 'react'
import "../../../styles/user/editDelivery.css";
import {loginUserfind, selectConnectuser } from "../../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
//import { useDispatch, useSelector } from "react-redux";
/*import {
  loginUserfind,
} from "../../redux/slices/freeDeliverySlice";*/
import login from "../../../assets/login.jpg";
import "../../../styles/user/style.css";



 function AddDelivery(props) {
	const [connectUser, error] = useSelector(selectConnectuser);
//	const user=connectUser.id;

	const user = {
		_id:connectUser.id,
		username:connectUser.username,
		email:connectUser.email,
		password:"password",
		adresse:connectUser.adresse,
		phone:connectUser.phone,
		role:connectUser.role,
	}

	const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [  destination, setDestination] = useState("");

  const [ville, setVille] = useState("");
  const [vehicle, setVehicule] = useState("");

  const [state, setState] = useState("valid");
  const [constraint, setConstraint] = useState("nothing");
  const [packageSize, setPackageSize] = useState("");
  const [quantite, setQuantite] = useState();
  const [quantiteDispo, setQuantiteDispo] = useState("");

  /*constructor(props) {
    super(props);

    this.state = {
    //  fromDate: "",
      toDate: "",
      governorate: "",
      ville: "",
      vehicle: "",
      state: "valid",
      constraint: "",
      packageSize: "",

    }

}*/

const dispatch = useDispatch();


 const handleChange= event => {
   setState({ [event.target.name]: event.target.value });
};


const handleSubmit = event => {
        event.preventDefault();

        // setState({[quantiteDispo]:quantite}) 
		 console.log(quantiteDispo);
        const freeDelivery = {
          user,
         fromDate,
         toDate,
          governorate,
		  destination,
          ville,
          vehicle,
         state,
         constraint,
        packageSize,
		quantite,
		quantiteDispo
		
            

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
            props.history.push("/homeuser/user/listDeliveries")


            } else {
                
                console.log(' none ')
            }
        })

       

    }



 

  return (
<div>
	<section className="breadcrumb_part">
	<div className="container">
		<div className="row">
			<div className="col-lg-12">
				<div className="breadcrumb_iner">
					<h2> Delivery</h2>
				</div>
			</div>
		</div>
	</div>
</section>
<body>
	<div className="container-contact100">
		<div className="wrap-contact100">
			<form className="contact100-form validate-form">
				<span className="contact100-form-title">
				Post your delivery
				</span>

			
				<div className="wrap-input100 validate-input bg1 rs1-wrap-input100" data-validate = "Enter Your Email (e@a.x)">
					<span className="label-input100">from Date</span>
					<input className="input100" type="date"  placeholder="Enter Your Date "
                    name="fromDate"
                    value={state.fromDate}
					onChange={(e) => setFromDate(e.target.value)}/>
				</div>

				<div className="wrap-input100 bg1 rs1-wrap-input100">
					<span className="label-input100">to date</span>
					<input className="input100" type="date"  placeholder="Enter your date"
                    name="toDate"
                    value={state.toDate}
					onChange={(e) => setToDate(e.target.value)}/>
					
				</div>

				<div className="wrap-input100 input100-select bg1">
					<span className="label-input100">Delivering to</span>
					<div>
						<select className="js-select2" name="governorate" value={state.governorate} onChange={(e) => setGovernorate(e.target.value)}>
                        <option >  Please chooses </option>
                    <option value="Tunis">Tunis</option>
                    <option value="Ariana">Ariana</option>
                    <option value="Sousse">Sousse</option>
                    <option value="Monastir">Monastir</option>
                    <option value="Mahdia">Mahdia</option>
                    <option value="Sfax">Sfax</option>
                    <option value="Gafsa">Gafsa</option>
						</select>
						<div className="dropDownSelect2"></div>
					</div>
				</div>

                <div className="wrap-input100 validate-input bg1" data-validate="Please Type Your Name">
					<span className="label-input100">ville</span>
					<input 
                    className="input100" type="text"classNameName="form-control my-3 p-4"
                    name="ville"
                    value={state.ville}
                    onChange={(e) => setVille(e.target.value)}/>
				</div>

				<div className="wrap-input100 validate-input bg1" data-validate="Please Type Your Name">
					<span className="label-input100">destination</span>
					<input 
                    className="input100" type="text"className="form-control my-3 p-4"
                    name="destination"
                    value={state.destination}
                    onChange={(e) => setDestination(e.target.value)}/>
				</div>
                
                <div className="wrap-input100 input100-select bg1">
					<span className="label-input100">vehicle </span>
					<div>
						<select className="js-select2"  name="vehicle" value={state.vehicle} onChange={(e) => setVehicule(e.target.value)}>
                        <option >  Please chooses </option>
                        <option value="van">van</option>
                    <option value="car">car</option>
                    <option value="bicycle">bicycle</option>
						</select>
						<div className="dropDownSelect2"></div>
					</div>
				</div>

                <div className="wrap-input100 input100-select bg1">
					<span className="label-input100">package size </span>
					<div>
						<select className="js-select2"  name="packageSize" value={state.packageSize} onChange={(e) => setPackageSize(e.target.value)}>
                        <option >  Please chooses </option>
                        <option value="big">big</option>
                    <option value="meduim">meduim</option>
                    <option value="small">small</option>
						</select>
						<div className="dropDownSelect2"></div>
					</div>
				</div>

				<div className="wrap-input100 validate-input bg1" data-validate="Please Type Your Name">
					<span className="label-input100">quantite</span>
					<input 
                    className="input100" type="number"classNameName="form-control my-3 p-4"
                    name="quantite"
                    value={state.quantite }
                    onChange={(e) => setQuantite(e.target.value) }

					

						
					 />
				</div>


				<div className="w-full dis-none js-show-service">
					<div className="wrap-contact100-form-radio">
						<span className="label-input100">What type of products do you sell?</span>

						<div className="contact100-form-radio m-t-15">
							<input className="input-radio100" id="radio1" type="radio" name="type-product" value="physical" checked="checked"/>
							<label className="label-radio100" for="radio1">
								Phycical Products
							</label>
						</div>

                        

						<div className="contact100-form-radio">
							<input className="input-radio100" id="radio2" type="radio" name="type-product" value="digital"/>
							<label className="label-radio100" for="radio2">
								Digital Products
							</label>
						</div>

						<div className="contact100-form-radio">
							<input className="input-radio100" id="radio3" type="radio" name="type-product" value="service"/>
							<label className="label-radio100" for="radio3">
								Services Consulting
							</label>
						</div>
					</div>

					<div className="wrap-contact100-form-range">
						<span className="label-input100">Budget *</span>

						<div className="contact100-form-range-value">
							$<span id="value-lower">610</span> - $<span id="value-upper">980</span>
							<input type="text" name="from-value"/>
							<input type="text" name="to-value"/>
						</div>

						<div className="contact100-form-range-bar">
							<div id="filter-bar"></div>
						</div>
					</div>
				</div>

				<div className="wrap-input100 validate-input bg0 rs1-alert-validate" data-validate = "Please Type Your constraint">
					<span className="label-input100">Constraint</span>
					<textarea className="input100" name="constraint"
                    value={state.constraint}
                    onChange={(e) => setConstraint(e.target.value)} placeholder="Your constraint here..."></textarea>
				</div>

				<div className="container-contact100-form-btn">
					<button className="contact100-form-btn"  onClick={handleSubmit}>
						<span>
							Submit
							<i className="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
						</span>
					</button>
				</div>
			</form>
		</div>
	</div>



	<script src="/form/vendor/select2/select2.min.js"></script>

	<script src="/form/vendor/jquery/jquery-3.2.1.min.js"></script>

	<script src="/form/vendor/animsition/js/animsition.min.js"></script>
	<script src="/form/vendor/bootstrap/js/popper.js"></script>
	<script src="/form/vendor/bootstrap/js/bootstrap.min.js"></script>
	
	<script src="/form/vendor/daterangepicker/moment.min.js"></script>
	<script src="/form/vendor/daterangepicker/daterangepicker.js"></script>
	<script src="/form/vendor/countdowntime/countdowntime.js"></script>
	<script src="/form/vendor/noui/nouislider.min.js"></script>
	
	<script src="/form/js/main.js"></script>

<script async src="https://www.googletagmanager.com/gtag/js?id=UA-23581568-13"></script>


</body>
</div>
  );

}

export default AddDelivery