import React from "react";
import LocationPicker from 'react-location-picker';
const autoBind = require("react-auto-bind");

const defaultPosition = {
    lat: 27.9878,
    lng: 86.9250
};

export class MapComponent extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            position: defaultPosition
        };
    }

    handleLocationChange ({ position, address }) {
 
        console.log(position);
        this.setState({position});
      }
     
      render () {
        return (
          <div>
            <div>
              <LocationPicker
                containerElement={ <div style={ {height: '100%'} } /> }
                mapElement={ <div style={ {height: '400px'} } /> }
                defaultPosition={defaultPosition}
                onChange={this.handleLocationChange}
              />
            </div>
          </div>
        )
      }
}