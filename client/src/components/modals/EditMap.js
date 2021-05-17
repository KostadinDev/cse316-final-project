import React, {useState} from 'react';

import { WModal, WInput, WMHeader, WMMain, WButton } from 'wt-frontend';

const EditMap = ({ show, toggleShow, id, update }) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const [newName, setNewName] = useState("")


    return (
        <div className={showHideClassName}>

        <section className="modal-main">
        <WMHeader  className="modal-header" onClose={() => {}}>
                Update Map Name
			</WMHeader >
     
            <WInput className="modal-input update-name"  onChange = {(e) => {setNewName(e.target.value)}}name='email' labelAnimation="up" barAnimation="solid" labelText={"Map Name"} wType="outlined" inputType='text' />
            <WMMain className='update-name-container'>
                <WButton className="modal-button cancel-button" onClick={() => {toggleShow(false)}} wType="texted">
                    Cancel
				</WButton>
                <label className="col-spacer">&nbsp;</label>
                <WButton className="modal-button" onClick={() => {
                    update(id, 'name', newName, 'neznam'); toggleShow(false)}} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Change
				</WButton>
            </WMMain>

        </section>
      </div>
    );
}

export default EditMap;