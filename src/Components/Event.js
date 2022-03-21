import React from 'react';
import './event.css';
import { Button } from '@mui/material';

const Event = ({ details }) => {
    return (
        <div className='container'>
            <div className="container-fluid">
                <div className="eventTitle text-center">
                    <h2>{details.title}</h2>
                </div>
                {/* <div className="w-100-ns db vh-100 flex justify-center">
                    <img
                        src={`http://192.168.30.5:5000/admin/getimg/${details.eventId}`}
                        className="tc db vh-75 w-100"
                        alt="Number one prescription writing software in the country"
                    />
                </div> */}
                <div className='eventPoster text-center'>
                    <img src={`http://192.168.30.5:5000/admin/getimg/${details.eventId}`} className="eventImage" />
                </div>

                <div className="row eventDescription">
                    <div className="col-4 border border-primary">
                        <h2>Description</h2>
                    </div>
                    <div className="col-8 border border-primary">
                        {details.description}
                    </div>
                </div>
                <div className="row eventDate">
                    <div className="col-4">
                        <h2>Date:</h2>
                    </div>
                    <div className="col-8">
                        <p>        {details.date}   </p>
                    </div>
                </div>
                <div className="row organiser">
                    <div classname="col-4">
                        <h2>Organised By:</h2>
                    </div>
                    <div className="col-8">
                        <p>{details.organizedBy}</p>
                    </div>
                </div>
                <div className="text-center p-4">
                    <Button variant="contained" color="success">
                        Register
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Event;