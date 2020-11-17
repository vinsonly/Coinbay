import React from 'react';
import { Container, Row, Col, Input, Button } from 'mdbreact';
import { Route } from 'react-router-dom';
import Login from "../login/Login";
import { baseUrl} from '../../index';
import './register.css'

class Register extends React.Component  {
  constructor(props) {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: "",
      email: "",
      emailConfirm: "",
      password: "",
      passwordConfirm: ""
    }

  }

  handleSubmit() {
    console.log("handling submit")
    console.log(this.state);

    if(this.state.email != this.state.emailConfirm) {
      alert("Your emails must match");
      return;
    }
    if(this.state.password != this.state.passwordConfirm) {
      alert("Your passwords must match");
      return;
    }

    if(this.state.username.length < 1 ||
       this.state.email.length < 1 ||
       this.state.emailConfirm.length < 1 ||
       this.state.password.length < 1 ||
       this.state.passwordConfirm.length < 1) {  
      alert("All fields are required");
      return;
    }

    // Post to the database

    let data = this.state;
    let status;

    data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    fetch(baseUrl + '/api/user', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      console.log(res);
      status = res.status;
      return res.json();
    })
    .then(body => {
      console.log(body);
      if(status != 201) {
        alert(`Error: ${body.message}`);
      } else {
        alert(`User successfully created!`);
        // redirect user here

        return(
          window.location.replace('/login')
        );
      }
    })
    .catch(err => {
      console.error('ERROR', err);
    })
  }

  handleChange(event) {
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

      case 'email-confirm':
        this.setState({
          emailConfirm: event.target.value
        })
        break;

      case 'password':
        this.setState({
          password: event.target.value
        })
        break;

      case 'password-confirm':
        this.setState({
          passwordConfirm: event.target.value
        })
        break;
    }
  }
  
  render() {
    return(
      <div className="container" id="registerContainer">
        <Row>
          <Col md="6">
            <form>
              <p className="h5 text-center mb-4">Sign up</p>
              <div className="grey-text">
                <Input onChange={this.handleChange} name="username" value={this.state.username} label="Username" icon="user" group type="text" validate error="wrong" success="right"/>
                <Input onChange={this.handleChange} name="email" value={this.state.email} label="Email" icon="envelope" group type="email" validate error="wrong" success="right"/>
                <Input onChange={this.handleChange} name="email-confirm" value={this.state.emailConfirm} label="Confirm your email" icon="exclamation-triangle" group type="text" validate error="wrong" success="right"/>
                <Input onChange={this.handleChange} name="password" value={this.state.password} label="Password" icon="lock" group type="password" validate/>
                <Input onChange={this.handleChange} name="password-confirm" value={this.state.passwordConfirm} label="Confirm your password" icon="exclamation-triangle" group type="password" validate/>
              </div>
              <div className="text-center">
                <Button color="primary" onClick={this.handleSubmit} >Register</Button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
};

export default Register;   
