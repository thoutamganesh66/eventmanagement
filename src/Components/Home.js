import React from 'react';

// import { TabContext, TabPanel } from '@mui/lab';

import './home.css';
import Slides from './Slides';
import TabsDivision from './TabsDivision';

const Home = () => {

    return (
        <div className="container-fluid">
            <Slides />

            {/* Tabs */}
            <TabsDivision />
        </div>
    );
}

export default Home;