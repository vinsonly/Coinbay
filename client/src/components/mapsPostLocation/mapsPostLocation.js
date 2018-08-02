import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './mapsPostLocation.css';

class SimpleMap extends Component {

  render() {

    let defaultCenter = {
      lat: this.props.lat,
      lng: this.props.lng
    }

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDvtndexGCQLEeLUsklFakSejGOElaVlH8" }}
          defaultCenter={defaultCenter}
          defaultZoom={11}
        >
          <PostingSingleMarker
            lat={this.props.lat}
            lng={this.props.lng}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

class PostingSingleMarker extends Component {
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

export default SimpleMap;