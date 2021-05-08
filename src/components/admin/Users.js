import { useEffect, useState } from "react";
import axios from 'axios'
import Cookies from 'js-cookie';
import {useDispatch ,useSelector } from "react-redux";
import {loginUserfind, selectConnectuser } from "../../redux/slices/userSlice";
import "../../styles/admin/Users.css";
import { Link } from "react-router-dom";
import { selectUsers, fetchUsers, deleteUser, selectUser } from "../../redux/slices/admin/usersSlice";
import ReactPaginate from 'react-paginate'
import {FetchWeather} from './weather/FetchWeather'



export default function Users(props) {
  
  var weatherLocate = localStorage.getItem("weatherInfo") ? localStorage.getItem("weatherInfo") : localStorage.setItem("weatherInfo", "Tunis")
  const [query, setQuery]=useState('')
  const [weather, setWeather]=useState({})
  const [searchTerm, setSearchTerm]=useState('')

  const search = async(e)=>{
    if(e.key == "Enter"){
    const data = await FetchWeather(query)
    setWeather(data)
    setQuery('')
    localStorage.setItem("weatherInfo", query)
    }
  } 

  useEffect(async()=>{
    const data = await FetchWeather(weatherLocate)
    setWeather(data)
  },[FetchWeather])
  
  
  const [connectUser, error] = useSelector(selectConnectuser);
  const dispatch = useDispatch();
  const [users, err] = useSelector(selectUsers);
  const [pageNumber, setPageNumber]= useState(0);
  console.log(users);

  useEffect( async()=>{
    if(Cookies.get('connect.sid') ){
      
    }else{
      await axios
     .get("/auth/logout", { withCredentials: true })
     .then((res) => {
           
           localStorage.removeItem("userInfo");
           dispatch(loginUserfind(res.data));
           props.history.push('/');
      } ) }
  
},[Cookies.get()])

useEffect(()=>{
  if(Cookies.get('connect.sid') ){
    if(connectUser.role === "admin"){
      dispatch(fetchUsers());
   }
  }
},[dispatch])
const handledelete = (id)=>{
  axios.delete(`/users/${id}`,{ withCredentials: true }).then((res,err)=>{
    if(err){
    alert (err)
  }else{
    dispatch(deleteUser(id))
  }})
  
}

const handleupdate= (user)=>{
  dispatch(selectUser(user))
  props.history.push(`/homeuser/admin/updateuser/${user._id}`)
}

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = users.filter((user)=>{
    if(searchTerm === ""){
      return user}else if(user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.adresse.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.phone.toLowerCase().includes(searchTerm.toLowerCase())
                          ){
                            return user
      }
  }).filter((user)=>{
    if (user.role === 'user'){
      return user
    }
  }).slice(pagesVisited, pagesVisited + usersPerPage).map((user, index)=>
  (
    <tr key={index}>
      <th scope="row">{index}</th>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.adresse}</td>
      <td>{user.phone}</td>
      <td>
        <span className="icon mr-3">
        <button style={{border:'none', background:'none'}} onClick={()=>handleupdate(user)}>
          <i className="fa fa-pencil" style={{color : "green"}}></i>
          </button>
        </span>
        <span className="icon" >
        <button style={{border:'none', background:'none'}} onClick={()=>handledelete(user._id)}>
          <i className="fa fa-trash" style={{color : "red"}} ></i>
          </button>
        </span>
      </td>
    </tr>
      )
  )
  
const usersArray = []
users.filter((user)=>{
  if (user.role === 'user'){
    return user
  }
}).map(user =>(usersArray.push(user)))
  
const pageCount = Math.ceil(usersArray.length / usersPerPage);


const changePage = ({selected})=>{
  setPageNumber(selected)
}


  return (
    <>
    <div className="row col-lg-4 my-3 px-3" style={{background:"rgba(250, 250, 250, 0.85)", boxShadow:"5px 5px 15px rgba(0, 0, 0, 0.5)"}}>
      
    <input type="text" className="form-control my-3 col-3 " placeholder="Country..." value={query} onChange={(e)=>setQuery(e.target.value)} onKeyPress={search} />&ensp;
    {weather.main && (
    
      <div className="my-3 " style={{fontSize:"20px", display:"flex", flexWrap:"nowrap"}}>
        <strong>
          {weather.name} </strong><span style={{fontSize:"10px"}}>{weather.sys.country}</span>&ensp;
          <strong>
          {Math.round(weather.main.temp)}
          <sup>&deg;C</sup>
        </strong>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} style={{height:"50px", width:"50px"}} />
      </div>
    
    )}
    
    </div>
    <input className="form-control col-3" type="search" placeholder="Search..." name="searchTerm" onChange={(e)=>{setSearchTerm(e.target.value)}}/>
    <section style={{height:"1100px"}}>
      <div className="row" >
        
        <div className="col-sm-8 col-md-11 "  style={{border: "1px solid #eeeeee",boxShadow: "12px 12px 22px grey",marginTop: "20px",marginBottom: "50px"}}>
          <div className=" table-responsive-sm">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            {displayUsers}
                
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
    </>
  );
}
