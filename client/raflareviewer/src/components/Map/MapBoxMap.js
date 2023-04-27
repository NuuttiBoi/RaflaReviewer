import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './mapStyle.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import restaurant from '../Restaurant';
import restaurantList from '../RestaurantList';
import {useLocation} from 'react-router-dom';
import Restaurant from '../Restaurant';
import restaurants from '../../services/restaurants';

mapboxgl.accessToken = 'pk.eyJ1IjoibnV1dHRpYm9pIiwiYSI6ImNsMmFldDVkcjAyNTQzbm1sN3Z5aHhjcDgifQ.p7gsmnhjnFhVU5yezIdGgA';


const MapboxMap = () => {
  let location = useLocation();
  const { state } = location;

  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  let addresses = [];

  /*
  const resList = restaurants.map(restaurant => {
    return (
        <li key={restaurant.name}>
          <Restaurant restaurant={restaurant}/>
        </li>
    )
  })

  for(let i = 1; i < resList.length; i++){
    addresses[i] = resList[i].restaurant.name;
    console.log(addresses[i]);
  }
  */

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [24.937631515858612,60.16371731453643],
      zoom: 13,
      scrollZoom: true,
      width: "100vw", //or full width then set width: "100vw",
      height: "100vh" //full height then set height: "100vh",
    });
    // Lisätään nappi, joka paikantaa käyttäjän sijainnin
    map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          // Kun tämä on aktiivinen, niin kartta saa päivityksiä laitteen sijainnista, kun se muuttuu.
          trackUserLocation: true,
          // Piirtää nuolen, joka osoittaa mihin suuntaan laite liikkuu.
          showUserHeading: true
        })
    );
    // Add navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(),"top-left");

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });
    map.current.addControl(geocoder);

    geocoder.setInput(state.restaurant.address);
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
        <div>
          <div ref={mapContainer} className="map-container" />
        </div>
  );
}

export default MapboxMap;