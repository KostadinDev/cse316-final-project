import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const TableEntry = (props) => {
   


    return <div className = "map-table-entry">
        <div className = 'map-table-entry-name'>
        <WButton className="table-entry-buttons" wType="texted">
                        <i className="material-icons">close</i>
                    </WButton>
        <div className = 'map-table-entry-name'>{props.region.name}</div>
        </div>
        <div className = 'map-table-entry-name'> {props.region.capital}</div>
        <div className = 'map-table-entry-name' >{props.region.leader}</div>
        <div className = 'map-table-entry-name'>{props.region.flag}</div>
        <div className = 'map-table-entry-name'>{props.region.landmarks}</div>
    </div>;
};

export default TableEntry;