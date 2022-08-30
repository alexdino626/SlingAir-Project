import { useContext } from "react";
import styled from "styled-components";

import tombstone from "../assets/tombstone.png";
import { FlightContext } from "./FlightContext";

const Confirmation = () => {
  const {seat, selectedFlight, givenName, surname, email} = useContext(FlightContext);
  const _id = localStorage.getItem("_id");
  console.log(_id.replace(/"/g, ""));
  return <Wrapper>
          <Div>
            <Confirm>Your flight is confirmed!</Confirm>
            <Results>Reservation #: {_id.replace(/"/g, "")}</Results>
            <Results>Seat #: {seat}</Results>
            <Results>Name: {givenName} {surname}</Results>
            <Results>email: {email}</Results>
          </Div>
          <Img src={tombstone} />
        </Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  position: relative;
  height: 100vh;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, 50%);
  gap: 5px;
  border: 3px solid var(--color-alabama-crimson);
  padding: 50px;
  border-radius: 5px;
`
const Confirm = styled.p`
color: var(--color-alabama-crimson);
font-size: 32px;
border-bottom: 3px solid var(--color-alabama-crimson);
`
const Results = styled.p`
  font-size: 18px;
`
const Img = styled.img`
  width: 100px;
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
`
export default Confirmation;
