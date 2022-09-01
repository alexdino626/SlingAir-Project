import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { PlaneContext } from "./PlaneContext";


const Plane = ({}) => {
  const [seating, setSeating] = useState([]);
  const [flightId, setFlightId] = useState(null);
  const [flight, setFlight] = useState(null);

  

  const { setSeat, setSelectedFlight } = useContext(PlaneContext);
  
  useEffect(() => {
    fetch(`/api/get-flight/${flightId}`)
    .then(res => res.json())
    .then((data) =>{ 
    setSeating(data.data)
    console.log(data);
    })
  }, [flightId]);
  
  useEffect(() => {
    fetch('/api/get-flights')
    .then(res => res.json())
    .then((data) => {
      setFlight(data.data)
      console.log(data);
    })
  }, []);

  const handleSeatSelect = (id) => {
    setSeat(id)
  }

  return (
  <>
      <Div>
            <h2>Flight Number</h2>
            <Select onChange= {(ev)=> {
              setSelectedFlight(ev.target.value)
              setFlightId(ev.target.value)
              }}>
                <option value={"flightList"} >---Choose your flight---</option>
                <option value={"SA231"}>SA231</option>
            </Select>
        </Div>
    <Wrapper>
      {seating && seating.length > 0 ? (
        seating.map((seat) => (
          <SeatWrapper key={`seat-${seat.id}`}>
            <label>
              {seat.isAvailable ? (
                <>
                  <Seat type="radio" name="seat" onChange={(e) => {
                    handleSeatSelect(seat.id)
                  }} />
                  <Available>{seat.id}</Available>
                </>
              ) : (
                <Unavailable>{seat.id}</Unavailable>
              )}
            </label>
          </SeatWrapper>
        ))
      ) : (
        <Placeholder>Select a Flight to view seating.</Placeholder>
      )}
    </Wrapper>
  </>
  );
};

const Placeholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 404px;
  width: 260px;
  text-align: center;
  color: var(--color-orange);
  font-family: var(--font-heading);
  font-size: 32px;
  opacity: 0.5;
`;

const Wrapper = styled.ol`
  display: grid;
  grid-template-rows: repeat(10, 30px);
  grid-template-columns: 30px 30px 60px 30px 30px 30px;
  gap: 12px 10px;
  background: #fff;
  border-right: 15px solid var(--color-alabama-crimson);
  border-left: 15px solid var(--color-alabama-crimson);
  margin: 24px 24px 0 0;
  padding: 48px 5px;
  height: 500px;
  width: 300px;
  position: relative;
`;
const SeatWrapper = styled.li`
  display: flex;
  font-size: 12px;
  font-weight: 500;
  position: relative;
  height: 30px;
  width: 30px;
`;
const Seat = styled.input`
  opacity: 0;
  position: absolute;
  height: 30px;
  width: 30px;
  margin: 0;

  &:checked + span{
      background: var(--color-alabama-crimson);
      color: #fff;
      font-weight: 700;
  }
`;
const SeatNumber = styled.span`
  border-radius: 2px;
  color: var(--color-cadmium-red);
  font-family: var(--font-body);
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  width: 30px;
  transition: all ease 300ms;
`;
const Available = styled(SeatNumber)`
  background: #fff;
  border: 1px solid var(--color-alabama-crimson);
  cursor: pointer;

  &.checked,
  &:hover {
    background: var(--color-alabama-crimson);
    color: #fff;
    font-weight: 700;
  }
`;
const Unavailable = styled(SeatNumber)`
  background: var(--color-selective-yellow);
  cursor: not-allowed;
  opacity: 0.4;
`;

const Div = styled.div`
background-color: var(--color-alabama-crimson);
display: flex;
`

const Select = styled.select`
margin-left: 15px;
`

export default Plane;
