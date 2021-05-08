import {useEffect, useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';
import {useDispatch ,useSelector } from "react-redux";
import {loginUserfind, selectConnectuser, } from "../../redux/slices/userSlice";
import ReactPaginate from 'react-paginate'



export default function UpdateCircuit (props){

    
    const [connectUser, error] = useSelector(selectConnectuser);
    const dispatch = useDispatch();
    
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState("");
    const [start, setStart] = useState("");
    const [points, setPoints]= useState("");
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

    useEffect(()=>{
       
        axios.get(`/geo/${props.match.params.id}`,{ withCredentials: true }).then(res=>{
            setPoints(res.data.waypoints)
            setItems(res.data.destinations)
            setStart(res.data.departure)
        })
    },[])

    const addItem = async (event) => {
      event.preventDefault();
      setItems([
        ...items,
        {
          id: items.length,
          name: itemName,
        },
      ]);

      const intermidiaire = await axios
      .get(
        `https://geocode.search.hereapi.com/v1/geocode?q=${itemName}&apiKey=wxibHI6_dpOa-llEWT7lgZBJUCXvcVtpmYDHX333cIk`
      )
        //console.log(intermidiaire)
        setPoints([...points,intermidiaire.data.items[0].position])
        console.log(points.length)
        console.log(intermidiaire.data.items[0].position)
      setItemName("");
    };

    const affchange= async (e)=>{
      e.preventDefault();
      const startpoint = await axios
        .get(
          `https://geocode.search.hereapi.com/v1/geocode?q=${start}&apiKey=wxibHI6_dpOa-llEWT7lgZBJUCXvcVtpmYDHX333cIk`
        )
        
    const route = { 
      departure : start,
      items : items,
      start : startpoint.data.items[0].position,
      points : points,
      idcreator: connectUser.id
      } 
    //console.log(route)

    const intermidiaire = await axios.put(`/geo/${props.match.params.id}`,route,{ withCredentials: true })
    console.log(intermidiaire)
    props.history.push('/homeuser/user/vehicletour')
  }

  const handledelete = async (dest)=>{
    
    const rows = items.filter((item)=>item.id !== dest.id)
    setItems(rows)
    console.log(items)
    const intermidiaire = await axios
      .get(
        `https://geocode.search.hereapi.com/v1/geocode?q=${dest.name}&apiKey=wxibHI6_dpOa-llEWT7lgZBJUCXvcVtpmYDHX333cIk`
      )

      const index = points.findIndex((item) => item.lng === intermidiaire.data.items[0].position.lng);
            if (index !== -1) {
                points.splice(index, 1);
            }

      // const rowspoints = points.filter((point)=> point.value !== intermidiaire.data.items[0].position)
      // console.log(rowspoints)
      console.log(points)
      


  }

  
  const itemsPerPage = 10;
  const pagesVisited = pageNumber * itemsPerPage;

  const displayItems = items.filter((item)=>{
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
      <td style={{display:'flex', justifyContent:'center'}}>
        <span className="icon" >
        <button style={{border:'none', background:'none'}} onClick={()=>handledelete(item)}>
          <i className="fa fa-trash" style={{color : "red"}} ></i>
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

      // <ul>
      //   {items.map((item) => (
      //     <li key={item.id}>{item.name}</li>
      //   ))}
      // </ul>

    return (
      <>
        <div style={{height:"100px",width:"100%" , marginBottom:"50px" , marginTop:"50px"}}> 
         <input className="form-control col-3" name="start" placeholder="Start palce" value={start}  onChange={(e) => setStart(e.target.value)}/>
         <form onSubmit={addItem}>
         
          <input
          className="form-control col-3 my-3"
            name="item"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Add Destination"
          />
        
      </form>
      
      <button type="button" className="btn btn-success mt-2" onClick={affchange}><i className="fa fa-pencil" style={{color : "black"}}></i>  Update</button>
        </div>


        <section style={{height:"1100px"}}>
        <div className="row" >
        
        <div className="col-sm-8 col-md-11 " id="tableUsers">
          <div className=" table-responsive-sm">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Destination</th>
                <th scope="col" style={{display:'flex', justifyContent:'center'}}>Action</th>
              </tr>
            </thead>
            <tbody>
            {displayItems}
                
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