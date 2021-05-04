import React , { useState }			from 'react';
import Homescreen 		from './components/homescreen/Homescreen';
import Maps 		from './components/homescreen/Maps';
import MapsTable from './components/homescreen/MapsTable'
import { useQuery } 	from '@apollo/client';
import * as queries 	from './cache/queries';
import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import MapsScreen from './components/main/MapsScreen';
import { GET_DB_TODOS } 				from './cache/queries';



const App = () => {
	const { loading_todos, error_todos, data_todos, refetch_todos } = useQuery(GET_DB_TODOS);

	const [todolists, updateTodolists] = useState([]);

	
	let updateTodos = (todos) =>{
		updateTodolists(todos)
		console.log(todos, 'here');
		console.log(todolists)
	}


	const [maps, setMaps] = useState([])
	let SidebarData = [];


	let user = null;
    let transactionStack = new jsTPS();
	let refreshTps = false;
    const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);

    if(error) { console.log(error); }
	if(loading) { console.log(loading); }
	if(data) { 
		let { getCurrentUser } = data;
		if(getCurrentUser !== null) { user = getCurrentUser; }
    }	



	let createMaps = () => {
		let map = {name:'world', id:String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now(), regions:[{name:'Bulgaria', capital:'Sofia', leader:'radev', 'flag':'bg', landmarks: ['Shipka', 'carevo']}]};
		//maps.push(map);
		setMaps([...maps, map]);
	}



	let createRegion = (map_id) => {
		let region = {name:'Bulgaria', id:String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now(), capital:'Sofia', leader:'radev', 'flag':'bg', landmarks: ['Shipka', 'carevo']};
		//maps.push(map);
		for (let i =0;i < maps.length; i++){
			if (maps[i].id == map_id){
				maps[i].regions.push(region);
				break;
			}
		}
		console.log(map_id)
		setMaps([...maps]);
	}
	let deleteRegion = (map_id, region_id) => {
		
		for (let i =0;i < maps.length; i++){
			if (maps[i].id == map_id){
				console.log(maps[i])
				for (let j =0; j< maps[i].regions.length; j++){
					if (maps[i].regions[j].id == region_id){
						maps[i].regions.splice(j, 1);
				break;
					}
				}
				break;
			}
		}
		console.log(map_id)
		setMaps([...maps]);
	}

	let deleteMap = (id) => {
		for (let i = 0;i < maps.length;i++){
			if (maps[i].id === id){
				maps.splice(i, 1);
				break;
			}
		}
		setMaps([...maps]);
	}

	let printUser = () =>{
		console.log(user)
	}


	let renameMap = (id, name) =>{
		for (let i = 0;i < maps.length;i++){
			if (maps[i].id === id) {
        		maps[i].name = name;
      }
		}
		setMaps([...maps]);
	}
	return(
		<BrowserRouter>
			<Switch>
				<Redirect exact from="/" to={ {pathname: "/welcome-screen"} } />

					{
					todolists.map(map => <Route path={"/maps/" + map.name}  render={() => 
						<MapsTable key = {map._id} user = {user} setMaps = {setMaps} createRegion = {createRegion} deleteRegion = {deleteRegion} tps={transactionStack} fetchUser={refetch} user={user} refreshTps={refreshTps} map ={map} route = {[['/welcome-screen/', 'home'],['/welcome-screen/', '>'], ['/maps/', 'maps'],['/maps/', '>'], ['/maps/' + map.name, map.name]]}/>
					}  />)
				}
				<Route 
					path="/welcome-screen" 
					name="welcome-screen" 
					render={() => 
						<Homescreen setMaps = {setMaps}  tps={transactionStack} fetchUser={refetch} user={user} refreshTps={refreshTps} route = {[['/welcome-screen/', 'home'], ['/welcome-screen/', '>'], ['/maps/', 'maps']]}/>
					} 
				/>
				<Route 
					path="/maps" 
					name="maps" 
					render={() => 
						<Maps  updateTodos = {updateTodos} printUser = {printUser} renameMap = {renameMap} tps={transactionStack} fetchUser={refetch} user={user} refreshTps={refreshTps} deleteMap = {deleteMap} createMaps = {createMaps}  maps = {maps} route = {[['/welcome-screen/', 'home'], ['/welcome-screen/', '>'], ['/maps/', 'maps']]}/>
					} 
				/>
				
				<Route/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;