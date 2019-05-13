import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service'
import { FormBuilder, NgControlStatus, FormGroup } from '@angular/forms';  

@Component({
  selector: 'app-sacar-stock',
  templateUrl: './sacar-stock.component.html',
  styleUrls: ['./sacar-stock.component.css']
})
export class SacarStockComponent implements OnInit {

  Productos = [];
  SacarStockForm: FormGroup;
  constructor(private data : DataManagerService, private formBuilder: FormBuilder) { 
    this.SacarStockForm = formBuilder.group(
      {
        producto: [''],
        cantidad: [''],
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

}
