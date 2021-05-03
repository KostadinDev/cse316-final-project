import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const MapTableHeader = (props) => {
    const clickDisabled = () => { };
    const buttonStyle = props.disabled ? ' table-header-button-disabled ' : 'table-header-button ';
    
    const undoOptions = {
        className: props.disabled || !props.canUndo ? ' table-header-button-disabled ' : 'table-header-button',
        onClick: props.disabled || !props.canUndo  ? clickDisabled : props.undo,
        wType: "texted", 
        clickAnimation: props.disabled || !props.canUndo ? "" : "ripple-light",  
        shape: "rounded"
    }

    const redoOptions = {
        className: props.disabled || !props.canRedo ? ' table-header-button-disabled ' : 'table-header-button ',
        onClick: props.disabled || !props.canRedo   ? clickDisabled : props.redo, 
        wType: "texted", 
        clickAnimation: props.disabled || !props.canRedo ? "" : "ripple-light" ,
        shape: "rounded"
    }

    return (
        
        <WRow className="map-table-header">

                    <WCol size="3" className ='map-table-header-entry'>
                <div className="table-header-buttons">
                <WButton onClick={() => {props.addItem(props.map._id)}} wType="texted" className={`${buttonStyle}`} clickAnimation={props.disabled ? "" : "ripple-light" }>
                        <i className="material-icons">add_box</i>
                    </WButton>

                    <WButton {...undoOptions}>
                            <i className="material-icons">undo</i>
                    </WButton>
                    <WButton  {...redoOptions}>
                            <i className="material-icons">redo</i>
                    </WButton>
                </div>
            </WCol>

            <WCol size="3" className ='map-table-header-entry'>
                <WButton  onClick={props.disabled ? () => {} : () => props.sort('task') } className='table-header-section' wType="texted" >Region Name: <div className = 'link'>{props.map.name}</div></WButton>
            </WCol>


        </WRow>
    );
};

export default MapTableHeader;