import React        from 'react';
import TableEntry   from './TableEntry';

const TableContents = (props) => {

    let entries = props.activeList ? props.activeList.items : null;
    let entryCount = 0;
    if(entries) {
        entries = entries.filter(entry => entry !== null);
        entryCount = entries.length
    } 
    
    return (
        entries !== undefined && entries.length > 0 ? <div className=' table-entries container-primary'>
            {
                entries.map((entry, index) => (
                    <TableEntry
                        data={entry} key={entry._id} index={index} entryCount={entryCount}
                        deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                        editItem={props.editItem}     toggleShowSubregion = {props.toggleShowSubregion}
                        setSubregion = {props.setSubregion}
                        toggleShowVerify = {props.toggleShowVerify}
                        handleVerify = {props.handleVerify}
                        links = {props.links}
                        setLinks = {props.setLinks}
                        name = {props.activeList.name}
                        selected = {props.selected}
                        enter = {props.enter}
                        setEnter = {props.setEnter}
                    />
                ))
            }

            </div>
            : <div className='container-primary' >
                {
                    props.activeList._id ? <h2 className="nothing-msg"> No Regions!</h2> : <></> 
                }               
                
            </div>
    );
};

export default TableContents;