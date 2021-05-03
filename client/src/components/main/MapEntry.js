import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

import { useHistory } from "react-router-dom";


const MapEntry = (props) => {
    const history = useHistory();
    const redirect = '/maps/' +props.name; 
    return (
        <div className='map-entry'>
        <WButton onClick = {() => history.push(redirect)} >{props.name}</WButton>
        <div>
        <WButton  wType="texted" className='button' clickAnimation={props.disabled ? "" : "ripple-light" }>
                        <i className="material-icons">delete_outline</i>
                    </WButton>
                    </div>
        </div>
        
    );
};

export default MapEntry;