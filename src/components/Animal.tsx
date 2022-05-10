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
    const [disableBtn, setDisableBtn] = useState(false);
    let params = useParams();


   useEffect( () => {
    const animalsFromLS = JSON.parse(localStorage.getItem("animals") || "[]");
        animalsFromLS.forEach( (animal:IExtendedAnimal) => {
            if(params.id === animal.id.toString()){
                setExtAnimal(animal);

                // OBS Denna kod körs endast engång per refresh på sidan, 4timmars check (4000 * 60 * 60)
                const timer = setTimeout( () => {
                    if(Date.parse(Date()) - Date.parse(animal.lastFed) > 10000){
                        console.log("Längre än 10 sekunder sedan");
                        alert("Djuret behöver matas!");
                    }

                },1000);
                return () => clearTimeout(timer);
            }
        });

},[]);

// setTimeout(() => {
//     console.log("testar");
    
// });

// useEffect ( () => {
//     const timer = setTimeout( () => {
//         console.log("testar"); 
//     },1000);
//     return () => clearTimeout(timer);
// },[]);

// setTimeout( () => {
//     const animalsFromLS = JSON.parse(localStorage.getItem("animals") || "[]");
//     animalsFromLS.forEach( (animal:IExtendedAnimal) => {
//     if(Date.parse(Date()) - Date.parse(animal.lastFed) > 15000){
//         console.log("Längre än 15 sekunder sedan");
//         alert("Djuret behöver matas!")
//     }});

// },1000) //efter en sekund ska popupp komma


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


        setDisableBtn(true);
        setTimeout( () => {
            setDisableBtn(false);
        }, 10000) //10 sekunder i dagsläget (4000 * 60 * 60) = är 3 timmar
    }




    return (<StyledDivContainer>
        <h2>{extAnimal?.name}</h2>
        <div>Latinska namnet: {extAnimal?.latinName}</div>
        <div>Föddes år: {extAnimal?.yearOfBirth}</div>
        <div>Beskrivning: {extAnimal?.longDescription}</div>
        <div>Matades senast: {extAnimal?.lastFed} <button type="button" onClick={feedAnimal} disabled={disableBtn}>Mata djur</button></div>
        
        <img src={extAnimal?.imageUrl} alt={extAnimal?.name} />
    </StyledDivContainer>);


}