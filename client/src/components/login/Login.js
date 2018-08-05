import React from 'react';
import { Container, Row, Col, Input, Button } from 'mdbreact';
import './login.css';


/** Class representing a login form component */
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
  /**
   * Make a post request to the server to login then redirect the user to the main page
   * @param {string} text - String representation of state
   * @return {request} The post request
   */
  handleSubmit(event) {
    event.preventDefault();
    let data = this.state;
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
          localStorage.setItem('sessionToken', body.token);
          window.location.replace('/');
        }
      })
      .catch(err => {
        console.error('ERROR', err);
      })  }
  /**
   * Update username and password (state)
   * @param {string} event - String representation of username and password
   */
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
