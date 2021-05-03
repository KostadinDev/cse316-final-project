import React            from 'react';
import MapTableHeader      from './MapTableHeader';
import TableContents    from './TableContents';

import MapTableBody    from './MapTableBody';
import RegionView    from './RegionView';
import { WButton, WInput, WRow, WCol } from 'wt-frontend';


class MapTable extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      view: 0
    }
  }
  render() {
    return (
            <div className="map-table-wrapper">
              <div className='view-changer'>
              <WButton onClick = {() => { console.log(this.state.view);
              
              this.setState({view: this.state.view + 1})
              
              }}>{this.state.view %2 == 0? 'Change to Region View': 'Change to Table View'}</WButton>
              </div>
              
                {this.state.view % 2 == 0?<div className="map-table ">
                <MapTableHeader map={this.props.map} createRegion = {this.props.createRegion}/>
                <MapTableBody deleteRegion = {this.props.deleteRegion} map={this.props.map} />
              </div>:
              <RegionView map ={this.props.map}></RegionView>}
            </div>
          );
  } 

}
export default MapTable;

// const MapTable = (props) => {
//     let view = 0;
//     return (
//       <div className="map-table-wrapper">
//         <div className='view-changer'>
//         <WButton onClick = {() => { console.log(view);
//         view = view +1;
//         forceUpdate();
        
//         }}>Change View</WButton>
//         </div>
        
//           {view == 0?<div className="map-table ">
//           <MapTableHeader map={props.map} />
//           <MapTableBody map={props.map} />
//         </div>:
//         <RegionView map ={props.map}></RegionView>}
//       </div>
//     );
// };

// export default MapTable;