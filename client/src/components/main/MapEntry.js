import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const MapEntry = (props) => {
    
    return (
        <div className='map-entry'>
        <div>{props.name}</div>
        <div>
        <WButton  wType="texted" className='button' clickAnimation={props.disabled ? "" : "ripple-light" }>
                        <i className="material-icons">delete_outline</i>
                    </WButton>
                    </div>
        </div>
        
    );
};

export default MapEntry;