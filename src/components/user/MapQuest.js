import React, { useEffect } from 'react';


const directionsResponse = (e) => {
    console.log('directionsResponse called');
    console.log('e', e);
}

function MapQuest (props) {

   
        const mapStyle = {
            height: props.height,
            width: props.width
        }

        useEffect(()=> {
            const leaflet = window.L;
    
            leaflet.mapquest.key = props.apiKey;
    
            const baseLayer = leaflet.mapquest.tileLayer('map');
    
            const mapInstance = leaflet.mapquest.map('map', {
                center: props.center,
                layers: baseLayer,
                zoom: props.zoom,
                pitch: props.pitch,
                bearing: props.bearing
            });
    
            mapInstance.addControl(leaflet.mapquest.control());
    
            leaflet.control.layers({
                'Map': baseLayer,
                'Hybrid': leaflet.mapquest.tileLayer('hybrid'),
                'Satellite': leaflet.mapquest.tileLayer('satellite'),
                'Light': leaflet.mapquest.tileLayer('light'),
                'Dark': leaflet.mapquest.tileLayer('dark')
            }).addTo(mapInstance);

            console.log(props.departure)
            console.log(props.dests)
            const endpoint = props.dests
            leaflet.mapquest.directions().route({
                start: props.departure,
                end: endpoint[props.dests.length-1] ,
                waypoints: props.dests,
                optimizeWaypoints: true,
              });

              console.log(props.dests.length)
            // leaflet.mapquest.directions().route({
            //     start: 'tunis',
            //     end: 'tozeur',
            //     waypoints: [  'sousse', 'monastir','moknine','tozeur'],
            //     optimizeWaypoints: true,
            //   });

              //{lat: 35.82903, lng: 10.63778} , key = 2NmKbEIILnTEItWHHYldG7iA0TLPkG6g
            // // center: [40.7128, -74.0059],
            // leaflet.mapquest.directions().route({
            //   start: 'Boulder, CO',
            // //   via: 'Grand Junction, CO',
            //   end: 'Mountlake Terrace, WA',
            // });
    
            // const directionsControl = leaflet.mapquest.directionsControl({
            //     className: '',
            //     directions: {
            //         options: {
            //             timeOverage: 25,
            //             doReverseGeocode: false,
            //         },
            //     },
            //     directionsLayer: {
            //         startMarker: {
            //             title: 'Drag to change location',
            //             draggable: true,
            //             icon: 'marker-start',
            //             iconOptions: {
            //                 size: 'sm'
            //             }
            //         },
            //         endMarker: {
            //             draggable: true,
            //             title: 'Drag to change location',
            //             icon: 'marker-end',
            //             iconOptions: {
            //                 size: 'sm'
            //             }
            //         },
            //         viaMarker: {
            //             title: 'Drag to change route'
            //         },
            //         routeRibbon: {
            //             showTraffic: true
            //         },
            //         alternateRouteRibbon: {
            //             showTraffic: true
            //         },
            //         paddingTopLeft: [450, 20],
            //         paddingBottomRight: [180, 20],
    
            //     },
            //     startInput: {
            //         compactResults: true,
            //         disabled: false,
            //         location: {},
            //         placeholderText: 'Starting point or click on the map...',
            //         geolocation: {
            //             enabled: true
            //         },
            //         clearTitle: 'Remove starting point'
            //     },
            //     endInput: {
            //         compactResults: true,
            //         disabled: false,
            //         location: {},
            //         placeholderText: 'Destination',
            //         geolocation: {
            //             enabled: true
            //         },
            //         clearTitle: 'Remove this destination'
            //     },
            //     addDestinationButton: {
            //         enabled: true,
            //         maxLocations: 10,
            //     },
            //     routeTypeButtons: {
            //         enabled: true,
            //     },
            //     reverseButton: {
            //         enabled: true,
            //     },
            //     optionsButton: {
            //         enabled: true,
            //     },
            //     routeSummary: {
            //         enabled: true,
            //         compactResults: false,
            //     },
            //     narrativeControl: {
            //         enabled: true,
            //         compactResults: false,
            //         interactive: true,
            //     }
            // }, () => {
            //     console.log('test test test callback');
            // }).addTo(mapInstance);
    
            // const directionsLayer = leaflet.mapquest.directionsLayer({
            //     directionsResponse,
            // }).addTo(mapInstance);
    
            // leaflet.mapquest.directionsLayer.on('directions_changed', function (eventResponse) {
            //     console.log('New Directions');
            //     console.log(eventResponse);
            // });
    
            // For direction data - check the cache?!?
        },[])
        return (
            <div id="map" style={mapStyle}>
                <p style={{ textAlign: 'center' }}>Map loading...</p>
            </div>
        );
    

    
}

export default MapQuest
