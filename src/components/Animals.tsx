import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IAnimal } from "../models/IAnimal"
import { IExtendedAnimal } from "../models/IExtendedAnimal";

const StyledDivContainer = styled.div`

justify-content: center;
width: 35rem;
text-align: center;
margin: 10px;
img {
 max-width: 100%;
 max-height: 100%;
}
`;

// Flytta denna save function till Animal.tsx
export function saveAnimalsList(animals:IAnimal[]){

    animals.forEach( (animal) => {
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

    });

    useEffect(() => {
        if (localStorage.getItem("animals") === null && animals.length !== 0) {
          animals.forEach((animal) => {
            animal.lastFed = animal.lastFed.slice(0, 19);
          });
          localStorage.setItem("animals", JSON.stringify(animals));
        }
      }, [animals]);
 
  


    function checkAnimalsToFeed(){
        const animalsFromLS = JSON.parse(localStorage.getItem("animals") || "[]");
        let animalFeedingNeeded = "";
        animalsFromLS.forEach( (animal:IExtendedAnimal) => {
            if(Date.parse(Date()) - Date.parse(animal.lastFed) > 15000){
                animalFeedingNeeded += animal.name + ", "
                
            }
        });
        alert("Dessa djur behöver matas: " + animalFeedingNeeded);

    }



        


//let dateNowsss = new Date((new Date().toISOString()).slice(0,19));
//   console.log("added 2h",(Date.parse(dateNow)+7200000));
//    console.log("dateNow ",dateNow);
//   new Date().getSeconds()
//  console.log("test: ", new Date((new Date().toISOString())).toISOString());
// console.log(new Date(new Date().toString().split("GMT")[0]+" UTC").toISOString());
// let dateNow = (new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()).slice(0,19)
//   console.log(dateNow);

 
//  alert("Testing 1 time");

// saveAnimalsLS([...animals]);

    let animalsHtml = animals.map( (animal) => {

        // Date.parse(Date()) - Date.parse(animal.lastFed)

        return (
            <StyledDivContainer key={animal.id}>
                <Link to={"/Animal/" + animal.id}>
                <h3>{animal.name}</h3>
                <p>{animal.shortDescription}</p>
                <img src={animal.imageUrl} alt={animal.name + " Image"}/>
                </Link>

            </StyledDivContainer>);
    });

    // console.log(Date());
    
    // return (<>
    // {animals.map( (animal) => {

    //     return (
    //         <StyledDivContainer key={animal.id}>
    //             <Link to={"/Animal/" + animal.id}>
    //             <h3>{animal.name}</h3>
    //             <p>{animal.shortDescription}</p>
    //             <img src={animal.imageUrl} alt={animal.name}/>
                
    //             </Link>
    //             <button type="button" onClick={() => {saveAnimalsList(animals)}}>SAVE ALL ANIMALS TEST</button>
    //         </StyledDivContainer>);
    // })}

    //     </>);

return (<>
<div><button type="button" onClick={checkAnimalsToFeed}>Kolla vilka djur som behöver matas</button></div>
{animalsHtml}
</>);

}