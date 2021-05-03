import React            from 'react';
import TableHeader      from './TableHeader';
import TableContents    from './TableContents';
import WelcomeScreen    from './../modals/WelcomeScreen';

const MainScreen = (props) => {
    return (
        <div className='welcome-screen'>



            {/* <TableHeader
                disabled={!props.activeList._id}        addItem={props.addItem}
                undo={props.undo} redo={props.redo}     canUndo={props.canUndo} 
                canRedo={props.canRedo}                 setShowDelete={props.setShowDelete}
                setActiveList={props.setActiveList}     sort={props.sort}
            />
            <TableContents
                key={props.activeList._id}      activeList={props.activeList}
                deleteItem={props.deleteItem}   reorderItem={props.reorderItem}
                editItem={props.editItem}
            /> */}
            <WelcomeScreen></WelcomeScreen>
            
        </div>
    );
};

export default MainScreen;