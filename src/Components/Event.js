import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import {useHistory} from "react-router-dom/cjs/react-router-dom.min";


const Event = ({isAuthenticated, setError, setSuccess, setRedirect}) => {
    const history = useHistory();
    const [eventDetails, seteventDetails] = useState(null);
    console.log(eventDetails);
    let {eventId} = useParams();
    const [isregistered, setIsRegistered] = useState(false);
    console.log(isregistered);
    useEffect((e) => {
        console.log(eventId);
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/getevent`,
                {eventId: eventId}
            )
            .then((res) => {
                console.log(res.data);
                seteventDetails(res.data[0]);
            })
            .catch((err) => console.log(err));
        axios
            .post(`${process.env.REACT_APP_API_URL}/userdetails`, {eventId: eventId},
                {
                    headers: {
                        'Authorization': `${localStorage.getItem("token")}`,
                    }
                })
            .then((e) => {
                console.log(e);
                if (e.status == 200) {
                    setIsRegistered(true);
                }
            })
            .catch((err) => console.log(err));
    }, []);
    const registerHandler = (e) => {
        if (!isAuthenticated.status)
            setRedirect(`event/${eventId}`)
        history.push('/login');
        const url = `${process.env.REACT_APP_API_URL}/addevent`;
        let data = {};
        data["eventId"] = eventId;
        data["isRegistered"] = true;
        data["isAttended"] = false;
        data["isCancelled"] = false;
        console.log(data);
        axios
            .post(url, data, {
                headers: {
                    'Authorization': `${localStorage.getItem("token")}`,
                }
            })
            .then((res) => {
                if (res.status != 200) {
                    throw new Error(res.data)
                }
                console.log("server response", res.data);
                setIsRegistered(true);
                setSuccess("Registration mail sent.")
                setError(null)
            })
            .catch((err) => {
                setError(err.message)
                setSuccess(null)
                console.log(err)
            });
    };
    return (
        <>
            {eventDetails == null ? (
                <>Loading..</>
            ) : (
                <div className="container">
                    <div className=" mb-3 mt-4 text-center event-title">
                        {eventDetails.title}
                    </div>
                    <div className="eventPoster text-center">
                        <img
                            className="eventImage"
                            src={`${process.env.REACT_APP_API_URL}/admin/getimg/${eventId}`}
                            alt="poster"
                            style={{maxWidth: "70%", objectFit: "contain"}}
                        />
                    </div>
                    <div className="eventDetails">
                        <div className="group">
                            <div className="head mb-4"> Description</div>
                            <ReactMarkdown
                                children={eventDetails.description}
                                remarkPlugins={[remarkGfm]}
                            />
                        </div>
                        <div className="group">
                            <div className="head">
                                Panel:{" "}
                                <span className="panelName">{eventDetails.organizedBy}</span>
                            </div>
                        </div>
                        <div className="group">
                            <div className="head">
                                Date: <span className="panelName">{eventDetails.date.slice(0, 10)}</span>
                            </div>
                        </div>
                        <div className="group">
                            <div className="head">
                                Number of Registrations: <span className="panelName">{eventDetails.count}</span>
                            </div>
                        </div>
                        <div className="buttonDiv">
                            {!isregistered ? (
                                <button
                                    type="button"
                                    className="btn btn-success btn-lg btn-block"
                                    onClick={(e) => registerHandler(e)}
                                >
                                    Register
                                </button>
                            ) : (
                                <button
                                    type="text"
                                    disabled={true}
                                    className="btn btn-secondary btn-lg btn-block"
                                >
                                    Registered
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Event;
