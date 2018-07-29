import React from 'react';
import { Container, Row, Col, Input, Button } from 'mdbreact';

import './login.css'

class Login extends React.Component  {

  constructor(props) {
    super(props)

    this.state = {
      user: "",
      password: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);

    let data = this.state;
  
    // make a post request to the server to login then redirect the user to the main page
    let status;
    fetch('/api/login', {
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
        if(status != 200) {
          alert(`Error: ${body.message}`);
        } else {
          console.log("logged in");
          localStorage.setItem('sessionToken', body.token);
        }
      })
      .catch(err => {
        console.error('ERROR', err);
      })  }

  handleChange(event) {
    console.log(event.target);
    console.log(event.target.type);
    let type = event.target.type;
    switch(type) {
      case 'text':
        this.setState({
          user: event.target.value
        })
        break;
      case 'password':
        this.setState({
          password: event.target.value
        })
    }
  }

  render() {
    return(
      <div className="container" id="loginContainer">
        <Row>
          <Col md="6">
            <form onSubmit={this.handleSubmit}>
              <p className="h5 text-center mb-4">Sign in</p>
              <div className="grey-text">
                <Input label="Email or Username" icon="envelope" group type="text" validate error="wrong" success="right" value={this.state.user} onChange={this.handleChange}/>
                <Input label="Password" icon="lock" group type="password" validate value={this.state.password} onChange={this.handleChange}/>
              </div>
              <div className="text-center">
                <Button onClick={this.handleSubmit}>Login</Button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
};

export default Login;
