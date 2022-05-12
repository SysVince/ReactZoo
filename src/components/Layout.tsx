import { Link, Outlet } from "react-router-dom"
import styled from "styled-components";

const StyledHeader = styled.header`
height: 10%;
background-color: #448ecf;
display: flex;
justify-content: center;
align-items: center;
li{
    display: b;
}
`;

const StyledSection = styled.section`
display: flex;
`;
const StyledMain = styled.main`
width: 100%;
height: 80%;
background-color: #d29a86;
display: flex;
justify-content: center;
flex-wrap: wrap;
`;
const StyledFooter = styled.footer`
height: 10%;
background-color: gray;
display: flex;
justify-content: center;
align-items: center;
`;


export const Layout = () => {
return (    
    <div>
    <StyledHeader>
        <nav>
            <ul>
                <li><Link to="/">Våra djur</Link></li>
            </ul>
        </nav>
    </StyledHeader>
    <StyledSection>
    <StyledMain>
        <Outlet/>
    </StyledMain>
    </StyledSection>
    <StyledFooter>
        <ul>
            <li>KUNDTJÄNST</li>
            <li>INFORMATION</li>
            <li>KONTAKTA OSS</li>
        </ul>
    </StyledFooter>
    </div>
 );
}