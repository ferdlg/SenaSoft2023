import React, { useState } from 'react';
import "./index.css"

const TableEmployes = ({ employes }) => {
  
  // Estado local para los filtros de busqueda
  const [searchFilters, setSearchFilters] = useState({
    nombres_empleado: "",
    apellidos_empleado: "",
    id_tipo_documento_fk_id: "",
    numero_documento: "",
    id_departamento_fk_id: ""
  });

  // Manejar los cambios en los campos de busqueda
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    // actualiza el estado searchFilters con el nuevo valor, manteniendo los valores anteriores intactos.
    setSearchFilters({
      ...searchFilters,
      [name]: value
    });
  };






  // Filtra los empleados basados en los criterios de búsqueda
const filteredEmployes = employes.filter((employe) => {
  // Se convierte a minúscula la información de cada empleado para que se pueda realizar la busqueda sin sensibilidad a Mayúsculas/Minúsculas
  // Si no existe se deja vacio
  const nombres_empleado = employe.nombres_empleado ? employe.nombres_empleado.toLowerCase() : "";
  const apellidos_empleado = employe.apellidos_empleado ? employe.apellidos_empleado.toLowerCase() : "";
  const id_tipo_documento_fk_id = employe.id_tipo_documento_fk_id ? employe.id_tipo_documento_fk_id : "";
  const numero_documento = employe.numero_documento ? employe.numero_documento : "";
  const id_departamento_fk_id = employe.id_departamento_fk_id ? employe.id_departamento_fk_id : "";

  // Se hace lo mismo con el texto ingresado en los filtros
  const filter_nombres_empleado = searchFilters.nombres_empleado.toLowerCase();
  const filter_apellidos_empleado = searchFilters.apellidos_empleado.toLowerCase();
  const filter_id_tipo_documento_fk_id = searchFilters.id_tipo_documento_fk_id;
  const filter_numero_documento = searchFilters.numero_documento;
  const filter_id_departamento_fk_id = searchFilters.id_departamento_fk_id;

  return (
    // Se retorna siempre y cuando se cumplan todas las busquedas
    nombres_empleado.includes(filter_nombres_empleado) &&
    apellidos_empleado.includes(filter_apellidos_empleado) &&
    id_tipo_documento_fk_id.includes(filter_id_tipo_documento_fk_id) &&
    numero_documento.includes(filter_numero_documento) &&
    id_departamento_fk_id.includes(filter_id_departamento_fk_id)
  );
});

return (
  <table className="TableEmployes table table-hover">
    <thead>
      <tr>
        <th scope="col">
          <input
            type="text"
            name="Nombres"
            value={searchFilters.nombres_empleado}
            onChange={handleFilterChange}
            placeholder="Filtrar por Nombres"
          />
        </th>
        <th scope="col">
          <input
            type="text"
            name="Apellidos"
            value={searchFilters.apellidos_empleado}
            onChange={handleFilterChange}
            placeholder="Filtrar por Apellidos"
          />
        </th>
        <th scope="col">
          <input
            type="text"
            name="TipoDoc"
            value={searchFilters.id_tipo_documento_fk_id}
            onChange={handleFilterChange}
            placeholder="Filtrar por Tipo de Documento"
          />
        </th>
        <th scope="col">
          <input
            type="text"
            name="NumDoc"
            value={searchFilters.numero_documento}
            onChange={handleFilterChange}
            placeholder="Filtrar por Número de Documento"
          />
        </th>
        <th scope="col">
          <input
            type="text"
            name="Departamento"
            value={searchFilters.id_departamento_fk_id}
            onChange={handleFilterChange}
            placeholder="Filtrar por Departamento"
          />
        </th>
      </tr>
    </thead>
    <thead>
      <tr>
        <th scope="col">Nombres</th>
        <th scope="col">Apellidos</th>
        <th scope="col">Tipo Documento</th>
        <th scope="col"># Documento</th>
        <th scope="col">Departamento</th>
      </tr>
    </thead>
    <tbody>
      {employes.map((employe, index) => (
        <tr key={index}>
          <td>{employe.nombres_empleado}</td>
          <td>{employe.apellidos_empleado}</td>
          <td>{employe.id_tipo_documento_fk_id}</td>
          <td>{employe.numero_documento}</td>
          <td>{employe.id_departamento_fk_id}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

}

export default TableEmployes;
