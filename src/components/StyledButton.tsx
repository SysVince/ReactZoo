import styled from "styled-components";

// ? Är som en validering, annars blir det "No overload matches this call."
interface IStyledButtonProps {
    color?:string;
    background?:string;
}

export const StyledButton = styled.button.attrs({
    type: "button",
})`

border: 1px solid green;
border-radius: 5px;
margin: 1rem;



&:hover  {
    cursor: pointer;
}
&:disabled{
    color: red;
    opacity: .45;
  pointer-events: none;
}

color: ${(props: IStyledButtonProps) => props.color || "black" };
background-color: ${(props: IStyledButtonProps) => props.background || "white" };

`;