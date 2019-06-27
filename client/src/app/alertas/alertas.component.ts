import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  Morosos = [];
  Productos = [];
  Cuenta = 0;
  CuentaProductos = 0;
  TipoUsuario = "";
  constructor(private router : Router, private http : HttpClient) { }

  ngOnInit() {
    
    this.TipoUsuario = localStorage.getItem('type');
    if(this.TipoUsuario == "3"){
      this.ProductosStockBajoAdmin();
      this.cargarMorosos();
    }
    else{
      this.ProductosStockBajoPorBodega(this.TipoUsuario);
    }
  }

  cargarMorosos(){
    this.http.get('http://127.0.0.1:3000/getMovementHeaderWithDebtTop3')
    .subscribe( ( res : any[] ) => {
      this.Morosos = res;   
      this.Cuenta = this.Morosos.length;     
    },
    ( error ) => {
      console.log( error );
    });
  }

  ProductosStockBajoAdmin(){
    this.http.get('http://127.0.0.1:3000/getProductsWithLowStock')
    .subscribe( ( res : any[] ) => {
      this.Productos = res;   
      this.CuentaProductos = this.Productos.length;
    },
    ( error ) => {
      console.log( error );
    });
    
  }

  ProductosStockBajoPorBodega(tipoUsuario: string){
    let storage = 0;
    if ( tipoUsuario == "4" ){
      storage = 1;
      this.cargarMorosos();

    }
    else if ( tipoUsuario == "5"){
      storage = 2;
      this.cargarMorosos();
    }
    else{
      return;
    }
    this.http.post('http://127.0.0.1:3000/getProductsWithLowStockByStorage', {
      storage: storage
    })
    .subscribe( ( res : any[] ) => {
      this.Productos = res;   
      this.CuentaProductos = this.Productos.length;     
    },
    ( error ) => {
      console.log( error );
    });
  }
}
