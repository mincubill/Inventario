import { Component, OnInit } from '@angular/core';
import { DataManagerService } from '../data-manager.service'
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { FormBuilder, NgControlStatus, FormGroup } from '@angular/forms'; 
import { PopupComponent, PopupModel } from '../popup/popup.component';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  ///Objeto temporal para almacenar los datos de los txt que estan en 
  ProductoTemp = {
    nombre: "",
    descripcion: "",
    categoria: "",
    total: 0,
  }
  temp = {}
  agregado:boolean;
  error:boolean;
  ProductoForm: FormGroup;
  constructor ( private data : DataManagerService, private formBuilder: FormBuilder , public dialog: MatDialog)   { 
    this.ProductoForm = this.formBuilder.group ({
        nombre: [''],
        descripcion: [''],
        categoria: [''],
        total: [''],
      }
    )
    this.temp = this.data.tempProducto;
    console.log(this.temp);
  }

  ngOnInit() {
    
  }

  AgregarProducto() {
    this.ProductoTemp.nombre = this.ProductoForm.controls.nombre.value;
    this.ProductoTemp.descripcion = this.ProductoForm.controls.descripcion.value;
    this.ProductoTemp.categoria = this.ProductoForm.controls.categoria.value;
    this.ProductoTemp.total = this.ProductoForm.controls.total.value;
    this.data.AgregarProducto( this.ProductoTemp );
  }

  LimpiarCampos()  {
    this.ProductoForm.controls.nombre.setValue("");
    this.ProductoForm.controls.descripcion.setValue("");
    this.ProductoForm.controls.categoria.setValue("");
    this.ProductoForm.controls.total.setValue("");
  }

  confirmDialog() {
    const dialogData = new PopupModel("Confirmacion", "Guardar producto ingresado?");
    const dialogRef = this.dialog.open(PopupComponent, {
      
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res == true)
      {
        this.AgregarProducto();
        this.agregado = true;
        this.LimpiarCampos();
      }
    });
  }
}
