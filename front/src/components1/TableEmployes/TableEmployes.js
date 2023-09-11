import React, { useState } from 'react';
import "./index.css"

const TableEmployes = ({ employes }) => {

  // Estado local para los filtros de busqueda
  const [searchFilters, setSearchFilters] = useState({
    Nombres: "",
    Apellidos: "",
    TipoDoc: "",
    NumDoc: "",
    Departamento: ""
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
  const Nombres = employe.Nombres ? employe.Nombres.toLowerCase() : "";
  const Apellidos = employe.Apellidos ? employe.Apellidos.toLowerCase() : "";
  const TipoDoc = employe.TipoDoc ? employe.TipoDoc.toLowerCase() : "";
  const NumDoc = employe.NumDoc ? employe.NumDoc.toLowerCase() : "";
  const Departamento = employe.Departamento ? employe.Departamento.toLowerCase() : "";

  // Se hace lo mismo con el texto ingresado en los filtros
  const filterNombres = searchFilters.Nombres.toLowerCase();
  const filterApellidos = searchFilters.Apellidos.toLowerCase();
  const filterTipoDoc = searchFilters.TipoDoc.toLowerCase();
  const filterNumDoc = searchFilters.NumDoc.toLowerCase();
  const filterDepartamento = searchFilters.Departamento.toLowerCase();

  return (
    // Se retorna siempre y cuando se cumplan todas las busquedas
    Nombres.includes(filterNombres) &&
    Apellidos.includes(filterApellidos) &&
    TipoDoc.includes(filterTipoDoc) &&
    NumDoc.includes(filterNumDoc) &&
    Departamento.includes(filterDepartamento)
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
            value={searchFilters.Nombres}
            onChange={handleFilterChange}
            placeholder="Filtrar por Nombres"
          />
        </th>
        <th scope="col">
          <input
            type="text"
            name="Apellidos"
            value={searchFilters.Apellidos}
            onChange={handleFilterChange}
            placeholder="Filtrar por Apellidos"
          />
        </th>
        <th scope="col">
          <input
            type="text"
            name="TipoDoc"
            value={searchFilters.TipoDoc}
            onChange={handleFilterChange}
            placeholder="Filtrar por Tipo de Documento"
          />
        </th>
        <th scope="col">
          <input
            type="text"
            name="NumDoc"
            value={searchFilters.NumDoc}
            onChange={handleFilterChange}
            placeholder="Filtrar por Número de Documento"
          />
        </th>
        <th scope="col">
          <input
            type="text"
            name="Departamento"
            value={searchFilters.Departamento}
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
          <td>{employe.TipoDoc}</td>
          <td>{employe.NumDoc}</td>
          <td>{employe.Departamento}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

}

export default TableEmployes;
