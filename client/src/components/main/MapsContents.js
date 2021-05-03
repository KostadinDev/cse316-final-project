import React        from 'react';
import MapEntry   from './MapEntry';

import { WButton, WRow, WCol } from 'wt-frontend';
const MapsContents = (props) => {

    let entries = props.activeList ? props.activeList.items : null;
    let entryCount = 0;
    if(entries) {
        entries = entries.filter(entry => entry !== null);
        entryCount = entries.length
    }

    
    return (
      <div className="map-container">
        <div className="map-list">
          {props.todolists.map((map) => (
            <MapEntry map={map} handleUpdate ={props.handleUpdate} editMap = {props.editMap} toggleShowEdit = {props.toggleShowEdit}  deleteMap = {props.deleteMap}/>
          ))}
        </div>
        <div className="map-image">
          <div>image</div>

          <WButton onClick = {props.createMaps} className = 'new-map-button'>Create New Map</WButton>
        </div>
      </div>
    );
};

export default MapsContents;