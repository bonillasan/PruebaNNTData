import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './pages/detalles/details/details.component';
import { HomeComponent } from './pages/inicio/home/home.component';

import { PermissionsGuard } from './shared/guards/permissions.guard';

const routes: Routes = [
  {
    path:'', redirectTo:'/home', pathMatch:'full',
  },
  {
    path:'home', component: HomeComponent
  },
  {
    path:'details', component: DetailsComponent, canActivate:[PermissionsGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
