import React from 'react';
import { Link } from 'react-router-dom';
import './styling.css';

import Dropzone from 'react-dropzone'

var base64Img = require('base64-img');

class PostingUpload extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            postingTitle: "",
            modelName: "",
            brand: "",
            priceDollars: 0,
            priceCents: 0,
            description: "",
            abstract: {
                abstract1: "",
                abstract2: "",
                abstract3: ""
            },
            location: {
                lat: "",
                lng: ""
            }
        }      

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleImageSubmit = this.handleImageSubmit.bind(this);
    }

    onDrop(acceptedFiles, rejectedFiles) {
        console.log("inside onDrop");
    }

    handleSubmit(event) {
        console.log("handling submit");
        console.log(this.state);
    }

    handleImageSubmit(base64) {
        console.log("base64:", base64);

        let data = {
            image: base64
        }

        let status;

        fetch('https://api.imgur.com/3/image', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json',
                'Authorization': "Client-ID 05c586b02aba2e1"
            }
          })
        .then(res => {
            console.log(res);
            status = res.status;
            return res.json();
        })
        .then(body => {
            console.log(body);
        
            // save the image url into database when the user clicks upload 
        })
      
    }

    handleChange(event) {

        let abstract1 = this.state.abstract.abstract1;
        let abstract2 = this.state.abstract.abstract2;
        let abstract3 = this.state.abstract.abstract3;

        console.log(event.target.id);
        switch(event.target.id) {
            case 'postingTitle':
                this.setState({
                    postingTitle: event.target.value
                })
                break;
            case 'modelName':
                this.setState({
                    modelName: event.target.value
                })
                break;
            case 'brand':
                this.setState({
                    brand: event.target.value    
                })
                break;
            case 'priceDollars':
                this.setState({
                    priceDollars: event.target.value
                })
                break;
            case 'priceCents':
                this.setState({
                    priceDollars: event.target.value
                })
                break;
            case 'abstract1':
                this.setState({
                    abstract: {
                        abstract1: event.target.value,
                        abstract2: abstract2,
                        abstract3: abstract3
                    }
                });
                break;
            case 'abstract2':
                this.setState({
                    abstract: {
                        abstract1: abstract1,
                        abstract2: event.target.value,
                        abstract3: abstract3
                    }
                });
                break;
            case 'abstract3':
                this.setState({
                    abstract: {
                        abstract1: abstract1,
                        abstract2: abstract2,
                        abstract3: event.target.value
                    }
                });
                break;
            case 'description':
                this.setState({
                    description: event.target.value
                })
                break;
            case 'lat':
                this.setState({
                    location: {
                        lat: event.target.value,
                        lng: this.state.location.lng 
                    }
                })
                break;
            case 'lng':
                this.setState({
                    location: {
                        lat: this.state.location.lat,
                        lng: event.target.value 
                    }
                })
                break;
        }
    }

  render() {

    console.log(this.state);
    
    return(    
        <div id="postingUploadContainer">
            <h3>Posting Upload</h3>
            <div className="formContainer">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="postingTitle" className="grey-text">Posting Title</label>
                    <input onChange={this.handleChange} type="text" id="postingTitle" className="form-control"/>
                    <br/>
                    
                    <label htmlFor="modelName" className="grey-text">Model Name</label>
                    <input onChange={this.handleChange} type="email" id="modelName" className="form-control"/>
                    <br/>
                    
                    <label htmlFor="brand" className="grey-text">Brand</label>
                    <input onChange={this.handleChange} type="text" id="brand" className="form-control"/>
                    <br/>
                    
                    <label htmlFor="price" className="grey-text">Price</label>
                    <div id="priceContainer">
                        <span id="dollar">$</span> 
                        <input onChange={this.handleChange} type="number" id="priceDollars" className="form-control"/>
                        <span id="dot">.</span> 
                        <input onChange={this.handleChange} type="number" id="priceCents" className="form-control"/>
                    </div>
                    <br/>
                    
                    <label htmlFor="abstract" className="grey-text">Abstract</label>
                    <input onChange={this.handleChange} type="text" id="abstract1" className="form-control abstract"/>
                    <input onChange={this.handleChange} type="text" id="abstract2" className="form-control abstract"/>
                    <input onChange={this.handleChange} type="text" id="abstract3" className="form-control abstract"/>
                    <br/>
                    
                    <label htmlFor="description" className="grey-text">Description</label>
                    <textarea onChange={this.handleChange} type="text" id="description" className="form-control" rows="3"></textarea>
                    <br/>

                    <label htmlFor="meetingLocation" className="grey-text">Latitude</label>
                    <input onChange={this.handleChange} type="number" id="lat" className="form-control meetingLocation"/>
                    <label htmlFor="meetingLocation" className="grey-text">Longitude</label>
                    <input onChange={this.handleChange} type="number" id="lng" className="form-control meetingLocation"/>

                    <Accept handleSubmit={this.handleImageSubmit}/> 
                    <div className="text-center mt-4">
                        <button className="btn btn-outline-warning" type="submit">Create Posting<i className="fa fa-paper-plane-o ml-2"></i></button>
                    </div>
                </form>
            </div>
        </div>
    )
  }
}

class Accept extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accepted: [],
            rejected: [],
            acceptedBase64: []
        }

        this.onDrop = this.onDrop.bind(this);

        console.log(props);
    }

    async onDrop(accepted, rejected) {
        console.log("inside onDrop");
        console.log("accepted", accepted);
        console.log("rejected", rejected);

        let acceptedBase64 = [];

        let props = this.props;

        if(accepted.length > 0) {
            accepted.forEach(file => {
                console.log(file);

                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function() {
                    // console.log(reader.result);
                    let base64 = removeFirstChars(reader.result, file.type);
                    // console.log(base64)
                    acceptedBase64.push(base64);

                    props.handleSubmit(base64);

                    // upload to imgur and wait for callback before continuing with posting
                }
            })
        }

        this.setState({ accepted, rejected });
    }

    render() {

        window.state = this.state;

        return (
        <section>
            <div className="dropzone">
            <Dropzone
                accept="image/jpeg, image/png"
                onDrop={this.onDrop}
            >
                <p id="dropDescription">Drop jpg or png images here</p>
            </Dropzone>
            </div>
            <aside>
            <p>Accepted files:</p>
            <ul>
                {
                    this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                }
            </ul>
            <p>Rejected files</p>
            <ul>
                {
                    this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                }
            </ul>
            </aside>
        </section>
        );
    }
}

function removeFirstChars(base64, type) {
    let toRemove = 13 + type.length;
    return base64.substring(toRemove, base64.length);
}

export default PostingUpload;