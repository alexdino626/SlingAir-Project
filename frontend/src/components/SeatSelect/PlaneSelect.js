import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { PlaneContext } from "./PlaneContext";


const PlaneSelect = () => {
    const [planes, setPlanes] = useState([]);

    const { setSelectedFlight } = useContext(PlaneContext);

    useEffect(() => {
    fetch("api/get-flights")
    .then((res) => res.json())
    .then((data) => {
        if(data.data){
            setPlanes([data.data]);
            console.log(data);
        }
        })
    .catch((err) => console.error(err));
    },[]);

    const selectFlightHandler = (event) => {
        setSelectedFlight(event.target.value);
    };
    console.log({planes})
    return (
        <>
            <Wrapper>
                <Wrapper2>
                    <H1>Flight Number:</H1>
                    <select onChange={selectFlightHandler}>
                        <option>Select your flight</option>
                        {planes.map((plane) => {
                        return (
                        <option key={plane._id} value={plane._id}>
                            {plane.flight}
                        </option>
                        );
                        })}
                    </select>
                </Wrapper2>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    background-color: var(--color-cadmium-red);
    height: 8vh;
`;
const Wrapper2 = styled.div`
    display: flex;
    gap: 20px;
    padding: 2vh 0;
`;
const H1 = styled.h1`
    padding-left: 20px;
`;
export default PlaneSelect;