import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-retiro-productos',
  templateUrl: './retiro-productos.component.html',
  styleUrls: ['./retiro-productos.component.css']
})
export class RetiroProductosComponent implements OnInit {

  Productos = [];
  constructor( private router:Router) { }

  ngOnInit() {
    this.CargarProductos();
  }

  CargarProductos()
  {    
  }
}
