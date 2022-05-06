import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IAnimal } from "../models/IAnimal"

const StyledDivContainer = styled.div`

justify-content: center;
width: 40rem;
text-align: center;
margin: 10px;
img {
 max-width: 100%;
 max-height: 100%;
}
`;


export const Animals = () => {
    const [animals, setAnimals] = useState<IAnimal[]>([])


    useEffect( () => {
        if (animals.length !==0) return;

        axios.get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
        .then( (response) => {
            setAnimals(response.data);
        });
    });


    return (<>
    {animals.map( (animal) => {

        return (
            <StyledDivContainer key={animal.id}>
                <Link to={"/Animal/" + animal.id}>
                <h3>{animal.name}</h3>
                <p>{animal.shortDescription}</p>
                <img src={animal.imageUrl} alt={animal.name}/>
                </Link>
            </StyledDivContainer>)
    })}

        </>);


}