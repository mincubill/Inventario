import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgControlStatus, FormGroup } from '@angular/forms';
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
      cantidad: ['']
    });
  }

  ngOnInit() {
    this.CargarProductos();
  }

  CargarProductos() {
    this.http.post('', {

    }).subscribe( () => {

    },
    ( error ) => {
      console.log( error );
    });
  }

  SacarProducto () {
    
  }
}