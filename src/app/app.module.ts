import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgregarCategoriaComponent } from './agregar-categoria/agregar-categoria.component';
import { VerCategoriaComponent } from './ver-categoria/ver-categoria.component';
import { QuitarCategoriaComponent } from './quitar-categoria/quitar-categoria.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { VerProductoComponent } from './ver-producto/ver-producto.component';
import { QuitarProductoComponent } from './quitar-producto/quitar-producto.component';
import { NavComponent } from './nav/nav.component';
import { IngresarStockComponent } from './ingresar-stock/ingresar-stock.component';
import { SacarStockComponent } from './sacar-stock/sacar-stock.component';
import { IngresarPrestamoComponent } from './ingresar-prestamo/ingresar-prestamo.component';
import { IngresarDevolucionComponent } from './ingresar-devolucion/ingresar-devolucion.component';

@NgModule({
  declarations: [
    AppComponent,
    AgregarCategoriaComponent,
    VerCategoriaComponent,
    QuitarCategoriaComponent,
    AgregarProductoComponent,
    VerProductoComponent,
    QuitarProductoComponent,
    NavComponent,
    IngresarStockComponent,
    SacarStockComponent,
    IngresarPrestamoComponent,
    IngresarDevolucionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
