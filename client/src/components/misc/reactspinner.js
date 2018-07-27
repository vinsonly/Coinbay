import React from 'react';
import { ClipLoader } from 'react-spinners';
 
class ReactSpinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  render() {
    return (
      <div className='sweet-loading'>
        <ClipLoader
          color={'#1b60d1'} 
          loading={this.state.loading} 
          size={35}
        />
      </div>
    )
  }
}

export default ReactSpinner