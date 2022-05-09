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

export function saveAnimalsList(animals:IAnimal[]){

    animals.forEach( (animal) => {
    // animal.lastFed.slice(0, 19);
    animal.lastFed = animal.lastFed.slice(0, 19);
    });
    localStorage.setItem("animals", JSON.stringify(animals));
}

export const Animals = () => {
    const [animals, setAnimals] = useState<IAnimal[]>([])


    useEffect( () => {
        if (animals.length !==0) return;

        axios.get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
        .then( (response) => {
            setAnimals(response.data);
        });
    },);

    

//let dateNowsss = new Date((new Date().toISOString()).slice(0,19));
//   console.log("added 2h",(Date.parse(dateNow)+7200000));
//    console.log("dateNow ",dateNow);
//   new Date().getSeconds()
//  console.log("test: ", new Date((new Date().toISOString())).toISOString());
// console.log(new Date(new Date().toString().split("GMT")[0]+" UTC").toISOString());
// let dateNow = (new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()).slice(0,19)
//   console.log(dateNow);

 


// saveAnimalsLS([...animals]);

    return (<>
    {animals.map( (animal) => {

        return (
            <StyledDivContainer key={animal.id}>
                <Link to={"/Animal/" + animal.id}>
                <h3>{animal.name}</h3>
                <p>{animal.shortDescription}</p>
                <img src={animal.imageUrl} alt={animal.name}/>
                
                </Link>
                <button type="button" onClick={() => {saveAnimalsList(animals)}}>SAVE ALL ANIMALS TEST</button>
            </StyledDivContainer>)
    })}

        </>);


}