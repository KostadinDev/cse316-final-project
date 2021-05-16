import React from 'react';
import WButton from 'wt-frontend/build/components/wbutton/WButton';

const Logo = (props) => {
    return (
        <WButton className='logo' onClick = {() => {props.toggleHomescreen(true)}}>
            The World Data Mapper
        </WButton>
    );
};

export default Logo;