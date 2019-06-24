import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { FormBuilder, NgControlStatus, FormGroup, Validators } from '@angular/forms'; 
import { PopupComponent, PopupModel } from '../popup/popup.component';
import { HttpClient } from '@angular/common/http';
import { TimeoutError } from 'rxjs';


@Component({
  selector: 'app-ingresar-prestamo',
  templateUrl: './ingresar-prestamo.component.html',
  styleUrls: ['./ingresar-prestamo.component.css']
})
export class IngresarPrestamoComponent implements OnInit {

  Productos = []; //Lista de productos traidas desde la base de datos
  ProductosPrestamos = []; //Lista de producto para prestar
  agregado : boolean; //Variable para verificar que el prestamo se ingreso correctamente
  error : boolean; //Variable para verificar que el prestamo tuvo algun error
  user : any; //Variable que trae los datos del usuario logeado
  PrestamoForm: FormGroup;

  constructor(private formBuilder : FormBuilder , public dialog : MatDialog, private http : HttpClient) 
  {
    this.PrestamoForm = this.formBuilder.group(
      {
        rut: ['', [Validators.required]],
        //Fecha pedido trae deja la fecha por defecto como el dia de hoy
        fechaPedido: [new Date().toISOString().substring(0, 10), [Validators.required]],
        descripcion: ['', [Validators.required]],
        dias: ['', [Validators.required, Validators.min(0)]]
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
      res.forEach( ( p ) => {
        this.Productos.push({
          ID: p.ID,
          NAME: p.NAME,
          STOCK: p.STOCK,
          AVAILABLESTOCK: p.AVAILABLESTOCK,
          BORROWED: p.BORROWED,
          QUANTITY: 0
        });
      });
      this.EliminarNull(this.Productos);
    } 
    , ( error ) => {
      console.log( error );
    });
  }

  //Funcion que devuelve el producto de la lista de prestados a la lista de productos
  AgregarProducto(Producto) {
    this.Productos.push(Producto);
    this.EliminarProductoPedido(Producto);
  }

  //Funcion que agrega un producto a la lista de ProductosPedido y lo elimina de la lista de productos
  AgregarProductoPedido(Producto) {
    Producto.QUANTITY = 0; //Devuelve el valor a 0 al momento de agregarlo nuevamente a la lista de prestados
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
    this.error, this.agregado = false;
    let productos = [];
    this.ProductosPrestamos.forEach( ( p ) => {
      productos.push({proId: p.ID, quantity: p.QUANTITY});
    });
    if(!this.PrestamoForm.invalid && this.ProductosPrestamos.length > 0) {
      this.http.post('http://127.0.0.1:3000/createMovementHeader', {
        dateBegin: this.PrestamoForm.controls.fechaPedido.value,
        description: this.PrestamoForm.controls.descripcion.value,
        days: this.PrestamoForm.controls.dias.value,
        user: this.PrestamoForm.controls.rut.value.toString().replace(/[.*+?^${}()|[\]\\]/g, ''), //Elimina cualquier caracter invalido en el rut del usuario
        products: productos
      }).subscribe( ( res : any ) => {
        if(+res == 1) {
          this.agregado = true;
          this.LimpiarCampos();
        }
        else {
          this.error = true;
        }
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

  //Aumenta la cantidad del producto a pedir.
  //Producto: id del producto para aumentar en 1 la cantidad a pedir
  AumentarCantidad (producto) {
    this.ProductosPrestamos.forEach( ( p ) => {
      if(p.ID == producto && p.QUANTITY < p.AVAILABLESTOCK) {
        p.QUANTITY++;
        return;
      }
    });
  }

  //Disminuye la cantidad del producto pedir
  //producto: id del producto para disminuir en 1 la cantidad a pedir
  DisminuirCantidad (producto) {
    this.ProductosPrestamos.forEach( ( p ) => {
      if(p.ID == producto && p.QUANTITY > 0) {
        p.QUANTITY--;
        return;
      }
    });
  }

  //Elimina los nulls del retorno de la base de datos
  EliminarNull(productos) {
    productos.forEach( p => {
      p.BORROWED = p.BORROWED != null ? p.BORROWED : 0;
    });
  }

  confirmDialog() {
    const dialogData = new PopupModel('Confirmacion', '¿Guardar producto ingresado?');
    const dialogRef = this.dialog.open(PopupComponent, {
      
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(res => {
      if( res )
      {
        this.AgregarPrestamo();
      }
    });
  };

  LimpiarCampos() {
    this.ngOnInit();
    this.ProductosPrestamos = [];
    this.PrestamoForm.controls.rut.setValue('');
    this.PrestamoForm.controls.fechaPedido.setValue('');
    this.PrestamoForm.controls.descripcion.setValue('');
    this.PrestamoForm.controls.dias.setValue('');
  }
}