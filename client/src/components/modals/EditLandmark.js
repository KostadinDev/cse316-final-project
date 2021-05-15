import React, {useState} from 'react';

import { WModal, WInput, WMHeader, WMMain, WButton } from 'wt-frontend';

const EditLandmark = ({ handleClose, show, landmark,changeLandmark }) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const [newLandmark, setNewLandmark] = useState("")


    return (
        <div className={showHideClassName}>

        <section className="modal-main">
        <WMHeader  className="modal-header" onClose={() => {handleClose(false)}}>
                Update Landmark
			</WMHeader >
     
            <WInput className="modal-input"  onChange = {(e) => {setNewLandmark(e.target.value); console.log(newLandmark)}}name='email' labelAnimation="up" barAnimation="solid" labelText={landmark} wType="outlined" inputType='text' />
            <WMMain>
                <WButton className="modal-button cancel-button" onClick={() => handleClose(false)} wType="texted">
                    Cancel
				</WButton>
                <label className="col-spacer">&nbsp;</label>
                <WButton className="modal-button" onClick={() => {console.log(newLandmark);changeLandmark(landmark, newLandmark); handleClose(false);}} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Change
				</WButton>
            </WMMain>

        </section>
      </div>
    );
}

export default EditLandmark;