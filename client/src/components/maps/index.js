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
      lng: -123.118275,
      gmapsOverlayStyle: {}
    };

    this.onBoundsChange = this.onBoundsChange.bind(this);

    this.gmapsWrapper = React.createRef();
    this.gmapsOverlay = React.createRef();

    this.gmapsOverlayStyle = {};
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

    let gmapsOverlay = {};

    return (
      // Important! Always set the container height explicitly
      <div id="gmapsWrapper" style={{ height: '600px', width: '100%' }} ref={this.gmapsWrapper}>
      <div id="gmapsOverlay" ref={this.gmapsOverlay} style={this.state.gmapsOverlayStyle}>
        <div id="tempMarker"/>
      </div>
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

  componentDidUpdate() {
    let style = window.getComputedStyle(this.gmapsWrapper.current);
    let width = style.width;
    if(this.state.gmapsOverlayStyle.width != width ) {
      this.setState({
        gmapsOverlayStyle: {
          width: width
        }
      })
    }
  }

  componentDidMount() {
    let style = window.getComputedStyle(this.gmapsWrapper.current);
    let width = style.width;
    if(this.state.gmapsOverlayStyle.width != width ) {
      this.setState({
        gmapsOverlayStyle: {
          width: width
        }
      })
    }  }
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
