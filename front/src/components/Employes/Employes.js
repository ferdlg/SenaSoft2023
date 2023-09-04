import React, { useState, useEffect } from 'react';
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Dropdown from '../Dropdown/Dropdown';
import "./index.css"
import axios from 'axios';

const Employes = () =>{

    const [departamentos, setDepartamentos] = useState([]);
    const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState('');
  
    useEffect(() => {
        // Realiza una solicitud GET a la API de departamentos
        axios.get('https://api-colombia.com/api/v1/Department')
          .then((response) => {
            const data = response.data; // Los datos de los departamentos
            setDepartamentos(data); // Guarda los departamentos en el estado
          })
          .catch((error) => console.error(error));
      }, []);
    
      const handleSelect = (departamento) => {
        setDepartamentoSeleccionado(departamento);
      };

    return <div className="DivEmployes">
        <div className="EmployesTitle">
            <h1>Empleados</h1>
            <Button data-bs-toggle="modal" data-bs-target="#staticBackdrop">Nuevo Empleado +</Button>
        </div>
        <Modal 
            title="Nuevo Empleado"
            optionName="Agregar Empleado"
        >
            <div>
            <h1>Lista de Departamentos de Colombia</h1>
            <Dropdown options={departamentos.map((dep) => dep.name)} onSelect={handleSelect} />
            <p>Departamento seleccionado: {departamentoSeleccionado}</p>
            </div>
        </Modal>

    </div>
}   

export default Employes;