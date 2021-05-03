import React            from 'react';
import MapsHeader      from './MapsHeader';
import MapsContents    from './MapsContents';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import SidebarContents 					from '../sidebar/SidebarContents';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';

const MapsScreen = (props) => {
    return (
        <div className='maps-screen' >
            <MapsHeader
                disabled={!props.activeList._id}        addItem={props.addItem}
                undo={props.undo} redo={props.redo}     canUndo={props.canUndo} 
                canRedo={props.canRedo}                 setShowDelete={props.setShowDelete}
                setActiveList={props.setActiveList}     sort={props.sort}
            />
            <MapsContents
            handleUpdate ={props.handleUpdate}
            toggleShowEdit = {props.toggleShowEdit} 
            maps = {props.maps}
            todolists = {props.todolists}
            editMap = {props.editMap}
            deleteMap = {props.deleteMap}
            createMaps = {props.createMaps}
                key={props.activeList._id}      activeList={props.activeList}
                deleteItem={props.deleteItem}   reorderItem={props.reorderItem}
                editItem={props.editItem}
            />
        </div>
    );
};

export default MapsScreen;