import React        from 'react';
import MapEntry   from './MapEntry';

const MapsContents = (props) => {

    let entries = props.activeList ? props.activeList.items : null;
    let entryCount = 0;
    if(entries) {
        entries = entries.filter(entry => entry !== null);
        entryCount = entries.length
    }
    let maps = [{name:'world'}, {name:'league of legends'}] 
    
    return (
      <div className="map-container">
        <div className="map-list">
          {maps.map((map) => (
            <MapEntry name={map.name} />
          ))}
        </div>
        <div className="map-image">
          <div>image</div>

          <div className = 'new-map-button'>Create New Map</div>
        </div>
      </div>
    );
};

export default MapsContents;