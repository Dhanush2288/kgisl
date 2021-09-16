import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import {BackendService} from './services/backend.service';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule , FaIconLibrary} from '@fortawesome/angular-fontawesome'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {     MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from "@angular/material/menu";
import {MatDatepickerModule} from '@angular/material/datepicker';
 import { MatNativeDateModule} from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule } from '@angular/forms'
import { MatTabsModule}from '@angular/material/tabs'
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule} from '@angular/material/card';
import { MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import { AppointmentComponent } from './views/appointment/appointment.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { WaitingPipe } from './pipes/waiting.pipe';
import { LoginComponent } from './views/login/login.component';
import { SignupComponent } from './views/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AppointmentComponent,
    WaitingPipe,
    LoginComponent,
    SignupComponent,

  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    NgxMaterialTimepickerModule,
    HttpClientModule,
    ChartsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor( libary: FaIconLibrary){
    libary.addIconPacks(fas,far)
  }
 }
