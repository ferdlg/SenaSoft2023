from django.db import models


class Ciudades(models.Model):
    id_ciudad = models.IntegerField(primary_key=True)
    id_departamento_fk = models.ForeignKey('Departamentos', models.DO_NOTHING, db_column='id_departamento_fk')
    nombre_ciudad = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
         
        db_table = 'ciudades'


class Departamentos(models.Model):
    id_departamento = models.IntegerField(primary_key=True)
    codigo_departamento = models.IntegerField(blank=True, null=True)
    nombre_departamento = models.CharField(max_length=30, blank=True, null=True)
    fecha_hora_crear = models.DateTimeField()
    fecha_hora_modificar = models.DateTimeField()

    class Meta:
         
        db_table = 'departamentos'


class Empleados(models.Model):
    id_empleado = models.AutoField(primary_key=True)
    id_tipo_documento_fk = models.ForeignKey('TipoDocumento', models.DO_NOTHING, db_column='id_tipo_documento_fk')
    numero_documento = models.IntegerField(blank=True, null=True)
    nombres_empleado = models.CharField(max_length=30, blank=True, null=True)
    apellidos_empleado = models.CharField(max_length=50, blank=True, null=True)
    id_departamento_fk = models.ForeignKey(Departamentos, models.DO_NOTHING, db_column='id_departamento_fk')
    id_ciudad_fk = models.ForeignKey(Ciudades, models.DO_NOTHING, db_column='id_ciudad_fk')
    direccion = models.CharField(max_length=50, blank=True, null=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    telefono = models.IntegerField(blank=True, null=True)
    fecha_hora_crear = models.DateTimeField()
    fecha_hora_modificar = models.DateTimeField()

    class Meta:
         
        db_table = 'empleados'


class Roles(models.Model):
    id_rol = models.AutoField(primary_key=True)
    nombre_rol = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
         
        db_table = 'roles'


class TipoDocumento(models.Model):
    id_tipo_documento = models.AutoField(primary_key=True)
    nombre_tipo_documento = models.CharField(max_length=10)

    class Meta:
         
        db_table = 'tipo_documento'
