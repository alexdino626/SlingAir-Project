import { useEffect, useState } from "react";
import styled from "styled-components";

const Reservation = () => {
    const [reservationData, setReservationData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const _id = localStorage.getItem("_id").replace(/"/g, "");
    console.log(_id);
    useEffect(() => {
    fetch(`/api/get-reservation/${_id}`)
    .then((res) => res.json())
    .then((data) => {
        setReservationData(data.data);
        setIsLoaded(true);
        })
        .catch((err) => console.log(err));
    }, []);
    if (!isLoaded) {
    return <></>
    }
    return (
        <Wrapper>
            <Div>
                <P>Your flight is confirmed!</P>
                <Results>Reservation #: {reservationData._id}</Results>
                <Results>Flight #: {reservationData.flight}</Results>
                <Results>Seat #: {reservationData.seat}</Results>
                <Results>
                    Name: {reservationData.givenName} {reservationData.surname}
                </Results>
                <Results>email: {reservationData.email}</Results>
            </Div>
        </Wrapper>
    );
};
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100vh;
`;
const Div = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: 5px;
    border: 3px solid var(--color-alabama-crimson);
    padding: 50px;
    border-radius: 5px;
`;
const P = styled.p`
    color: var(--color-alabama-crimson);
    font-size: 32px;
    border-bottom: 3px solid var(--color-alabama-crimson);
`;
const Results = styled.p`
    font-size: 18px;
`;
export default Reservation;