import React, {useState} from 'react';

import { WModal, WInput, WMHeader, WMMain, WButton } from 'wt-frontend';

const Verify = ({  show, toggleShow, targetDelete, deleteItem}) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }

    return (
        <div className={showHideClassName}>

        <section className="modal-main-veriy verify-sure">
        <WMHeader  className="modal-header" onClose={() => {toggleShow(false)}}>
                Are you sure?
			</WMHeader >
     
            <div className= "change-parent" >
            </div>
    
            <WMMain className = 'verify-sure'>
                <div>
                <WButton className="modal-button cancel-button" onClick={() => toggleShow(false)} wType="texted">
                    Cancel
				</WButton>
                <label className="col-spacer">&nbsp;</label>
                <WButton className="modal-button" onClick={() => {
                    deleteItem(targetDelete[0], targetDelete[1]);
                    toggleShow(false);}} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Yes!
				</WButton>
                </div>
            </WMMain>

        </section>
      </div>
    );
}

export default Verify;