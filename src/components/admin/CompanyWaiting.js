import {useEffect,useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import {useDispatch ,useSelector } from "react-redux";
import {loginUserfind, selectConnectuser, } from "../../redux/slices/userSlice";
import {fetchCompanies, selectCompanies, deleteCompany} from "../../redux/slices/admin/compwaitSlice"
import "../../styles/admin/Users.css";
import {FetchWeather} from './weather/FetchWeather'
import ReactPaginate from 'react-paginate'
import { addUser } from '../../redux/slices/admin/usersSlice';

export default function CompanyWaiting (props){

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
    const [companies, err] = useSelector(selectCompanies);
    const [company, setCompany]= useState({username: "", email: "", password: "", adresse: "", phone: "", role: ""})
    const [pageNumber, setPageNumber]= useState(0);


    useEffect( async()=>{
        if(Cookies.get('connect.sid') ){
          
        }else{
          await axios
         .get("/auth/logout", { withCredentials: true })
         .then((res) => {
               console.log(res)
               localStorage.removeItem("userInfo");
               dispatch(loginUserfind(res.data));
               props.history.push('/');
          } ) }
      
    },[Cookies.get()])

    useEffect(()=>{
        if(Cookies.get('connect.sid') ){
          if(connectUser.role === "admin"){
            dispatch(fetchCompanies());
         }
        }
      },[dispatch])

      const handledelete = (id)=>{
        axios.delete(`/compwait/${id}`,{ withCredentials: true }).then((res,err)=>{
          if(err){
          alert (err)
        }else{
          dispatch(deleteCompany(id))
        }})
        
      }
      
      const handleadd= async (company)=>{
          setCompany({username: company.username ,
                      email: company.email,
                      password: company.password,
                      adresse: company.adresse,
                      phone: company.phone,
                      role: company.role})
        axios.post('/compwait/add', company, { withCredentials: true }).then((res,err)=>{
            if(err){
                alert (err)
              }else{
                  dispatch(addUser(res))
                  props.history.push('/homeuser/admin/company')
              }
        })
      }

    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;

    const displayCompanies = companies.filter((company)=>{
        if(searchTerm === ""){
          return company}else if(company.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              company.adresse.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              company.phone.toLowerCase().includes(searchTerm.toLowerCase())
                              ){
                                return company
          }
      }).slice(pagesVisited, pagesVisited + usersPerPage).map((company, index)=>
      (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>{company.username}</td>
          <td>{company.email}</td>
          <td>{company.adresse}</td>
          <td>{company.phone}</td>
          <td>
            <span className="icon mr-3">
            <button style={{border:'none', background:'none'}} onClick={()=>handleadd(company)}>
              <i className="fa fa-check" style={{color : "green"}}></i>
              </button>
            </span>
            <span className="icon" >
            <button style={{border:'none', background:'none'}} onClick={()=>handledelete(company._id)}>
              <i className="fa fa-trash" style={{color : "red"}} ></i>
              </button>
            </span>
          </td>
        </tr>
          )
      )


    const companiesArray = []
    companies.map(user =>(companiesArray.push(user)))
    
    const pageCount = Math.ceil(companiesArray.length / usersPerPage);


    const changePage = ({selected})=>{
    setPageNumber(selected)
    }

    return (
        <>
            <div className="row col-lg-4 my-3 px-3" style={{background:"rgba(250, 250, 250, 0.85)", boxShadow:"5px 5px 15px rgba(0, 0, 0, 0.5)"}}>
      
      <input type="text" className="form-control my-3 col-3 " placeholder="Country..." value={query} onChange={(e)=>setQuery(e.target.value)} onKeyPress={search} />&ensp;
      {weather.main && (
      
        <div className="my-3 " style={{fontSize:"25px", display:"flex", flexWrap:"nowrap"}}>
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
          
          <div className="col-sm-8 col-md-11 " id="tableUsers">
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
              {displayCompanies}
                  
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
    )
}