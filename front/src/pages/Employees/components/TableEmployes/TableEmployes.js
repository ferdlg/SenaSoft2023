import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, TextField } from '@mui/material';
import './index.css';

const TableEmployes = ({ employes }) => {
  const [searchFilters, setSearchFilters] = useState({
    nombres_empleado: '',
    apellidos_empleado: '',
    tipo_documento: '',
    numero_documento: '',
    departamento: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters({
      ...searchFilters,
      [name]: value,
    });
  };

  const filteredEmployes = employes.filter((employe) => {
    const Nombres = employe.nombres_empleado ? employe.nombres_empleado.toLowerCase() : '';
    const Apellidos = employe.apellidos_empleado ? employe.apellidos_empleado.toLowerCase() : '';
    const TipoDoc = employe.tipo_documento?.nombre_tipo_documento ? employe.tipo_documento.nombre_tipo_documento.toLowerCase() : '';
    const NumDoc = employe.numero_documento ? employe.numero_documento.toString().toLowerCase() : '';
    const Departamento = employe.departamento?.nombre_departamento ? employe.departamento.nombre_departamento.toLowerCase() : '';
    
    const filter_Nombres = searchFilters.nombres_empleado.toLowerCase();
    const filter_Apellidos = searchFilters.apellidos_empleado.toLowerCase();
    const filter_TipoDoc = searchFilters.tipo_documento.toLowerCase();
    const filter_NumDoc = searchFilters.numero_documento.toLowerCase();
    const filter_Departamento = searchFilters.departamento.toLowerCase();

    return (
      Nombres.includes(filter_Nombres) &&
      Apellidos.includes(filter_Apellidos) &&
      TipoDoc.includes(filter_TipoDoc) &&
      NumDoc.includes(filter_NumDoc) &&
      Departamento.includes(filter_Departamento)
    );
  });

  const handleEditEmployee = (employeeId) => {
    console.log(`Editar empleado con ID ${employeeId}`);
  };

  const handleViewEmployee = (employeeId) => {
    console.log(`Ver detalles del empleado con ID ${employeeId}`);
  };

  const handleDeleteEmployee = (employeeId) => {
    console.log(`Eliminar empleado con ID ${employeeId}`);
  };

  const columns = [
    { id: 'nombres_empleado', label: 'Nombres', minWidth: 100, align: 'center' },
    { id: 'apellidos_empleado', label: 'Apellidos', minWidth: 170, align: 'center' },
    { id: 'tipo_documento', label: 'Tipo Documento', minWidth: 170, align: 'center' },
    { id: 'numero_documento', label: '# Documento', minWidth: 170, align: 'center' },
    { id: 'departamento', label: 'Departamento', minWidth: 170, align: 'center' },
    { id: 'Acciones', label: 'Acciones', minWidth: 100, align: 'center' },
  ];

  const rows = filteredEmployes.map((employee) => ({
    ...employee,
    tipo_documento: employee.tipo_documento?.nombre_tipo_documento,
    departamento: employee.departamento?.nombre_departamento,
    Acciones: (
      <div className='OpcionesTable'>
        <Button color='secondary' onClick={() => handleEditEmployee(employee.id_empleado)}>
          Editar
        </Button>
        <Button color='secondary' onClick={() => handleViewEmployee(employee.id_empleado)}>
          Ver
        </Button>
        <Button color='secondary' onClick={() => handleDeleteEmployee(employee.id_empleado)}>
          Eliminar
        </Button>
      </div>
    ),
  }));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 360 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} className='tableHead'>
                  <div className="tableHead">
                    <strong className='cl_moradoOscuro'>{column.label}</strong>
                    {column.id !== 'Acciones' ? (
                    <input
                      type="text"
                      name={column.id}
                      value={searchFilters[column.id]}
                      onChange={handleFilterChange}
                      placeholder="Buscar"
                      className='inputSearch border_moradoOscuro'
                    />
                    ) : null}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id_empleado}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableEmployes;
