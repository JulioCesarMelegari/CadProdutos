import { ClientComponent } from './views';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home';
import { ProductComponent } from './views/product';
import { ProductCreateComponent, ProductDeleteComponent,ProductUpdateComponent } from './components';
import { ClientCreateComponent, ClientDeleteComponent, ClientUpdateComponent } from './components';


const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"products",
    component: ProductComponent
  },
  {
    path:"products/create",
    component: ProductCreateComponent
  },
  {
    path:"products/update/:id",
    component: ProductUpdateComponent
  },
  {
    path:"products/delete/:id",
    component: ProductDeleteComponent
  },
  {
    path:"clients",
    component: ClientComponent
  },
  {
    path:"clients/create",
    component: ClientCreateComponent
  },
  {
    path:"clients/update/:id",
    component: ClientUpdateComponent
  },
  {
    path:"clients/delete/:id",
    component: ClientDeleteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
