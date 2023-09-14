import React, { useState } from 'react';
import "./index.css"

const TableEmployes = ({ employes }) => {
  

return (
  <table className="Tableemployes table table-hover">

    <tbody>
      {employes.map((employe, index) => (
        <tr key={index}>
          <td>{employe.nombres_empleado}</td>
          <td>{employe.apellidos_empleado}</td>
          <td>{employe.tipo_documento.nombre_tipo_documento}</td>
          <td>{employe.numero_documento}</td>
          <td>{employe.departamento.nombre_departamento}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

}

export default TableEmployes;
