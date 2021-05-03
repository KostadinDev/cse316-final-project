import React            from 'react';
import WButton from 'wt-frontend/build/components/wbutton/WButton';
import { useHistory } from "react-router-dom";

const WelcomeScreen = (props) => {
  const history = useHistory();
    return (
        <div className='welcome-screen-component'>
          <WButton  onClick = {() => {
            history.push('/maps')
          }}className = 'welcome-screen-button'>Welcome the The World Data Mapper</WButton>
        </div>
    );
};

export default WelcomeScreen;