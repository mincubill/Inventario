import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { FormBuilder, NgControlStatus, FormGroup, Validators } from '@angular/forms'; 
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
        nombre: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        descripcion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        total: ['', [Validators.required, Validators.min(1)]],
        precio: ['', [Validators.required, Validators.min(0)]]
      }
    );
  }

  ngOnInit() {
    
  }

  AgregarProducto() {
    if(!this.AgregarForm.invalid) {
      this.http.post('http://127.0.0.1:3000/createProduct', {
        name: this.AgregarForm.controls.nombre.value,
        description: this.AgregarForm.controls.descripcion.value,
        stock: this.AgregarForm.controls.total.value,
        price: this.AgregarForm.controls.precio.value,
        store: 1
      }).subscribe( (res : any) => {
        this.agregado = + res == 1 ? true : false;
        this.LimpiarCampos();
      }, 
      (error) => {
        console.log(error);
        this.agregado = false;
      });   
    }
    else {
      this.error = true;
    }
  }

  LimpiarCampos ()  {
    this.AgregarForm.controls.nombre.setValue('');
    this.AgregarForm.controls.descripcion.setValue('');
    this.AgregarForm.controls.total.setValue('');
    this.AgregarForm.controls.precio.setValue('');
  }

  confirmDialog() {
    this.error = false;
    this.error = false;
    const dialogData = new PopupModel('Confirmacion', '¿Guardar producto ingresado?');
    const dialogRef = this.dialog.open(PopupComponent, {
      
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res)
      {
        this.AgregarProducto();
      }
    });
  }
}
