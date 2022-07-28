import styled from "styled-components";

const FlightNumbers = () => {
    return (
        <Wrapper>
            <h2>Flight Number</h2>
            <select>
                <option>---Choose your flight---</option>
                <option>SA231</option>
            </select>
        </Wrapper>
    )
    };

    const Wrapper = styled.div`
    background-color: var(--color-alabama-crimson);
    display: flex;
    `

    export default FlightNumbers