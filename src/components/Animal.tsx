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
    const [extAnimal, setExtAnimal] = useState<IExtendedAnimal>();
    const [extAnimals, setExtAnimals] = useState<IExtendedAnimal[]>([]);
    const [disableBtn, setDisableBtn] = useState(true);
    let params = useParams();


   useEffect( () => {
    
      const animalsFromLS:IExtendedAnimal[] = JSON.parse(localStorage.getItem("animals") || "[]");
      animalsFromLS.forEach( (animal:IExtendedAnimal) => {
            if(params.id === animal.id.toString()){
                setExtAnimal(animal);

                // 4timmars check (4000 * 60 * 60)
                setTimeout( () => {
                    if(Date.parse(Date()) - Date.parse(animal.lastFed) > (5000)){
                        animal.isFed=false;
                        setDisableBtn(false);
                        console.log("Längre än 10 sekunder sedan");
                        alert(animal.name +" behöver matas!");
                        console.log("test", animalsFromLS);
                        
                    } 

                },500);
                
            }
        });
        setExtAnimals(animalsFromLS);
        

},[]);

  useEffect(()=>{

      if (extAnimals.length !== 0) {
         localStorage.setItem("animals", JSON.stringify(extAnimals));

      }

     

  },[extAnimals]);



    function feedAnimal(){

        extAnimals.forEach( (animal:IExtendedAnimal) => {
            if( params.id == animal.id.toString()){

                animal.isFed = true;
                animal.lastFed = (new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString()).slice(0,19);

                // setExtAnimal(animal);
                 
            }

        });
        
        localStorage.setItem("animals", JSON.stringify(extAnimals));
        console.log("animalfromLS :", extAnimals);
        setExtAnimals(extAnimals);

        setDisableBtn(true);
        setTimeout( () => {
            setDisableBtn(false);
        }, (10000)) // (4000 * 60 * 60) = är 4 timmar
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