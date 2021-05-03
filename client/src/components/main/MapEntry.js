import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

import { useHistory } from "react-router-dom";


const MapEntry = (props) => {
    const history = useHistory();
    const redirect = '/maps/' +props.map; 
    return (
      <div className="map-entry">
        <WButton
          className="button"
          onClick={() => {
            history.push(redirect);
            console.log(redirect);
          }}
        >
          {props.map.name}
        </WButton>
        <div>
        <WButton
            wType="texted"
            className="button"
            onClick={() => {
              props.toggleShowEdit(true); 
                props.editMap(props.map);}
          }
            clickAnimation={props.disabled ? "" : "ripple-light"}
          >
            <i className="material-icons">edit</i>
          </WButton>
          <WButton
            wType="texted"
            className="button"
            onClick={() => props.deleteMap(props.map._id)}
            clickAnimation={props.disabled ? "" : "ripple-light"}
          >
            <i className="material-icons">delete_outline</i>
          </WButton>
        </div>
      </div>
    );
};

export default MapEntry;