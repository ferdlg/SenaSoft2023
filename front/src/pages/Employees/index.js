import { useState, useEffect } from "react";
import ApiService from "../../services/ApiService";
import TableEmployes from "./components/TableEmployes/TableEmployes";
import Title from "../../components/Title";
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
            </div>
            <TableEmployes employes={empleados}  />
        </>
    )
}

export default Employees;