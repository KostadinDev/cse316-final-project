import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const TableEntry = (props) => {
   


    return <div className = "map-table-entry">
        <div className = 'map-table-entry-name'>
        <WButton onClick = {() => {props.deleteRegion(props.map.id, props.region.id)}} className="table-entry-buttons red" wType="texted">
                        <i className="material-icons">close</i>
                    </WButton>
        <input className = 'map-table-entry-name' value = {props.region.name}></input>
        </div>
        <input className = 'map-table-entry-name' value = {props.region.capital}/> 
        <input className = 'map-table-entry-name' value = {props.region.leader}/>
        <div className = 'map-table-entry-name' ></div>
        <div className = 'map-table-entry-name'  >{props.region.landmarks}</div>
    </div>;
};

export default TableEntry;