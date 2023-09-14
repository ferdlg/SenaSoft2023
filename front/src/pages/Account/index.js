import { Avatar, Container } from "@mui/material";
import "./Account.css"
import Title from "../../components/Title";

const Account = () => {
    return(
        <Container className="perfilContainer">
            <Title text="Perfil"/>
            <div>
                <div>
                    <Avatar/>
                    <p>
                        <strong className="cl_moradoOscuro">Nombre:</strong> Camila Arias
                    </p>
                </div>
                <div>
                    Nombres
                </div>
            </div>
            

        </Container>
    )
}

export default Account;