import React from 'react';

import { WModal, WMHeader, WMMain, WButton } from 'wt-frontend';

const EditMap = (props) => {

    let handleChange = (event) =>{
        props.renameMap(props.map.id, event.target.value)
    }

    return (
        <WModal className="delete-modal" cover="true" visible={props.showEdit}>
            <WMHeader  className="modal-header editmap" onClose={() => props.toggleShowEdit(false)}>
                Rename Map?
                <input onChange = {handleChange} className = 'modal-editmap' value ={props.map.name}></input>
			</WMHeader >

            <WMMain className = 'edit-map-finished'>
              
                <WButton className="modal-button" onClick={() => props.toggleShowEdit(false)} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Finished
				</WButton>
            </WMMain>

        </WModal >
    );
}

export default EditMap;