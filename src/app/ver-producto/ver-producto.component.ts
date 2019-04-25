import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service'

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styleUrls: ['./ver-producto.component.css']
})
export class VerProductoComponent implements OnInit {

  ///Lista con datos duros para probar el ngFor, estos datos deben llegar desde la base de datos
  ///Con una estructura parecida
  Productos = [];
  ProductoTemp = {};
  
  constructor(private data : DataManagerService) 
  {

  }

  ngOnInit() {
    this.CargarProductos();
  }

  CargarProductos()
  {
    this.Productos = this.data.ObtenerProductos();
  }

  EditarProducto(id)
  {
    this.ProductoTemp = this.data.ObtenerProducto(id);
    console.log(this.ProductoTemp);
  }

  QuitarProducto(id)
  {
    this.data.QuitarProducto(id);
    this.CargarProductos();
  }
}