import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const LandmarkEntry = (props) => {

    const [edit, toggleEdit] = useState(false)
    const [landmark, setLandmark] = useState(props.landmark)

    
    
    const handleLandmarkEdit = (e) => {
        toggleEdit(false);
        const newStatus = e.target.value ? e.target.value : 'No Description';
        const prevStatus = props.maps.completed;
        if(newStatus !== prevStatus) {
           // props.editItem(props.map._id, 'completed', newStatus, prevStatus);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
        props.deleteLandmark(e.target.firstChild.firstChild.firstChild.value)
    }

    return (
      <form
        onSubmit={handleSubmit}
      >
        <WRow className="subregion-table-entry">
          <WCol size="10">
            {edit? (
              <WInput
                className="table-input"
                onBlur={handleLandmarkEdit}
                type="text"
                autoFocus={true}
                defaultValue={props.landmark}
                type="text"
                /*wType="outlined" barAnimation="solid" */ inputclass="table-input-class"
              />
            ) : (
              <input className="landmark-input"  value = {props.landmark}/>
                

            )}
          </WCol>
          <WCol size="2">
            <div className="button-group">
              <WButton
                className="table-entry-buttons"
                type = 'button'
                onClick={() => {props.handleEditLandmark(props.landmark);props.toggleEditLandmark(true)}}
                wType="texted"
              >
                <i className="material-icons">edit</i>
              </WButton>

              <WButton
                type ='submit'
                className="table-entry-buttons"
                onClick="submit"
                wType="texted"
              >
                <i className="material-icons">close</i>
              </WButton>
            </div>
          </WCol>
        </WRow>
      </form>
    );
};

export default LandmarkEntry;