import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Add, ArrowBack, Cancel } from "@mui/icons-material";
import ApiService from "../../services/ApiService";
import TableEmployes from "./components/TableEmployes/TableEmployes";
import Title from "../../components/Title";
import MyModal from "../../components/MyModal";
import NewEmployee from "./components/NewEmployee";
import "./Employees.css"

const Employees = () => {
    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        ApiService.getEmployees()
            .then((data) => {
                setEmpleados(data);
            })
            .catch((e) => {
                console.error('No fue posible cargar los empleados. Error: ' + e);
            });
    }, []);

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
            <TableEmployes employes={empleados}  />
        </>
    )
}

export default Employees;