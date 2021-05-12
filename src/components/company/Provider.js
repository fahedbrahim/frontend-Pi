import { Component, Fragment, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { loginUserfind, selectConnectuser } from "../../redux/slices/userSlice";
import ReactTable from "react-table-6";
import { makeObjets } from "./utils";
import { TabPane, Image, Card } from "react-bootstrap";
import {
  Button,
  CardBody,
  Col,
  Row,
  CardHeader,
  Collapse,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ListGroup,
  ListGroupItem,
  Spinner,
} from "reactstrap";
import moment from "moment";
import Carousel from "react-elastic-carousel";

import "./modal.css";

import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Polyline,
} from "google-maps-react";
// import { Map } from "@joeattardi/react-mapquest-static-map";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const YOUR_GOOGLE_API_KEY_GOES_HERE = "AIzaSyDi8hiIYnovc_eDk9mP9JxqvTrPshi1XIQ";
class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicules: [],
      orgvehicules: [],
      perPage: 2,
      currentPage: 0,
      offset: 0,
      modal: false,
      showingInfoWindow: false,
      accordion: [true, false],
      spinner: false,
      activeMarker: {},
      selectedPlace: {},
  
      center: {
        lat: 36.858898,
        lng: 10.1965,
      },
      Polyline: [
        { lat: 25.774, lng: -80.19 },
        { lat: 18.466, lng: -66.118 },
      ],
    };
  }
  onMouseoverMarker(props, marker, e) {
    // ..
  }

  onMarkerClick(element) {
    console.log(element);
  }
  onAffect = (row) => {
    console.log(
      "Selected",
      this.state.selectedLivraison,
      this.state.selectedProvider
    );

    this.setState({ spinner: true });
    axios
      .put(`/livraison/affecterLivraison`, {
        idProvdier: this.state.selectedProvider._id,
        idLivraison: this.state.selectedLivraison.id,
        idCompany: this.state.userConnected.id,
      })
      .then((res) => {
        console.log("resss", res);
        this.setState({ spinner: false, modal: false, modalP: false });
        alert("Livraison affected with success");
      });
  };
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  static defaultProps = {
    zoom: 3,
  };
 
  componentDidMount() {
   this.setState({
      userConnected: JSON.parse(localStorage.getItem("userInfo")),
    });
    this.getLivraisons();
   console.log("iddddd",this.props.con.id);
  }
 
  getLivraisons() {
   // axios.get("/livraison/getLivraisonWithUser").then((res) => {
    axios.get(`/livraison/getLivraisonWithCompany/${this.props.con.id}`).then((res) => {
      console.log(res.data.livraison);
      this.setState({ data: makeObjets(res.data.livraison) });
    });
  }
  getNearByProviders(governorate, loc) {
    console.log("aa", governorate, loc);
    axios
      .post("/provider/getNearByProviders", {
        governorate: governorate,
        loc: loc,
      })
      .then((res) => {
        let marekrs = [];
        let markersString = "";
        var bounds = new this.props.google.maps.LatLngBounds();

        res.data.results.forEach((element) => {
          // 22 Avenue Habib Bourguiba, Ariana|flag-lg-7B0099-ourad||Tunis|flag-lg-7B0099-ourad||Aouina|flag-lg-7B0099-ourad
          markersString =
            markersString +
            element.governorate +
            "|marker@2x.png" +
            element.id_user.username +
            "||";
          console.log(element);
          var point = {
            lat: element.loc.coordinates[0],
            lng: element.loc.coordinates[1],
          };
          bounds.extend(point);
          marekrs.push(
            <Card
              style={{
                width: "50%",
                height: "40%",
                padding: "3%",
                marginLeft: "1%",
              }}
            >
              <Card.Body>
                <Card.Title> {element.id_user.username}</Card.Title>
                <Card.Text
                  style={{
                    height: "65px",
                  }}
                >
                  {element.id_user.username} is available in{" "}
                  {element.governorate}
                </Card.Text>
                <Button
                  style={{
                    marginBottom: "2%",
                    width: "150px",
                  }}
                  variant="primary"
                  onClick={() =>
                    this.setState({
                      selectedProvider: element,

                      modalP: true,
                    })
                  }
                >
                  Provider details
                </Button>
                <Button
                  style={{
                    width: "150px",
                  }}
                  variant="primary"
                  onClick={() =>
                    this.setState(
                      {
                        selectedProvider: element,
                      },
                      () => {
                        this.onAffect();
                      }
                    )
                  }
                >
                  Affect delivery{""}
                </Button>
              </Card.Body>
            </Card>
          );
          // marekrs.push(
          //   <Marker
          //     selectedProvider={element}
          //     onClick={this.onMarkerClick}
          //     name={"Current location"}
          //     position={{
          //       lat: element.loc.coordinates[0],
          //       lng: element.loc.coordinates[1],
          //     }}
          //   >
          //     <InfoWindow
          //       position={{
          //         lat: 36.858898,
          //         lng: 10.1965,
          //       }}
          //       visible={true}
          //     >
          //       <div>
          //         <p>
          //           Click on the map or drag the marker to select location where
          //           the incident occurred
          //         </p>
          //       </div>
          //     </InfoWindow>
          //   </Marker>
          // );
        });
        this.setState({
          providers: res.data.results,
          marekrs,
          bounds,
          markersString,
        });
        console.log(markersString);

        console.log("nearBy", res);
      });
  }
  onProvider(row) {
    console.log(row);
    this.setState(
      {
        selectedLivraison: row.original,
        modal: true,
        place: row.original.fromPlace,
        center: {
          lat: row.original.loc.coordinates[0],
          lng: row.original.loc.coordinates[1],
        },
      },
      () => {
        this.getNearByProviders(row.original.fromPlace, row.original.loc);
      }
    );
  }

  render() {
    const { selectedProvider } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>All deliveries</h4>
          </div>
        </div>

        <ReactTable
          data={this.state.data}
          noDataText={"No delivery"}
          filterable
          columns={[
            {
              Header: "Username",
              accessor: "username",
              filterMethod: (filter, row) =>
                row.username.toLowerCase().includes(filter.value.toLowerCase()),
            },
            {
              Header: "Email",
              accessor: "email",
              filterMethod: (filter, row) =>
                row.email.toLowerCase().includes(filter.value.toLowerCase()),
            },

            {
              Header: "From",
              accessor: "fromPlace",
              filterMethod: (filter, row) =>
                row.FromDate.toLowerCase().includes(filter.value.toLowerCase()),
            },
            {
              Header: "To",
              accessor: "destinationPlace",
              filterMethod: (filter, row) =>
                row.ToDate.toLowerCase().includes(filter.value.toLowerCase()),
            },
            {
              Header: "Description",
              accessor: "description",
              filterMethod: (filter, row) =>
                row.fullAdress
                  .toLowerCase()
                  .includes(filter.value.toLowerCase()),
            },
            {
              sortable: false,
              filterable: false,
              align: "center",
              Header: "State",
              width: 220,

              style: { justifyContent: "center" },
              Cell: (row) => {
                return (
                  <div>
                    <div>
                      <Button
                        onClick={() => this.onProvider(row)}
                        className="mb-2 mr-2 ml-3 btn-icon"
                        outline
                        color="danger"
                      >
                        <i className="pe-7s-tools btn-icon-wrapper"> </i>
                        Affect to provider
                      </Button>
                    </div>
                    <div>
                      <Button
                        disabled
                        onClick={() => this.accepter(row)}
                        className="mb-2 mr-2 btn-icon"
                        outline
                      >
                        <i className="pe-7s-tools btn-icon-wrapper"> </i>
                        Affect to delivery man
                      </Button>
                    </div>
                  </div>
                );
              },
            },
          ]}
          defaultPageSize={5}
        />

        <Modal
          isOpen={this.state.modal}
          toggle={() => this.setState({ modal: false })}
          backdrop={true}
          size={"xl"}
        >
          <ModalHeader toggle={() => this.setState({ modal: false })}>
            Providers around {this.state.place}
          </ModalHeader>
          <Carousel
            style={{
              padding: "2%",
            }}
            itemsToShow={3}
          >
            {this.state.marekrs}
          </Carousel>

          <div
            style={{
              height: "60vh",
              width: "100%",
            }}
          >
            {/* <Map
              apiKey={"z8ma9G745ChPO3Ku0WNIgAc1Debg1keJ"}
              boundingBox={[38.915, -77.072, 38.876, -77.001]}
              width={1138}
              height={705}
            /> */}

            <img
              className="d-block w-100 imgcarousel "
              src={
                "https://www.mapquestapi.com/staticmap/v5/map?key=8xHuBLULNIqgu6AKApGwWs3HYx2Q4TDQ&locations=" +
                this.state.markersString +
                "&size=1100,500@2x"
              }
              alt="firstcarousel"
            />
            {/* <Map
              onClick={this.onMapClicked}
              style={{ width: "100%", height: "100%", position: "relative" }}
              className={"map"}
              google={this.props.google}
              zoom={14}
              bounds={this.state.bounds}
            >
              {this.state.providers && this.state.providers.length > 0
                ? this.state.marekrs
                : null}
        
            </Map> */}
          </div>

          <Modal
            centered
            isOpen={this.state.modalP}
            toggle={() => this.setState({ modalP: false })}
            backdrop={true}
            size={"lg"}
          >
            <ModalHeader toggle={() => this.setState({ modalP: false })}>
              Details
            </ModalHeader>
            <ModalBody>
              <Card
                style={{
                  width: "100%",
                  height: "40%",
                  padding: "3%",
                }}
              >
                <Card.Body>
                  <Card.Title>
                    {" "}
                    <strong style={{ fontSize: "20px" }}>
                      1- Provider informations:
                    </strong>
                  </Card.Title>
                  <Card.Text
                    style={{
                      height: "65px",
                    }}
                  >
                    {selectedProvider
                      ? "✦  " + selectedProvider.id_user.username + "  "
                      : ""}
                    {selectedProvider
                      ? "✦  " + selectedProvider.id_user.email + "  "
                      : ""}
                    {selectedProvider
                      ? "✦  " + selectedProvider.id_user.adresse + "  "
                      : ""}
                    {selectedProvider
                      ? "✦  " + selectedProvider.id_user.phone + "  "
                      : ""}
                  </Card.Text>
                  <hr class="dotted" />
                  <Card.Title>
                    {" "}
                    <strong style={{ fontSize: "20px" }}>
                      2- Other informations:
                    </strong>
                  </Card.Title>
                  <Card.Text
                    style={{
                      height: "65px",
                    }}
                  >
                    {selectedProvider
                      ? "✦ From Date:  " +
                        moment(selectedProvider.FromDate).format(
                          "YYYY-MM-DD HH:mm"
                        ) +
                        "  "
                      : ""}
                    {selectedProvider
                      ? "✦ To Date:  " +
                        moment(selectedProvider.ToDate).format(
                          "YYYY-MM-DD HH:mm"
                        ) +
                        "  "
                      : ""}
                    {selectedProvider
                      ? "✦ Country:  " + selectedProvider.country + "  "
                      : ""}
                    {selectedProvider
                      ? "    ✦ PackageSize:  " +
                        selectedProvider.PackageSize +
                        "  "
                      : ""}
                    {selectedProvider
                      ? "✦ Governorate:  " + selectedProvider.governorate + "  "
                      : ""}
                  </Card.Text>
                </Card.Body>
              </Card>
            </ModalBody>
          </Modal>
        </Modal>

        <div style={{ marginBottom: "10%" }} className="col-lg-9 mt-5 "></div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: YOUR_GOOGLE_API_KEY_GOES_HERE,
})(Provider);
