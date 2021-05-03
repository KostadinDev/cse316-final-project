import React , { useState }			from 'react';
import Homescreen 		from './components/homescreen/Homescreen';
import Maps 		from './components/homescreen/Maps';
import MapsTable from './components/homescreen/MapsTable'
import { useQuery } 	from '@apollo/client';
import * as queries 	from './cache/queries';
import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import MapsScreen from './components/main/MapsScreen';




const App = () => {


	const [maps, setMaps] = useState([])



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
		let map = {name:'worlds',landmarks: ['everest', 'tokyo'], id:'worlds', regions:[{name:'Bulgaria', capital:'Sofia', leader:'radev', 'flag':'bg', landmarks: ['Shipka', 'carevo']}]};
		//maps.push(map);
		setMaps([...maps, {name:'worlds',landmarks: ['everest', 'tokyo'], id:'worlds', regions:[{name:'Bulgaria', capital:'Sofia', leader:'radev', 'flag':'bg', landmarks: ['Shipka', 'carevo']}]}]);
	}

	let deleteMap = (id) => {
		for (let i = 0;i < maps.length;i++){
			if (maps[i].id === id){
				console.log(maps.length)
				maps.splice(i, 1);
				console.log(maps.length)
				break;
			}
		}
		setMaps([...maps]);
		console.log(id)
	}
	return(
		<BrowserRouter>
			<Switch>
				<Redirect exact from="/" to={ {pathname: "/welcome-screen"} } />
				{
					maps.map(map => <Route path={"/maps/" + map.id}  render={() => 
						<MapsTable tps={transactionStack} fetchUser={refetch} user={user} refreshTps={refreshTps} map ={map} route = {"maps/" + map.id}/>
					}  />)
				}
				<Route 
					path="/welcome-screen" 
					name="welcome-screen" 
					render={() => 
						<Homescreen tps={transactionStack} fetchUser={refetch} user={user} refreshTps={refreshTps} route = {"welcome-screen/"}/>
					} 
				/>
				<Route 
					path="/maps" 
					name="maps" 
					render={() => 
						<Maps tps={transactionStack} fetchUser={refetch} user={user} refreshTps={refreshTps} deleteMap = {deleteMap} createMaps = {createMaps} maps = {maps}/>
					} 
				/>
				<Route/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;