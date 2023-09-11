import { Container } from "@mui/material";
import Title from "../Title";
import "./SimpleNav.css"

const SimpleNav = () =>{
    return(
        <div className="bg_moradoOscuro cl_blanco navSuperior">
            <Container>
                <Title text="SenaSoft" />
            </Container>
        </div>
    )
}

export default SimpleNav;