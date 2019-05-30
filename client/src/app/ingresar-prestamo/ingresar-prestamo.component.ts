import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { FormBuilder, NgControlStatus, FormGroup } from '@angular/forms'; 
import { PopupComponent, PopupModel } from '../popup/popup.component';
import { HttpClient } from '@angular/common/http';
import { TimeoutError } from 'rxjs';


@Component({
  selector: 'app-ingresar-prestamo',
  templateUrl: './ingresar-prestamo.component.html',
  styleUrls: ['./ingresar-prestamo.component.css']
})
export class IngresarPrestamoComponent implements OnInit {

  
  Productos = [];
  ProductosPrestamos = [];
  agregado : boolean;
  error : boolean;
  user : any;
  PrestamoForm: FormGroup;

  constructor(private formBuilder : FormBuilder , public dialog : MatDialog, private http : HttpClient) 
  {
    this.PrestamoForm = this.formBuilder.group(
      {
        rut: [''],
        nombre: [''],
        apellido: [''],
        correo: ['']
      }
    );
  }

  ngOnInit() {
    this.CargarProductos();
  }

  ///Funcion que carga los productos desde la base de datos
  CargarProductos()
  {
    this.http.post('http://127.0.0.1:3000/getProductsByStorageStats', {
      //Cambiar storage
      storage: 1
    }).subscribe( (res : any[] ) => {
      this.Productos = res;
      this.EliminarNull(this.Productos);
    } 
    , ( error ) => {
      console.log( error );
    });
  }

  ///Funcion que agrega 1 producto que llega por parametros a la lista de productos del inventario
  ///Y la elimina de la lista de productos del pedido (No lo agrega a la base de datos)
  AgregarProducto(Producto) {
    this.Productos.push(Producto);
    this.EliminarProductoPedido(Producto);
  }

  ///Funcion que agrega 1 producto que llega por parametros a la lista de productos a prestar
  //Y la elimina de la lista de productos del inventario
  AgregarProductoPedido(Producto) {
    this.ProductosPrestamos.push(Producto);
    this.EliminarProducto(Producto);
  }

  ///Con indexOf consigue el index del producto que llega por parametros y con el .splice lo elimina 
  ///de la lista de productos para el pedido
  EliminarProductoPedido(Producto) {
    this.ProductosPrestamos.splice(this.ProductosPrestamos.indexOf(Producto), 1);
  }

  ///Con indexOf consigue el index del producto que llega por parametros y con el .splice lo elimina
  ///de la lista de productos del inventario (No lo elimina de la base de datos)
  EliminarProducto(Producto) {
    this.Productos.splice(this.Productos.indexOf(Producto), 1);
  }


  ///Ingresa el prestamo a la base de datos
  AgregarPrestamo() {
    //Agregar prestamo a la base de datos
  }

  EliminarNull(productos) {
    productos.forEach( p => {
      p.BORROWED = p.BORROWED != null ? p.BORROWED : 0;
    });
  }
}
