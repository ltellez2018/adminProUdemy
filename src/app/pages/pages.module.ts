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
    AccountSettingsComponent],
  imports: [
    SharedModule,
    FormsModule,
    ChartsModule,
    PAGES_ROUTES
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component

  ],
  providers: [],
})
export class PageModule { }