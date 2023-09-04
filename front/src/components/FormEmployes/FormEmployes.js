import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from '../Dropdown/Dropdown';
import Input from '../Input/Input';
import "./index.css"

const FormEmployes = () =>{
  const tipoDocOptions = ["CC", "TI", "RC", "CE"];
  const [docNumber, setDocNumber] = useState("");
  const [names, setNames] = useState("");
  const [lastnames, setLastames] = useState("");
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET a la API de departamentos
    axios.get('https://api-colombia.com/api/v1/Department')
      .then((response) => {
        const data = response.data; // Los datos de los departamentos
        setDepartamentos(data); // Guarda los departamentos en el estado
      })
      .catch((error) => {
        console.error("Error al cargar departamentos:", error);
      });
  }, []);
  
  const handleTipoDocChange = (tipoDoc) => {
    // Aquí puedes realizar alguna acción en respuesta a la selección del tipo de documento.
    console.log("Tipo de Documento seleccionado:", tipoDoc);
  };

  const handleDepartamentoChange = (departamento) => {
    console.log("Departamento seleccionado:", departamento);
  };

  return (
    <div>
      <Dropdown 
        label="Tipo de Documento" 
        options={tipoDocOptions} 
        onSelect={handleTipoDocChange} 
      />
      <Input 
        titulo="Número Documento" 
        placeholder="Ingrese número de identificación" 
        required 
        type="number"
        valor={docNumber} 
        actualizarValor={setDocNumber}
      />
      <Input 
        titulo="Nombres" 
        placeholder="Ingrese nombres" 
        required 
        valor={names} 
        actualizarValor={setNames}
      />
      <Input 
        titulo="Apellidos" 
        placeholder="Ingrese apellidos" 
        required 
        valor={lastnames} 
        actualizarValor={setLastames}
      />
      <Dropdown 
        label="Departamento" 
        options={departamentos.map((dep) => dep.name)} 
        onSelect={handleDepartamentoChange} 
      />
    </div>
  );
}

export default FormEmployes;
