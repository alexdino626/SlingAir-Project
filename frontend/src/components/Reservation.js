import { useEffect, useState } from "react";
import styled from "styled-components";

const Reservation = () => {
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
    // const [reservationData, setReservationData] = useState({});
    // const [isLoaded, setIsLoaded] = useState(false);
    // const reservedId = localStorage.getItem("reservationId");
    // console.log(_id);
    // useEffect(() => {
    // fetch(`/api/get-reservation/${reserveid}`)
    // .then((res) => res.json())
    // .then((data) => {
    //     setReservationData(data.data);
    //     setIsLoaded(true);
    //     })
    //     .catch((err) => console.log(err));
    // }, []);
    // if (!isLoaded) {
    // return <></>
    // }
    return (
        <Wrapper>
            <Div>
                <P>Your flight is confirmed!</P>
                <Results>Reservation #: {filter[0]._id}</Results>
                <Results>Flight #: {filter[0].flight}</Results>
                <Results>Seat #: {filter[0].seat}</Results>
                <Results>
                    Name: {filter[0].givenName} {filter[0].surname}
                </Results>
                <Results>email: {filter[0].email}</Results>
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