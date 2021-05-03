import React        from 'react';
import MapTableEntry   from './MapTableEntry';

const MapTableBody = (props) => {


    
    return (
      <div>
          <div className = 'map-table-body-header'>
              <div className = 'map-table-entry-name'>Name</div>
              <div className = 'map-table-entry-name'>Capital</div>
              <div className = 'map-table-entry-name'>Leader</div>
              <div className = 'map-table-entry-name'>Flag</div>
              <div className = 'map-table-entry-name'>Landmarks</div>
              
          </div>
          {
              props.map.regions?props.map.regions.map((region) => ( 
              <div>
              <MapTableEntry className ='map-table-entry' region = {region}></MapTableEntry>
              </div>)):""
          }
                 
         
      </div>
    );
};

export default MapTableBody;