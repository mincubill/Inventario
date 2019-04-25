import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service'
import { FormBuilder, NgControlStatus, FormGroup } from '@angular/forms';  

@Component({
  selector: 'app-ingresar-prestamo',
  templateUrl: './ingresar-prestamo.component.html',
  styleUrls: ['./ingresar-prestamo.component.css']
})
export class IngresarPrestamoComponent implements OnInit {

  /*Debjo Crear el formulario para ingresar prestamos utilizando como referencia
    el formulario de agregar producto para de esta manera tomar el rut y tomar 
    la id del producto seleccionado en el select*/
  Productos = [];
  ProductoTemp = {};
  ProductoForm: FormGroup;
  constructor(private data : DataManagerService, private formBuilder: FormBuilder) 
  {

  }

  ngOnInit() {
    this.CargarProductos();
  }

  CargarProductos()
  {
    this.Productos = this.data.ObtenerProductos();
  }

  AgregarPrestamo()
  {
  }
}
