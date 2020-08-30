import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import "mapbox-gl/dist/mapbox-gl.css"
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import React, {useState, useEffect} from 'react';
import ReactMapGL, {Marker, Popup, GeolocateControl} from 'react-map-gl';
import {listLogEntries, listCovidEntries} from './API';
import LogEntryForm from './LogEntryForm'


const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};


const App = () =>{
  const [mouseEntered, setMouseEntered] = useState(false);
  const [logEntries, setLogEntries] = useState([]);
  const [covidEntries, setCovidEntries] = useState([]);
  const [mapStyle, setMapStyle] = useState("mapbox://styles/birajkhatiwada/ckd6zh2zu0g251ikokpwdhpee");
  const [showPopup, setShowPopup] = useState({});
  const [showCovidPopup, setShowCovidPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [searchResultLayer, setSearchResultLayer] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3
  });

  // const _onViewportChange = viewport => setViewPort({...viewport, transitionDuration: 3000 })

  const mapRef = React.useRef();

  const getEntries = async()=>{
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  }

  const getCovidEntries = async()=>{
    const covidentries = await listCovidEntries();
    console.log('hi');
    console.log(covidentries);
    setCovidEntries(covidentries);
  }



  useEffect(()=>{
    getEntries();
    getCovidEntries();
  }, []);


  const showAddMarkerPopup=(event)=>{
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      longitude,
      latitude
    })
  }

  const handleOnResult = (event) => {
   setSearchResultLayer(new GeoJsonLayer({
      id: "search-result",
      data: event.result.geometry,
      getFillColor: [255, 0, 0, 128],
      getRadius: 1000,
      pointRadiusMinPixels: 10,
      pointRadiusMaxPixels: 10
   }))
  }

  return (
    <>
    <div className = "map">
    <ReactMapGL
      ref = {mapRef}
      {...viewport}
      mapStyle = {mapStyle}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
    {
      logEntries.map(entry=>(
        <React.Fragment key={entry._id}>
          <Marker
            latitude={entry.latitude}
            longitude={entry.longitude}
            // offsetLeft={-12}
            // offsetTop={-24}
            >
          <div>
              <svg
                onMouseOver={()=> setShowPopup({
                  [entry._id]: true,
                })}
                onMouseOut={()=>setShowPopup({
                  [entry._id]: false,
                })}

                className="marker"
                style={{
                  height: `${9 * viewport.zoom}px`,
                  width: `${9 * viewport.zoom}px`,
                }}
                id="Layer_1" enable-background="new 0 0 508.492 508.492" height="512" viewBox="0 0 508.492 508.492" width="512">
                <path className={entry.toVisit? "red": "green"} d="m439.493 67.599-179.821-66.603c-3.586-1.328-7.529-1.328-11.115 0l-179.822 66.603c-6.276 2.324-10.442 8.311-10.442 15.004v151.724c0 64.755 27.348 126.736 75.031 170.053l110.031 99.956c6.101 5.543 15.416 5.543 21.518 0l110.031-99.956c47.684-43.316 75.031-105.298 75.031-170.053v-151.724c.001-6.694-4.165-12.68-10.442-15.004z" fill="#91c656"/>
                <path className={entry.toVisit? "red": "green"} d="m173.443 324.109c113.969-61.268 211.107-35.781 262.998-12.144 8.824-24.664 13.494-50.914 13.494-77.64v-151.722c0-6.693-4.166-12.68-10.442-15.004l-179.821-66.603c-3.586-1.328-7.529-1.328-11.115 0l-179.822 66.603c-6.276 2.324-10.442 8.311-10.442 15.004v151.724c0 41.246 11.111 81.358 31.49 116.247 22.609-.747 50.142-8.446 83.66-26.465z" fill="#aced70"/>
                <path className={entry.toVisit? "red": "green"} d="m205.87 135.888c-55.86-53.46-108.455-54.534-147.577-41.723v140.162c0 41.246 11.111 81.358 31.49 116.247 22.61-.746 50.142-8.444 83.661-26.463 113.969-61.268 211.107-35.781 262.998-12.144 16.799-46.956 13.494-76.637 13.494-160.189-73.07 28.264-176.78 48.502-244.066-15.89z" fill="#9bd65e"/>
                <path d="m439.493 67.599-179.821-66.603c-3.586-1.328-7.529-1.328-11.115 0l-179.822 66.603c-6.276 2.324-10.442 8.311-10.442 15.004v151.724c0 64.755 27.348 126.736 75.031 170.053l110.031 99.956c6.101 5.543 15.416 5.543 21.518 0l110.031-99.956c47.684-43.316 75.031-105.298 75.031-170.053v-151.724c.001-6.694-4.165-12.68-10.442-15.004zm-21.557 166.727c0 55.754-23.527 109.103-64.549 146.367l-99.272 90.183-99.272-90.183c-41.021-37.265-64.549-90.613-64.549-146.367v-140.588l163.821-60.676 163.821 60.676z"/>
                <path d="m201.543 206.447c-5.696-6.759-15.789-7.619-22.546-1.925s-7.619 15.788-1.925 22.546l47.441 56.297c6.292 7.466 17.719 7.582 24.178.338l84.354-94.607c5.881-6.596 5.301-16.71-1.294-22.591-6.597-5.882-16.71-5.303-22.591 1.294l-72.07 80.831z"/>
              </svg>
          </div>
        </Marker>

        {   showPopup[entry._id]?(
            <Popup
              className='Popup'
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setShowPopup({})}
              anchor="top"
               >
              <div className='popup'>
                <h3>{entry.title}</h3>
                {/* <p>{entry.comments}</p> */}
                <p>{entry.description}</p>
                {entry.newFood ? <p>{entry.newFood}</p> : null}
                {entry.rating ? <p>{entry.rating}</p>: null}
                {entry.visitDate ? <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>: null}
                {entry.toVisit ? <p>{entry.toVisit}</p>: null}
                {entry.image && <img src={entry.image} alt={entry.title}></img>}
              </div>
              </Popup>
          ) : null
        }
      </React.Fragment>
      ))
    }

{
      covidEntries.map((entry, index)=>(
        <React.Fragment key={index}>
          <Marker
            latitude={entry.latitude}
            longitude={entry.longitude}
            // offsetLeft={-12}
            // offsetTop={-24}
            >
          <div

            // onClick={() => setShowCovidPopup({
            //   // ...showPopup,
            //   [index]: true,
            // })}
              >
              <svg
                  onMouseOver={()=> setShowCovidPopup({
                    [index]: true,
                  })}
                  onMouseOut={()=>setShowCovidPopup({
                    [index]: false,
                  })}
                 className="marker covid"
                 style={{
                   height: `${9 * viewport.zoom}px`,
                   width: `${9 * viewport.zoom}px`,
                 }}
                id="Capa_1" enable-background="new 0 0 511 511" height="512" viewBox="0 0 511 511" width="512">
                <g><circle className="circle" cx="255.5" cy="225" r="136"/>
                <path d="m415.306 66.193c-42.685-42.685-99.439-66.193-159.806-66.193s-117.121 23.508-159.806 66.193c-42.686 42.687-66.194 99.44-66.194 159.807 0 106.499 74.454 198.443 177.887 220.849l48.113 64.151 48.114-64.152c103.432-22.406 177.886-114.349 177.886-220.848 0-60.367-23.508-117.12-66.194-159.807zm-159.806-7.193c91.533 0 166 74.468 166 166s-74.467 166-166 166-166-74.468-166-166 74.467-166 166-166z"/>
                </g>
              </svg>
          </div>
        </Marker>

        {showCovidPopup[index]?(
            <Popup
              className='Popup'
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onMouseLeave = {() => setShowCovidPopup({})}
              onClose={() => setShowCovidPopup({})}
              anchor="top"
              >
              <div className='popup'>
                <h3>{entry.location}</h3>
                <p>Confirmed: {entry.confirmed}</p>
                <p>Dead: {entry.dead}</p>
                <p>Recovered: {entry.recovered}</p>
              </div>
              </Popup>
          ) : null

        }
      </React.Fragment>
      ))
    }




    {
      addEntryLocation?(
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            // offsetLeft={-12}
            // offsetTop={-24}
          >
            <div>
              <svg
                  className="marker"
                  style={{
                    height: `${9 * viewport.zoom}px`,
                    width: `${9 * viewport.zoom}px`,
                  }}
                  id="Layer_1" enable-background="new 0 0 508.492 508.492" height="512" viewBox="0 0 508.492 508.492" width="512">
                  <path className="red" d="m439.493 67.599-179.821-66.603c-3.586-1.328-7.529-1.328-11.115 0l-179.822 66.603c-6.276 2.324-10.442 8.311-10.442 15.004v151.724c0 64.755 27.348 126.736 75.031 170.053l110.031 99.956c6.101 5.543 15.416 5.543 21.518 0l110.031-99.956c47.684-43.316 75.031-105.298 75.031-170.053v-151.724c.001-6.694-4.165-12.68-10.442-15.004z" fill="#91c656"/>
                  <path className="red" d="m173.443 324.109c113.969-61.268 211.107-35.781 262.998-12.144 8.824-24.664 13.494-50.914 13.494-77.64v-151.722c0-6.693-4.166-12.68-10.442-15.004l-179.821-66.603c-3.586-1.328-7.529-1.328-11.115 0l-179.822 66.603c-6.276 2.324-10.442 8.311-10.442 15.004v151.724c0 41.246 11.111 81.358 31.49 116.247 22.609-.747 50.142-8.446 83.66-26.465z" fill="#aced70"/>
                  <path className="red" d="m205.87 135.888c-55.86-53.46-108.455-54.534-147.577-41.723v140.162c0 41.246 11.111 81.358 31.49 116.247 22.61-.746 50.142-8.444 83.661-26.463 113.969-61.268 211.107-35.781 262.998-12.144 16.799-46.956 13.494-76.637 13.494-160.189-73.07 28.264-176.78 48.502-244.066-15.89z" fill="#9bd65e"/>
                  <path d="m439.493 67.599-179.821-66.603c-3.586-1.328-7.529-1.328-11.115 0l-179.822 66.603c-6.276 2.324-10.442 8.311-10.442 15.004v151.724c0 64.755 27.348 126.736 75.031 170.053l110.031 99.956c6.101 5.543 15.416 5.543 21.518 0l110.031-99.956c47.684-43.316 75.031-105.298 75.031-170.053v-151.724c.001-6.694-4.165-12.68-10.442-15.004zm-21.557 166.727c0 55.754-23.527 109.103-64.549 146.367l-99.272 90.183-99.272-90.183c-41.021-37.265-64.549-90.613-64.549-146.367v-140.588l163.821-60.676 163.821 60.676z"/>
                  <path d="m201.543 206.447c-5.696-6.759-15.789-7.619-22.546-1.925s-7.619 15.788-1.925 22.546l47.441 56.297c6.292 7.466 17.719 7.582 24.178.338l84.354-94.607c5.881-6.596 5.301-16.71-1.294-22.591-6.597-5.882-16.71-5.303-22.591 1.294l-72.07 80.831z"/>
              </svg>
            </div>
          </Marker>
          <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onMouseLeave = {() => setShowCovidPopup({})}
              onClose={() => setAddEntryLocation(null)}
              anchor="top" >
              <div className='popup'>
                  <LogEntryForm onClose={()=>{
                    setAddEntryLocation(null);
                    getEntries();
                  }}
                  location={addEntryLocation}/>
              </div>
          </Popup>
        </>
      ):null
    }

    <GeolocateControl
      className = "geoControl"
      // style = {geolocateStyle}
      positionOptions = {{enableHighAccuracy: true}}
      trackUserLocation = {true}
    />
    <Geocoder
                className = "geocoder"
                mapRef={mapRef}
                onResult={handleOnResult}
                onViewportChange={setViewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                // mapboxApiAccessToken={"mapbox://styles/birajkhatiwada/ckd6zcsfn0g031ise8iy1qhm6"}
                position='top-right'
              />

    <div className="toggle-btns">
      <button className="toggle" onClick={()=> setMapStyle("mapbox://styles/birajkhatiwada/ckd6zcsfn0g031ise8iy1qhm6")}>Basic Map</button>
      <button className="toggle" onClick={()=>setMapStyle("mapbox://styles/birajkhatiwada/ckd6zh2zu0g251ikokpwdhpee")}>Satellite Map</button>
      <button className="toggle" onClick={()=>setMapStyle("mapbox://styles/birajkhatiwada/ckd9v0k840kwa1imo7uy2yui7")}>Outdoor Map</button>
    </div>
    </ReactMapGL>
    {/* <DeckGL {...viewport} layers={[searchResultLayer]} /> */}

    </div>
    {/* <br/> */}
    {/* <nav>
    <div className="btns">
      <button className="toggle" onClick={()=> setMapStyle("mapbox://styles/birajkhatiwada/ckd6zcsfn0g031ise8iy1qhm6")}>Basic Map</button>
      <button className="toggle" onClick={()=>setMapStyle("mapbox://styles/birajkhatiwada/ckd6zh2zu0g251ikokpwdhpee")}>Satellite Map</button>
      <button className="toggle" onClick={()=>setMapStyle("mapbox://styles/birajkhatiwada/ckd9v0k840kwa1imo7uy2yui7")}>Outdoor Map</button>
    </div>
    </nav> */}
    </>
  );
}

export default App;
