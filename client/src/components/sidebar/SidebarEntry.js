import React, { useState }  from 'react';
import { WNavItem, WInput } from 'wt-frontend';
import WButton from 'wt-frontend/build/components/wbutton/WButton';

const SidebarEntry = (props) => {
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
        props.updateListField(props._id, name, value, preEdit);
    };

    const entryStyle = props._id === props.activeid ? 'list-item-active' : 'list-item ';
    
    return (
      <div className="nav-entry">
        <div className="nav-entry-map">
          <WNavItem
            className={entryStyle}
            onDoubleClick={handleEditing}
            onClick={() => {
              props.handleSetActive(props._id);
            }}
          >
            {editing ? (
              <WInput
                className="list-item-edit"
                inputClass="list-item-edit-input"
                onKeyDown={(e) => {
                  if (e.keyCode === 13) handleSubmit(e);
                }}
                name="name"
                onBlur={handleSubmit}
                autoFocus={true}
                defaultValue={props.name}
              />
            ) : (
              <div className="list-text">{props.name}</div>
            )}
          </WNavItem>
        </div>
        <div className="nav-bar-entry-container">
        <WButton
            className="nav-bar-button"
            onClick={() => {
              props.handleEditMap(props._id);
            }}
          >
            <i className="material-icons">edit</i>
          </WButton>
          <WButton
            className="nav-bar-button"
            onClick={() => {
              props.setShowDelete(props._id);
            }}
          >
            <i className="material-icons">close</i>
          </WButton>
        </div>
      </div>
    );
};

export default SidebarEntry;