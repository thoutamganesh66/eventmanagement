import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

const Event = () => {
  const [eventDetails, seteventDetails] = useState(null);
  console.log(eventDetails);
  let { eventId } = useParams();
  const [isregistered, setIsRegistered] = useState(false);
  console.log(isregistered);
  useEffect((e) => {
    console.log("akdbjadbaiudaidb");
    axios
      .post(
        "http://localhost:5000/getevent",
        { eventId: eventId },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        seteventDetails(res.data[0]);
      })
      .catch((err) => console.log(err));
    axios
      .post("http://localhost:5000/userdetails", { eventId: "food1" })
      .then((e) => {
        console.log(e.data);
        if (e.data) {
          setIsRegistered(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const registerHandler = (e) => {
    const url = "http://192.168.43.112:5000/addevent";
    let data = {};
    data["eventId"] = "food1";
    data["email"] = "b172321@rgukt.ac.in";
    data["isRegistered"] = true;
    data["isAttended"] = false;
    data["isCancelled"] = false;
    console.log(data);
    axios
      .post(url, data)
      .then((res) => {
        console.log("server response", res.data);
        setIsRegistered(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {eventDetails == null ? (
        <>Loading..</>
      ) : (
        <div className="container">
          <div className=" mb-4 mt-4 text-center event-title">
            {eventDetails.title}
          </div>
          <div className="eventPoster text-center">
            <img
              className="eventImage"
              src={`http://192.168.30.5:5000/admin/getimg/${eventId}`}
              alt="poster"
              style={{ maxWidth: "70%", objectFit: "contain" }}
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
                Date: <span className="panelName">{eventDetails.date.slice(0,10)}</span>
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
