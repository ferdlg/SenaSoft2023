import { useState } from "react";
import { Button } from "@mui/material";
import { Add, Cancel } from "@mui/icons-material";
import TableEmployes from "../../components/TableEmployes/TableEmployes";
import Title from "../../components/Title";
import MyModal from "../../components/MyModal";
import NewEmployee from "./components/NewEmployee";
import "./Employees.css"

const Employees = () => {
    const empleados = [
        {
            "TipoDoc": "CC",
            "NumDoc": "12345",
            "Nombres": "Juan",
            "Apellidos": "Pérez",
            "Departamento": "Antioquia",
            "Ciudad": "Medellín",
            "Dirección": "Calle 123",
            "Email": "juan.perez@example.com",
            "Telefono": "123456789",
            "CreationDate": "2023-09-04",
            "UpdateDate": ""
        },
        {
            "TipoDoc": "TI",
            "NumDoc": "67890",
            "Nombres": "María",
            "Apellidos": "Gómez",
            "Departamento": "Bogotá",
            "Ciudad": "Bogotá",
            "Dirección": "Avenida 456",
            "Email": "maria.gomez@example.com",
            "Telefono": "987654321",
            "CreationDate": "2023-09-04",
            "UpdateDate": ""
        },
        {
            "TipoDoc": "RC",
            "NumDoc": "54321",
            "Nombres": "Pedro",
            "Apellidos": "López",
            "Departamento": "Valle del Cauca",
            "Ciudad": "Cali",
            "Dirección": "Carrera 789",
            "Email": "pedro.lopez@example.com",
            "Telefono": "456789123",
            "CreationDate": "2023-09-04",
            "UpdateDate": ""
        },
        {
            "TipoDoc": "CE",
            "NumDoc": "98765",
            "Nombres": "Laura",
            "Apellidos": "Rodríguez",
            "Departamento": "Atlántico",
            "Ciudad": "Barranquilla",
            "Dirección": "Diagonal 101",
            "Email": "laura.rodriguez@example.com",
            "Telefono": "321654987",
            "CreationDate": "2023-09-04",
            "UpdateDate": ""
        },
        {
            "TipoDoc": "CC",
            "NumDoc": "24680",
            "Nombres": "Carlos",
            "Apellidos": "Sánchez",
            "Departamento": "Cundinamarca",
            "Ciudad": "Bogotá",
            "Dirección": "Calle 678",
            "Email": "carlos.sanchez@example.com",
            "Telefono": "789123456",
            "CreationDate": "2023-09-04",
            "UpdateDate": ""
        },
        {
            "TipoDoc": "TI",
            "NumDoc": "13579",
            "Nombres": "Isabel",
            "Apellidos": "Martínez",
            "Departamento": "Antioquia",
            "Ciudad": "Medellín",
            "Dirección": "Avenida 246",
            "Email": "isabel.martinez@example.com",
            "Telefono": "987654321",
            "CreationDate": "2023-09-04",
            "UpdateDate": ""
        },
        {
            "TipoDoc": "RC",
            "NumDoc": "86420",
            "Nombres": "Luis",
            "Apellidos": "García",
            "Departamento": "Valle del Cauca",
            "Ciudad": "Cali",
            "Dirección": "Carrera 135",
            "Email": "luis.garcia@example.com",
            "Telefono": "456789123",
            "CreationDate": "2023-09-04",
            "UpdateDate": ""
        },
        {
            "TipoDoc": "CE",
            "NumDoc": "98765",
            "Nombres": "Ana",
            "Apellidos": "Pérez",
            "Departamento": "Atlántico",
            "Ciudad": "Barranquilla",
            "Dirección": "Diagonal 202",
            "Email": "ana.perez@example.com",
            "Telefono": "321654987",
            "CreationDate": "2023-09-04",
            "UpdateDate": ""
        },
        {
            "TipoDoc": "CC",
            "NumDoc": "12345",
            "Nombres": "David",
            "Apellidos": "Fernández",
            "Departamento": "Cundinamarca",
            "Ciudad": "Bogotá",
            "Dirección": "Calle 789",
            "Email": "david.fernandez@example.com",
            "Telefono": "789123456",
            "CreationDate": "2023-09-04",
            "UpdateDate": ""
        },
        {
            "TipoDoc": "TI",
            "NumDoc": "67890",
            "Nombres": "Carmen",
            "Apellidos": "Gómez",
            "Departamento": "Antioquia",
            "Ciudad": "Medellín",
            "Dirección": "Avenida 369",
            "Email": "carmen.gomez@example.com",
            "Telefono": "987654321",
            "CreationDate": "2023-09-04",
            "UpdateDate": ""
        },
        {
            "TipoDoc": "RC",
            "NumDoc": "54321",
            "Nombres": "Miguel",
            "Apellidos": "López",
            "Departamento": "Valle del Cauca",
            "Ciudad": "Cali",
            "Dirección": "Carrera 147",
            "Email": "miguel.lopez@example.com",
            "Telefono": "456789123",
            "CreationDate": "2023-09-04",
            "UpdateDate": ""
        },
        {
            "TipoDoc": "CE",
            "NumDoc": "98765",
            "Nombres": "Elena",
            "Apellidos": "Rodríguez",
            "Departamento": "Atlántico",
            "Ciudad": "Barranquilla",
            "Dirección": "Diagonal 303",
            "Email": "elena.rodriguez@example.com",
            "Telefono": "321654987",
            "CreationDate": "2023-09-04",
            "UpdateDate": ""
        },
        {
            "TipoDoc": "CC",
            "NumDoc": "24680",
            "Nombres": "José",
            "Apellidos": "Sánchez",
            "Departamento": "Cundinamarca",
            "Ciudad": "Bogotá",
            "Dirección": "Calle 896",
            "Email": "jose.sanchez@example.com",
            "Telefono": "789123456",
            "CreationDate": "2023-09-04",
            "UpdateDate": ""
        },
        {
            "TipoDoc": "TI",
            "NumDoc": "13579",
            "Nombres": "Mónica",
            "Apellidos": "Martínez",
            "Departamento": "Antioquia",
            "Ciudad": "Medellín",
            "Dirección": "Avenida 456",
            "Email": "monica.martinez@example.com",
            "Telefono": "987654321",
            "CreationDate": "2023-09-04",
            "UpdateDate": ""
        }
      ]
    
    // Para el modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <>
            <div className="title_employees">
                <Title text="Empleados"/>
                <Button onClick={handleOpen} color="secondary" variant="outlined">Agregar Empleado</Button>
            </div>
            <MyModal open={open} onClose={handleClose}>
                    <NewEmployee/>
                    <div className='btnGroup'>
                        <Button onClick={handleClose} variant="contained" color="error" startIcon={<Cancel/>}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" color="secondary" startIcon={<Add/>} >
                            Nuevo Empleado
                        </Button>
                    </div>  
            </MyModal>
            <TableEmployes employees={empleados}/>
        </>
    )
}

export default Employees;