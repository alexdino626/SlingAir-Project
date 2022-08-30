import {createContext, useState, useEffect } from "react";

export const FlightContext = createContext(null)

export const FlightProvider = ({ children }) => {
    const [allFlights, setAllFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState("");

    const [seat, setSeat] = useState("");
    const[givenName, setGivenName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");

    useEffect(()=>{
        fetch("/api/get-flights")
        .then((res) => res.json())
        .then((data) => {
            setAllFlights(data.data);
        })
        .catch((err)=> console.log(err));
    }, []);
    return (
        <FlightContext.Provider
        value={ {
            seat,
            setSeat,
            givenName,
            setGivenName,
            surname,
            setSurname,
            email,
            setEmail,
            allFlights,
            setAllFlights,
            selectedFlight,
            setSelectedFlight,
        } }
        >
            {children}
        </FlightContext.Provider>
    );
};