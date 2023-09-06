from django.db import models

# Create your models here.

class Ciudades(models.Model):
    id_ciudad = models.AutoField(primary_key=True)
    id_departamento_fk = models.ForeignKey('Departamentos', models.DO_NOTHING, db_column='id_departamento_fk', blank=True, null=True)
    nombre_ciudad = models.CharField(max_length=30, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ciudades'


class Departamentos(models.Model):
    id_departamento = models.AutoField(primary_key=True)
    codigo_departamento = models.IntegerField(blank=True, null=True)
    nombre_departamento = models.CharField(max_length=30, blank=True, null=True)
    fecha_hora_crear = models.DateTimeField(auto_now_add=True)
    fecha_hora_modificar = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'departamentos'

class Empleados(models.Model):
    id_empleado = models.AutoField(primary_key=True)
    tipo_documento_fk = models.ForeignKey('TipoDocumento', models.DO_NOTHING, db_column='tipo_documento_fk')
    numero_documento = models.IntegerField(blank=True, null=True)
    nombres_empleado = models.CharField(max_length=30, blank=True, null=True)
    apellidos_empleado = models.CharField(max_length=50, blank=True, null=True)
    id_departamento_fk = models.ForeignKey(Departamentos, models.DO_NOTHING, db_column='id_departamento_fk')
    id_ciudad_fk = models.ForeignKey(Ciudades, models.DO_NOTHING, db_column='id_ciudad_fk', blank=True, null=True)
    direccion = models.CharField(max_length=20, blank=True, null=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    telefono = models.IntegerField(blank=True, null=True)
    fecha_hora_crear = models.DateTimeField(auto_now_add=True)
    fecha_hora_modificar = models.DateTimeField(auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'empleados'


class TipoDocumento(models.Model):
    tipo_documento = models.CharField(primary_key=True, max_length=2)

    class Meta:
        managed = False
        db_table = 'tipo_documento'

