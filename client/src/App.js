import React 			from 'react';
import Homescreen 		from './components/homescreen/Homescreen';
import Maps 		from './components/homescreen/Maps';
import MapsTable from './components/homescreen/MapsTable'
import { useQuery } 	from '@apollo/client';
import * as queries 	from './cache/queries';
import { jsTPS } 		from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
 
const App = () => {
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
	let maps = [{name:'world', id:'world', regions:[{name:'Bulgaria', capital:'Sofia', leader:'radev', 'flag':'bg', landmarks: 'Shipka'},{name:'Bulgaria', capital:'Sofia', leader:'radev', 'flag':'bg', landmarks: 'Shipka'},{name:'Bulgaria', capital:'Sofia', leader:'radev', 'flag':'bg', landmarks: 'Shipka'},{name:'USA'}]}, {name:'league'}] 
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
						<Maps tps={transactionStack} fetchUser={refetch} user={user} refreshTps={refreshTps} />
					} 
				/>
				<Route/>
			</Switch>
		</BrowserRouter>
	);
}

export default App;