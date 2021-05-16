import React, {useState} from 'react';

import { WModal, WInput, WMHeader, WMMain, WButton } from 'wt-frontend';

const ChangeParent = ({ todolists, show, item, toggleShow, handleChangeParentAdd, handleChangeParentDelete, setActiveList}) => {

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      }

    const findCurrentTodolist = () =>{
        for (let i = 0; i< todolists.length; i++){
            for (let j =0; j< todolists[i].items.length;j++){
                if (todolists[i].items[j]._id == item._id){
                    return todolists[i];
                }
            }
        }
    }

    return (
        <div className={showHideClassName}>

        <section className="modal-main">
        <WMHeader  className="modal-header" onClose={() => {toggleShow(false)}}>
                Change Parent
			</WMHeader >
     
            <div className= "change-parent" >
                {todolists.map((todolist) =>(<div><WButton onClick = {() => {handleChangeParentAdd(findCurrentTodolist(), todolist, item);sleep(500).then(() => {handleChangeParentDelete(findCurrentTodolist(), null, item) }); toggleShow(false); setActiveList({});}}>{todolist.name}</WButton>   </div>))}
            </div>
    
            <WMMain>
                <WButton className="modal-button cancel-button" onClick={() => toggleShow(false)} wType="texted">
                    Cancel
				</WButton>
                <label className="col-spacer">&nbsp;</label>
                <WButton className="modal-button" onClick={() => {console.log(todolists, item, '"HELLO')}} clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded" color="danger">
                    Change
				</WButton>
            </WMMain>

        </section>
      </div>
    );
}

export default ChangeParent;