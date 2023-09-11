import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../components/Title";
import "./Login.css"

const Login = () => {
    const [inputs, setInputs] = useState({
        user : "",
        password : "",
    })

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return(
        <form className="loginForm border_moradoOscuro" onSubmit={handleSubmit}>
            <Title text="Iniciar Sesión" className="cl_moradoOscuro"/>
            <TextField
                name="user"
                label="Usuario"
                required
                value={inputs.user}
                onChange={(e)=>{
                    const {name, value} = e.target;
                    setInputs({
                        ...inputs,
                        [name]: value
                    })
                }}
                error={!inputs.user}
                helperText={
                    !inputs.user ? 'Ingrese un usuario' : ''
                }
                inputProps={{ maxLength: 15 }}
                color="secondary" 
            />
            <TextField
                name="password"
                label="Contraseña"
                required
                value={inputs.password}
                onChange={(e)=>{
                    const {name, value} = e.target;
                    setInputs({
                        ...inputs,
                        [name]: value
                    })
                }}
                error={!inputs.password}
                helperText={
                    !inputs.password ? 'Ingrese su contraseña' : ''
                }
                inputProps={{ maxLength: 8 }}
                type="password"
                color="secondary" 
            />
            <Button type="submit" variant="contained" color="secondary">
                Entra
            </Button>
            <p>
                ¿No tienes cuenta? <Link to="/Register" className="cl_moradoOscuro">Registrate</Link>
            </p>
        </form>
    )
}

export default Login;