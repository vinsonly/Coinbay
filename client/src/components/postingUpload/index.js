import React from 'react';
import { Link } from 'react-router-dom';
import './styling.css';
import ReactSpinner from '../misc/reactspinner.js';

import Map from '../maps';

import Dropzone from 'react-dropzone'

class PostingUpload extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            postingTitle: "",
            modelName: "",
            brand: "",
            category: "Beauty",
            priceDollars: 0,
            priceCents: 0,
            description: "",
            abstract: {
                abstract1: "",
                abstract2: "",
                abstract3: ""
            },
            date: "",
            location: {
                lat: "",
                lng: ""
            },
            images: [],
            status: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleImageSubmit = this.handleImageSubmit.bind(this);
        this.setLocation = this.setLocation.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        // console.log(this.state);

        if(this.state.status == "Uploading image(s)...") {
            alert("Please wait for image upload to finish");
            return;
        }

        if(this.state.status == "imageUploadFailed") {
            if(!window.confirm("Image uploading failed, failed images will not be included in the posting. Would you like to proceed?")) {
                return;
            }
        }

        console.log("this.state", this.state);

        // enforce mandatory values
        if(this.state.postingTitle.length < 1 ||
        this.state.modelName.length < 1 ||
        this.state.brand.length < 1 ||
        this.state.category.length < 1 ||
        !this.state.priceDollars ) {
            alert("Please fill out all mandatory fields");
            return;
        }

        if(!(this.state.images && this.state.images.length > 0)) {
            alert("You must upload at least one image");
            return;
        }

        if( (this.state.location.lat && !this.state.location.lng) ||
            (!this.state.location.lat && this.state.location.lng)
        ) {
            alert("You can not leave one location field empty.");
            return;
        }

        let price = parseInt(this.state.priceDollars) + parseInt(this.state.priceCents)/100;


        let data = {
            postingTitle: this.state.postingTitle,
            modelName: this.state.modelName,
            brand: this.state.brand,
            category: this.state.category,
            price: price,
            location: this.state.location
        }

        if(this.state.description.length > 0) {
            data.description = this.state.description;
        }

        let abstract = [];

        let abstractIsEmpty = true;

        for(var ab in this.state.abstract) {
            if(ab.length > 1) {
                await abstract.push(this.state.abstract[ab]);
                abstractIsEmpty = false;
            }
        }

        data.abstract = abstract;

        if(this.state.location.lat.length > 0) {
            let location = {
                lat: this.state.location.lat,
                lng: this.state.location.lng,
            }
            data.location = location;
        }


        if(this.state.images.length > 0) {
            data.images = this.state.images;
        }

        console.log(data);

        let status;
        fetch('/api/posting', {
            method: 'POST',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('sessionToken')
            }
          })
          .then((res) => {
            status = res.status;
            return res.json();
          })
          .then(body => {
            if(status != 201) {
              alert(`Error: ${body.message}`);
            } else {
                alert("Posting created!");

                console.log(body);
                // redirect the user to their post
            }
          })
          .catch(err => {
            console.error('ERROR', err);
          })

        // Math.round(price*100)/100
        // use this formula to get the number to the nearest 2 decimal places

    }

    handleImageSubmit(base64) {
        let obj = this;

        let data = {
            image: base64
        }

        let status;

        this.setState({
            status: "Uploading image(s)..."
        })

        fetch('https://api.imgur.com/3/image', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json',
                'Authorization': "Client-ID 05c586b02aba2e1"
            }
          })
        .then(res => {
            status = res.status;
            return res.json();
        })
        .then(body => {
            if(status != 200) {
                obj.setState({
                    status: "ImageUploadFailed: Image size is too large"
                })
            } else {
                let newImages = this.state.images;
                newImages.push(body.data.link)
                obj.setState({
                    status: "ready",
                    images: newImages
                })
            }

        })

    }

    setLocation(lat, lng) {
        this.setState({
            location: {
                lat: lat,
                lng: lng
            }
        })
    }

    handleChange(event) {
        let abstract1 = this.state.abstract.abstract1;
        let abstract2 = this.state.abstract.abstract2;
        let abstract3 = this.state.abstract.abstract3;

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
                    priceDollars: parseInt(event.target.value)
                })
                break;
            case 'priceCents':
                let value = parseInt(event.target.value)%100;
                this.setState({
                    priceCents: value
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
            case 'categorySelector':
                this.setState({
                    category: event.target.value
                })
                break;
        }
    }

  render() {

    return(
        <div id="postingUploadContainer">
            <h3>Posting Upload</h3>
            <div className="formContainer">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="postingTitle" className="grey-text">Posting Title</label>
                    <span className="mandatoryStar">*</span>
                    <input onChange={this.handleChange} type="text" id="postingTitle" className="form-control"/>
                    <br/>

                    <label htmlFor="modelName" className="grey-text">Model Name</label>
                    <span className="mandatoryStar">*</span>
                    <input onChange={this.handleChange} type="text" id="modelName" className="form-control"/>
                    <br/>

                    <label htmlFor="brand" className="grey-text">Brand</label>
                    <span className="mandatoryStar">*</span>
                    <input onChange={this.handleChange} type="text" id="brand" className="form-control"/>
                    <br/>

                    <label htmlFor="Category" className="grey-text">Category*</label><br/>
                    <div id="categoryDiv">
                        <select name="category" id="categorySelector" value={this.state.category} onChange={this.handleChange}>
                            <option value="Beauty">Beauty</option>
                            <option value="Pets">Pets</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Books">Books</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Jewelry">Jewelry</option>
                            <option value="Art">Art</option>
                            <option value="Health">Health</option>
                            <option value="Gardening">Gardening</option>
                            <option value="Office">Office</option>
                            <option value="Music">Music</option>
                            <option value="Home">Home</option>
                            <option value="Outdoors">Outdoors</option>
                            <option value="Toys">Toys</option>
                            <option value="Tools">Tools</option>
                            <option value="Antiques">Antiques</option>
                            <option value="miscellaneous">miscellaneous</option>
                        </select>
                    </div>
                    <br/>

                    <label htmlFor="price" className="grey-text">Price</label>
                    <span className="mandatoryStar">*</span>
                    <div id="priceContainer">
                        <span id="dollar">$</span>
                        <input onChange={this.handleChange} value={this.state.priceDollars} type="number" id="priceDollars" className="form-control"/>
                        <span id="dot">.</span>
                        <input onChange={this.handleChange} value={this.state.priceCents} type="number" id="priceCents" className="form-control"/>
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

                    {/* <label htmlFor="meetingLocation" className="grey-text">Latitude</label>
                    <input onChange={this.handleChange} type="number" id="lat" className="form-control meetingLocation"/>
                    <label htmlFor="meetingLocation" className="grey-text">Longitude</label>
                    <input onChange={this.handleChange} type="number" id="lng" className="form-control meetingLocation"/> */}

                    <label htmlFor="meetingLocation" className="grey-text">Meeting Location</label>
                    <Map setLocation={this.setLocation}/>

                    <Accept handleSubmit={this.handleImageSubmit}/>
                    Uploaded Images:
                    <div className="uploadedImages">{
                        this.state.images.map(image => {
                            return(
                                <li><a href={image}>{image}</a></li>
                            )
                        })
                    }</div>
                    <Status status={this.state.status}/>
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

    }

    async onDrop(accepted, rejected) {

        let acceptedBase64 = [];

        let props = this.props;

        if(rejected.length > 0) {
            alert("Only jpg, jpeg, and png files are accepted.");
        }

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
            {/* <p>Accepted files:</p>
            <ul>
                {
                    this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                }
            </ul> */}
            {/* <p>Rejected files</p>
            <ul>
                {
                    this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                }
            </ul> */}
            </aside>
        </section>
        );
    }
}

class Status extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        console.log(this.props.status);

        if(this.props.status) {
            if(this.props.status != "ready") {
                return (
                    <div className="postingStatus">
                        <span className="spanStatus">{this.props.status}</span>
                        <ReactSpinner />
                    </div>
                )
            }
            else if(this.props.status == "imageUploadFailed") {
                return (
                    <div className="postingStatus">
                        <span className="spanStatus">{this.props.status}</span>
                        <i className="material-icons" styles="color: red;">
                            error
                        </i>
                    </div>
                )
            } else {
                return (
                    <div className="postingStatus">
                        <span className="spanStatus">{this.props.status}</span>
                        <i className="material-icons" styles="color: green;">
                            check
                        </i>
                    </div>
                )
            }
        } else {
            return (
                <div></div>
            )
        }
    }
}



function removeFirstChars(base64, type) {
    let toRemove = 13 + type.length;
    return base64.substring(toRemove, base64.length);
}

export default PostingUpload;
