import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const LandmarkEntry = (props) => {

    const [edit, toggleEdit] = useState(false)
    const [landmark, setLandmark] = useState(props.landmark)

    
    
    const handleLandmarkEdit = (e) => {
        toggleEdit(false);
        // const newStatus = e.target.value ? e.target.value : 'No Description';
        // const prevStatus = props.maps.completed;
        // if(newStatus !== prevStatus) {
        //    // props.editItem(props.map._id, 'completed', newStatus, prevStatus);
        // }
    };


    return (
        <WRow className='table-entry'>

            <WCol size="10">
                {
                    props.landmark === ''
                        ? <WInput
                            className='table-input' onBlur={handleLandmarkEdit}
                            type = 'text'
                            autoFocus={true} defaultValue={props.landmark} type='text'
                            /*wType="outlined" barAnimation="solid" */inputclass="table-input-class"
                        />
                        : <div className={` table-text`}
                            onClick={() => toggleEdit(!edit)}
                        >{props.landmark}
                        </div>
                }
            </WCol>
            <WCol size="2">
                <div className='button-group'>
                    <WButton className="table-entry-buttons" onClick={() =>{}} wType="texted">
                        <i className="material-icons">close</i>
                    </WButton>
                    <WButton className="table-entry-buttons" onClick={() => {}} wType="texted">
                        <i className="material-icons">add_box</i>
                    </WButton>
                </div>
            </WCol>
        </WRow>
    );
};

export default LandmarkEntry;