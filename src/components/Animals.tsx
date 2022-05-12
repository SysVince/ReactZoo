import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IAnimal } from "../models/IAnimal";
import { StyledButton } from "./StyledButton";

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

export const Animals = () => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  useEffect(() => {
    if (animals.length !== 0) return;

    axios
      .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
      .then((response) => {
        setAnimals(response.data);
      });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("animals") === null && animals.length !== 0) {
      animals.forEach((animal) => {
        animal.lastFed = animal.lastFed.slice(0, 19);
      });
      localStorage.setItem("animals", JSON.stringify(animals));
    }
  }, [animals]);

  function checkAnimalsToFeed() {
    const animalsFromLS = JSON.parse(localStorage.getItem("animals") || "[]");
    let animalFeedingNeeded = "";
    animalsFromLS.forEach((animal: IAnimal) => {
      if (Date.parse(Date()) - Date.parse(animal.lastFed) > 4000 * 60 * 60) {
        animalFeedingNeeded += animal.name + ", ";
      }
    });
    alert("Dessa djur behöver matas: " + animalFeedingNeeded);
  }

  let animalsHtml = animals.map((animal) => {
    return (
      <StyledDivContainer key={animal.id}>
        <Link to={"/Animal/" + animal.id}>
          <h3>{animal.name}</h3>
          <p>{animal.shortDescription}</p>
          <img src={animal.imageUrl} alt={animal.name + " Image"} />
        </Link>
      </StyledDivContainer>
    );
  });

  return (
    <>
      <div>
          <StyledButton color="teal" onClick={checkAnimalsToFeed}>Kolla vilka djur som behöver matas</StyledButton>
      </div>
      {animalsHtml}
    </>
  );
};
