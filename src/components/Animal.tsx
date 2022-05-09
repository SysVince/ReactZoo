import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components";
import { IExtendedAnimal } from "../models/IExtendedAnimal";
import { saveAnimalsList } from "./Animals";


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
    const animalsFromLS = JSON.parse(localStorage.getItem("animals") || "[]");

    if (animalsFromLS){
        animalsFromLS.forEach( (animal:IExtendedAnimal) => {
            if(params.id === animal.id.toString()){
                setExtAnimal(animal);
            }
        });
    }
},[]);



    function feedAnimal(){
        let animalsFromLS = JSON.parse(localStorage.getItem("animals") || "[]");
        
        animalsFromLS.forEach( (animal:IExtendedAnimal) => {
            if( params.id == animal.id.toString()){
                animal.isFed = true;
                animal.lastFed = (new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()).slice(0,19);
                setExtAnimal(animal);
            }

        });
        saveAnimalsList([...animalsFromLS]);
        console.log("animalfromLS :", animalsFromLS);
    }




    return (<StyledDivContainer>
        <h2>{extAnimal?.name}</h2>
        <div>Latinska namnet: {extAnimal?.latinName}</div>
        <div>Föddes år: {extAnimal?.yearOfBirth}</div>
        <div>Beskrivning: {extAnimal?.longDescription}</div>
        <div>Matades senast: {extAnimal?.lastFed} <button onClick={feedAnimal}>Mata djur</button></div>
        
        <img src={extAnimal?.imageUrl} alt={extAnimal?.name} />
    </StyledDivContainer>);


}