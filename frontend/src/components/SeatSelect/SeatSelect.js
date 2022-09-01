import { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Form from "../Form/Form";
import Plane from "./Plane";
import { PlaneContext } from "./PlaneContext";
import PlaneSelect from "./PlaneSelect";

const SeatSelect = () => {
  // const  {seat, givenName, surname, email, selectedFlight}  =
    // useContext(PlaneContext);
  // const history = useHistory();
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  //   fetch("/api/add-reservation", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       flight: selectedFlight,
  //       seat: seat,
  //       givenName: givenName,
  //       surname: surname,
  //       email: email,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data.reservation.seat);
  //       localStorage.setItem("reservationId", data.reservation.seat);
  //       console.log("created");
  //       // localStorage.setItem("reserved",true);
  //       // console.log(JSON.stringify(data.data.result.insertedId))
  //       // history.push("/confirmed");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });


  return (
    <>
      {/* <PlaneSelect /> */}
      <h2>Select your seat and Provide your information!</h2>
      <FormWrapper onSubmit={handleSubmit}>
        <div>
          <Plane />
        </div>
        <div>
          <Form />
        </div>
      </FormWrapper>
    </>
  );
};

const FormWrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default SeatSelect;
