import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component'; 
import { VerProductoComponent } from './ver-producto/ver-producto.component'; 
import { IngresarStockComponent } from './ingresar-stock/ingresar-stock.component'; 
import { SacarStockComponent } from './sacar-stock/sacar-stock.component'; 
import { IngresarPrestamoComponent } from './ingresar-prestamo/ingresar-prestamo.component'; 
import { IngresarDevolucionComponent } from './ingresar-devolucion/ingresar-devolucion.component'; 
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'AgregarProducto', component:AgregarProductoComponent},
  {path: 'VerProducto', component:VerProductoComponent},
  {path: 'IngresarStock', component:IngresarStockComponent},
  {path: 'SacarStock', component:SacarStockComponent},
  {path: 'IngresarPrestamo', component:IngresarPrestamoComponent},
  {path: 'IngresarDevolucion', component:IngresarDevolucionComponent},
  {path: 'Login', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
