import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import '../sass/SelectCheckIn.scss';
// import '../sass/SelectCheckIn-media-queries.scss';

const SelectCheckIn = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState([]);
    // const [isError, setIsError] = useState(null);

    async function fetchEvent() {
        try {
            setIsLoading(true);
            const res = await fetch("http://localhost:4000/api/events?checkInReady=true");
            const resJson = await res.json();

            setEvents(resJson);
            setIsLoading(false);
        } catch(error) {
            console.log(error);
            setIsLoading(false);
            // setIsError(error);
            // alert(error);
        }
    }

    useEffect(() => {
        fetchEvent();

    }, []);

    return (
        <div className="flexcenter-container">
            <h3>Events to check-in for below:</h3>
            {isLoading ? <div>Loading...</div> : (
                <div className="event-container">
                    {events.length > 0 ? (events.map((event, index) => (
                        <div key={index} className="event">
                            <div className="event-headers">
                                <h4>{event.name}</h4>
                                <p>{event.date}</p>
                                <p>{event.location.city}</p>
                                <p>{event.location.state}</p>
                            </div>

                            {props.newUser ? (
                                <Link to={`/checkIn/newUser`} className="checkin-newuser-button">New User Check-In</Link>
                            ) : null}

                            {props.returningUser ? (
                                <Link  to={`/checkIn/returningUser`} className="checkin-newuser-button">Returning User Check-In</Link>
                            ) : null}
                        </div>
                    ))) : (
                        <div>Check back later...</div>
                    )}
                </div>
            )}
        </div>
    )
};

export default SelectCheckIn;
    