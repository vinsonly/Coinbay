import React, { Component } from 'react';

import "./metacoin.css"

class MetaCoin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }

    
  render() {
    return (
    	<div className="metacoin">
      		<div className="interface">
                <div className="value">
                    {this.state.value}
                </div>

            </div>
      	</div>
    );
  }
}

export default MetaCoin;