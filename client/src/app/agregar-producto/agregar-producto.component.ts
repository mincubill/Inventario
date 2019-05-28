import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { FormBuilder, NgControlStatus, FormGroup } from '@angular/forms'; 
import { PopupComponent, PopupModel } from '../popup/popup.component';
import { HttpClient } from '@angular/common/http';
import { TimeoutError } from 'rxjs';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {

  agregado : boolean;
  error : boolean;
  user : any;
  AgregarForm : FormGroup;

  constructor (private formBuilder : FormBuilder , public dialog : MatDialog, private http : HttpClient) { 
    this.AgregarForm = this.formBuilder.group ({
        nombre: [''],
        descripcion: [''],
        total: [''],
        precio: ['']
      }
    );
  }

  ngOnInit() {
    
  }

  AgregarProducto() {
    let output : boolean;
    this.http.post('http://127.0.0.1:3000/createProduct', {
      name: this.AgregarForm.controls.nombre.value,
      description: this.AgregarForm.controls.descripcion.value,
      stock: this.AgregarForm.controls.total.value,
      price: this.AgregarForm.controls.precio.value,
      store: 1
    }).subscribe( (res : any) => {
      if(+res == 1) {
        output = true;
      }
      else {
        output = false;
      }
    }, 
    (error) => {
      console.log(error);
      output = false;
    }); 
    return output;
  }

  LimpiarCampos ()  {
    this.AgregarForm.controls.nombre.setValue('');
    this.AgregarForm.controls.descripcion.setValue('');
    this.AgregarForm.controls.total.setValue('');
    this.AgregarForm.controls.precio.setValue('');
  }

  confirmDialog() {
    const dialogData = new PopupModel('Confirmacion', '¿Guardar producto ingresado?');
    const dialogRef = this.dialog.open(PopupComponent, {
      
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res)
      {
        this.agregado = this.AgregarProducto();
        this.LimpiarCampos();
      }
    });
  }
}
