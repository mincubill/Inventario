import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgControlStatus, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sacar-stock',
  templateUrl: './sacar-stock.component.html',
  styleUrls: ['./sacar-stock.component.css']
})
export class SacarStockComponent implements OnInit {

  SacarStockForm : FormGroup;
  Productos = [];

  constructor(private formBuilder: FormBuilder, private http : HttpClient) { 
    this.SacarStockForm = this.formBuilder.group({
      producto: [''],
      cantidad: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.CargarProductos();
  }

  CargarProductos() {
    this.http.post('http://127.0.0.1:3000/getProductsByStorage', {
      storage: 1
    }).subscribe( ( res : any[] ) => {
      this.Productos = res;
      this.SacarStockForm.controls.producto.setValue(this.Productos[0].ID);
      this.ProductChanged(this.Productos[0].ID);
    },
    ( error ) => {
      console.log( error );
    });
  }

  SacarProducto () {
    if(!this.SacarStockForm.invalid) {
      this.http.post('http://127.0.0.1:3000/updateStockProduct', {
        id: this.SacarStockForm.controls.producto.value,
        stock: this.SacarStockForm.controls.cantidad.value
      }).subscribe( ( res : any ) => {
        alert('Actualizado correctamente');
      },
      ( error ) => {
        console.log(error);
      });
    } 
  };



  ProductChanged (e) {
    this.Productos.forEach( p => {
      if ( p.ID == e) {
        this.SacarStockForm.controls.cantidad.setValue(p.STOCK);
      }
    });
  } 
};