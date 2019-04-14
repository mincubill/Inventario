import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarCategoriaComponent } from './agregar-categoria/agregar-categoria.component'; 
import { VerCategoriaComponent } from './ver-categoria/ver-categoria.component'; 
import { QuitarCategoriaComponent } from './quitar-categoria/quitar-categoria.component'; 
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component'; 
import { VerProductoComponent } from './ver-producto/ver-producto.component'; 
import { QuitarProductoComponent } from './quitar-producto/quitar-producto.component'; 
import { IngresarStockComponent } from './ingresar-stock/ingresar-stock.component'; 
import { SacarStockComponent } from './sacar-stock/sacar-stock.component'; 
import { IngresarPrestamoComponent } from './ingresar-prestamo/ingresar-prestamo.component'; 
import { IngresarDevolucionComponent } from './ingresar-devolucion/ingresar-devolucion.component'; 

const routes: Routes = [
  {path: 'AgregarCategoria', component:AgregarCategoriaComponent},
  {path: 'VerCategoria', component:VerCategoriaComponent},
  {path: 'QuitarCategoria', component:QuitarCategoriaComponent},
  {path: 'AgregarProducto', component:AgregarProductoComponent},
  {path: 'VerProducto', component:VerProductoComponent},
  {path: 'QuitarProducto', component:QuitarProductoComponent},
  {path: 'IngresarStock', component:IngresarStockComponent},
  {path: 'SacarStock', component:SacarStockComponent},
  {path: 'IngresarPrestamo', component:IngresarPrestamoComponent},
  {path: 'IngresarDevolucion', component:IngresarDevolucionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
