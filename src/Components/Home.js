
import './home.css';
import Slides from './Slides';

import * as React from 'react';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Posts from './Posts';
import axios from 'axios';
import './posts.css'

import Footer from './Footer';


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const Home = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        console.log("New Value", newValue)
        setValue(newValue);
    };

    const statusEvent = (i) => {
        if (i == 0)
            return "pastevents";
        else if (i == 1)
            return "ongoingevents";
        else if (i == 2)
            return "upcomingevents";
        else
            return "ongoingevents";
    }

    const getReqeuest = async (url) => {
        const Data = await axios.post(url, {page_factor: 6, page_number: 1})
        return Data
    }
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL
    const url0 = `${REACT_APP_API_URL}/${statusEvent(0)}`;
    const url1 = `${REACT_APP_API_URL}/${statusEvent(1)}`;
    const url2 = `${REACT_APP_API_URL}/${statusEvent(2)}`;
    const [postsPast, setpostsPast] = useState();
    const [postsOngoing, setOngoing] = useState();
    const [postsUpcoming, setUpcoming] = useState();
    const [loading, setLoading] = useState(false);
    // useEffect(() => {
    //     setSlidesPosts([...postsOngoing, ...postsUpcoming])
    //     console.log("join", slidesPosts)
    // },[postsOngoing,postsUpcoming])
    useEffect(async() => {
        getReqeuest(url0).then(res => {
            setpostsPast(res.data);
        }).catch(err => {
            console.log(err)
        })
        // try{
        //     let res1 = await getReqeuest(url1)
        //     let res2 = awa
        // }
        // catch(err){
        //     console.log(err)
        // }
        getReqeuest(url1).then(res => {
            setOngoing(res.data);
        }).catch(err => {
            console.log(err)
        })
        getReqeuest(url2).then(res => {
            console.log(res.data)
            setUpcoming(res.data);
            setLoading(false);
        }).catch(err => {
            console.log(err)
        })
    }, [])


    
    return (
        <>
        <div className="container-fluid home">
            {postsOngoing !== undefined && postsUpcoming!== undefined?<Slides postsOngoing={postsOngoing} postsUpcoming={postsUpcoming} />:"Loading"}
            {/* Tabs */}
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                        <Tab label="Completed" {...a11yProps(0)} />
                        <Tab label="Ongoing" {...a11yProps(1)} />
                        <Tab label="Upcoming" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Posts posts={postsPast} loading={loading} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Posts posts={postsOngoing} loading={loading} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Posts posts={postsUpcoming} loading={loading} />
                </TabPanel>
            </Box>
        </div>
        {Footer}
        <Footer/>
        </>
    );
}

export default Home;
