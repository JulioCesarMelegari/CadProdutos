import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home';
import { ProductComponent } from './views/product';
import { ProductCreateComponent } from './components';


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
