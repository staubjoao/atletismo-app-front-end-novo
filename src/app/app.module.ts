import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClubFormComponent } from './pages/club/club-form/club-form.component';
import { FormsModule } from '@angular/forms';
import { EventFormComponent } from './pages/event/event-form/event-form.component';
import { TrainingScheduleFormComponent } from './pages/training-schedule/training-schedule-form/training-schedule-form.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TrainingScheduleViewComponent } from './pages/training-schedule/training-schedule-view/training-schedule-view.component';
import { TokenInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ClubFormComponent,
    EventFormComponent,
    TrainingScheduleFormComponent,
    TrainingScheduleViewComponent
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
