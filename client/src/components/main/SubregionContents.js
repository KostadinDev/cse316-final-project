import React, {useState}              from 'react';
import SubregionHeader      from './SubregionHeader';
import SubregionTableContents    from './SubregionTableContents';
import SubregionView from './SubregionView'
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const SubregionContents = (props) => {
    const [view, setView] = useState(0)
    console.log("SUBREGION", props.subregion)
    return (
        <div className = 'main-contents'>
              <WButton onClick = {() => {
        setView(view+1);
        
        }}>Change View</WButton>

            {view%2 == 0? 
        <div className='table ' >
            <SubregionHeader    
                undo={props.undo} redo={props.redo}     canUndo={props.canUndo} 
                canRedo={props.canRedo}               
            />
            {props.subregion.name}
            <SubregionTableContents
            editItem={props.editItem}
            />
        </div>:
          <SubregionView editItem={props.editItem} map ={props.subregion}></SubregionView>
        }

        </div>
    );
};

export default SubregionContents;