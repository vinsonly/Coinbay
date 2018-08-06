import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 
Modal.setAppElement('#root')
 
export default class UserModal extends React.Component {
  constructor() {
    super();
 
    this.state = {
      modalIsOpen: false
    };
 
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
 
  openModal() {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
 
  closeModal() {
    this.setState({modalIsOpen: false});
  }
 
  render() {

    if(!this.props.row || !this.props.loggedInUser) {
        return(<div>Loading...</div>)
    }

    console.log(this.props.row);

    let posting = this.props.row._original; 

    let user;

    let typeOfUser;

    if(this.props.loggedInUser.id == posting.userId) {
        typeOfUser = "seller"
    } else {
        typeOfUser = "buyer"
    }

    if(typeOfUser == "buyer") {
        user = posting.User
    } else {
        user = posting.Buyer
    }

    return (
      <div style={{
        display: "flex",
        width: "100%",
        height: "100%"
    }}>
        <button onClick={this.openModal}>View</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h4>User [{user.id}]</h4>
          <p><span className="fieldTitles">Username</span>: {user.username}</p>
          <p><span className="fieldTitles">Email</span>: {user.email}</p>
          <p><span className="fieldTitles">Phone Number</span>: {user.phone}</p>
          <p><span className="fieldTitles">Ethereum Address</span>: {user.crypto}</p>
          <p><span className="fieldTitles">Rating</span>: {user.rating}/10</p>

          <button onClick={this.closeModal}>close</button>          
        </Modal>
      </div>
    );
  }
}