import React        from 'react';
import TableEntry   from './TableEntry';

const SubregionTableContents = (props) => {

    let entries = props.activeList ? props.activeList.items : null;
    let entryCount = 0;
    if(entries) {
        entries = entries.filter(entry => entry !== null);
        entryCount = entries.length
    } 
    
    return (
        entries !== null && entries !== undefined && entries.length > 0 ? <div className=' table-entries container-primary'>
            {
                entries.map((entry, index) => (
                    <TableEntry
                        data={entry} key={entry._id} index={index} entryCount={entryCount}
                        deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                        editItem={props.editItem}    toggleShowSubregion = {props.toggleShowSubregion}
                    />
                ))
            }

            </div>
            : <div className='container-primary' >           
                
            </div>
    );
};

export default SubregionTableContents;