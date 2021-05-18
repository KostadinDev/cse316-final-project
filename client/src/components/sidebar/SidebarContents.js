import React            from 'react';
import SidebarHeader    from './SidebarHeader';
import SidebarList      from './SidebarList';
import { WButton, WRow, WCol }  from 'wt-frontend';

const SidebarContents = (props) => {
    const disabledClick = () => {};
    return (
        <>
            <SidebarHeader 
                auth={props.auth} createNewList={props.createNewList} activeid={props.activeid}
            />
            <div className='maps-inner'>
                <div className = 'maps-inner-half home2'>
            <SidebarList
                activeid={props.activeid} handleSetActive={props.handleSetActive}
                listIDs={props.listIDs} createNewList={props.createNewList}
                updateListField={props.updateListField}
                setShowDelete = {props.setShowDelete}
				  handleEditMap = {props.handleEditMap}

            />
            </div>
            <div className = 'maps-inner-half maps-inner-image'>
                <img className='logo-image' src = {"logo.png"}>
                </img>
                <div>
                    <WButton onClick={props.activeid ? disabledClick : props.createNewList} className='create-map-button'>
                 Create new Map
                 </WButton>
                </div>
            </div>
            </div>
        </>
    );
};

export default SidebarContents;