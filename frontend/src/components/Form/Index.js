import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import Input from "./Input"


const Form = ({}) => {
    const initialState = {
        givenName: "",
        surname: "",
        email: "",
    }

    const [formData, setFormData] = useState(initialState);
    const [disabled, setDisabled] = useState(true);
    const [subStatus, setSubStatus] = useState("idle");

    useEffect(() => {
    Object.values(formData).includes("") || formData.order === "undefined"
        ? setDisabled(true)
        : setDisabled(false);
    }, [formData, setDisabled]);
    
    const handleChange = (value, name) => {
        setFormData({ ...formData, [name]: value });
        };
        const history = useHistory();
        // const handleRedirect=()=> {
        // history.push("/confirmed")
        // }

        const handleClick = (ev) => {
            ev.preventDefault();
            setSubStatus("pending");
            fetch("/api/add-reservation", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((json) => {
                const { status, error } = json;
                if (status === "success") {
                    setSubStatus("confirmed");
                    history.push("/confirmed")
                } else if (error) {
                    setSubStatus("error");
                    
                }
                });
            };
    return(
        <Wrapper>
            <FormGroup>
                <Input 
                name="givenName"
                type="text"
                placeholder="First name"
                handleChange={handleChange}/>
                <Input
                name="surname"
                type="text"
                placeholder="Last name"
                handleChange={handleChange} 
                />
                <Input 
                name="email"
                type="text"
                placeholder="Email"
                handleChange={handleChange}
                />
                <Button 
                formData={formData}
                handleClick={handleClick}
                disabled={disabled}
                subStatus={subStatus}
                
                />
            </FormGroup>
        </Wrapper>
    )
}

const Wrapper = styled.form`
    padding: 0 20px;
`;

const FormGroup = styled.div`
`;

export default Form