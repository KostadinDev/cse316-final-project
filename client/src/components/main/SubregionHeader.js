import React from 'react';

import { WButton, WRow, WCol } from 'wt-frontend';

const SubregionHeader = (props) => {
    const clickDisabled = () => { };
    const buttonStyle = props.disabled ? ' table-header-button-disabled ' : 'table-header-button ';
    

    return (
        <WRow className="table-header">
            <WCol size="2">
                <WButton onClick={props.disabled ? () => {} : () => props.sort('task') } className='table-header-section' wType="texted" >Name</WButton>
            </WCol>

            <WCol size="2">
                <WButton onClick={props.disabled ? () => {} : () => props.sort('due_date') } className='table-header-section' wType="texted">Capital</WButton>
            </WCol>

            <WCol size="2">
                <WButton onClick={props.disabled ? () => {} : () => props.sort('status') } className='table-header-section' wType="texted" >Leader</WButton>
            </WCol>
            <WCol size="2">
                <WButton onClick={props.disabled ? () => {} : () => props.sort('assigned_to') } className='table-header-section' wType="texted" >Flag</WButton>
            </WCol>
            <WCol size="2">
                <WButton onClick={props.disabled ? () => {} : () => props.sort('assigned_to') } className='table-header-section' wType="texted" >Landmarks</WButton>
            </WCol>


            <WCol size="2">
                <div className="table-header-buttons">
                    <WButton >
                            <i className="material-icons">undo</i>
                    </WButton>
                    <WButton >
                            <i className="material-icons">redo</i>
                    </WButton>
                    <WButton onClick={props.disabled ? clickDisabled : props.addItem} wType="texted" className={`${buttonStyle}`} clickAnimation={props.disabled ? "" : "ripple-light" }>
                        <i className="material-icons">add_box</i>
                    </WButton>
                    <WButton onClick={props.disabled ? clickDisabled : props.setShowDelete} wType="texted" className={`${buttonStyle}`} clickAnimation={props.disabled ? "" : "ripple-light" }>
                        <i className="material-icons">delete_outline</i>
                    </WButton>
                    <WButton onClick={props.disabled ? clickDisabled : () => props.setActiveList({})} wType="texted" className={`${buttonStyle}`} clickAnimation={props.disabled ? "" : "ripple-light" }>
                        <i className="material-icons">close</i>
                    </WButton>
                </div>
            </WCol>

        </WRow>
    );
};

export default SubregionHeader;