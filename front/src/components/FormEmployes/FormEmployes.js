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
  const [ciudades, setCiudades] = useState([]);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    axios.get('https://api-colombia.com/api/v1/Department')
      .then((response) => {
        const data = response.data;
        const departamentosConId = data.map((dep) => ({ id: dep.id, name: dep.name }));
        setDepartamentos(departamentosConId);
      })
      .catch((error) => {
        console.error("Error al cargar departamentos:", error);
      });
  }, []);
  
  const fetchCiudades = (departmentId) => {
    axios
      .get(`https://api-colombia.com/api/v1/Department/${departmentId}/cities`)
      .then((response) => {
        const data = response.data;
        setCiudades(data);
      })
      .catch((error) => {
        console.error("Error al cargar ciudades:", error);
      });
  };

  const handleTipoDocChange = (tipoDoc) => {
    console.log("Tipo de Documento seleccionado:", tipoDoc);
  };

  const handleDepartamentoChange = (departamento) => {
    console.log("Departamento seleccionado:", departamento);
    fetchCiudades(departamento);
  };

  const handleCiudadChange = (ciudad) => {
    console.log("Ciudad seleccionada:", ciudad);
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
        options={departamentos} 
        onSelect={handleDepartamentoChange} 
      />
      <Dropdown 
        label="Ciudad" 
        options={ciudades} 
        onSelect={handleCiudadChange} 
      />
      <Input 
        titulo="Dirección" 
        placeholder="Ingrese dirección" 
        required 
        valor={address} 
        actualizarValor={setAddress}
      />
      <Input 
        titulo="Correo Electrónico" 
        placeholder="Ingrese correo" 
        required 
        valor={email} 
        actualizarValor={setEmail}
        type="email"
      />
      <Input 
        titulo="Teléfono de Contacto" 
        placeholder="Ingrese telefono" 
        required 
        valor={phone} 
        actualizarValor={setPhone}
        type="number"
      />
      
    </div>
  );
}

export default FormEmployes;
