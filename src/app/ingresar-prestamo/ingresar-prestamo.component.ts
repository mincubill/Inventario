import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service'
import { FormBuilder, NgControlStatus, FormGroup } from '@angular/forms';  

@Component({
  selector: 'app-ingresar-prestamo',
  templateUrl: './ingresar-prestamo.component.html',
  styleUrls: ['./ingresar-prestamo.component.css']
})
export class IngresarPrestamoComponent implements OnInit {

  
  Productos = [];
  PrestamoForm: FormGroup;
  constructor(private data : DataManagerService, private formBuilder: FormBuilder) 
  {
    this.PrestamoForm = this.formBuilder.group(
      {
        rut: [''],
        producto: ['']
      }
    );
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
    this.data.AgregarPrestamo(
    {
      id: 1,
      rut: this.PrestamoForm.controls.rut.value,
      producto: this.PrestamoForm.controls.producto.value,
      cantidad: 1,
    });
  }
}
