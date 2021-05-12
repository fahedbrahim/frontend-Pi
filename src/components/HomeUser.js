import { useEffect } from "react";
import "../styles/HomeUser.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { selectConnectuser, loginUserfind } from "../redux/slices/userSlice";
import { fetchUsers } from "../redux/slices/admin/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Test from "./test";
import DashboardAdmin from "./admin/Dashboard";
import ProfileAdmin from "./admin/Profile";
import UsersAdmin from "./admin/Users";
import CompanyAdmin from "./admin/Company";
import CompanyWaitingAdmin from "./admin/CompanyWaiting";
import DeliveryAdmin from "./admin/Delivery";
import UserscircuitAdmin from "./admin/Userscircuit";
import UpdateUserAdmin from "./admin/UpdateUser";
import UpdateCompanyAdmin from "./admin/UpdateCompany";
import ChangePasswordAdmin from "./admin/ChangePassword";
import Service from "./admin/service/Service";

import HomeCompany from "./company/Home";
import ProfileCompany from "./company/Profile";
import DeliveryManCompany from "./company/DeliveryMan";
import VehicleCompany from "./company/Vehicle";
import DeliveryCompany from "./company/Delivery";
import HomeForUser from "./user/Home";
import CompanyUser from "./user/Company";
import ProfileUser from "./user/Profile";
import DeliveryUser from "./user/Delivery";
import ListDeliveryUser from "./user/ListDelivery";
import MakeDeliveryUser from "./user/MakeDelivery";
import StateDeliveryUser from "./user/StateDelivery";
import VehicleTourUser from "./user/VehicleTour";
import circuitUser from "./user/Circuit";
import addcircuitUser from "./user/AddCircuit";
import updatecircuitUser from "./user/UpdateCircuit";
import offerServiceUser from "./user/eya/OfferService";
import ListeLivraison from "./user/service/ListeLivraison";
import ListeLivraisonCustomer from "./user/customer/ListeLivraisons/ListeLivraison";

import AddVehiculeCompany from "./company/Raed/AddVehicle";
import Addlivreur from "./company/ahmed/Addlivreur";
import Detailslivreur from "./company/ahmed/Detailslivreur";
import Editlivreur from "./company/ahmed/Editlivreur";
import DeliveryManagement from "./company/DeliveryManagement";
import Statsdeliyers from "./company/ahmed/STAT/Statsdeliyers";
import DetailsVehicleCompany from "./company/Raed/DetailsVehicle";
import EditVehicleCompany from "./company/Raed/EditVehicle";
import ArchiveVehicle from "./company/Raed/ArchiveVehicle";
import StatsVehicle from "./company/Raed/StatsVehicle";
import ListeLivraisonCompany from "./company/ListeLivraisons/ListeLivraison";
import stat from "./company/ChartStat";
import ProviderCompany from "./company/CheminProvider";


import Classeditdelivery from "./user/Classeditdelivery";
import Classdetailsdelivery from "./user/Classdetailsdelivery";
import BarcodeGenerator from "./user/QR/BarcodeGenerator";
import HomeDeliveryman from "./user/HomeDeliveryman";
import ProfileDeliveryMan from "./user/ProfileDeliveryMan";
import DeliveryManPackage from "./user/DeliveryManPackage";
import CiruitDeliveryMan from "./user/Map/CiruitDeliveryMan";
import Functionarchive from "./user/ARCHIVE/Functionarchive";


//takwa
import FreeDeliveryUser from './user/freeDelivery'
import addDelivery from "./user/freeDelivery/addDelivery";
import ListFreeDelivery2 from "./user/freeDelivery/ListDeliveries2";
import EditDelivery from "./user/freeDelivery/editDelivery";
import passedDelivery from   "./user/freeDelivery/PassedDelivery";
import AffectedDelivery from "./user/freeDelivery/affectedDelivery"
import claims from   "./user/simpleChatbot/claims";
import claimsEspace from   "./user/Claim";
import simplechatbot from   "./user/simpleChatbot/chatbot";
import Chat from "./admin/takwa/chat/messenger"


import claimsAdmin from   "./admin/takwa/Claims";
import FreeDeliveries from "./admin/takwa/FreeDeliveries"
import ListAffectedTo from "./admin/takwa/listAffectedTo"
import Chart from "./admin/takwa/Chart"

export default function HomeUser(props) {
  const [connectUser, error] = useSelector(selectConnectuser);
  const dispatch = useDispatch();

  useEffect(async () => {
    if (Cookies.get("connect.sid")) {
    } else {
      await axios.get("/auth/logout", { withCredentials: true }).then((res) => {
        console.log(res);
        localStorage.removeItem("userInfo");
        dispatch(loginUserfind(res.data));
        props.history.push("/");
      });
    }
  }, [Cookies.get()]);

  useEffect(() => {
    if (Cookies.get("connect.sid")) {
      if (connectUser.role === "admin") {
        dispatch(fetchUsers());
      }
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <div className="row" id="homeuser">
          <div className="col-2 " style={{ padding: 0 }}>
            <Sidebar />
          </div>
          {connectUser.role === "user" ? (
            <div className="col-9 " id="heigthHompage">
              <Switch>
                <Route path="/homeuser" exact component={HomeForUser} />
                <Route path="/homeuser/user/profile" component={ProfileUser} />
                <Route path="/homeuser/user/company" component={CompanyUser} />
                <Route
                  path="/homeuser/user/delivery"
                  component={DeliveryUser}
                />
                <Route
                  path="/homeuser/user/listdeliveryuser"
                  component={ListDeliveryUser}
                />
                <Route
                  path="/homeuser/user/makedeliveryuser/:id"
                  component={MakeDeliveryUser}
                />
                <Route
                  path="/homeuser/user/statedeliveryuser"
                  component={StateDeliveryUser}
                />
                <Route
                  path="/homeuser/user/vehicletour"
                  component={VehicleTourUser}
                />
                <Route
                  path="/homeuser/user/editdelivery/:id"
                  component={Classeditdelivery}
                />
                <Route
                  path="/homeuser/user/detailsdelivery/:id"
                  component={Classdetailsdelivery}
                />
                <Route
                  path="/homeuser/user/generateqrcode"
                  component={BarcodeGenerator}
                />
                <Route
                  path="/homeuser/user/circuit/:id"
                  component={circuitUser}
                />
                <Route
                  path="/homeuser/user/addcircuit"
                  component={addcircuitUser}
                />
                <Route
                  path="/homeuser/user/updatecircuit/:id"
                  component={updatecircuitUser}
                />
                <Route
                  path="/homeuser/user/offerService"
                  component={offerServiceUser}
                />
                <Route
                  path="/homeuser/user/listeLivraison"
                  component={ListeLivraison}
                />
                <Route
                  path="/homeuser/user/listeLivraisonCustomer"
                  component={ListeLivraisonCustomer}
                />
                  <Route
                  path="/homeuser/user/FreeDelivery"
                  component={FreeDeliveryUser}
                />
              <Route
               path="/homeuser/user/addDelivery" 
               component={addDelivery} 
               />
             <Route 
             path="/homeuser/user/listDeliveries"
             component={ListFreeDelivery2} />
              <Route
               path="/homeuser/user/editDelivery/:id" 
               component={EditDelivery}
                />
              <Route 
              path="/homeuser/user/passedDelivery"
               component={passedDelivery}
                />
             <Route 
             path="/homeuser/user/AffectedDelivery"
              component={AffectedDelivery}
               />
             <Route
              path="/homeuser/user/simplechatbot"
               component={simplechatbot}
                />
              <Route 
              path="/homeuser/user/claims" 
              component={claims}
               />
             <Route 
             path="/homeuser/user/claimsEspace" 
             component={claimsEspace}
              />
              <Route path="/homeuser/user/chat" component={Chat} />





              </Switch>
            </div>
          ) : (
            <></>
          )}
          {connectUser.role === "admin" ? (
            <div className="col-9 " id="heigthHompage">
              <Switch>
                <Route path="/homeuser" exact component={DashboardAdmin} />
                <Route
                  path="/homeuser/admin/profile"
                  component={ProfileAdmin}
                />
                <Route path="/homeuser/admin/users" component={UsersAdmin} />
                <Route
                  path="/homeuser/admin/companywaiting"
                  component={CompanyWaitingAdmin}
                />
                <Route
                  path="/homeuser/admin/company"
                  component={CompanyAdmin}
                />
                <Route
                  path="/homeuser/admin/delivery"
                  component={DeliveryAdmin}
                />
                <Route
                  path="/homeuser/admin/updateuser/:id"
                  component={UpdateUserAdmin}
                />
                <Route
                  path="/homeuser/admin/updatecompany/:id"
                  component={UpdateCompanyAdmin}
                />
                <Route
                  path="/homeuser/admin/userscircuit"
                  component={UserscircuitAdmin}
                />
                <Route
                  path="/homeuser/admin/changepassword"
                  component={ChangePasswordAdmin}
                />
                <Route 
                path="/homeuser/admin/listFreeDeliveries"
                 component={FreeDeliveries}
                 />
              <Route
               path="/homeuser/admin/listClaims"
                component={claimsAdmin}/>
              <Route path="/homeuser/admin/listAffectedTo" component={ListAffectedTo}/>
              <Route path="/homeuser/admin/chart" component={Chart}/>
              <Route path="/homeuser/admin/chat" component={Chat}/>

                <Route path="/homeuser/admin/services" component={Service} />
                <Route component={DashboardAdmin} />
              </Switch>
            </div>
          ) : (
            <></>
          )}
          {connectUser.role === "company" ? (
            <div className="col-9 " id="heigthHompage">
              <Switch>
                <Route path="/homeuser" exact component={HomeCompany} />
                <Route
                  path="/homeuser/company/profile"
                  component={ProfileCompany}
                />
                <Route
                  path="/homeuser/company/deliveryman"
                  component={DeliveryManCompany}
                />
                <Route
                  path="/homeuser/company/vehicle/add"
                  component={AddVehiculeCompany}
                />
                <Route
                  path="/homeuser/company/vehicle/details/:id"
                  component={DetailsVehicleCompany}
                />
                <Route
                  path="/homeuser/company/vehicle/edit/:id"
                  component={EditVehicleCompany}
                />
                <Route
                  path="/homeuser/company/vehicle/archive"
                  component={ArchiveVehicle}
                />
                <Route
                  path="/homeuser/company/vehicle/stats"
                  component={StatsVehicle}
                />

                <Route
                  path="/homeuser/company/vehicle"
                  component={VehicleCompany}
                />
                <Route
                  path="/homeuser/company/delivery"
                  component={DeliveryCompany}
                />

                <Route
                  path="/homeuser/company/addlivreeur"
                  component={Addlivreur}
                />
                <Route
                  path="/homeuser/company/details/:id"
                  component={Detailslivreur}
                />
                <Route
                  path="/homeuser/company/edit/:id"
                  component={Editlivreur}
                />
                <Route
                  path="/homeuser/company/deliverymanagementbyadmincompany/:id"
                  component={DeliveryManagement}
                />
                <Route
                  path="/homeuser/company/statdelivery"
                  component={Statsdeliyers}
                />
                 <Route
                  path="/homuser/company/provider"
                  component={ProviderCompany}
                />
                <Route
                  path="/homuser/company/deliveries"
                  component={ListeLivraisonCompany}
                />
                 <Route
                  path="/homuser/company/stat"
                  component={stat}
                />
              </Switch>
            </div>
          ) : (
            <></>
          )}
          {connectUser.role === "deliveryMan" ? (
            <div className="col-9 " id="heigthHompage">
              <Switch>
                <Route path="/homeuser" exact component={HomeDeliveryman} />
                <Route
                  path="/homeuser/deliveryMan/profile"
                  component={ProfileDeliveryMan}
                />
                <Route
                  path="/homeuser/deliveryMan/mydelivery"
                  component={DeliveryManPackage}
                />
                <Route
                  path="/homeuser/deliveryMan/ciruitdeliveryman"
                  component={CiruitDeliveryMan}
                />
                <Route
                  path="/homeuser/deliveryMan/archiveciruitdeliveryman"
                  component={Functionarchive}
                />
              </Switch>
            </div>
          ) : (
            <></>
          )}
        </div>
      </BrowserRouter>
    </>
  );
}
