import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { FormBuilder, NgControlStatus, FormGroup, Validators } from '@angular/forms'; 
import { PopupComponent, PopupModel } from '../popup/popup.component';
import { HttpClient } from '@angular/common/http';
import { TimeoutError } from 'rxjs';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.component.html',
  styleUrls: ['./actualizar-producto.component.css']
})
export class ActualizarProductoComponent implements OnInit {

  agregado : boolean;
  error : boolean;
  Productos = [];
  ActualizarProductoForm : FormGroup;
  constructor(private formBuilder : FormBuilder , public dialog : MatDialog, private http : HttpClient) { 
    this.ActualizarProductoForm = this.formBuilder.group({
      producto: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      descripcion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      inventario: [1, [Validators.required]],
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
      this.ActualizarProductoForm.controls.producto.setValue(this.Productos[0].ID);
      this.ProductoChanged(this.Productos[0].ID);
    },
    ( error ) => {
      console.log( error );
    });
  }

  
  ActualizarProductos() {
    this.error, this.agregado = false;
    if(!this.ActualizarProductoForm.invalid) {
      this.http.post('http://127.0.0.1:3000/updateProduct', {
        id: this.ActualizarProductoForm.controls.producto.value,
        name: this.ActualizarProductoForm.controls.nombre.value,
        description: this.ActualizarProductoForm.controls.descripcion.value,
        price: this.ActualizarProductoForm.controls.precio.value,
        store: this.ActualizarProductoForm.controls.inventario.value
      }).subscribe( ( res : any ) => {
        if(+res == 1) {
          this.agregado = true;
          this.LimpiarCampos();
        }
        else  
        this.error = true;
      },
      ( error ) => {
        console.log( error );
        this.error = true;
      });
    }
    else {
      this.error = true;
    }
  }

  ProductoChanged(e) {
    this.Productos.forEach( ( p ) => {
      if( p.ID == e ) {
        this.ActualizarProductoForm.controls.nombre.setValue(p.NAME);
        this.ActualizarProductoForm.controls.descripcion.setValue(p.DESCRIPTION);
        this.ActualizarProductoForm.controls.precio.setValue(p.PRICE);
        this.ActualizarProductoForm.controls.inventario.setValue(p.STORE);
        return;
      }
    });
  }

  LimpiarCampos() {
    this.ActualizarProductoForm.controls.nombre.setValue('');
    this.ActualizarProductoForm.controls.descripcion.setValue('');
    this.ActualizarProductoForm.controls.precio.setValue('');
    this.ActualizarProductoForm.controls.inventario.setValue(0);
    this.CargarProductos();
  }

  confirmDialog() {
    const dialogData = new PopupModel('Confirmacion', '¿Guardar producto ingresado?', 'question');
    const dialogRef = this.dialog.open(PopupComponent, {
      
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(res => {
      if(res)
      {
        this.ActualizarProductos();
        
      }
    });
  }
  
}
