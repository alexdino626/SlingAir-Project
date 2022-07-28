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
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db= client.db();
        console.log("connect!");

        await db.collection("Reservations").insertOne(req.body);
        res.status(201).json({ status: 201, data: req.body, message: "Your reserevation has been booked"})
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: 500, data: req.body, message: err.message})
    }
};

// updates an existing reservation
const updateReservation = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const reservationBody = req.body;
    const ID = req.body.id;
    const seat = req.body.seat;
    const query = {id:ID};

    const newValues = { $set: {...req.body} };

    await client.connect();

    const db = client.db();
    console.log("connected!");

    await db.collection("Reservations").updateOne(query, newValues);
    res.status(200).json({status: 200, data: reservationBody, message: "Your reservation was updated"});

    
    client.close();
    console.log("disconnected!");
};

// deletes a specified reservation
const deleteReservation = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    const {reservation} = req.params
    // const reservationBody = req.body;
    const flightId = req.body.flight
    const ID = req.body.id;
    const seat = req.body.seat;
    const query = {_id: ObjectId(reservation)};

    

    await client.connect();

    const db = client.db();
    console.log("connected!");

    const result = await db.collection("Reservations").findOneAndDelete(query);
    const flightResult = await db.collection("Flights").findOneAndUpdate({ _id: result.value.flight, "seats.id": result.value.seat }, {$set:{"seat.$.isAvailable":true}}, {returnNewDocument:true})
    console.log(flightResult.value);
    if(result.value && flightResult.value){
        res.status(200).json({status: 200, message: "Successfully deleted the reservation"})
    } else {
        res.status(404).json({status: 404, message: "Oops! Reservation could not be deleted"})
    }

    client.close();
    console.log("disconnected!");
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
