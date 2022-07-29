import styled from "styled-components";

const Button = ({ handleClick, disabled, subStatus }) => (
    <Wrapper disabled={disabled} onClick={handleClick}>
        {subStatus === "pending" && (
        <Loading>
            <div></div>
            <div></div>
        </Loading>
        )}
        {subStatus === "idle" && <span>Confirm</span>}
    </Wrapper>
    );
        
    const Wrapper = styled.button`
    /* position: relative; */
    background: #363292;
    border-color: var(--color-alabama-crimson);
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    display: block;
    font-family: var(--font-body);
    font-size: 16px;
    font-weight: 600;
    margin: 16px auto;
    height: 42px;
    /* width: 90%; */
        
    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
    `;
    const Loading = styled.div`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    top: -21px;
    
    div {
        position: absolute;
        border: 4px solid #fff;
        opacity: 1;
        border-radius: 50%;
        
        &:nth-child(2) {
        animation-delay: -0.5s;
        }
    }
    `;
    
    export default Button