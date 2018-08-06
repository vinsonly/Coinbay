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
 
export default class transactionModal extends React.Component {
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

    if(!this.props.txids) {
        return(<div>Loading...</div>)
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
          <h4>Ethereum Transactions</h4>
          <ul>
              {
                  this.props.txids.map((tx, index) => {
                      return(
                          <li key={index}>{tx}</li>
                      );
                  })
              }
          </ul>


          <button onClick={this.closeModal}>close</button>          
        </Modal>
      </div>
    );
  }
}