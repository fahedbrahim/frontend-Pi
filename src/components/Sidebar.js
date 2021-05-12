import '../styles/Sidebar.css';
import { NavLink } from 'react-router-dom';
import { selectConnectuser } from '../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Sidebar() {
  const [connectUser, error] = useSelector(selectConnectuser);


  const [livraisons, setlivraisons] = useState(null);

  const [livraisonsCustomer, setlivraisonsCustomer] = useState(null);
  useEffect(() => {
    axios
      .post(`/livraison/getLivraisonsByProvider`, {
        idProvdier: JSON.parse(localStorage.getItem("userInfo")).id,
      })
      .then((res) => {
        try {
          if (
            res.data.livraison.length > 0 &&
            JSON.parse(localStorage.getItem("userInfo")).id_Provider
          ) {
            console.log("resss1", res);
            setlivraisons(res.data.livraison);
          } else if (
            res.data.livraison.length > 0 &&
            !JSON.parse(localStorage.getItem("userInfo")).id_Provider
          ) {
            console.log("resss2", res);
           
    axios
    .post(`/livraison/getLivraisonsByCustomer`, {
      id: JSON.parse(localStorage.getItem("userInfo")).id,
    })
    .then((res) => {
      setlivraisonsCustomer(res.data.livraison);
    });
          }
        } catch (error) {}
      });

  }, []);




  return (
    <>
      {connectUser.role === 'user' ? (
        <div id="bodysidebar">
          <div className="navigation">
            <ul>
              <li>
                <NavLink exact to="/homeuser">
                  <span className="icon">
                    <i className="fa fa-home"></i>
                  </span>
                  <span className="title">Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeuser/user/profile">
                  <span className="icon">
                    <i className="fa fa-user"></i>
                  </span>
                  <span className="title">Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeuser/user/company">
                  <span className="icon">
                    <i className="fa fa-building"></i>
                  </span>
                  <span className="title">Company</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeuser/user/delivery">
                  <span className="icon">
                    <i className="fa fa-archive"></i>
                  </span>
                  <span className="title">Delivery</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeuser/user/vehicletour">
                  <span className="icon">
                    <i className="fa fa-map-marker"></i>
                  </span>
                  <span className="title">Vehicle Tour</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeuser/user/offerService">
                  <span className="icon">
                    <i className="fa fa-server"></i>
                  </span>
                  <span className="title">Service</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/homeuser/user/FreeDelivery">
                  <span className="icon">
                    <i className="fa fa-archive"></i>
                  </span>
                  <span className="title">Free delivery</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeuser/user/claimsEspace">
                  <span className="icon">
                  <i class="fa fa-file"></i>               
                  </span>
                  <span className="title">Claim</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeuser/user/chat">
                  <span className="icon">
                  <i class="fa fa-comments"></i>          
                          </span>
                  <span className="title">Chat</span>
                </NavLink>
              </li>

              {livraisons != null ? (
                <li>
                  <NavLink to="/homeuser/user/listeLivraison">
                    <span className="icon">
                      <i className="fa fa-server"></i>
                    </span>
                    <span className="title">Affectation</span>
                  </NavLink>
                </li>
              ) : null}
              {livraisonsCustomer != null ? (
                <li>
                  <NavLink to="/homeuser/user/listeLivraisonCustomer">
                    <span className="icon">
                      <i className="fa fa-server"></i>
                    </span>
                    <span className="title">Circuit</span>
                  </NavLink>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
      {connectUser.role === 'admin' ? (
        <div id="bodysidebar">
          <div className="navigation">
            <ul>
              <li>
                <NavLink exact to="/homeuser">
                  <span className="icon">
                    <i className="fa fa-home"></i>
                  </span>
                  <span className="title">Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeuser/admin/profile">
                  <span className="icon">
                    <i className="fa fa-user"></i>
                  </span>
                  <span className="title">Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeuser/admin/users">
                  <span className="icon">
                    <i className="fa fa-users"></i>
                  </span>
                  <span className="title">Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeuser/admin/company">
                  <span className="icon">
                    <i className="fa fa-building"></i>
                  </span>
                  <span className="title">Company</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeuser/admin/delivery">
                  <span className="icon">
                    <i className="fa fa-archive"></i>
                  </span>
                  <span className="title">Delivery</span>
                </NavLink>
              </li>
               
              <li>
                <NavLink to="/homeuser/admin/listFreeDeliveries">
                  <span className="icon">
                    <i className="fa fa-archive"></i>
                  </span>
                  <span className="title">Free Delivery</span>
                </NavLink>

              </li>
              <li>
                <NavLink to="/homeuser/admin/listClaims">
                  <span className="icon">
                <i class="fa fa-file"></i>               
                 </span>
                  <span className="title">Claims</span>
                </NavLink>

              </li>
              <li>
                <NavLink to="/homeuser/admin/chart">
                  <span className="icon">
                  <i class="fa fa-circle"></i>
                                                     </span>
                  <span className="title">Chart</span>
                </NavLink>

              </li>   

             
              <li>
                <NavLink to="/homeuser/admin/services">
                  <span className="icon">
                    <i class="fa fa-user-circle"></i>
                  </span>
                  <span className="title">Services</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeuser/admin/chat">
                  <span className="icon">
                  <i class="fa fa-comments"></i>          
                                                     </span>
                  <span className="title">Chat</span>
                </NavLink>

              </li>
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
      {connectUser.role === 'company' ? (
        <div id="bodysidebar">
          <div className="navigation">
            <ul>
              <li>
                <NavLink exact to="/homeuser">
                  <span className="icon">
                    <i className="fa fa-home"></i>
                  </span>
                  <span className="title">Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeuser/company/profile">
                  <span className="icon">
                    <i className="fa fa-user"></i>
                  </span>
                  <span className="title">Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeuser/company/deliveryman">
                  <span className="icon">
                    <i className="fa fa-users"></i>
                  </span>
                  <span className="title">Delivery_Man</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeuser/company/vehicle">
                  <span className="icon">
                    <i className="fa fa-truck"></i>
                  </span>
                  <span className="title">Vehicle</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeuser/company/delivery">
                  <span className="icon">
                    <i className="fa fa-archive"></i>
                  </span>
                  <span className="title">Delivery</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeuser/company/deliverymanagementbyadmincompany">
                  <span className="icon">
                    <i className="fa fa-upload"></i>
                  </span>
                  <span className="title">Delivery Management</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/homeuser/company/statdelivery">
                  <span className="icon">
                    <i className=" fa fa-bar-chart"></i>
                  </span>
                  <span className="title">Statistic</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/homuser/company/provider">
                  <span className="icon">
                    <i className="fa fa-server"></i>
                  </span>
                  <span className="title">Provider</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homuser/company/deliveries">
                  <span className="icon">
                    <i className="fa fa-th"></i>
                  </span>
                  <span className="title">Deliveries</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homuser/company/stat">
                  <span className="icon">
                    <i className="fa fa-pie-chart"></i>
                  </span>
                  <span className="title">Chart Provider</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
      {connectUser.role === 'deliveryMan' ? (
        <div id="bodysidebar">
          <div className="navigation">
            <ul>
              <li>
                <NavLink exact to="/homeuser">
                  <span className="icon">
                    <i className="fa fa-home"></i>
                  </span>
                  <span className="title">Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeuser/deliveryMan/profile">
                  <span className="icon">
                    <i className="fa fa-user"></i>
                  </span>
                  <span className="title">Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeuser/deliveryMan/mydelivery">
                  <span className="icon">
                    <i className="fa fa-archive"></i>
                  </span>
                  <span className="title">My Delivery</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeuser/deliveryMan/ciruitdeliveryman">
                  <span className="icon">
                    <i className="fa fa-map"></i>
                  </span>
                  <span className="title">ciruit</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/homeuser/deliveryMan/archiveciruitdeliveryman">
                  <span className="icon">
                    <i className="fa fa-folder-open"></i>
                  </span>
                  <span className="title">Archive</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
