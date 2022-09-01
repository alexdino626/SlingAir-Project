import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { FlightProvider } from "./components/FlightContext";
import { PlaneProvider } from "./components/SeatSelect/PlaneContext";


ReactDOM.render(
  <React.StrictMode>
    <FlightProvider>
      <PlaneProvider>
        <App />
      </PlaneProvider>
    </FlightProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
