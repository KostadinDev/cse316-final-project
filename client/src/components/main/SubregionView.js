import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const SubregionView = (props) => {
   

    const [editingDescr, toggleDescrEdit] = useState(false);
    const [description, setDescription] = useState(props.map.description);

    const [editingDate, toggleDateEdit] = useState(false);
    const [date, setDate] = useState(props.map.due_date) 

    
    const [editingStatus, toggleStatusEdit] = useState(false);
    const [status, setStatus] = useState(props.map.completed) 

    const handleDescrEdit = (e) => {
        toggleDescrEdit(false);
        const newDescr = e.target.value ? e.target.value : 'No Description';
        const prevDescr = props.map.description;
        if(newDescr !== prevDescr) {
            props.editItem(props.map._id, 'description', newDescr, prevDescr);
            setDescription(newDescr)
        }
    };


    const handleDateEdit = (e) => {
        toggleDateEdit(false);
        const newDate = e.target.value ? e.target.value : 'No Date';
        const prevDate = props.map.due_date;
        if(newDate !== prevDate) {
            props.editItem(props.map._id, 'due_date', newDate, prevDate);
            setDate(newDate)
        }

    };


    
    const handleStatusEdit = (e) => {
        toggleStatusEdit(false);
        const newStatus = e.target.value ? e.target.value : 'No Description';
        const prevStatus = props.maps.completed;
        if(newStatus !== prevStatus) {
            props.editItem(props.map._id, 'completed', newStatus, prevStatus);
        }
    };


    return (
      <div className="region-view">
        <div className="region-view-info">
          <div className="region-view-icons">
            <WButton>
              <i className="material-icons">undo</i>
            </WButton>
            <WButton>
              <i className="material-icons">redo</i>
            </WButton>
          </div>
          <div className="region-view-image">image</div>
          <div className="region-view-data">
            <div className="region-view-data-entry">
              <div>Region Name: </div>{" "}
              <div>
                {" "}
                {editingDescr || props.map.description === "" ? (
                  <WInput
                    className="table-input"
                    onBlur={handleDescrEdit}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) handleDescrEdit(e);
                    }}
                    autoFocus={true}
                    defaultValue={description}
                    type="text"
                    inputClass="table-input-class"
                  />
                ) : (
                  <div
                    className="table-text"
                    onClick={() => toggleDescrEdit(!editingDescr)}
                  >
                    {description}
                  </div>
                )}
              </div>
            </div>
            <div className="region-view-data-entry">
              <div>Region Name: </div>{" "}
              <div>
                {" "}
                {editingDescr || props.map.description === "" ? (
                  <WInput
                    className="table-input"
                    onBlur={handleDescrEdit}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) handleDescrEdit(e);
                    }}
                    autoFocus={true}
                    defaultValue={description}
                    type="text"
                    inputClass="table-input-class"
                  />
                ) : (
                  <div
                    className="table-text"
                    onClick={() => toggleDescrEdit(!editingDescr)}
                  >
                    {description}
                  </div>
                )}
              </div>
            </div>
            <div className="region-view-data-entry">
              <div> Region Capital:</div>{" "}
              <div>
                {" "}
                {editingDate ? (
                  <WInput
                    className="table-input"
                    onBlur={handleDateEdit}
                    autoFocus={true}
                    defaultValue={date}
                    type="text"
                    wtype="outlined"
                    baranimation="solid"
                    inputclass="table-input-class"
                  />
                ) : (
                  <div
                    className="table-text"
                    onClick={() => toggleDateEdit(!editingDate)}
                  >
                    {date}
                  </div>
                )}
              </div>
            </div>
            <div className="region-view-data-entry">
              <div>Region Leader: </div>{" "}
              <div>
                {" "}
                {editingStatus || props.map.completed === "" ? (
                  <WInput
                    className="table-input"
                    onBlur={handleStatusEdit}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) handleStatusEdit(e);
                    }}
                    autoFocus={true}
                    defaultValue={status}
                    type="text"
                    inputClass="table-input-class"
                  />
                ) : (
                  <div
                    className="table-text"
                    onClick={() => toggleStatusEdit(!editingDescr)}
                  >
                    {status}
                  </div>
                )}
              </div>
            </div>
            <div className="region-view-data-entry">
              # of Sub Regions: {props.map.items ? props.map.items.length : "0"}
            </div>
          </div>
        </div>
        <div className="region-view-landmarks">
          <div className="region-view-data region-view-landmarks-data">
            <div className="region-view-data-entry">
              {props.map.landmarks
                ? props.map.landmarks.map((landmark) => (
                    <div className="landmarks">
                      <WButton
                        className="table-entry-buttons red landmarks-button"
                        wType="texted"
                      >
                        <i className="material-icons">close</i>
                      </WButton>
                      <div>{landmark}</div>
                    </div>
                  ))
                : ""}
            </div>
          </div>

          <div className="region-view-landmarks-add">
            <WButton
              className=" region-view-landmarks-add-button"
              wType="texted"
            >
              <i className="material-icons">add_box</i>
            </WButton>

            <input
              className="region-view-landmarks-add-input"
              value="hello"
            ></input>
          </div>
        </div>
      </div>
    );
};

export default SubregionView;