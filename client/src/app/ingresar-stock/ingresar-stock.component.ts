import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service'
import { FormBuilder, NgControlStatus, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ingresar-stock',
  templateUrl: './ingresar-stock.component.html',
  styleUrls: ['./ingresar-stock.component.css']
})
export class IngresarStockComponent implements OnInit {

  Productos = [];
  IngresarStockForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private http : HttpClient) { 
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
    this.http.post('', {
      //Cambiar el storage
      storage: 1
    }).subscribe( ( res : any[] ) => {
      this.Productos = res;
    },
    ( error ) => {
      console.log( error );
    });
  }

  AgregarStock() {
    this.http.post('http://127.0.0.1:3000/updateStockProduct', {
      id: this.IngresarStockForm.controls.producto.value,
      stock: this.IngresarStockForm.controls.cantidad.value
    }).subscribe( ( res : any ) => {
      if(+res == 1)
        alert('Actualizado correctamente');
    },
    ( error ) => {
      console.log(error);
    });
  }
    
}
