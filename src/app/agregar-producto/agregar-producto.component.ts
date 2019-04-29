import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service'
import { FormBuilder, NgControlStatus, FormGroup } from '@angular/forms';  

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  ///Objeto temporal para almacenar los datos de los txt que estan en 
  ProductoTemp = 
  {
    nombre: "",
    descripcion: "",
    categoria: "",
    total: 0,
  }
  ProductoForm: FormGroup;
  constructor(private data : DataManagerService, private formBuilder: FormBuilder) 
  { 
    this.ProductoForm = this.formBuilder.group(
      {
        nombre: [''],
        descripcion: [''],
        categoria: [''],
        total: [''],
      }
    )
  }

  ngOnInit() 
  {
    
  }

  AgregarProducto()
  {
    this.ProductoTemp.nombre = this.ProductoForm.controls.nombre.value;
    this.ProductoTemp.descripcion = this.ProductoForm.controls.descripcion.value;
    this.ProductoTemp.categoria = this.ProductoForm.controls.categoria.value;
    this.ProductoTemp.total = this.ProductoForm.controls.total.value;
    this.data.AgregarProducto(this.ProductoTemp);
  }

}
