/*
 * Package @liesmich/client
 * Source undefined
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  loadChildren: () => import('./components/post/post.module').then(m => m.PostModule),
  path: 'post',
}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
})
export class AppRoutingModule { }
