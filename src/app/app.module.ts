import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// *RUTAS
import { APP_ROUTES } from './app.routes';

//  *MODULOS
import { PageModule } from './pages/pages.module';

//  *COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent 
   ],
  imports: [
    BrowserModule,
    PageModule,
    FormsModule,
    ReactiveFormsModule,    
    HttpClientModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
