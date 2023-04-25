import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import './mapStyle.css';


mapboxgl.accessToken = 'pk.eyJ1IjoibnV1dHRpYm9pIiwiYSI6ImNsMmFldDVkcjAyNTQzbm1sN3Z5aHhjcDgifQ.p7gsmnhjnFhVU5yezIdGgA';


export default function Map() {
  // Tuo kartan
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

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
    const proxy = 'https://api.allorigins.win/get?url=';

    // Api:n url
    const apiurl = 'https://open-api.myhelsinki.fi/v2/places/?tags_search=restaurants%2C';

    // Google Maps reititys url
    const directions_url= 'https://www.google.com/maps/dir/?api=1&destination=';


    makeQuery();

    // Tekee kyselyn API:sta
    function makeQuery() {
      let apiQuery = apiurl ;
      let proxyApiQuery = proxy + encodeURIComponent(apiQuery);
      console.log("Lähetettävä kysely: " + apiQuery);
      makeSearch(proxyApiQuery);
    }



    // Tekee haun API:sta
    function makeSearch(apiQuery)  {

      fetch(apiQuery).
          then(function(response) {
            return response.json();
          }).then(function(json) {
        showAnswer(json);
      }).catch(function(error){
        console.log(error);
      });
    }

    // Näyttää haun tuloksen
    function showAnswer(proxynData) {

      let jsonData = JSON.parse(proxynData.contents);
      console.log(jsonData.data);
      console.log(jsonData.data[0].description.intro);

      // Luodaan muuttuja ravintoloille
      const restaurants = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                jsonData.data[0].location.lon,
                jsonData.data[0].location.lat
              ]
            },
            "properties": {
              "website": jsonData.data[0].info_url,
              "directions": directions_url + jsonData.data[0].name.fi,
              "address": jsonData.data[0].name.fi,
              "city": jsonData.data[0].location.address.locality,
              "description":jsonData.data[0].description.intro,
              "country": "Finland"
            }
          },

        ]
      };

      // Luodaan lisää ravintola-alkioita FeatureCollectioniin for-loopilla
      for(let i = 1; i < jsonData.data.length; i++){

        restaurants.features[i]={
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              jsonData.data[i].location.lon,
              jsonData.data[i].location.lat
            ]
          },
          "properties": {
            "website": jsonData.data[i].info_url,
            "directions": directions_url + jsonData.data[i].name.fi,
            "address": jsonData.data[i].name.fi,
            "city": jsonData.data[i].location.address.locality,
            "description":jsonData.data[i].description.intro,
            "country": "Finland"
          }
        }

      }

      // Asetetaan jokaiselle ravintola-alkiolla oma id
      restaurants.features.forEach(function(restaurant, i) {
        restaurant.properties.id = i;
      });


      map.current.on('load', () => {
        // Lisätään data kartalle layeriksi
        map.current.addSource('places', {
          type: 'geojson',
          data: restaurants
        });
        addMarkers();
      })



      // Funktio, joka lisää kartalle markkerit.
      function addMarkers() {
        for (const marker of restaurants.features) {
          const el = document.createElement('div');
          el.id = `marker-${marker.properties.id}`;
          el.className = 'marker';

          el.addEventListener('click', (e) => {
            flyToRestaurant(marker);
            createPopUp(marker);
            const activeItem = document.getElementsByClassName('active');
            e.stopPropagation();
            if (activeItem[0]) {
              activeItem[0].classList.remove('active');
            }
            const listing = document.getElementById(`listing-${marker.properties.id}`);
            listing.classList.add('active');
          });
          new mapboxgl.Marker(el, {offset: [0, -23]}).setLngLat(marker.geometry.coordinates).addTo(map.current);
        }
      }

      buildLocationList(restaurants);

      map.current.on('click', (event) => {
        // Määrittelee onko feature "locations" layerissa
        const features = map.current.queryRenderedFeatures(event.point, {
          layers: ['locations']
        });

        // Jos ei ole, niin palaa
        if (!features.length) return;

        const clickedPoint = features[0];

        // Siirtyy pisteeseen
        flyToRestaurant(clickedPoint);

        // Sulkee muut popupit ja näyttää popupin klikatulle ravintolalle
        createPopUp(clickedPoint);

        // Valitsee ravintolan sivupalkissa
        const activeItem = document.getElementsByClassName('active');
        if (activeItem[0]) {
          activeItem[0].classList.remove('active');
        }
        const listing = document.getElementById(
            `listing-${clickedPoint.properties.id}`
        );
        listing.classList.add('active');
      });

      // Rakentaa ravintoloista listan
      function buildLocationList(restaurants) {
        for (const restaurant of restaurants.features) {

          const listings = document.getElementById('listings');
          const listing = listings.appendChild(document.createElement('div'));
          listing.id = `listing-${restaurant.properties.id}`;
          listing.className = 'item';


          const link = listing.appendChild(document.createElement('a'));
          link.href = '#';
          link.className = 'title';
          link.id = `link-${restaurant.properties.id}`;
          link.innerHTML = `${restaurant.properties.address}`;

          // Kun klikkaa ravintolaa sivupalkista, karttaa siirtyy sen kohdalle ja avaa popupin
          link.addEventListener('click', function() {
            for (const feature of restaurants.features) {
              if (this.id === `link-${feature.properties.id}`) {
                flyToRestaurant(feature);
                createPopUp(feature);
              }
            }
            const activeItem = document.getElementsByClassName('active');
            if (activeItem[0]) {
              activeItem[0].classList.remove('active');
            }
            this.parentNode.classList.add('active');
          });


          const details = listing.appendChild(document.createElement('div'));
          details.innerHTML = `${restaurant.properties.city}`;
          if (restaurant.properties.phone) {
            details.innerHTML += ` · ${restaurant.properties.phoneFormatted}`;
          }
          if (restaurant.properties.distance) {
            const roundedDistance = Math.round(restaurant.properties.distance * 100) / 100;
            details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
          }
        }
      }

      // Funktio, joka keskittää kartan ravintolan kohdalle
      function flyToRestaurant(currentFeature) {
        map.current.flyTo({
          center: currentFeature.geometry.coordinates,
          zoom: 15
        });
      }

      // Funktio, joka luo klikatulle ravintolalle popupin
      function createPopUp(currentFeature) {
        const popUps = document.getElementsByClassName('mapboxgl-popup');
        /** Check if there is already a popup on the map and if so, remove it */
        if (popUps[0]) popUps[0].remove();

        // Luo popupin
        const popup = new mapboxgl.Popup({closeOnClick: true}).setLngLat(currentFeature.geometry.coordinates).
            setHTML(`<h3>${currentFeature.properties.address}</h3>
                <h4><a href=" ${currentFeature.properties.website} ">Nettisivu</a></h4>
                <h4><a href=" ${currentFeature.properties.directions}" target="_blank">Reittiohjeet</a></h4>
                <h4>${currentFeature.properties.description}</h4> `).
            addTo(map.current);
      }

      // Add navigation control (the +/- zoom buttons)
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");


    }
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