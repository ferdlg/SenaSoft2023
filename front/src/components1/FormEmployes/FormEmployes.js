import React, { useState, useEffect } from 'react';
import EmployeeService from '../../services/EmployeeService'; // Importa el servicio
import Dropdown from '../Dropdown/Dropdown';
import Input from '../Input/Input';
import "./index.css";

const FormEmployes = () => {
  // Opciones para el dropdown de tipo de documento
  const tipoDocOptions = [
    { id: "CC", name: "Cédula de Ciudadania" },
    { id: "TI", name: "Tarjeta de Identidad" },
    { id: "RC", name: "Registro Civil" },
    { id: "CE", name: "Cédula de Extranjería" }
  ];
  
  // Estados para los campos del formulario
  const [docNumber, setDocNumber] = useState("");
  const [names, setNames] = useState("");
  const [lastnames, setLastnames] = useState("");
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [creationDate, setCreationDate] = useState(new Date().toISOString().split('T')[0]);

  // Función para cargar los departamentos al cargar el componente
  useEffect(() => {
    EmployeeService.getDepartments()
      .then((departamentosConId) => {
        setDepartamentos(departamentosConId);
      })
      .catch((error) => {
        console.error("Error al cargar departamentos:", error);
      });
  }, []);

  // Función para manejar el cambio de departamento y cargar las ciudades
  const handleDepartamentoChange = (departamento) => {
    console.log("Departamento seleccionado:", departamento);
    EmployeeService.getCitiesByDepartmentId(departamento)
      .then((data) => {
        setCiudades(data);
      })
      .catch((error) => {
        console.error("Error al cargar ciudades:", error);
      });
  };

  // Función para manejar el cambio de tipo de documento (por completar)
  const handleTipoDocChange = (tipoDoc) => {
    console.log("Tipo de Documento seleccionado:", tipoDoc);
  };

  // Función para manejar el cambio de ciudad (por completar)
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
        actualizarValor={setLastnames}
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
      <Input 
        titulo="Fecha de Creación" 
        required 
        valor={creationDate} 
        actualizarValor={setCreationDate}
        type="date"
        disabled
      />
      {/* <Input 
        titulo="Fecha de Actualización" 
        required 
        valor={updateDate} 
        actualizarValor={setUpdateDate}
        type="date"
      /> */}
    </div>
  );
}

export default FormEmployes;
