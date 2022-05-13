import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { IExtendedAnimal } from "../models/IExtendedAnimal";
import { StyledButton } from "./StyledButton";

const StyledDivContainer = styled.div`
  width: 80%;
  text-align: center;
  img {
    max-width: 80rem;
    max-height: 65rem;
  }
`;

export const Animal = () => {
  const [extAnimal, setExtAnimal] = useState<IExtendedAnimal>({id:0, imageUrl:"",isFed:false,lastFed:"",latinName:"",longDescription:"",medicine:"",name:"",shortDescription:"",yearOfBirth:0});
  const [extAnimals, setExtAnimals] = useState<IExtendedAnimal[]>([]);
  let params = useParams();

  useEffect(() => {
    const animalsFromLS: IExtendedAnimal[] = JSON.parse(
      localStorage.getItem("animals") || "[]"
    );
    setExtAnimals(animalsFromLS);
    animalsFromLS.forEach((animal: IExtendedAnimal) => {
      if (params.id === animal.id.toString()) {
        setExtAnimal(animal);
      }
    });

  }, []);


  useEffect(() => {
    if (extAnimals.length !== 0) {
      extAnimals.forEach( (animal:IExtendedAnimal, i:number) => {
        if (params.id === animal.id.toString()) {

        // 4timmars check (4000 * 60 * 60)
         setTimeout(() => {
          if (
            Date.parse(Date()) - Date.parse(animal.lastFed) >
            4000 * 60 * 60
          ) {
             extAnimals[i] = {...extAnimal, isFed : false};
             setExtAnimals(extAnimals);
             localStorage.setItem("animals", JSON.stringify(extAnimals));
             setExtAnimal({...extAnimal, isFed : false});
            alert(animal.name + " behöver matas!");
          }
         }, 500);
  
        }
      })


    }
  },[extAnimals]);

  


  function feedAnimal() {
    extAnimals.forEach((animal: IExtendedAnimal) => {
      if (params.id === animal.id.toString()) {
        animal.isFed = true;
        animal.lastFed = new Date(
          new Date().toString().split("GMT")[0] + " UTC"
        )
          .toISOString()
          .slice(0, 19);
          setExtAnimal(animal);
      }
    });
    setExtAnimals(extAnimals);
    localStorage.setItem("animals", JSON.stringify(extAnimals));

  }

  return (
    <StyledDivContainer>
      <h2>{extAnimal?.name}</h2>
      <div>Latinska namnet: {extAnimal?.latinName}</div>
      <div>Föddes år: {extAnimal?.yearOfBirth}</div>
      <div>{extAnimal?.longDescription}</div>
      <div>
        Matades senast: {extAnimal?.lastFed}{" "}
        <StyledButton color="green" onClick={feedAnimal} disabled={extAnimal.isFed}>Mata djur</StyledButton>
      </div>

      <img src={extAnimal?.imageUrl} alt={extAnimal?.name + " Image"} />
    </StyledDivContainer>
  );
};
