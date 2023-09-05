import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import FormEmployes from '../FormEmployes/FormEmployes';
import TableEmployes from "../TableEmployes/TableEmployes";
import "./index.css"

const Employes = () =>{
  const empleados = [
    {
      "Tipo de Documento": "CC",
      "Número Documento": "12345",
      "Nombres": "Juan",
      "Apellidos": "Pérez",
      "Departamento": "Antioquia",
      "Ciudad": "Medellín",
      "Dirección": "Calle 123",
      "Correo Electrónico": "juan.perez@example.com",
      "Teléfono de Contacto": "123456789",
      "Fecha de Creación": "2023-09-04",
      "Fecha de Actualización": ""
    },
    {
      "Tipo de Documento": "TI",
      "Número Documento": "67890",
      "Nombres": "María",
      "Apellidos": "Gómez",
      "Departamento": "Bogotá",
      "Ciudad": "Bogotá",
      "Dirección": "Avenida 456",
      "Correo Electrónico": "maria.gomez@example.com",
      "Teléfono de Contacto": "987654321",
      "Fecha de Creación": "2023-09-04",
      "Fecha de Actualización": ""
    },
    {
      "Tipo de Documento": "RC",
      "Número Documento": "54321",
      "Nombres": "Pedro",
      "Apellidos": "López",
      "Departamento": "Valle del Cauca",
      "Ciudad": "Cali",
      "Dirección": "Carrera 789",
      "Correo Electrónico": "pedro.lopez@example.com",
      "Teléfono de Contacto": "456789123",
      "Fecha de Creación": "2023-09-04",
      "Fecha de Actualización": ""
    },
    {
      "Tipo de Documento": "CE",
      "Número Documento": "98765",
      "Nombres": "Laura",
      "Apellidos": "Rodríguez",
      "Departamento": "Atlántico",
      "Ciudad": "Barranquilla",
      "Dirección": "Diagonal 101",
      "Correo Electrónico": "laura.rodriguez@example.com",
      "Teléfono de Contacto": "321654987",
      "Fecha de Creación": "2023-09-04",
      "Fecha de Actualización": ""
    },
    {
      "Tipo de Documento": "CC",
      "Número Documento": "24680",
      "Nombres": "Carlos",
      "Apellidos": "Sánchez",
      "Departamento": "Cundinamarca",
      "Ciudad": "Bogotá",
      "Dirección": "Calle 678",
      "Correo Electrónico": "carlos.sanchez@example.com",
      "Teléfono de Contacto": "789123456",
      "Fecha de Creación": "2023-09-04",
      "Fecha de Actualización": ""
    },
    {
      "Tipo de Documento": "TI",
      "Número Documento": "13579",
      "Nombres": "Isabel",
      "Apellidos": "Martínez",
      "Departamento": "Antioquia",
      "Ciudad": "Medellín",
      "Dirección": "Avenida 246",
      "Correo Electrónico": "isabel.martinez@example.com",
      "Teléfono de Contacto": "987654321",
      "Fecha de Creación": "2023-09-04",
      "Fecha de Actualización": ""
    },
    {
      "Tipo de Documento": "RC",
      "Número Documento": "86420",
      "Nombres": "Luis",
      "Apellidos": "García",
      "Departamento": "Valle del Cauca",
      "Ciudad": "Cali",
      "Dirección": "Carrera 135",
      "Correo Electrónico": "luis.garcia@example.com",
      "Teléfono de Contacto": "456789123",
      "Fecha de Creación": "2023-09-04",
      "Fecha de Actualización": ""
    },
    {
      "Tipo de Documento": "CE",
      "Número Documento": "98765",
      "Nombres": "Ana",
      "Apellidos": "Pérez",
      "Departamento": "Atlántico",
      "Ciudad": "Barranquilla",
      "Dirección": "Diagonal 202",
      "Correo Electrónico": "ana.perez@example.com",
      "Teléfono de Contacto": "321654987",
      "Fecha de Creación": "2023-09-04",
      "Fecha de Actualización": ""
    },
    {
      "Tipo de Documento": "CC",
      "Número Documento": "12345",
      "Nombres": "David",
      "Apellidos": "Fernández",
      "Departamento": "Cundinamarca",
      "Ciudad": "Bogotá",
      "Dirección": "Calle 789",
      "Correo Electrónico": "david.fernandez@example.com",
      "Teléfono de Contacto": "789123456",
      "Fecha de Creación": "2023-09-04",
      "Fecha de Actualización": ""
    },
    {
      "Tipo de Documento": "TI",
      "Número Documento": "67890",
      "Nombres": "Carmen",
      "Apellidos": "Gómez",
      "Departamento": "Antioquia",
      "Ciudad": "Medellín",
      "Dirección": "Avenida 369",
      "Correo Electrónico": "carmen.gomez@example.com",
      "Teléfono de Contacto": "987654321",
      "Fecha de Creación": "2023-09-04",
      "Fecha de Actualización": ""
    },
    {
      "Tipo de Documento": "RC",
      "Número Documento": "54321",
      "Nombres": "Miguel",
      "Apellidos": "López",
      "Departamento": "Valle del Cauca",
      "Ciudad": "Cali",
      "Dirección": "Carrera 147",
      "Correo Electrónico": "miguel.lopez@example.com",
      "Teléfono de Contacto": "456789123",
      "Fecha de Creación": "2023-09-04",
      "Fecha de Actualización": ""
    },
    {
      "Tipo de Documento": "CE",
      "Número Documento": "98765",
      "Nombres": "Elena",
      "Apellidos": "Rodríguez",
      "Departamento": "Atlántico",
      "Ciudad": "Barranquilla",
      "Dirección": "Diagonal 303",
      "Correo Electrónico": "elena.rodriguez@example.com",
      "Teléfono de Contacto": "321654987",
      "Fecha de Creación": "2023-09-04",
      "Fecha de Actualización": ""
    },
    {
      "Tipo de Documento": "CC",
      "Número Documento": "24680",
      "Nombres": "José",
      "Apellidos": "Sánchez",
      "Departamento": "Cundinamarca",
      "Ciudad": "Bogotá",
      "Dirección": "Calle 896",
      "Correo Electrónico": "jose.sanchez@example.com",
      "Teléfono de Contacto": "789123456",
      "Fecha de Creación": "2023-09-04",
      "Fecha de Actualización": ""
    },
    {
      "Tipo de Documento": "TI",
      "Número Documento": "13579",
      "Nombres": "Mónica",
      "Apellidos": "Martínez",
      "Departamento": "Antioquia",
      "Ciudad": "Medellín",
      "Dirección": "Avenida 456",
      "Correo Electrónico": "monica.martinez@example.com",
      "Teléfono de Contacto": "987654321",
      "Fecha de Creación": "2023-09-04",
      "Fecha de Actualización": ""
    }
  ]
  
    return <div className="DivEmployes">
        <div className="EmployesTitle">
          <h1>Empleados</h1>
          <Button data-bs-toggle="modal" data-bs-target="#staticBackdrop">Nuevo Empleado +</Button>
        </div>
        <Modal title="Nuevo Empleado" optionName="Agregar Empleado">
          <FormEmployes/>
        </Modal>
        <TableEmployes employes={empleados} />
    </div>
}   

export default Employes;