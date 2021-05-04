import React, {useState}            from 'react';
import MapTableHeader      from './MapTableHeader';
import TableContents    from './TableContents';
import { useMutation, useQuery } 		from '@apollo/client';
import { GET_DB_TODOS } 				from '../../cache/queries';


import MapTableBody    from './MapTableBody';
import RegionView    from './RegionView';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';

import { UpdateListField_Transaction, 
	SortItems_Transaction,
	UpdateListItems_Transaction, 
	ReorderItems_Transaction, 
	EditItem_Transaction } 				from '../../utils/jsTPS';

import * as mutations 					from '../../cache/mutations';

import { useHistory } from "react-router-dom";
import { jsTPS } 		from './../../utils/jsTPS';
// class MapTable extends React.Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       view: 0
//     }
//   }


//   render() {

  
//     return (
//             <div className="map-table-wrapper">
//               <div className='view-changer'>
//               <WButton onClick = {() => { console.log(this.state.view);
              
//               this.setState({view: this.state.view + 1})
              
//               }}>{this.state.view %2 == 0? 'Change to Region View': 'Change to Table View'}</WButton>
//               </div>
              
//                 {this.state.view % 2 == 0?<div className="map-table ">
//                 <MapTableHeader map={this.props.map} createRegion = {this.props.createRegion}/>
//                 <MapTableBody deleteRegion = {this.props.deleteRegion} map={this.props.map} />
//               </div>:
//               <RegionView map ={this.props.map}></RegionView>}
//             </div>
//           );
//   } 

// }
// export default MapTable;

const MapTable = (props) => {
  const auth = props.user === null ? false : true;
	const [todolists, setTodolists] 	= useState([]);
	const history = useHistory();
	let SidebarData = [];
	const [sortRule, setSortRule] = useState('unsorted'); // 1 is ascending, -1 desc
	const [activeList, setActiveList] 		= useState({});
	const [showEdit, toggleShowEdit] 		= useState(false);
	let   [editMap, selectEditMap] 			= useState(null);
	const [showDelete, toggleShowDelete] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
  
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showUpdate, toggleShowUpdate] 	= useState(false);



  const [canUndo, setCanUndo] = useState(true);
	const [canRedo, setCanRedo] = useState(true);

  const mutationOptions = {
		refetchQueries: [{ query: GET_DB_TODOS }], 
		awaitRefetchQueries: true,
		onCompleted: () => {}
	}

  const [DeleteTodoItem] 			= useMutation(mutations.DELETE_ITEM, mutationOptions);
	const [AddTodoItem] 			= useMutation(mutations.ADD_ITEM, mutationOptions);
	const [AddTodolist] 			= useMutation(mutations.ADD_TODOLIST);


	const { loading, error, data, refetch } = useQuery(GET_DB_TODOS);

	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		// Assign todolists 
		for(let todo of data.getAllTodos) {
			todolists.push(todo)
			
		}
		// if a list is selected, shift it to front of todolists
		// create data for sidebar links
		for(let todo of todolists) {
			if(todo) {
				SidebarData.push({_id: todo._id, name: todo.name});
			}	
		}
	}
  
  const [regions, setRegions] = useState(props.map.items)
  let current = props.map;
  const tpsRedo = async () => {
		const ret = await transactionStack.doTransaction();
		if(ret) {
			setCanUndo(transactionStack.hasTransactionToUndo());
			setCanRedo(transactionStack.hasTransactionToRedo());
		}
	}

  let transactionStack = new jsTPS();

    const addItem = async (id) => {


      const newItem = {
        _id: '',
        description: 'No Description',
        due_date: 'No Date',
        assigned_to: 'No One',
        completed: false
      };

      let opcode = 1;
      let itemID = newItem._id;
      let listID = id;
      let transaction = new UpdateListItems_Transaction(listID, itemID, newItem, opcode, AddTodoItem, DeleteTodoItem);
      transactionStack.addTransaction(transaction);
      tpsRedo();
      setTodolists(todolists)
      for (let i =0 ;i<todolists.length;i++){
        if (todolists[i]._id == current._id){
          current = todolists[i];

        }
      }
      setRegions(current.items);


  
    };


    const deleteItem = async (item) => {
      let listID = props.map._id;
      let itemID = item._id;
      let opcode = 0;
      let itemToDelete = {
        _id: item._id,
        description: item.description,
        due_date: item.due_date,
        assigned_to: item.assigned_to,
        completed: item.completed
      }
      
      let index = 0;
      for (let i =0;i <current.items.length;i++){
        if (current.items[i]._id == item._id){
          index = i;
        }
      }
      let transaction = new UpdateListItems_Transaction(listID, itemID, itemToDelete, opcode, AddTodoItem, DeleteTodoItem, index);
      transactionStack.addTransaction(transaction);
      tpsRedo();
      setTodolists(todolists)
      for (let i =0 ;i<todolists.length;i++){
        if (todolists[i]._id == current._id){
          current = todolists[i];

        }
      }
      setRegions(current.items);
      
  
    };


    const [view, setView] = useState(0)
    return (
      <div className="map-table-wrapper">
        <div className='view-changer'>
        <WButton onClick = {() => { console.log(todolists);
        setView(view+1);
        
        }}>Change View</WButton>
        </div>
        
          {view %2== 0?<div className="map-table ">
          <MapTableHeader map={current} addItem = {addItem} />
          <MapTableBody map={regions} deleteItem = {deleteItem}/>
        </div>:
        <RegionView map ={current}></RegionView>}
      </div>
    );
};

export default MapTable;