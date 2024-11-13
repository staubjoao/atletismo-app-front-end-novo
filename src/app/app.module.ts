import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TokenInterceptor } from './auth.interceptor';
import { ClubeFormEntrarComponent } from './pages/clube/clube-form-entrar/clube-form-entrar.component';
import { ViewUsersComponent } from './pages/usuarios/view-users/view-users.component';
import { ClubeFormComponent } from './pages/clube/clube-form/clube-form.component';
import { EventoFormComponent } from './pages/evento/evento-form/evento-form.component';
import { SessaoTreinoFormComponent } from './pages/sessao-treino/sessao-treino-form/sessao-treino-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ClubeFormComponent,
    EventoFormComponent,
    ViewUsersComponent,
    SessaoTreinoFormComponent,
    ClubeFormEntrarComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FullCalendarModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
  }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
