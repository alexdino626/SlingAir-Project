import { useEffect, useState } from "react";
import styled from "styled-components";

import tombstone from "../assets/tombstone.png";

const Confirmation = () => {
  const [reservation, setreservation] = useState();
  const [load, setLoad] = useState(false);

  
  const reservedId = localStorage.getItem("reservationId");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api/get-reservations");
      const json = await data.json();
      console.log(json);
      setreservation(json.data);
      setLoad(true);
      return json;
    };
    fetchData().catch(() => {
      console.log("S");
    });
  }, []);
  if (load === false) {
    return <>loading</>;
  }

  const filter = reservation.filter(
    (x) => x.seat === localStorage.getItem("reservationId")
  );
  console.log(filter);
  console.log(reservation);

  // const [reservation, setReservation] = useState({});
  // const [loading, setLoading] = useState(false)


  // useEffect(() => {
  //   fetch("/api/get-reservations")
  //   .then(res => res.json())
  //   .then((data) =>{
  //   setLoading(true)
  //   setReservation(data.reservation)
  //   console.log(data);
  //   })
  // }, []);

  // if(loading === false){
  //   return <>loading</>
  // }

  return <Wrapper>
          <Div>
          <Img src={tombstone} />
          <h1>Your reservation is confirmed</h1>
          <ReservationInfo>
            <ReservedInfo id={reservedId}></ReservedInfo>
            <ReservedInfo><strong>Reservation #:</strong>{reservedId}</ReservedInfo>
            <ReservedInfo><strong>Flight #:</strong> {filter[0].flight}</ReservedInfo>
            <ReservedInfo><strong>Seat #:</strong> {filter[0].seat}</ReservedInfo>
            <ReservedInfo><strong>Name:</strong> {filter[0].givenName} {filter[0].surName}</ReservedInfo>
            <ReservedInfo><strong>Email:</strong> {filter[0].email}</ReservedInfo>
          </ReservationInfo>
          </Div>
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
const ReservationInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  margin: 20px;
`
const ReservedInfo = styled.p`
`

const Img = styled.img`
  width: 100px;
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
`
export default Confirmation;
