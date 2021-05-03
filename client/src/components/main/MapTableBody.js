import React        from 'react';
import MapTableEntry   from './MapTableEntry';

const MapTableBody = (props) => {


    
    return (
      <div>
          <div className = 'map-table-body-header'>
              <div>Name</div>
              <div>Capital</div>
              <div>Leader</div>
              <div>Flag</div>
              <div>Landmarks</div>
              
          </div>
          {
              props.map.regions.map((region) => ( 
              <div>
              <MapTableEntry className ='map-table-entry' region = {region}></MapTableEntry>
              </div>))
          }
                 
         
      </div>
    );
};

export default MapTableBody;