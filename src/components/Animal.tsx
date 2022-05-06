import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components";
import { IExtendedAnimal } from "../models/IExtendedAnimal";

const StyledDivContainer = styled.div`
text-align: center;
img{
    max-width: 80rem;
    max-height: 65rem;
}
`;

export const Animal = () => {
    const [extAnimal, setExtAnimal] = useState<IExtendedAnimal>()
    let params = useParams();


    useEffect( () => {
        axios.get<IExtendedAnimal>("https://animals.azurewebsites.net/api/animals/" + params.id)
        .then( (response) => {
            setExtAnimal(response.data);
        });
    }, []);

    localStorage.setItem("animal", JSON.stringify(extAnimal));

    let animalFromLS = localStorage.getItem("animal");
    console.log(extAnimal);
    console.log(animalFromLS);
    

    return (<StyledDivContainer>
        <h2>{extAnimal?.name}</h2>
        <div>Latinska namnet: {extAnimal?.latinName}</div>
        <div>Föddes år: {extAnimal?.yearOfBirth}</div>
        <div>Beskrivning: {extAnimal?.longDescription}</div>
        <div>Matades senast: {extAnimal?.lastFed} <button>Mata djur</button></div>
        <img src={extAnimal?.imageUrl} alt={extAnimal?.name} />
    </StyledDivContainer>);


}