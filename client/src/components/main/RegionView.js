import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const RegionView = (props) => {
   


    return (
      <div className="region-view">
        <div className="region-view-info">
          <div className="region-view-icons">


              <WButton >
                <i className="material-icons">undo</i>
              </WButton>
              <WButton >
                <i className="material-icons">redo</i>
              </WButton>
     
          </div>
          <div className="region-view-image">image</div>
          <div className="region-view-data">
            <div className="region-view-data-entry">
              Region Name: {props.map.name}
            </div>
            <div className="region-view-data-entry">
              Region Name: {props.map.name}
            </div>
            <div className="region-view-data-entry">
              Region Capital: {props.map.capital}
            </div>
            <div className="region-view-data-entry">
              Region Leader: {props.map.leader}
            </div>
            <div className="region-view-data-entry">
              # of Sub Regions: {props.map.regions.length}
            </div>
          </div>
        </div>
        <div className="region-view-landmarks"></div>
      </div>
    );
};

export default RegionView;