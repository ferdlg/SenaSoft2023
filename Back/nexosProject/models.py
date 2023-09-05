# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Departamentos(models.Model):
    id_departamento = models.AutoField(primary_key=True)
    codigo_departamento = models.IntegerField(blank=True, null=True)
    nombre_departamento = models.CharField(max_length=30, blank=True, null=True)
    fecha_hora_crear = models.DateTimeField(blank=True, null=True)
    fecha_hora_modificar = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'departamentos'


class Empleados(models.Model):
    id_empleado = models.AutoField(primary_key=True)
    tipo_documento_fk = models.ForeignKey('TipoDocumento', models.DO_NOTHING, db_column='tipo_documento_fk', blank=True, null=True)
    numero_documento = models.IntegerField(blank=True, null=True)
    nombres_empleado = models.CharField(max_length=30, blank=True, null=True)
    apellidos_empleado = models.CharField(max_length=50, blank=True, null=True)
    id_departamento_fk = models.ForeignKey(Departamentos, models.DO_NOTHING, db_column='id_departamento_fk', blank=True, null=True)
    ciudad = models.CharField(max_length=20, blank=True, null=True)
    direccion = models.CharField(max_length=20, blank=True, null=True)
    email = models.CharField(max_length=50, blank=True, null=True)
    telefono = models.IntegerField(blank=True, null=True)
    fecha_hora_crear = models.DateTimeField(blank=True, null=True)
    fecha_hora_modificar = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'empleados'


class TipoDocumento(models.Model):
    tipo_documento = models.CharField(primary_key=True, max_length=2)

    class Meta:
        managed = False
        db_table = 'tipo_documento'
