import React, { useState } from 'react';
import { WNavItem, WInput } from 'wt-frontend';

import { WModal, WMHeader, WMMain, WButton } from 'wt-frontend';

const EditMap = (props) => {
    const [editing, toggleEditing] = useState(false);
    const [preEdit, setPreEdit] = useState(props.name);
    const handleEditing = (e) => {
        e.stopPropagation();
        setPreEdit(props.name);
        toggleEditing(!editing);
    };

    const handleSubmit = (e) => {
        handleEditing(e);
        const { name, value } = e.target;
        props.updateListField(props.map._id, name, value, preEdit);
    };

    const entryStyle = props._id === props.activeid ? 'list-item-active' : 'list-item ';
    

    let handleChange = (event) =>{
        props.renameMap(props.map.id, event.target.value)
    }

    return (
        <WModal className="delete-modal" cover="true" visible={props.showEdit}>
            <WMHeader  className="modal-header editmap" onClose={() => props.toggleShowEdit(false)}>
                Rename Map?
                <WInput className="list-item-edit" inputClass="list-item-edit-input"
                                onKeyDown={(e) => {if(e.keyCode === 13) handleSubmit(e)}}
                                name='name' onBlur={handleSubmit} autoFocus={true} defaultValue={props.map.name} 
                            />
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