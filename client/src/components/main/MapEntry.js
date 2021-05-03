import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

import { useHistory } from "react-router-dom";


const MapEntry = (props) => {
    const history = useHistory();
    const redirect = '/maps/' +props.map.name; 
    return (
        <div className='map-entry'>
        <WButton  className = 'button' onClick = {() => {history.push(redirect);
            console.log(redirect)}} >{props.map.name}</WButton>
        <div>
        <WButton  wType="texted" className='button' onClick = {() => (props.deleteMap(props.map.id))} clickAnimation={props.disabled ? "" : "ripple-light" }>
                        <i className="material-icons">delete_outline</i>
                    </WButton>
                    </div>
        </div>
        
    );
};

export default MapEntry;