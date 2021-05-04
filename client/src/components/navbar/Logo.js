import React from 'react';
import WButton from 'wt-frontend/build/components/wbutton/WButton';
import { useHistory } from "react-router-dom";

const Logo = (props) => {
    const history = useHistory();
    return (
        <WButton  onClick = {() => {history.push('/welcome-screen')}} className='logo'>
            World Data Mapper
        </WButton>
    );
};

export default Logo;