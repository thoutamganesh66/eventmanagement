// import { FontAwesomeIcon } from '@fontawesome/react-fontawesome'
import './home.css';
import Slides from './Slides';

import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Posts from './Posts';
import axios from 'axios';
import './posts.css'
import { Button } from '@material-ui/core';

import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
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
const Home = ({ getEventDetails }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
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
        const Data = await axios.post(url, { page_factor: 6, page_number: 1 })
        return Data
    }

    const url0 = `http://192.168.30.5:5000/${statusEvent(0)}`;
    const url1 = `http://192.168.30.5:5000/${statusEvent(1)}`;
    const url2 = `http://192.168.30.5:5000/${statusEvent(2)}`;
    const [postsPast, setpostsPast] = useState();
    const [postsOngoing, setOngoing] = useState();
    const [postsUpcoming, setUpcoming] = useState();
    const [loading, setLoading] = useState(false);
    const [slidesPosts, setSlidesPosts] = useState([]);

    useEffect(() => {
        getReqeuest(url0).then(res => {
            console.log(res.data)
            setpostsPast(res.data);
            console.log("posts past is ", postsPast)
        }).catch(err => {
            console.log(err)
        })
        getReqeuest(url1).then(res => {
            console.log(res.data)
            setSlidesPosts([...slidesPosts, res.data])
            setOngoing(res.data);
            console.log("posts present is ", postsOngoing)
        }).catch(err => {
            console.log(err)
        })
        getReqeuest(url2).then(res => {
            console.log(res.data)
            setSlidesPosts([...slidesPosts, res.data])
            setUpcoming(res.data);
            console.log("posts upcoming is ", postsUpcoming)
            setLoading(false);
        }).catch(err => {
            console.log(err)
        })
    }, [])



    return (
        <div className="container-fluid home">
            <Slides posts={postsPast} />

            {/* Tabs */}
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                        <Tab label="Completed" {...a11yProps(0)} />
                        <Tab label="Ongoing" {...a11yProps(1)} />
                        <Tab label="Upcoming" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Posts posts={postsPast} loading={loading} eventDetails={getEventDetails} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Posts posts={postsOngoing} loading={loading} eventDetails={getEventDetails} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Posts posts={postsUpcoming} loading={loading} eventDetails={getEventDetails} />
                </TabPanel>
            </Box>

            {/* Footer */}
            <div className="container-fluid footer">
                <MDBFooter color="green" className="font-small pt-4 mt-4">
                    <MDBContainer fluid className="text-center text-md-left">
                        <MDBRow>
                            <MDBCol md="6">
                                <h5 className="title">Footer Content</h5>
                                <p>
                                    Here you can use rows and columns here to organize your footer
                                    content.
                                </p>
                            </MDBCol>
                            <MDBCol md="6">
                                <h5 className="title">Follow us:</h5>
                                <ul>
                                    <li className="list-unstyled">
                                        {/* <FontAwesomeIcon icon="fa-brands fa-facebook-f" /> <a href="#!" style={{ textDecoration: 'none', color: '#fff' }}>Facebook</a> */}
                                    </li>
                                    <li className="list-unstyled">
                                        <a href="#!" style={{ textDecoration: 'none', color: '#fff' }}>Instagram</a>
                                    </li>
                                    <li className="list-unstyled">
                                        <a href="#!" style={{ textDecoration: 'none', color: '#fff' }}>Twitter</a>
                                    </li>
                                    <li className="list-unstyled">
                                        <a href="#!" style={{ textDecoration: 'none', color: '#fff' }}>Telegram</a>
                                    </li>
                                </ul>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    <div className="footer-copyright text-center py-3">
                        <MDBContainer fluid>
                            &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com" style={{ textDecoration: 'none', color: '#fefefe' }}> SGC RGUKT Basar</a>
                        </MDBContainer>
                    </div>
                </MDBFooter>
            </div>
        </div>
    );
}

export default Home;