import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './styles.css'
import { Link } from 'react-router-dom';
import ReactSpinner from 'react-spinners';
import { baseUrl} from '../../index';

class UserProfile extends Component {
    constructor(props) {
        super(props);

        console.log(props);

        this.state = {
            username: props.user.username || "",
            email: props.user.email || "",
            phone: props.user.phone || "",
            crypto: props.user.crypto,
            editting: false,
            userLoaded: false
        }

        this.updateState = this.updateState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
    }

    updateState() {
        if(this.props.user.username && !this.state.userLoaded) {
            this.setState({
                username: this.props.user.username || "",
                email: this.props.user.email || "",
                phone: this.props.user.phone || "",
                userLoaded: true
            })
        } 
    }

    openEdit() {
        console.log("opening edit")
        this.setState({
            editting: true
        })
    }

    closeEdit() {
        console.log("closing edit")

        this.setState({
            editting: false            
        })

    }

    isZeroLength(str) {

        if(typeof string == "string")
            return str.length < 1
    } 

    saveProfile() {
        console.log("saving profile");
        console.log(this.state);

        if(this.isZeroLength(this.state.email) ||
        this.isZeroLength(this.state.username) ||
        this.isZeroLength(this.state.password) ||
        this.isZeroLength(this.state.phone)) {
            alert("Fields can not be empty");
            return;
        }

        let data = {
            id: this.props.user.id,
            email: this.state.email,
            username: this.state.username,
            phone: this.state.phone
        }
        
        console.log(data);

        let status;
        
        setTimeout(function() {
            // set a post request 
            fetch(baseUrl + '/api/user/update', {
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
                if(status != 200) {
                    alert(`Error: ${body.message}`);
                } else {
                    localStorage.removeItem('sessionToken');
                    alert('User successfully updated. Please login again with your updated credentials.');
                    console.log(body);
                    // redirect the user to their post
                    window.location.replace('/login');
                }
            })
            .catch(err => {
                console.error('ERROR', err);
            })
        }, 1000)

    }


    handleChange(event) {
        console.log(event.target.name);
        switch(event.target.name) {
            case 'username':
                this.setState({
                    username: event.target.value
                })
                break;
            case 'email':
                this.setState({
                    email: event.target.value
                })
                break;
            case 'phone':
                this.setState({
                    phone: event.target.value
                })
                break;
        }
    }
    
    render() {

        if(!this.props.user) {
            return (
                <div>
                    Loading user info...
                </div>
            )
        }


        if(this.state.editting) {
            return (
                <div id="editUserProfile">
                    <ul>
                        <li class="userListField">
                            <p><span class="fieldName">Username:</span> <input onChange={this.handleChange} name="username" value={this.state.username}/> </p>
                        </li>
                        <li class="userListField">
                            <p><span class="fieldName">Email:</span> <input onChange={this.handleChange} name="email" value={this.state.email}/> </p>
                        </li>
                        <li class="userListField">
                            <p><span class="fieldName">Phone Number:</span> <input onChange={this.handleChange} name="phone" value={this.state.phone} /> </p>
                        </li>
                        <li class="userListField">
                            <p><span class="fieldName">User Rating:</span> {(this.props.user.rating) ? (this.props.user.rating) + "/10" : "n/a"}</p>
                        </li>
                        <li class="userListField">
                            <p><span class="fieldName">Created At:</span> {this.props.user.createdAt}</p>
                        </li>
                        <li class="userListField">
                            <p><span class="fieldName">Updated At:</span> {this.props.user.updatedAt}</p>
                        </li>
    
                        <Button onClick={this.saveProfile} variant="contained" color="primary" className={"profileEditButton"} style={{marginRight: "10px"}} >
                            Save
                        </Button>

                        <Button onClick={this.closeEdit} variant="contained" color="primary" className={"profileEditButton"}>
                            Cancel
                        </Button>
                    </ul>
                </div>
            )
        }

        return (
            <div id="userProfile">
                <ul>
                    <li class="userListField">
                        <p><span class="fieldName">Username:</span> {this.props.user.username}</p>
                    </li>
                    <li class="userListField">
                        <p><span class="fieldName">Email:</span> {this.props.user.email}</p>
                    </li>
                    <li class="userListField">
                        <p><span class="fieldName">Phone Number:</span> {(this.props.user.phone) ? (this.props.user.phone) : "n/a"}</p>
                    </li>
                    <li class="userListField">
                        <p><span class="fieldName">User Rating:</span> {(this.props.user.rating) ? (this.props.user.rating) + "/10" : "n/a"}</p>
                    </li>
                    <li class="userListField">
                        <p><span class="fieldName">Created At:</span> {this.props.user.createdAt}</p>
                    </li>
                    <li class="userListField">
                        <p><span class="fieldName">Updated At:</span> {this.props.user.updatedAt}</p>
                    </li>

                    <Button onClick={this.openEdit} variant="contained" color="primary" className={"profileEditButton"}>
                        Edit User Info
                    </Button>

                    <Link to="/manage_transactions">
                        <Button variant="contained" color="primary" className={"profileOffers"}>
                            View Your Offers
                        </Button>
                    </Link>

                </ul>
            </div>
        );
  }

  componentDidMount() {

    console.log(this.props.user);

    this.updateState();
  }

  componentDidUpdate() {
    this.updateState();
  }

}

class Status extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        console.log(this.props.status);

        if(this.props.status) {
            if(this.props.status == "Updating...") {
                return (
                    <div className="postingStatus">
                        <span className="spanStatus">{this.props.status}</span>
                        <ReactSpinner />
                    </div>
                )
            } 
            else if(this.props.status == "Update Failed") {
                return (
                    <div className="postingStatus">
                        <span className="spanStatus">{this.props.status}</span>
                        <i className="material-icons" styles="color: red;">
                            error
                        </i>                    
                    </div>
                )
            } else if(this.props.status == "Success"){
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

export default UserProfile;