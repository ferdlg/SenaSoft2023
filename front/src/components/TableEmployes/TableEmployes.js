import React, { useState } from 'react';
import "./index.css"

const TableEmployes = ({ employes }) => {
  const [searchFilters, setSearchFilters] = useState({
    nombres: "",
    apellidos: "",
    tipoDocumento: "",
    numeroDocumento: "",
    departamento: ""
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters({
      ...searchFilters,
      [name]: value
    });
  };

  // Filtra los empleados basados en los criterios de búsqueda
const filteredEmployes = employes.filter((employe) => {
  const nombres = employe.Nombres ? employe.Nombres.toLowerCase() : "";
  const apellidos = employe.Apellidos ? employe.Apellidos.toLowerCase() : "";
  const tipoDocumento = employe["Tipo de Documento"] ? employe["Tipo de Documento"].toLowerCase() : "";
  const numeroDocumento = employe["Número Documento"] ? employe["Número Documento"].toLowerCase() : "";
  const departamento = employe.Departamento ? employe.Departamento.toLowerCase() : "";

  const filterNombres = searchFilters.nombres.toLowerCase();
  const filterApellidos = searchFilters.apellidos.toLowerCase();
  const filterTipoDocumento = searchFilters.tipoDocumento.toLowerCase();
  const filterNumeroDocumento = searchFilters.numeroDocumento.toLowerCase();
  const filterDepartamento = searchFilters.departamento.toLowerCase();

  return (
    nombres.includes(filterNombres) &&
    apellidos.includes(filterApellidos) &&
    tipoDocumento.includes(filterTipoDocumento) &&
    numeroDocumento.includes(filterNumeroDocumento) &&
    departamento.includes(filterDepartamento)
  );
});

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">
            <input
              type="text"
              name="nombres"
              value={searchFilters.nombres}
              onChange={handleFilterChange}
              placeholder="Filtrar por Nombres"
            />
          </th>
          <th scope="col">
            <input
              type="text"
              name="apellidos"
              value={searchFilters.apellidos}
              onChange={handleFilterChange}
              placeholder="Filtrar por Apellidos"
            />
          </th>
          <th scope="col">
            <input
              type="text"
              name="tipoDocumento"
              value={searchFilters.tipoDocumento}
              onChange={handleFilterChange}
              placeholder="Filtrar por Tipo de Documento"
            />
          </th>
          <th scope="col">
            <input
              type="text"
              name="numeroDocumento"
              value={searchFilters.numeroDocumento}
              onChange={handleFilterChange}
              placeholder="Filtrar por Número de Documento"
            />
          </th>
          <th scope="col">
            <input
              type="text"
              name="departamento"
              value={searchFilters.departamento}
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
        {filteredEmployes.map((employe, index) => (
          <tr key={index}>
            <td>{employe.Nombres}</td>
            <td>{employe.Apellidos}</td>
            <td>{employe["Tipo de Documento"]}</td>
            <td>{employe["Número Documento"]}</td>
            <td>{employe.Departamento}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableEmployes;
