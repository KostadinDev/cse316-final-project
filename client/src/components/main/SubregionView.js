import React, { useState } from 'react';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';
import LandmarkEntry from './LandmarkEntry';
import EditLandmark from '../modals/EditLandmark'

const SubregionView = (props) => {
   

    const [editingDescr, toggleDescrEdit] = useState(false);
    const [description, setDescription] = useState(props.map.description);

    const [editingDate, toggleDateEdit] = useState(false);
    const [date, setDate] = useState(props.map.due_date) 

    
    const [editingStatus, toggleStatusEdit] = useState(false);
    const [status, setStatus] = useState(props.map.completed) 

    const [editingAssigned, toggleAssignedEdit] = useState(false);
    const [assigned, setAssigned] = useState(props.map.assigned_to.split(", ")) 

    

    const [editLandmark, toggleEditLandmark] = useState(false);
    const [currentlyEditingLandmark, setCurrentlyEditingLandmark] = useState("");
  
    const [newLandmark, setNewLandmark] = useState("");

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
        const prevStatus = props.map.completed;
        if(newStatus !== prevStatus) {
            props.editItem(props.map._id, 'completed', newStatus, prevStatus);
        }
    };

    let handleSubmit = (event) =>{
      event.preventDefault();
      const newAssigned = props.map.assigned_to+ ", " + event.target.children[1].value;
      const prevAssigned = props.map.assigned_to;
      props.editItem(props.map._id, 'assigned_to', newAssigned, prevAssigned);
      assigned.push(event.target.children[1].value)
      setAssigned(assigned);
    }

    let deleteLandmark = (landmark) =>{

      for (let i =0;i<assigned.length;i++){
        if (assigned[i] == landmark){
          console.log(i);
          assigned.splice(i, 1);
          let newStatus = "";
          for (let j =0;j<assigned.length;j++){
            newStatus += assigned[i] + " ";
          }
          
          let prevStatus = props.map.assigned_to;
          if(newStatus !== prevStatus) {
              props.editItem(props.map._id, 'assigned_to', newStatus, prevStatus);
          }
          setAssigned(assigned);
          break;
        }
      }
 
      
    }

    const handleEditLandmark = (landmark) =>{
      console.log(landmark);
      setCurrentlyEditingLandmark(landmark)
    }

    const changeLandmark = (landmark, newLandmark) =>{
      for (let i =0;i<assigned.length;i++){
        if (assigned[i] == landmark){
          console.log(i);
          assigned.splice(i, 1, newLandmark);
          let newStatus = "";
          for (let j =0;j<assigned.length;j++){
            newStatus += assigned[i] + " ";
          }
          
          let prevStatus = props.map.assigned_to;
          if(newStatus !== prevStatus) {
              props.editItem(props.map._id, 'assigned_to', newStatus, prevStatus);
          }
          setAssigned(assigned);
          break;
        }
      }


    }

    return (
      <div className="subregion-view">
        <div className="region-view-info">
          <div className="region-view-icons">
            {/* <WButton onClick = {() => {props.undo()}}>
              <i className="material-icons">undo</i>
            </WButton>
            <WButton onClick = {() => {props.redo()}}>
              <i className="material-icons">redo</i>
            </WButton> */}
          </div>
          <div className="region-view-image"><img className = "subregion-image" src = {"/The World/The World/" + props.name +"/" + description + " Flag.png"}></img></div>
          <div className="region-view-data">
            <div className="region-view-data-entry">
              <div className='region-view-name'>Region Name: </div>{" "}
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
              <div className='region-view-name'>Region Parent: </div>{" "}
              <div>
                <WButton  className = "region-parent-button" onClick = {() => {props.showSubregion(false)}}> {props.current.name}</WButton>
                <WButton className = "region-parent-button" onClick = {() => {props.toggleShowChangeParent(true); props.setItemChangeParent(props.map)}}><i className="material-icons">edit</i></WButton>
              </div>
            </div>
            <div className="region-view-data-entry">
              <div className='region-view-name'> Region Capital:</div>{" "}
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
              <div className='region-view-name'>Region Leader: </div>{" "}
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
            <div className="region-view-data-entry" className='region-view-name'>
              # of Sub Regions: {props.map.items ? props.map.items.length : "0"}
            </div>
          </div>
        </div>
        <div className="region-view-landmarks">
          <div className="region-view-landmarks-data">
            <div className="subregion-view-landmark-entry">
                {assigned.map((landmark) =>( <LandmarkEntry handleEditLandmark = {handleEditLandmark} toggleEditLandmark = {toggleEditLandmark} deleteLandmark = {deleteLandmark} landmark = {landmark}></LandmarkEntry>))}
            </div>
          </div>

          <div className="region-view-landmarks-add">
            <form className= 'form-subregion' onSubmit= {handleSubmit}>
            <WButton
              className=" region-view-landmarks-add-button"
              wType="texted"
              type= 'submit'
            >
              <i className="material-icons">add_box</i>
            </WButton>
          

            <input
              className="region-view-landmarks-add-input"
              value={newLandmark}
              onChange = {(event) =>{setNewLandmark(event.target.value)}}
            ></input>
            </form>
          </div>
        </div>
        {
				editLandmark && (<EditLandmark handleClose = {toggleEditLandmark} show = {editLandmark} landmark = {currentlyEditingLandmark} changeLandmark = {changeLandmark} />)
			}
      </div>
      
    );
};

export default SubregionView;