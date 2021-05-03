import React from 'react';

import { WModal, WMHeader, WMMain, WButton } from 'wt-frontend';

const EditMap = (props) => {

    return (
        <WModal className="delete-modal" cover="true" visible={props.showEdit}>
            <WMHeader  className="modal-header editmap" onClose={() => props.toggleShowEdit(false)}>
                Rename Map?
                <input className = 'modal-editmap' value ={props.map.name}></input>
			</WMHeader >

            <WMMain>
                <WButton className="modal-button cancel-button" onClick={() => props.toggleShowEdit(false)} wType="texted">
                    Cancel
				</WButton>
                <label className="col-spacer">&nbsp;</label>
                <WButton className="modal-button" onClick={()=>{}} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Submit
				</WButton>
            </WMMain>

        </WModal >
    );
}

export default EditMap;