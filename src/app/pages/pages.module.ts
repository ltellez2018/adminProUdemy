import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// RUTAS
import { PAGES_ROUTES } from './pages.routes';

// MODULOS PERSONALIZADOS
import { SharedModule } from '../shared/shared.module';

// COMPONENTES
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
//
import { RxjsComponent } from './rxjs/rxjs.component';
// Pipes
import { PipesModule } from '../pipes/pipes.module';
// ng2 - Charts
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ChartsModule,
    PAGES_ROUTES,
    PipesModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component

  ],
  providers: [],
})
export class PageModule { }