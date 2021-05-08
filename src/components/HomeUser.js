import { useEffect } from 'react';
import '../styles/HomeUser.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { selectConnectuser, loginUserfind } from '../redux/slices/userSlice';
import { fetchUsers } from '../redux/slices/admin/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Test from './test';
import DashboardAdmin from './admin/Dashboard';
import ProfileAdmin from './admin/Profile';
import UsersAdmin from './admin/Users';
import CompanyAdmin from './admin/Company';
import CompanyWaitingAdmin from './admin/CompanyWaiting';
import DeliveryAdmin from './admin/Delivery';
import UserscircuitAdmin from './admin/Userscircuit';
import UpdateUserAdmin from './admin/UpdateUser';
import UpdateCompanyAdmin from './admin/UpdateCompany';
import ChangePasswordAdmin from './admin/ChangePassword';
import HomeCompany from './company/Home';
import ProfileCompany from './company/Profile';
import DeliveryManCompany from './company/DeliveryMan';
import VehicleCompany from './company/Vehicle';
import DeliveryCompany from './company/Delivery';
import HomeForUser from './user/Home';
import CompanyUser from './user/Company';
import ProfileUser from './user/Profile';
import DeliveryUser from './user/Delivery';
import ListDeliveryUser from './user/ListDelivery';
import MakeDeliveryUser from './user/MakeDelivery';
import StateDeliveryUser from './user/StateDelivery';
import VehicleTourUser from './user/VehicleTour';
import circuitUser from './user/Circuit';
import addcircuitUser from './user/AddCircuit';
import updatecircuitUser from './user/UpdateCircuit';
// import AddVehiculeCompany from './company/Raed/AddVehicle';
import Addlivreur from './company/ahmed/Addlivreur';
import Detailslivreur from './company/ahmed/Detailslivreur';
import Editlivreur from './company/ahmed/Editlivreur';
import DeliveryManagement from './company/DeliveryManagement';
import Statsdeliyers from './company/ahmed/STAT/Statsdeliyers';

export default function HomeUser(props) {
  const [connectUser, error] = useSelector(selectConnectuser);
  const dispatch = useDispatch();

  useEffect(async () => {
    if (Cookies.get('connect.sid')) {
    } else {
      await axios.get('/auth/logout', { withCredentials: true }).then((res) => {
        console.log(res);
        localStorage.removeItem('userInfo');
        dispatch(loginUserfind(res.data));
        props.history.push('/');
      });
    }
  }, [Cookies.get()]);

  useEffect(() => {
    if (Cookies.get('connect.sid')) {
      if (connectUser.role === 'admin') {
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
          {connectUser.role === 'user' ? (
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
                  path="/homeuser/user/makedeliveryuser"
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
              </Switch>
            </div>
          ) : (
            <></>
          )}
          {connectUser.role === 'admin' ? (
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
                <Route component={DashboardAdmin} />
              </Switch>
            </div>
          ) : (
            <></>
          )}
          {connectUser.role === 'company' ? (
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
                {/* <Route
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
                /> */}
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
