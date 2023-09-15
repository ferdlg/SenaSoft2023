import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, TextField } from '@mui/material';
import './index.css';

const TableEmployes = ({ employes }) => {
  const [id_empleado, setId_empleado] = useState();
  const [numero_documento, setNumero_documento] = useState();
  const [nombres_empleado, setNombres_empleado] = useState();
  const [apellidos_empleado, setApellidos_empleado] = useState();
  const [id_ciudad_fk, setId_ciudad_fk] = useState();
  const [direccion, setDireccion] = useState();
  const [email, setEmail] = useState();
  const [telefono, setTelefono] = useState();
  const [fecha_hora_crear, setFecha_hora_crear] = useState();
  const [tipo_documento, setTipo_documento] = useState();
  const [departamento, setDepartamento] = useState();
  

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

  const openModal = ( 
    option,
    id_empleado,
    numero_documento,
    nombres_empleado,
    apellidos_empleado,
    id_ciudad_fk,
    direccion,
    email,
    telefono,
    fecha_hora_crear,
    tipo_documento,
    departamento
  ) => {
    if(option==1){
      setId_empleado("");
      setNumero_documento("");
      setNombres_empleado("");
      setApellidos_empleado("");
      setId_ciudad_fk("");
      setDireccion("");
      setEmail("");
      setTelefono("");
      setFecha_hora_crear("");
      setTipo_documento("");
      setDepartamento("");
    }else if(option==2){
      setId_empleado(id_empleado);
      setNumero_documento(numero_documento);
      setNombres_empleado(nombres_empleado);
      setApellidos_empleado(apellidos_empleado);
      setId_ciudad_fk(id_ciudad_fk);
      setDireccion(direccion);
      setEmail(email);
      setTelefono(telefono);
      setFecha_hora_crear(fecha_hora_crear);
      setTipo_documento(tipo_documento);
      setDepartamento(departamento);
    }
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
        <Button 
          color='secondary' 
          onClick={() => openModal(
            2, 
            employee.id_empleado, 
            employee.numero_documento, 
            employee.nombres_empleado, 
            employee.apellidos_empleado, 
            employee.id_ciudad_fk, 
            employee.direccion, 
            employee.email, 
            employee.telefono, 
            employee.fecha_hora_crear, 
            employee.tipo_documento.nombre_tipo_documento, 
            employee.departamento.nombre_departamento)
          } data-bs-toggle="modal" 
          data-bs-target="#verEmpleado">
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
    <>
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
      {/* MODAL PARA VISUALIZAR */}
      <div class="modal fade" id="verEmpleado" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Detalles de {nombres_empleado} {apellidos_empleado}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <ul>
                <li hidden>{id_empleado}</li>
                <li><strong className='cl_moradoOscuro'>Tipo de documento: </strong>{tipo_documento}</li>
                <li><strong className='cl_moradoOscuro'>Número de Documento: </strong>{numero_documento}</li>
                <li><strong className='cl_moradoOscuro'>Nombres: </strong>{nombres_empleado}</li>
                <li><strong className='cl_moradoOscuro'>Apellidos: </strong>{apellidos_empleado}</li>
                <li><strong className='cl_moradoOscuro'>Correo: </strong>{email}</li>
                <li><strong className='cl_moradoOscuro'>Departamento</strong>{departamento}</li>
                <li><strong className='cl_moradoOscuro'>Ciudad: </strong>{id_ciudad_fk}</li>
                <li><strong className='cl_moradoOscuro'>Dirección: </strong>{direccion}</li>
                <li><strong className='cl_moradoOscuro'>Teléfono: </strong>{telefono}</li>
                <li><strong className='cl_moradoOscuro'>Fecha de creación: </strong>{fecha_hora_crear}</li>
              </ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableEmployes;
