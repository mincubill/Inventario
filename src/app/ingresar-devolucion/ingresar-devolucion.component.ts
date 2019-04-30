import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service'
import { FormBuilder, NgControlStatus, FormGroup } from '@angular/forms';  

@Component({
  selector: 'app-ingresar-devolucion',
  templateUrl: './ingresar-devolucion.component.html',
  styleUrls: ['./ingresar-devolucion.component.css']
})
export class IngresarDevolucionComponent implements OnInit {

  Productos = [];
  IngresarDevolucionForm : FormGroup;

  constructor(private data : DataManagerService, private formBuilder: FormBuilder) { 
    this.IngresarDevolucionForm = formBuilder.group(
      {
        rut: [''],
        producto: ['']
      }
    );
  }

  ngOnInit() {
    this.CargarProductos();
  }

  CargarProductos() {
    this.Productos = this.data.ObtenerProductos();
  }

}
