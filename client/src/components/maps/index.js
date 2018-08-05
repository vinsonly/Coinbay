import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleMapReact from 'google-map-react';
import './styling.css';


/** Class representing a Google Map component */
class Map extends Component {
  constructor(props) {
    super(props);

    this.initialCenter = {
        lat: 49.282482,
        lng: -123.118275
    };
    this.zoom = 11;
    this.state = {
      lat: 49.282482,
      lng: -123.118275
    };

    this.onBoundsChange = this.onBoundsChange.bind(this);
  }
  /**
   * Update longitude and latitude (state)
   * @param {float array} center - Coordinates to locate a map location
   * @param {integer} zoom - Amount of zoom into a map location
   */
  onBoundsChange(center, zoom) {
    console.log(center);
    let lat = center.lat;
    let lng = center.lng;
    this.props.setLocation(lat, lng);
    this.setState({
      lat: lat,
      lng: lng
    })
  }
  render() {
    if(!this.state) {
      return (<div>Loading...</div>)
    }
    return (
      // Important! Always set the container height explicitly
      <div id="gmapsWrapper" style={{ height: '600px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDvtndexGCQLEeLUsklFakSejGOElaVlH8" }}
          defaultCenter={this.initialCenter}
          defaultZoom={this.zoom}
          onBoundsChange={this.onBoundsChange}
          center={{
            lat: this.state.lat,
            lng: this.state.lng
          }}
        >
        <Marker
          lat={this.state.lat}
          lng={this.state.lng}
        />
        </GoogleMapReact>
        {/* <div id="tempMarker">
        </div> */}
      </div>
    );
  }
}


/** Class representing a Google Map marker component */
class Marker extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div id="marker">
        <i class="material-icons" style={{color: 'red'}}>
          place
        </i>

      </div>
    )
  }
}

export default Map;
