import React, { useState, useEffect } from 'react';
import { TextField, InputLabel, MenuItem, Select, FormControl} from '@mui/material';
import ApiService from '../../../../services/ApiService';
import Title from "../../../../components/Title";
import "./NewEmployee.css"

const NewEmployee = () => {
    const tipoDocOptions = [
        { id: "CC", name: "Cédula de Ciudadania" },
        { id: "TI", name: "Tarjeta de Identidad" },
        { id: "RC", name: "Registro Civil" },
        { id: "CE", name: "Cédula de Extranjería" }
    ];

    const [inputs, setInputs] = useState({
        id_tipo_documento_fk: "CC",
        numero_documento: "",
        nombres_empleado: "",
        apellidos_empleado: "",
        id_departamento_fk: "",
        id_ciudad_fk: "",
        direccion: "",
        email: "",
        telefono: "",
    })
    const [departamentos, setDepartamentos] = useState([]);
    const [ciudades, setCiudades] = useState([]);

    

    // Función para cargar los departamentos al cargar el componente
    useEffect(() => {
        ApiService.getDepartments()
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
        ApiService.getCitiesByDepartmentId(departamento)
        .then((data) => {
            setCiudades(data);
        })
        .catch((error) => {
            console.error("Error al cargar ciudades:", error);
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        for (const key in inputs) {
            if (inputs.hasOwnProperty(key)) {
                const value = inputs[key];
                console.log(`${key}: ${value}`);
            }
        }
    };
    

    return (
        <form className="NewEmployee" onSubmit={handleSubmit}>
            <Title text="Nuevo empleado" />
            <div className="inputGroup">
                <FormControl className='select'>
                    <InputLabel id="tipoDocLabel" color='secondary'>Tipo de Documento</InputLabel>
                    <Select
                        labelId="tipoDocLabel"
                        name="id_tipo_documento_fk"
                        value={inputs.id_tipo_documento_fk}
                        onChange={handleChange}
                        autoWidth
                        label="Tipo de Documento"
                        color='secondary'
                        size='small'
                    >
                        {tipoDocOptions.map((option, index) => (
                            <MenuItem key={index} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    size="small"
                    name="numero_documento"
                    label="Número de Documento"
                    required
                    value={inputs.numero_documento}
                    onChange={handleChange}
                    error={!inputs.numero_documento}
                    helperText={!inputs.numero_documento ? 'Ingrese un número de documento' : ''}
                    inputProps={{ maxLength: 10 }}
                    color="secondary"
                    type='number'
                />
                <TextField
                    size="small"
                    name="nombres_empleado"
                    label="Nombres"
                    required
                    value={inputs.nombres_empleado}
                    onChange={handleChange}
                    error={!inputs.nombres_empleado}
                    helperText={!inputs.nombres_empleado ? 'Ingrese un nombre' : ''}
                    inputProps={{ maxLength: 30 }}
                    color="secondary"
                />
                
                <TextField
                    size="small"
                    name="apellidos_empleado"
                    label="apellidos_empleado"
                    required
                    value={inputs.user}
                    onChange={(e)=>{
                        const {name, value} = e.target;
                        setInputs({
                            ...inputs,
                            [name]: value
                        })
                    }}
                    error={!inputs.apellidos_empleado}
                    helperText={
                        !inputs.apellidos_empleado ? 'Ingrese un usuario' : ''
                    }
                    inputProps={{ maxLength: 50 }}
                    color="secondary" 
                />
                <FormControl className='select'>
                    <InputLabel id="departamentoLabel" color='secondary'>Departamento</InputLabel>
                    <Select
                        labelId="departamentoLabel"
                        name="id_departamento_fk"
                        value={inputs.id_departamento_fk}
                        onChange={handleChange}
                        autoWidth
                        label="Departamento"
                        color='secondary'
                        size='small'
                        onBlur={() => handleDepartamentoChange(inputs.id_departamento_fk)}
                    >
                        {departamentos.map((option, index) => (
                            <MenuItem key={index} value={option.id}>
                                {option.Departamento}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl className='select'>
                    <InputLabel id="ciudadLabel" color='secondary'>Ciudad</InputLabel>
                    <Select
                        labelId="ciudadLabel"
                        name="id_ciudad_fk"
                        value={inputs.id_ciudad_fk}
                        onChange={handleChange}
                        autoWidth
                        label="Ciudad"
                        color='secondary'
                        size='small'
                    >
                        {ciudades.map((option, index) => (
                            <MenuItem key={index} value={option.id_ciudad}>
                                {option.nombre_ciudad}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    size="small"
                    name="direccion"
                    label="direccion"
                    required
                    value={inputs.direccion}
                    onChange={(e)=>{
                        const {name, value} = e.target;
                        setInputs({
                            ...inputs,
                            [name]: value
                        })
                    }}
                    error={!inputs.direccion}
                    helperText={
                        !inputs.direccion ? 'Ingrese un la dirección' : ''
                    }
                    inputProps={{ maxLength: 50 }}
                    color="secondary" 
                />
                <TextField
                    size="small"
                    name="email"
                    label="email"
                    required
                    value={inputs.email}
                    onChange={(e)=>{
                        const {name, value} = e.target;
                        setInputs({
                            ...inputs,
                            [name]: value
                        })
                    }}
                    error={!inputs.email}
                    helperText={
                        !inputs.email ? 'Ingrese un correo electrónico' : ''
                    }
                    inputProps={{ maxLength: 50 }}
                    color="secondary" 
                    type='email'
                />
                <TextField
                    size="small"
                    name="telefono"
                    label="telefono"
                    required
                    value={inputs.telefono}
                    onChange={(e)=>{
                        const {name, value} = e.target;
                        setInputs({
                            ...inputs,
                            [name]: value
                        })
                    }}
                    error={!inputs.telefono}
                    helperText={
                        !inputs.telefono ? 'Ingrese un teléfono' : ''
                    }
                    inputProps={{ maxLength: 10 }}
                    type='number'
                    color="secondary" 
                />
            </div>
        </form>
    );
}

export default NewEmployee;
