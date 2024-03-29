import Logo 							from '../navbar/Logo';
import Login 							from '../modals/Login';
import Delete 							from '../modals/Delete';
import MainContents 					from '../main/MainContents';
import CreateAccount 					from '../modals/CreateAccount';
import NavbarOptions 					from '../navbar/NavbarOptions';
import * as mutations 					from '../../cache/mutations';
import SidebarContents 					from '../sidebar/SidebarContents';
import { GET_DB_TODOS } 				from '../../cache/queries';
import React, { useState } 				from 'react';
import { useMutation, useQuery } 		from '@apollo/client';
import { WNavbar, WSidebar, WNavItem } 	from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide } from 'wt-frontend';
import { UpdateListField_Transaction, 
	SortItems_Transaction,
	UpdateListItems_Transaction, 
	ReorderItems_Transaction, 
	EditItem_Transaction } 				from '../../utils/jsTPS';


import Costa from './../../The World/The World/North America/Costa Rica Flag.png'


import SubregionContents from '../main/SubregionContents';
import ChangeParent from '../modals/ChangeParent';
import Verify from '../modals/Verify';
import WButton from 'wt-frontend/build/components/wbutton/WButton';
import EditMap from '../modals/EditMap';




const Homescreen = (props) => {

	const keyCombination = (e, callback) => {
		if(e.key === 'z' && e.ctrlKey) {
			if(props.tps.hasTransactionToUndo()) {
				tpsUndo();
			}
		}
		else if (e.key === 'y' && e.ctrlKey) { 
			if(props.tps.hasTransactionToRedo()) {
				tpsRedo();
			}
		}
		else if (e.keyCode === 40) { 
			setSelected(selected+1);
		}
		else if (e.keyCode === 38) { 

			if (selected >= 0){
				setSelected(selected-1);
			}
		}
		else if (e.keyCode === 13) { 
			console.log("mff");
			setEnter(true);
			
		}
		
	}
	document.onkeydown = keyCombination;

	const auth = props.user === null ? false : true;
	let todolists 	= [];
	let SidebarData = [];
	const [sortRule, setSortRule] = useState('unsorted'); // 1 is ascending, -1 desc
	const [activeList, setActiveList] 		= useState({});
	const [subregion, setSubregion] 		= useState({});
	const [showDelete, toggleShowDelete] 	= useState(false);
	const [showSubregion, toggleShowSubregion] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [listToDelete, setListToDelete] = useState("");
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showChangeParent, toggleShowChangeParent] 		= useState(false);
	const [itemChangeParent, setItemChangeParent] = useState({})
	const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());

	const [homescreen, toggleHomescreen] = useState(true)

	const [showEditMap, toggleShowEditMap] = useState(false);
	const [editMapId, setEditMapId] = useState("");

	const [selected, setSelected] = useState(-1);
	const [enter, setEnter] = useState(false);


	const [images, setImages] = useState([])

		


	const unload = () =>{
		setActiveList({});
		toggleHomescreen(false);
		toggleShowSubregion(false)
		setLinks([['maps',unload]])
	}

	const [links, setLinks] = useState([['maps',unload]])


	const [targetDelete, setTargetDelete] = useState([]);
	const [showVerify, toggleShowVerify] 	= useState(false);

	const { loading, error, data, refetch } = useQuery(GET_DB_TODOS);

	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
		// Assign todolists 
		for(let todo of data.getAllTodos) {
			todolists.push(todo)
		}
		// if a list is selected, shift it to front of todolists
		if(activeList._id) {
			let selectedListIndex = todolists.findIndex(entry => entry._id === activeList._id);
			let removed = todolists.splice(selectedListIndex, 1);
			todolists.unshift(removed[0]);
		}
		// create data for sidebar links
		for(let todo of todolists) {
			if(todo) {
				SidebarData.push({_id: todo._id, name: todo.name});
			}	
		}
	}

	const goHome = () =>{

	}
	
	// NOTE: might not need to be async
	const reloadList = async () => {
		if (activeList._id) {
			let tempID = activeList._id;
			let list = todolists.find(list => list._id === tempID);
			setActiveList(list);
		}
	}

	const loadTodoList = (list) => {
		props.tps.clearAllTransactions();
		setCanUndo(props.tps.hasTransactionToUndo());
		setCanRedo(props.tps.hasTransactionToRedo());
		setActiveList(list);
		setLinks([['maps', unload], [list.name,() => {reloadList(); toggleShowSubregion(false); console.log("hello?", links);
		setLinks([['maps', unload],[list.name, () => {}]]);
	}]])

	}

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_TODOS }], 
		awaitRefetchQueries: true,
		onCompleted: () => reloadList()
	}

	const [ReorderTodoItems] 		= useMutation(mutations.REORDER_ITEMS, mutationOptions);
	const [sortTodoItems] 		= useMutation(mutations.SORT_ITEMS, mutationOptions);
	const [UpdateTodoItemField] 	= useMutation(mutations.UPDATE_ITEM_FIELD, mutationOptions);
	const [UpdateTodolistField] 	= useMutation(mutations.UPDATE_TODOLIST_FIELD, mutationOptions);
	const [DeleteTodoItem] 			= useMutation(mutations.DELETE_ITEM, mutationOptions);
	const [AddTodoItem] 			= useMutation(mutations.ADD_ITEM, mutationOptions);
	const [AddTodolist] 			= useMutation(mutations.ADD_TODOLIST);
	const [DeleteTodolist] 			= useMutation(mutations.DELETE_TODOLIST);


	
	
	const tpsUndo = async () => {
		const ret = await props.tps.undoTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

	const tpsRedo = async () => {
		const ret = await props.tps.doTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

	const addItem = async () => {
		let list = activeList;
		const items = list.items;
		const newItem = {
			_id: '',
			description: 'default',
			due_date: 'default',
			assigned_to: 'default',
			completed: 'default'
		};
		let opcode = 1;
		let itemID = newItem._id;
		let listID = activeList._id;
		console.log("DOES IT GET HERE???")
		let transaction = new UpdateListItems_Transaction(listID, itemID, newItem, opcode, AddTodoItem, DeleteTodoItem);
		props.tps.addTransaction(transaction);
		tpsRedo();
		console.log("DOES IT GET HERE???")
	};

	const deleteItem = async (item, index) => {
		let listID = activeList._id;
		let itemID = item._id;
		let opcode = 0;
		let itemToDelete = {
			_id: item._id,
			description: item.description,
			due_date: item.due_date,
			assigned_to: item.assigned_to,
			completed: item.completed
		}
		let transaction = new UpdateListItems_Transaction(listID, itemID, itemToDelete, opcode, AddTodoItem, DeleteTodoItem, index);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};
	
	const handleVerify = (data, index) => {
		setTargetDelete([data, index])
	}

	// const addItemIndependent = async (listID,item) => {
	// 	const newItem = {
	// 		_id: item._id,
	// 		description: item.description,
	// 		due_date:item.due_date,
	// 		assigned_to: item.assigned_to,
	// 		completed: item.completed
	// 	};
	// 	let opcode = 1;
	// 	let itemID = newItem._id;
	// 	console.log(newItem, 'ADDING THIS TIME to ', listID)
	// 	let transaction = new UpdateListItems_Transaction(listID, itemID, newItem, opcode, AddTodoItem, DeleteTodoItem);
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();
	// };


		const addItemIndependent = async(listID, item) => {
		const newItem = {
			_id: item._id,
			description: item.description,
			due_date: item.due_date,
			assigned_to: item.assigned_to,
			completed: item.completed
		};
		let opcode = 1;
		let itemID = newItem._id;
		console.log("Hello? 1 ", listID, itemID, newItem)
		let transaction = new UpdateListItems_Transaction(listID, itemID, newItem, opcode, AddTodoItem, DeleteTodoItem);
		props.tps.addTransaction(transaction);
		tpsRedo();
		console.log("Hello? 2 ")
	};


	 const deleteItemIndependent = async (listID, item, index) => {
		let itemID = item._id;
		let opcode = 0;
		let itemToDelete = {
			_id: item._id,
			description: item.description,
			due_date: item.due_date,
			assigned_to: item.assigned_to,
			completed: item.completed
		}
		let transaction = new UpdateListItems_Transaction(listID, itemID, itemToDelete, opcode, AddTodoItem, DeleteTodoItem, index);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};


	const editItem = async (itemID, field, value, prev) => {
		let flag = 0;
		let listID = activeList._id;
		let transaction = new EditItem_Transaction(listID, itemID, field, prev, value, flag, UpdateTodoItemField);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};

	const reorderItem = async (itemID, dir) => {
		let listID = activeList._id;
		let transaction = new ReorderItems_Transaction(listID, itemID, dir, ReorderTodoItems);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};

	const createNewList = async () => {
		let list = {
			_id: '',
			name: 'Untitled',
			owner: props.user._id,
			items: [],
			sortRule: 'task',
			sortDirection: 1
		}
		const { data } = await AddTodolist({ variables: { todolist: list }, refetchQueries: [{ query: GET_DB_TODOS }] });
		// if(data) {
		// 	loadTodoList(data.addTodolist);
		// } 

		
	};
	const deleteList = async (_id) => {
		DeleteTodolist({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_TODOS }] });
		loadTodoList({});
	};

	const updateListField = async (_id, field, value, prev) => {
		let transaction = new UpdateListField_Transaction(_id, field, prev, value, UpdateTodolistField);
		props.tps.addTransaction(transaction);
		tpsRedo();

	};

	const handleSetActive = (_id) => {
		const selectedList = todolists.find(todo => todo._id === _id);
		loadTodoList(selectedList);
	};

	const setShowLogin = () => {
		toggleShowDelete(false);
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
	};

	const setShowDelete = (id) => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		setListToDelete(id);
		toggleShowDelete(!showDelete)
	};
	
	const sort = (criteria) => {
		let prevSortRule = sortRule;
		setSortRule(criteria);
		let transaction = new SortItems_Transaction(activeList._id, criteria, prevSortRule, sortTodoItems);
		console.log(transaction)
		props.tps.addTransaction(transaction);
		tpsRedo();
		
	}

	const handleChangeParentAdd = (oldList, newList, item) =>{
			// if (newList._id != oldList._id){
			// 	newList.items.push(item);
			// 	for (let i =0;i<oldList.items.length;i++){
			// 		if (oldList.items[i]._id == item._id){
			// 			oldList.items.splice(i, 1);
			// 		}
			// 	}
			// }
		
		addItemIndependent(newList._id, item);
		
	
	}

	const handleChangeParentDelete = (oldList, newList, item) =>{
		// if (newList._id != oldList._id){
		// 	newList.items.push(item);
		// 	for (let i =0;i<oldList.items.length;i++){
		// 		if (oldList.items[i]._id == item._id){
		// 			oldList.items.splice(i, 1);
		// 		}
		// 	}
		// }
	//addItemIndependent(newList._id, item);
	
	deleteItemIndependent(oldList._id, item, 0);
}

	const handleEditMap = (id) =>{

		setEditMapId(id);
		toggleShowEditMap(true);

	}

	return (
    <div className="overall">
      <WLHeader className="header">
        <WNavbar color="colored">
          <ul>
            <WNavItem>
              <Logo
                className="logo"
                toggleHomescreen={toggleHomescreen}
                unload={unload}
                setLinks={setLinks}
              />
            </WNavItem>
          </ul>
          <ul>
            {links
              ? links.map((link) => (
                  <WButton className="links" onClick={link[1]}>
                    {link[0]}
                  </WButton>
                ))
              : ""}
          </ul>
          <ul><div className ="username">
			  {props.user?props.user.firstName:""}
			  </div>
			 
            <NavbarOptions
              fetchUser={props.fetchUser}
              auth={auth}
              setShowCreate={setShowCreate}
              setShowLogin={setShowLogin}
              reloadTodos={refetch}
              setActiveList={loadTodoList}
            />
          </ul>
        </WNavbar>
      </WLHeader>
      {homescreen ? (
        <div className="homescreen-container">
          <WButton
            className="homescreen-container-button"
            onClick={() => {
				if (props.user)
				{
              toggleHomescreen(false);
				}
            }}
          >	
			  <img className='logo-image' src = {"logo.png"}></img>
            Welcome to The World Data Mapper
          </WButton>
        </div>
      ) : (
        <div className="what-the-fuck">
          {!activeList._id ? (
            <WSidebar className="maps">
              {activeList ? (
                <SidebarContents
                  listIDs={SidebarData}
                  activeid={activeList._id}
                  auth={auth}
                  handleSetActive={handleSetActive}
                  createNewList={createNewList}
                  updateListField={updateListField}
                  setShowDelete={setShowDelete}
                  key={activeList._id}
				  handleEditMap = {handleEditMap}
                />
              ) : (
                <></>
              )}
            </WSidebar>
          ) : (
            <WLMain>
              {activeList ? (
                <div className="container-secondary">
                  {!showSubregion ? (
                    <MainContents
                      addItem={addItem}
                      deleteItem={deleteItem}
                      editItem={editItem}
                      reorderItem={reorderItem}
                      setShowDelete={setShowDelete}
                      undo={tpsUndo}
                      redo={tpsRedo}
                      activeList={activeList}
                      setActiveList={loadTodoList}
                      canUndo={canUndo}
                      canRedo={canRedo}
                      sort={sort}
                      toggleShowSubregion={toggleShowSubregion}
                      setSubregion={setSubregion}
                      toggleShowVerify={toggleShowVerify}
                      handleVerify={handleVerify}
                      links={links}
                      setLinks={setLinks}
					  selected = {selected}
					  enter = {enter}
					  setEnter = {setEnter}
                    />
                  ) : (
                    <SubregionContents
                      subregion={subregion}
                      editItem={editItem}
                      undo={tpsUndo}
                      redo={tpsRedo}
                      showSubregion={toggleShowSubregion}
                      toggleShowChangeParent={toggleShowChangeParent}
                      setItemChangeParent={setItemChangeParent}
                      canUndo={canUndo}
                      current={activeList}
                      canRedo={canRedo}
                    ></SubregionContents>
                  )}
                </div>
              ) : (
                <div className="container-secondary" />
              )}
            </WLMain>
          )}
        </div>
      )}

      {showDelete && (
        <Delete
          deleteList={deleteList}
          activeid={listToDelete}
          setShowDelete={setShowDelete}
        />
      )}

      {showCreate && (
        <CreateAccount
          fetchUser={props.fetchUser}
          setShowCreate={setShowCreate}
        />
      )}

      {showLogin && (
        <Login
          fetchUser={props.fetchUser}
          reloadTodos={refetch}
          setShowLogin={setShowLogin}
        />
      )}

      {showChangeParent && (
        <div>
          <ChangeParent
            todolists={todolists}
            show={showChangeParent}
            item={itemChangeParent}
            toggleShow={toggleShowChangeParent}
            handleChangeParentAdd={handleChangeParentAdd}
            handleChangeParentDelete={handleChangeParentDelete}
            setActiveList={setActiveList}
          />
        </div>
      )}

      {showVerify && (
        <div>
          <Verify
            show={showVerify}
            toggleShow={toggleShowVerify}
            targetDelete={targetDelete}
            deleteItem={deleteItem}
          />
        </div>
      )}

      {showEditMap && (
        <div>
          <EditMap
            show={showEditMap}
            toggleShow={toggleShowEditMap}
			id = {editMapId}
			update ={updateListField}
          />
        </div>
      )}
    </div>
  );
};

export default Homescreen;