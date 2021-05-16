import React, {useState}              from 'react';
import TableHeader      from './TableHeader';
import TableContents    from './TableContents';
import RegionView from './RegionView'
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const MainContents = (props) => {
    const [view, setView] = useState(0)
    return (
        <div className = 'main-contents'>
              <WButton onClick = {() => {
        setView(view+1);
        
        }}>Change View</WButton>

            {view%2 == 0? 
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
            />
        </div>:
          <RegionView map ={props.activeList}></RegionView>
        }

        </div>
    );
};

export default MainContents;