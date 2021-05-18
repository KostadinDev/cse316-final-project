import React, {useState}              from 'react';
import TableHeader      from './TableHeader';
import TableContents    from './TableContents';
import RegionView from './RegionView'
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const MainContents = (props) => {
    const [view, setView] = useState(0)
    return (
        <div className = 'main-contents'>
            <div className='change-view-button'>

        <WButton> Region Name: {props.activeList.name}</WButton>
        </div>

           
        <div className='table ' >
            <TableHeader
                disabled={!props.activeList._id}        addItem={props.addItem}
                undo={props.undo} redo={props.redo}     canUndo={props.canUndo} 
                canRedo={props.canRedo}                 setShowDelete={props.setShowDelete}
                setActiveList={props.setActiveList}     sort={props.sort}
            />
            <TableContents
                key={props.activeList._id}      activeList={props.activeList}
                deleteItem={props.deleteItem}   reorderItem={props.reorderItem}
                editItem={props.editItem}       toggleShowSubregion = {props.toggleShowSubregion}
                setSubregion = {props.setSubregion}
                toggleShowVerify = {props.toggleShowVerify}
                handleVerify = {props.handleVerify}
                links = {props.links}
                setLinks = {props.setLinks}
                selected = {props.selected}
                enter = {props.enter}
                setEnter = {props.setEnter}
            />
        </div>
       

        </div>
    );
};

export default MainContents;