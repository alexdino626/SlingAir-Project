"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// use this data. Changes will persist until the server (backend) restarts.
const { flights, reservations } = require("./data");

const { MongoClient, Db, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// returns a list of all flights
const getFlights = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db();
    console.log("connected!");
    const flight = await db.collection("Flights").find().toArray();
    // console.log(flight);
    res.status(200).json({status: 200, data: flight[0]._id})

    client.close();
    console.log("disconnected!");
};

// returns all the seats on a specified flight
const getFlight = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const flight = req.params.flight
    // console.log(flight);
    await client.connect();

    const db = client.db();
    const flights  = await db.collection("Flights").findOne({_id: flight})
    // console.log(flights);
    if(!flights){
        res.status(404).json({status: 404, message: "No Flights Found"});
    }else {
        res.status(200).json({status: 200, data: flights.seats})
    }

    client.close();
    console.log("disconnected!");

};

// returns all reservations
const getReservations = async (req, res) => {
const client = new MongoClient(MONGO_URI, options);


await client.connect();

const db = client.db();
const reservation  = await db.collection("Reservations").find().toArray();
if(!reservation){
    res.status(404).json({status: 404, message: "No Reservation Found"});
}else {
    res.status(200).json({status: 200, data: reservation})
}

client.close();
console.log("disconnected!");
};

// returns a single reservation
const getSingleReservation = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const {reservation} = req.params
    // console.log(reservation);
    await client.connect();

    const db = client.db();
    const reservations  = await db.collection("Reservations").findOne({id: reservation})
    if(!reservations){
        res.status(404).json({status: 404, message: "No Reservation Found"});
    }else {
        res.status(200).json({status: 200, data: reservations})
    }

    client.close();
    console.log("disconnected!");


};

// creates a new reservation
const addReservation = async (req, res) => {
    const {flight, seat, givenName,surName, email} = req.body
    const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        
        const db= client.db();
        
        console.log("connect!");

        if (!flight || !givenName || !surName || !email || !seat) {
            res.status(400).json({ status: 400, message: "Missing required fields" });
            return;
          } // email validation
            else if (
            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
                email
            )
            ) {
            res.status(400).json({ status: 400, message: "Invalid email address" });
            return;
          } // if validation passes, create a new reservation
            else {
            let availableSeat = false;
        
            const seatAvailability = await db
                .collection("Flights")
                .findOne({ _id: flight });
        
            seatAvailability.seats.forEach((seat) => {
                if (seat.isAvailable && seat.id === req.body.seat) {
                seat.isAvailable = false;
                availableSeat = true;
                }
            });
        
            const newReservationHelp = {
                _id: uuidv4(),
                ...req.body,
            };
        
            const setNewSeatValue = {
                $set: {
                seats: seatAvailability.seats,
                },
            };
        
            if (availableSeat) {
                try {
                const result = await db
                    .collection("Flights")
                    .updateOne({ _id: flight }, setNewSeatValue);
        
                const newReservation = await db
                    .collection("Reservations")
                    .insertOne(newReservationHelp);
        
                // console.log("add reservation result..",result);
        
                res.status(200).json({
                    status: 200,
                    reservation: newReservationHelp,
                    message: "reservaton has been successfully created",
                });
        
                client.close();
                console.log("disconnected!");
                } catch (err) {
                res.status(400).json({ status: 500, message: err.message });
                }
            } else {
                res.status(400).json({ status: 400, message: "Seat is not available" });
                return;
            }
            }
};

// updates an existing reservation
const updateReservation = async (req, res) => {
    const { flight, givenName, surName, email, seat } = req.body;

    const reservationId = req.params.reservation;
    
    const query = { _id: reservationId };

        // validation of data
        if (!flight || !givenName || !surName || !email || !seat) {
        res.status(400).json({ status: 400, message: "Missing required fields" });
        return;
        } // email validation
        else if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
            email
        )
        ) {
        res.status(400).json({ status: 400, message: "Invalid email address" });
        return;
        } // if validation passes, update the reservation
        else {
        try {
            const client = new MongoClient(MONGO_URI, options);
            await client.connect();
        console.log("connected!");

            const db = client.db();
    
            const selectedResult = await db.collection("Reservations").findOne(query);

            if (seat !== selectedResult.seat) {
            const flight = selectedResult.flight;
            const flightInformation = await db
                .collection("Flights")
                .findOne({ _id: flight });
    
            const newSeatTest = flightInformation.seats.find(
                (item) => item.id === seat
            );

            if (!newSeatTest.isAvailable) {
                res
                .status(404)
                .json({ status: 404, message: "Seat is not available" });
                return;
            } else {
                const newSeat = await db
                .collection("Flights")
                .updateOne(
                    { _id: flight, "seats.id": seat },
                    { $set: { "seats.$.isAvailable": false } }
                );
    
                const OldSeat = await db
                .collection("Flights")
                .updateOne(
                    { _id: flight, "seats.id": selectedResult.seat },
                    { $set: { "seats.$.isAvailable": true } }
                );
            }
            }
    
            // update the collection
    
            const finalResult = await db.collection("Reservations").updateOne(query, {
            $set: {
                flight: flight,
                seat: seat,
                givenName: givenName,
                surName: surName,
                email: email,
            },
            });
    
            // console.log("update reservation result..",result);
    
            res.status(200).json({
            status: 200,
            message: "Reservation updated successfully!",
            reservation: finalResult, // i use this for reference
            });
    
            client.close();
            console.log("disconnected!");
        } catch (err) {
            res.status(500).json({ status: 500, message: err.message });
        }
    }
};

// deletes a specified reservation
const deleteReservation = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const reservationId = req.params.reservation;    

    await client.connect();
    
    const db = client.db();
    console.log("connected!");
    
    const query = { _id: reservationId };

    const findReservation = await db.collection("Reservations").findOneAndDelete(query);
    if (findReservation) {
        try {
    
            const updateFlightSeating = await db
            .collection("Flights")
            .updateOne(
                { _id: findReservation.flight, "seats.id": findReservation.seat },
                { $set: { "seats.$.isAvailable": true } }
            );
    
            const deleteReservedOne = await db
            .collection("Reservations")
            .deleteOne(query);
    
            res.status(200).json({
            status: 200,
            message: "Reservation deleted successfully!",
            reservation: deleteReservedOne,
            flight: updateFlightSeating,
            });
    
            client.close();
            console.log("disconnected!");
        } catch (err) {
            res.status(500).json({ status: 500, message: err.message });
        }
        } else {
        res.status(404).json({ status: 404, message: "Reservation not found" });
        }
};

module.exports = {
    getFlights,
    getFlight,
    getReservations,
    addReservation,
    getSingleReservation,
    deleteReservation,
    updateReservation,
};
