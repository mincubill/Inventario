import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component'; 
import { VerProductoComponent } from './ver-producto/ver-producto.component'; 
import { IngresarStockComponent } from './ingresar-stock/ingresar-stock.component'; 
import { SacarStockComponent } from './sacar-stock/sacar-stock.component'; 
import { IngresarPrestamoComponent } from './ingresar-prestamo/ingresar-prestamo.component'; 
import { IngresarDevolucionComponent } from './ingresar-devolucion/ingresar-devolucion.component'; 
import { LoginComponent } from './login/login.component';
import { VerPrestamoComponent} from './ver-prestamo/ver-prestamo.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { RetiroProductosComponent } from './retiro-productos/retiro-productos.component';
import { RegistroComponent } from './registro/registro.component';
import { ActualizarProductoComponent } from './actualizar-producto/actualizar-producto.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  { path: 'AgregarProducto', component: AgregarProductoComponent },
  { path: 'VerProducto', component: VerProductoComponent },
  { path: 'IngresarStock', component: IngresarStockComponent },
  { path: 'SacarStock', component: SacarStockComponent },
  { path: 'IngresarPrestamo', component: IngresarPrestamoComponent },
  { path: 'IngresarDevolucion', component: IngresarDevolucionComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'VerPrestamo', component: VerPrestamoComponent },
  { path: 'PerfilUsuario/:rut', component: PerfilUsuarioComponent },
  { path: '', component: RetiroProductosComponent },
  { path: 'Registro', component: RegistroComponent },
  { path: 'ActualizarProducto', component: ActualizarProductoComponent },
  { path: 'Estadisticas', component: EstadisticasComponent },
  { path: 'Usuario', component: UsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
