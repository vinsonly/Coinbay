
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import './styling.css'


class Map extends Component {
  constructor(props) {
    super(props);

    this.initialCenter = {
        lat: 49.282482,
        lng: -123.118275
    }
    
    this.zoom = 11

    this.state = {
      lat: 49.282482,
      lng: -123.118275
    };

    this.onClick = this.onClick.bind(this);
    this.onBoundsChange = this.onBoundsChange.bind(this);
  }

  onClick(x, y, _lat, _long, event) {
    console.log(x, y, _lat, _long, event);

    console.log(x.lat);
    console.log(x.lng)

    // this.setState({
    //   lat: x.lat,
    //   lng: x.lng 
    // });
  }

  onBoundsChange(center, zoom, bounds, marginBounds) {
    console.log(center);
    let lat = center.lat;
    let lng = center.lng;
    console.log(lat);
    console.log(lng);
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

    console.log(this.state); 

    return (
      // Important! Always set the container height explicitly
      <div id="gmapsWrapper" style={{ height: '600px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDvtndexGCQLEeLUsklFakSejGOElaVlH8" }}
          defaultCenter={this.initialCenter}
          defaultZoom={this.zoom}
          onClick={this.onClick}
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
