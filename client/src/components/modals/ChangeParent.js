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
        <div className="modal-main change-parent-container">
          <WMHeader
            className="modal-header modal-header-change-parent"
            onClose={() => {
              toggleShow(false);
            }}
          >
            Change Parent
          </WMHeader>

          <div className="change-parent">
            {todolists.map((todolist) => (
              <div className="change-parent-button-container">
                <WButton
                  className="change-parent-button"
                  onClick={() => {
                    handleChangeParentAdd(
                      findCurrentTodolist(),
                      todolist,
                      item
                    );
                    
                    sleep(500).then(() => {
                      handleChangeParentDelete(
                        findCurrentTodolist(),
                        null,
                        item
                      );
                    });
                    console.log("gets here no?")
                    toggleShow(false);
                    setActiveList({});
                  }}
                >
                  {todolist.name}
                </WButton>{" "}
              </div>
            ))}
          </div>
          <WMHeader>
            <hr></hr>
            <WButton
              className="modal-button cancel-button"
              onClick={() => toggleShow(false)}
              wType="texted"
            >
              Cancel
            </WButton>
          </WMHeader>
        </div>
      </div>
    );
}

export default ChangeParent;