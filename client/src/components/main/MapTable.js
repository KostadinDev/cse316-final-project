import React            from 'react';
import MapTableHeader      from './MapTableHeader';
import TableContents    from './TableContents';

import MapTableBody    from './MapTableBody';
import RegionView    from './RegionView';

const MapTable = (props) => {
    let view = 0;
    return (
      <div className="map-table-wrapper">
          {view == 0?<div className="map-table ">
          <MapTableHeader map={props.map} />
          <MapTableBody map={props.map} />
        </div>:
        <RegionView map ={props.map}></RegionView>}
      </div>
    );
};

export default MapTable;