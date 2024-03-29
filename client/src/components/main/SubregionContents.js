import React, {useState}              from 'react';
import SubregionHeader      from './SubregionHeader';
import SubregionView from './SubregionView'
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

const SubregionContents = (props) => {
    const [view, setView] = useState(0);
    const [subregion, setSubregion] = useState(props.subregion);



    
  const addItem = () =>
  {

  }
 
    return (
      <div className="main-contents">
        <div className="subregion-main-buttons">
          <WButton
            onClick={() => {
              setView(view + 1);
            }}
          >
            Change View
          </WButton>
          <div>
            <WButton
              onClick={() => {
                //setView(view+1);
                for (let i = 0; i < props.current.items.length; i++) {
                  console.log(
                    props.current.items[i].description,
                    props.subregion.description
                  );
                  if (props.current.items[i]._id === subregion._id && i != 0) {
                    setSubregion(props.current.items[i - 1]);
                    setView(view + 1);
                    break;
                  }
                }
              }}
            >
              Previous{" "}
            </WButton>
            <WButton
              onClick={() => {
                //setView(view+1);
                for (let i = 0; i < props.current.items.length; i++) {
                  if (
                    props.current.items[i]._id === subregion._id &&
                    i != props.current.items.length - 1
                  ) {
                    setSubregion(props.current.items[i + 1]);
                    setView(view + 1);
                    break;
                  }
                }
              }}
            >
              Next
            </WButton>
          </div>
        </div>

        {view % 2 == 0 ? (
          <div className="table ">
            <SubregionHeader
              disabled={!props.current._id}
              undo={props.undo}
              redo={props.redo}
              canUndo={props.canUndo}
              canRedo={props.canRedo}
              addItem={addItem}
            />

   
          </div>
        ) : (
          <SubregionView
            name={props.current.name}
            editItem={props.editItem}
            current={props.current}
            map={subregion}
            showSubregion={props.showSubregion}
            setItemChangeParent={props.setItemChangeParent}
            toggleShowChangeParent={props.toggleShowChangeParent}
            undo={props.undo}
            redo={props.redo}
          ></SubregionView>
        )}
      </div>
    );
};

export default SubregionContents;