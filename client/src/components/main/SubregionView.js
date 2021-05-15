import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const SubregionView = (props) => {
   


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
              Region Name: <input type = 'text' value = {props.map.description}/>
            </div>
            <div className="region-view-data-entry">
            Region Name: <input type = 'text' value = {props.map.description}/>
            </div>
            <div className="region-view-data-entry">
              Region Capital: <input type = 'text' value = {props.map.due_date}/>
            </div>
            <div className="region-view-data-entry">
              Region Leader: <input type = 'text' value = {props.map.completed}/>
            </div>
            <div className="region-view-data-entry">
              # of Sub Regions: {props.map.items?props.map.items.length:'0'}
            </div>
          </div>
        </div>
        <div className="region-view-landmarks">
        <div className="region-view-data region-view-landmarks-data">
            <div className="region-view-data-entry">
             {props.map.landmarks?props.map.landmarks.map((landmark) => (<div className = 'landmarks'>
             <WButton className="table-entry-buttons red landmarks-button" wType="texted">
             <i className="material-icons">close</i>
         </WButton>
             <div>{landmark}</div>
             </div>)):""}
            </div>
            
          </div>

          <div className = 'region-view-landmarks-add'>
          <WButton className=" region-view-landmarks-add-button" wType="texted">
                        <i className="material-icons">add_box</i>
                    </WButton>


                
            <input className = 'region-view-landmarks-add-input' value = 'hello'></input>
          </div>
        </div>
      </div>
    );
};

export default SubregionView;