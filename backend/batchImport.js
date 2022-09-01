const {flights, reservations} = require("./data.js");
const { MongoClient} = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const batchImport = async() => {
    // const seats = flights["SA231"].map((seat)=>{
    //     return {...seat, flightId:"SA231"}
    // });

    // const reservation = reservations["SA231"].map((reserved)=>{
    //     return {...reserved, flight: "SA231"}
    // });
    const client = new MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("sling_air");
    console.log("connected!");
    await db.collection("Flights").insertOne({_id: "SA231", flight: "SA231", seats: flights.SA231});
    await db.collection("Reservations").insertMany(reservations);



    client.close();
    console.log("disconnected!");
}
batchImport()