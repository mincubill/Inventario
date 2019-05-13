import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service'
import { FormBuilder, NgControlStatus, FormGroup } from '@angular/forms';  

@Component({
  selector: 'app-ingresar-stock',
  templateUrl: './ingresar-stock.component.html',
  styleUrls: ['./ingresar-stock.component.css']
})
export class IngresarStockComponent implements OnInit {

  Productos = [];
  IngresarStockForm: FormGroup;
  constructor(private data : DataManagerService, private formBuilder: FormBuilder) { 
    this.IngresarStockForm = this.formBuilder.group(
      {
        producto: [''],
        cantidad: [''],
      }
    )
  }

  ngOnInit() {
    this.CargarProductos();
  }

  CargarProductos() {
    this.Productos = this.data.ObtenerProductos();
  }

  
}
