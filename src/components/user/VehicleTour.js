import {useEffect, useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import {useDispatch ,useSelector } from "react-redux";
import {loginUserfind, selectConnectuser, } from "../../redux/slices/userSlice";
import ReactPaginate from 'react-paginate'



export default function VehicleTour (props){

    
    const [connectUser, error] = useSelector(selectConnectuser);
    const dispatch = useDispatch();
    
    const [items, setItems]= useState([]);
    const [pageNumber, setPageNumber]= useState(0);
    const [searchTerm, setSearchTerm]=useState('')
    

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
      
    },[Cookies.get(), dispatch])

    useEffect(async ()=>{
      axios.get(`/geo/all/${connectUser.id}`,{ withCredentials: true }).then(res=>{
        
        setItems(res.data.reverse())
      })
      
    },[])

    const handleShow = (item)=>{
      props.history.push(`/homeuser/user/circuit/${item._id}`)
    }
    const handleUpdate = (item)=>{
      props.history.push(`/homeuser/user/updatecircuit/${item._id}`)
    }
  
  const itemsPerPage = 10;
  const pagesVisited = pageNumber * itemsPerPage;

  const displayCircuits = items.filter((item)=>{
    const dd = new Date(item.date)
    console.log(dd.getDate()+"/"+(dd.getMonth()+1)+"/"+dd.getFullYear())
    
    if(searchTerm === ""){
      return item}else if(item.name.toLowerCase().includes(searchTerm.toLowerCase())
                          ){
                            return item
      }
  }).slice(pagesVisited, pagesVisited + itemsPerPage).map((item, index)=>
  (
    <tr key={index}>
      <th scope="row">{index}</th>
      <td>{item.name}</td>
      <td>{item.departure}</td>
      <td>{new Date(item.date).getDate()+"/"+(new Date(item.date).getMonth()+1)+"/"+new Date(item.date).getFullYear()}</td>
      <td style={{display:'flex', justifyContent:'center'}}>
        <span className="icon mr-3" >
        <button style={{border:'none', background:'none'}} onClick={()=>handleShow(item)}>
          <i className="fa fa-map" style={{color : "grey"}} ></i>
          </button>
        </span>
        <span className="icon" >
        <button style={{border:'none', background:'none'}} onClick={()=>handleUpdate(item)}>
        <i className="fa fa-pencil" style={{color : "green"}}></i>
          </button>
        </span>
        
      </td>
    </tr>
      )
  )
  
const itemsArray = []
items.map(item =>(itemsArray.push(item)))
  
const pageCount = Math.ceil(itemsArray.length / itemsPerPage);

const changePage = ({selected})=>{
  setPageNumber(selected)
}

    return (
      <>
        <div className="row">
    <input className="form-control col-lg-3 mt-4" type="search" placeholder="Search..." name="searchTerm" onChange={(e)=>{setSearchTerm(e.target.value)}}/>
    <div className="col-9"></div>
    </div>
    <button type="button" className="btn btn-primary mt-2" onClick={()=>{props.history.push('/homeuser/user/addcircuit')}}>New Tour</button>
        <section style={{height:"1100px"}}>
        <div className="row" >
        
        <div className="col-sm-8 col-md-11 " id="tableUsers">
          <div className=" table-responsive-sm">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Start</th>
                <th scope="col">Creation Date</th>
                <th scope="col" style={{display:'flex', justifyContent:'center'}}>Action</th>
              </tr>
            </thead>
            <tbody>
            {displayCircuits}
                
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